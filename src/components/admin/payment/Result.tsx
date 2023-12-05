import React from 'react';

const Result = (payUrl: any) => {
    return (
        <div>
            <h2>Payment URL:</h2>
            <p>{payUrl}</p>
        </div>
    );
};

export default Result;