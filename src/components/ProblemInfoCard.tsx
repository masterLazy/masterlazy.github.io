import React from 'react';
import styles from './ProblemInfoCard.module.css';

import ColorDot from '@site/src/components/ColorDot';

interface ProblemInfoCard {
    link: string;
    difficulty: string;
    algorithms: string[];
    date: string;
}

export default function ProblemInfoCard({
    link, difficulty, algorithms, date
}: ProblemInfoCard) {
    const difficultyColors = {
        'gray': '#bfbfbf',
        'red': '#fe4c61',
        'orange': '#f39c11',
        'yellow': '#ffc116',
        'green': '#52c41a',
        'blue': '#3498db',
        'purple': '#9d3dcf',
        'black': '#0e1d69'
    };
    const difficultyNames = {
        'gray': '暂无评定',
        'red': '入门',
        'orange': '普及−',
        'yellow': '普及/提高−',
        'green': '普及+/提高',
        'blue': '提高+/省选−',
        'purple': '省选/NOI−',
        'black': 'NOI/NOI+/CTSC'
    };
    return (
        <div className={styles.card} onClick={() => window.open(link, '_blank')}
            title='点击跳转到 OJ 查看本题'>
            <div className={styles.line}>
                <span className={styles.title}>难度</span>
                <ColorDot color={difficultyColors[difficulty]} />
                <span>{difficultyNames[difficulty]}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.title}>算法</span>
                <span>{algorithms.join('、')}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.title}>日期</span>
                <span>{date}</span>
            </div>
        </div>
    );
}