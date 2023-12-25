import { $CombinedState, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '@/config/api';

// Đầu tiên, tạo thunk
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await callFetchAccount();
        return response.data;
    }
)

// Cập nhật định nghĩa cho đối tượng người dùng
interface IUser {
    _id: string;
    email: string;
    name: string;
    role: {
        _id: string;
        name: string;
    };
    permissions: {
        _id: string;
        name: string;
        apiPath: string;
        method: string;
        module: string;
    }[];
    balance: number; // Thêm thuộc tính 'balance'
}

// Cập nhật giao diện IState để sử dụng IUser
interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: IUser;
    activeMenu: string;
}

// Khởi tạo trạng thái ban đầu
const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        _id: "",
        email: "",
        name: "",
        role: {
            _id: "",
            name: "",
        },
        permissions: [],
        balance: 0,
    },
    activeMenu: 'home'
};

// Khởi tạo slide
export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // Các reducers để định nghĩa hành động và tạo các hành động liên quan
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user._id = action?.payload?._id;
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;
            state.user.role = action?.payload?.role;
            state.user.permissions = action?.payload?.permissions;
            state.user.balance = action?.payload?.balance || 0;
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                _id: "",
                email: "",
                name: "",
                role: {
                    _id: "",
                    name: "",
                },
                permissions: [],
                balance: 0,
            }
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        }
    },
    extraReducers: (builder) => {
        // Xử lý các trạng thái bổ sung cho các loại hành động ở đây
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user._id = action?.payload?.user?._id;
                state.user.email = action.payload.user?.email;
                state.user.name = action.payload.user?.name;
                state.user.role = action?.payload?.user?.role;
                state.user.permissions = action?.payload?.user?.permissions;
                state.user.balance = action?.payload?.user?.balance || 0;
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })
    },
});

export const {
    setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction, 
} = accountSlide.actions;

export default accountSlide.reducer;
