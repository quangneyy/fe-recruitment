import React from 'react';

const PaymentPay: React.FC = () => {
    return (
        <form
            className="plan-button"
            action="https://tukiapi.azurewebsites.net/api/payment.php"
            method="post"
            target="_blank"
            encType="application/x-www-form-urlencoded"
        >
            <input type="hidden" name="price" value="30000" />
            <button
                className="btn mt-4"
                type="submit"
                name="payURL"
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: '#4CAF50',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
            >
                Thanh toán tại đây
            </button>
        </form>
    );
};

export default PaymentPay;

