import React from 'react';

const ArrowUp = () => {
    return (
        <div>
            <button className='btn' onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                    <path d="M14.15 30.75 12 28.6 24 16.6 36 28.55 33.85 30.7 24 20.85Z" />
                </svg>
            </button>
        </div>
    );
};

export default ArrowUp;