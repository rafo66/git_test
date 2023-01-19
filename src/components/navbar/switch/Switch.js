import React from 'react';

const Switch = ({ isToggled, onToggle }) => {
    return (
        <div>
            <label className='switch'>
                <input type="checkbox" checked={isToggled} onChange={onToggle} />
                <div>
                    <span></span>
                </div>
            </label>
        </div>
    );
};

export default Switch;