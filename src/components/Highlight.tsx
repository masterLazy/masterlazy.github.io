import React from 'react';

import styles from './Highlight.module.css';

interface Highlight {
    children: React.ReactNode;
}

export default function Highlight({
    children
}: Highlight) {
    return (
        <span className={styles.content}>
            {children}
        </span>
    );
};