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

import styles from './CompInfoCard.module.css';

interface CompInfoCard {
    title: string;
    sort: string; // 比赛类型
    date: string;
    link?: string;
}

export default function CompInfoCard({
    title, sort, date, link
}: CompInfoCard) {
    const card = (
        <div className={`${styles.card} ${link && styles.cardLink}`}>
            <div className={styles.line}>
                <span>{title}</span>
            </div>
            <hr />
            <div className={styles.line}>
                <span className={styles.title}>类型</span>
                <span>{sort}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.title}>日期</span>
                <span>{date}</span>
            </div>
        </div>);
    if (link) {
        return (
            <Link to={link} title='点击跳转到比赛详情' style={{ textDecoration: 'none' }}>
                {card}
            </Link >
        );
    } else {
        return card;
    }
}