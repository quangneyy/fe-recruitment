import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    LogoutOutlined,
    BugOutlined,
    ScheduleOutlined,
    DollarOutlined, // Import the DollarOutlined icon for the recharge button
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { callLogout } from 'config/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import { ALL_PERMISSIONS } from '@/config/permissions';

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    
    const user = useAppSelector((state) => state.account.user);

    const permissions = useAppSelector((state) => state.account.user.permissions);
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (permissions?.length) {
            const viewCompany = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.method
            );

            const viewUser = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            );

            const viewJob = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.JOBS.GET_PAGINATE.method
            );

            const viewResume = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.method
            );

            const viewRole = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
            );

            const viewPermission = permissions.find(
                (item) =>
                    item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath &&
                    item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            );

            const full = [
                {
                    label: <Link to="/admin">Dashboard</Link>,
                    key: '/admin',
                    icon: <AppstoreOutlined />,
                },
                ...(viewCompany
                    ? [
                        {
                            label: <Link to="/admin/company">Company</Link>,
                            key: '/admin/company',
                            icon: <BankOutlined />,
                        },
                    ]
                    : []),
                ...(viewUser
                    ? [
                        {
                            label: <Link to="/admin/user">User</Link>,
                            key: '/admin/user',
                            icon: <UserOutlined />,
                        },
                    ]
                    : []),
                ...(viewJob
                    ? [
                        {
                            label: <Link to="/admin/job">Job</Link>,
                            key: '/admin/job',
                            icon: <ScheduleOutlined />,
                        },
                    ]
                    : []),
                ...(viewResume
                    ? [
                        {
                            label: <Link to="/admin/resume">Resume</Link>,
                            key: '/admin/resume',
                            icon: <AliwangwangOutlined />,
                        },
                    ]
                    : []),
                ...(viewPermission
                    ? [
                        {
                            label: <Link to="/admin/permission">Permission</Link>,
                            key: '/admin/permission',
                            icon: <ApiOutlined />,
                        },
                    ]
                    : []),
                ...(viewRole
                    ? [
                        {
                            label: <Link to="/admin/role">Role</Link>,
                            key: '/admin/role',
                            icon: <ExceptionOutlined />,
                        },
                    ]
                    : []),
            ];

            setMenuItems(full);
        }
    }, [permissions]);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location]);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const handleRecharge = () => {
        navigate('/admin/payment');
        // message.success('Nạp tiền thành công');
    };

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: (
                <Space style={{ alignItems: 'center', cursor: 'pointer' }}>
                    <Button type="primary" icon={<DollarOutlined />} onClick={() => handleRecharge()}>
                        Nạp Tiền
                    </Button>
                    <span style={{ marginLeft: 8 }}>|</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 8 }}>Số dư: {user?.balance}</span>
                </Space>
                
            ),
            key: 'recharge',
        },
        {
            label: (
                <Space style={{ alignItems: 'center', cursor: 'pointer' }}>
                    <label onClick={() => handleLogout()}>Đăng xuất</label>
                </Space>
            ),
            key: 'logout',
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }} className="layout-admin">
            {!isMobile ? (
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        <BugOutlined /> ADMIN
                    </div>
                    <Menu selectedKeys={[activeMenu]} mode="inline" items={menuItems} onClick={(e) => setActiveMenu(e.key)} />
                </Sider>
            ) : (
                <Menu selectedKeys={[activeMenu]} items={menuItems} onClick={(e) => setActiveMenu(e.key)} mode="horizontal" />
            )}

            <Layout>
                {!isMobile && (
                    <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', marginRight: 20 }}>
                        <Button
                            type="text"
                            icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px', width: 64, height: 64 }}
                        />
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: 'pointer' }}>
                                Welcome {user?.name}
                                <Avatar> {user?.name?.substring(0, 2)?.toUpperCase()} </Avatar>
                            </Space>
                        </Dropdown>
                    </div>
                )}
                <Content style={{ padding: '15px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
