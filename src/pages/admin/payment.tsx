import React, { useState } from 'react';
import styles from 'styles/payment.module.scss';

const PaymentPay: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState('30000');

    const handleAmountChange = (amount: string) => {
        setSelectedAmount(amount);
    };

    const handleSubmit = () => {
        // Gửi dữ liệu thanh toán với selectedAmount
        // ...
    };

    return (
        <form
            className={styles['payment-form']}
            action="https://tukiapi.azurewebsites.net/api/payment.php"
            method="post"
            target="_blank"
            encType="application/x-www-form-urlencoded"
        >
            <h2 className={styles['title']}>Chọn mức tiền bạn muốn nạp</h2>

            <div className={styles['amount-options']}>
                <label>
                    <input
                        type="radio"
                        name="amount"
                        value="30000"
                        checked={selectedAmount === '30000'}
                        onChange={() => handleAmountChange('30000')}
                    />
                    30,000 VND
                </label>
                <label>
                    <input
                        type="radio"
                        name="amount"
                        value="50000"
                        checked={selectedAmount === '50000'}
                        onChange={() => handleAmountChange('50000')}
                    />
                    50,000 VND
                </label>
                <label>
                    <input
                        type="radio"
                        name="amount"
                        value="100000"
                        checked={selectedAmount === '100000'}
                        onChange={() => handleAmountChange('100000')}
                    />
                    100,000 VND
                </label>
                <label>
                    <input
                        type="radio"
                        name="amount"
                        value="500000"
                        checked={selectedAmount === '500000'}
                        onChange={() => handleAmountChange('500000')}
                    />
                    500,000 VND
                </label>
            </div>

            <input type="hidden" name="price" value={selectedAmount} />
            <input type="hidden" name="resultURL" value='http://localhost:3000/admin/success' />

            <button
                className={styles['payment-button']}
                type="submit"
                name="payURL"
                onClick={handleSubmit}
            >
                Thanh toán tại đây
            </button>
        </form>
    );
};

export default PaymentPay;
