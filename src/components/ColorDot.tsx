import React from 'react';

interface ColorDot {
    color: string;
    size?: string;
    className?: string;
}

export default function ColorDot({
    color = 'var(--ifm-color-primary)', size = '1rem', className
}: ColorDot) {
    const dotStyle = {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        marginRight: '0.5rem',
        marginBottom: '0.2rem'
    };

    return <span style={dotStyle} className={className} />;
};