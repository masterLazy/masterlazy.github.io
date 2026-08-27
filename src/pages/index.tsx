import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import SiteIntro from './site-intro.md';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout description='masterLazy/悠哉法师的赛博笔记本'>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <img src="https://cn.cravatar.com/avatar/1BBD3CEC186505445320A17922EC5D59?s=1000"
              alt="My avatar" className={styles.avatar} />
            <Link to={useBaseUrl('/docs/jot/mnotebook')} style={{ textDecoration: 'none' }} >
              <h2>
                <strong>masterLazy
                </strong><span className={styles.separator}>/</span>
                悠哉法师的赛博笔记本
              </h2>
            </Link>
          </div>
        </div>
        <div className='markdown' style={{ margin: '0 0rem 3rem 0rem' }}>
          <SiteIntro />
        </div>
      </main>
    </Layout >
  );
}
