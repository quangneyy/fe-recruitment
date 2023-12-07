import React, { useEffect } from 'react';
import { useState } from 'react';

const PaymentPaySuccess: React.FC = (res) => {
    const [resultCode, setResultCode] = useState<string | null>(null);

    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;

        // Parse the query parameters from the URL
        const urlSearchParams = new URLSearchParams(currentUrl);

        // Get the value of 'resultCode' from the query parameters
        const resultCode = urlSearchParams.get('resultCode');

        // Now 'resultCode' contains the value you need
        console.log('Result Code:', resultCode);

        // You can use 'resultCode' in your React component state or perform further actions here
        setResultCode(resultCode);
    }, []);

    return (
        <div>
            {resultCode == '0' ? (
                <h1>Thanh toán thành công</h1>
            ) : (
                <h1>Thanh toán không thành công</h1>
            )}
        </div>
    );
};

export default PaymentPaySuccess;