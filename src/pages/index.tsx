import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description='Description will go into a meta tag in <head />'>
      <main>
        <div className={styles.header}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem',
            marginTop: '0'
          }}>

          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            <div>
              <img src="/img/avatar.webp" alt="My avatar" style={{
                width: '14rem',
                border: '2px solid var(--ifm-color-emphasis-300)',
                borderRadius: '7rem',
                marginBottom: '1rem',
              }} />
              <h2 style={{ fontWeight: 'normal' }}><strong>masterLazy</strong><span className={styles.separator}>/</span>mLazy<span className={styles.separator}>/</span>悠哉法师的赛博笔记本</h2>
            </div>
          </div>
          <div className={styles.linkCardContainer}>
            <Link to={useBaseUrl('/docs/tags')}
              className={styles.linkCard}>
              🏷️ 所有标签
            </Link>
          </div>
        </div>
        <div className={styles.body}>
          <div style={{
            maxWidth: '57rem',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'left',
            }}>
              <div className={styles.notebookContainer}>
                <p>
                  欢迎来到我的笔记本，这是一个类似博客 / 专栏的东西。
                  我把所有笔记分到不同的笔记本里面，每本笔记本使用独立的侧边栏，这样看起来更简洁一些。
                  下面是所有笔记本的列表：
                </p>
                <Link to={useBaseUrl('/docs/category/速查')}
                  className={styles.notebook}>
                  速查<span className={styles.separator}>|</span>Quick
                </Link>
                <Heading as='h2' id="计算机科学" style={{ fontWeight: 'normal' }}>
                  <strong>计算机科学</strong><span className={styles.separator}>|</span>Computer Science
                </Heading>
                <Link to={useBaseUrl('/docs/category/程序设计')}
                  className={styles.notebook}>
                  程序设计<span className={styles.separator}>|</span>Programing
                </Link>
                <Link to={useBaseUrl('/docs/category/算法竞赛')}
                  className={styles.notebook}>
                  算法竞赛<span className={styles.separator}>|</span>OI
                </Link>
                <hr />
                <p>如无特殊说明，本站中的内容采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a>
                  （署名—非商业性使用—相同方式共享 4.0 协议国际版）公开许可。
                  这些笔记中的一些也在 Cnblog、Bilibilli、Luogu 发布，我把它们全都搬到这里了。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout >
  );
}
