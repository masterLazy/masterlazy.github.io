/**
 * Copyright 2025 masterLazy

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
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