import { callUpdateUser } from '@/config/api';
import { useAppSelector } from '@/redux/hooks';
import { message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'styles/paymentSuccess.module.scss';

const PaymentPaySuccess: React.FC = (res) => {
    const [resultCode, setResultCode] = useState<string | null>(null);
    const [amount, setAmount] = useState<string | null>(null);
    const user = useAppSelector((state) => state.account.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUrl = window.location.href;
                const urlSearchParams = new URLSearchParams(currentUrl);
                const resultCode = urlSearchParams.get('resultCode');
                const amount = urlSearchParams.get('amount');

                setResultCode(resultCode);
                setAmount(amount);

                if (resultCode === '0' && amount !== null) {
                    const deductionAmount = parseInt(amount);
                    const updatedBalance = user?.balance ? user.balance + deductionAmount : 0;

                    const userUpdate = {
                        ...user,
                        _id: user?._id,
                        balance: updatedBalance,
                    };

                    const res = await callUpdateUser(userUpdate);

                    if (res.data) {
                        message.success('Cập nhật số dư thành công');
                    } else {
                        notification.error({
                            message: 'Có lỗi xảy ra',
                            description: res.message,
                        });
                    }

                    navigate('/admin/job');
                }
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        fetchData();
    }, [user, navigate]);
    return (
        <div className={`${styles['payment-success-message']} ${resultCode === '0' ? styles.success : styles.error}`}>
            {resultCode === '0' ? (
                <h1>Thanh toán thành công</h1>
            ) : (
                <h1>Thanh toán không thành công</h1>
            )}
        </div>
    );
};

export default PaymentPaySuccess;
