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
            <button className="btn mt-4" type="submit" name="payURL">
                Nâng cấp
            </button>
        </form>
    );
};

export default PaymentPay;

