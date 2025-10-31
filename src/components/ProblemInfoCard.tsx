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
import Link from '@docusaurus/Link';

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
        <Link to={link} title='点击跳转到 OJ 查看本题' style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
                <div className={styles.line}>
                    <span className={styles.title}>难度</span>
                    <ColorDot color={`var(--luogu-${difficulty})`} />
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
        </Link>
    );
}