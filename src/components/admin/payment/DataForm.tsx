import React, { useState } from 'react';

const DataForm = (sendDataToServer: any) => {
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendDataToServer({ price, key });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <label>
                Key:
                <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default DataForm;