import React from 'react';

const ColorDot = ({ color = '#007bff', size = '1rem', className = '' }) => {
    const dotStyle = {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        marginRight: '0.5rem',
        marginBottom: '0.1rem'
    };

    return <span style={dotStyle} className={className} />;
};

export default ColorDot;