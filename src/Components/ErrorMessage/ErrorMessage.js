import React from 'react';

function ErrorMessage({ message, onRetry }) {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Error</h2>
            <p>{message}</p>
            {onRetry && (
                <button onClick={onRetry} style={{ marginTop:'10px', padding: '10px 20px', cursor: 'pointer' }}>
                    Reintentar
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;
