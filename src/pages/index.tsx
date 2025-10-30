import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home() {
  return (
    <Layout description='Description will go into a meta tag in <head />'>
      <main>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <img src="https://cn.cravatar.com/avatar/1BBD3CEC186505445320A17922EC5D59?s=1000"
              alt="My avatar" className={styles.avatar} />
            <Link to={useBaseUrl('/docs/jot/mnotebook')} style={{ textDecoration: 'none' }} >
              <h2>
                <strong>masterLazy
                </strong><span className={styles.separator}>/</span>
                mLazy
                <span className={styles.separator}>/</span>
                悠哉法师的赛博笔记本
              </h2>
            </Link>
            <div className={styles.linkCardContainer}>
              <Link to={useBaseUrl('/docs/category/随笔')}
                className={styles.linkCard}>
                📝 所有笔记
              </Link>
              <Link to={useBaseUrl('/docs/tags')}
                className={styles.linkCard}>
                🏷️ 所有标签
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.mainContainer}>
            <p>
              欢迎来到我的笔记本，这是一个类似博客 / 专栏的东西。
              我把所有笔记分到不同的笔记本里面，每本笔记本使用独立的侧边栏，这样看起来更简洁一些。
              下面是所有笔记本的列表：
            </p>
            <div className={styles.notebookContainer}>
              <Link to={useBaseUrl('/docs/jot/intro')}
                className={styles.notebook}>
                📝 随笔<span className={styles.separator}>|</span>Jottings
              </Link>
            </div>

            <Heading as='h2' id='computer-science' style={{ fontWeight: 'normal' }}>
              <strong>计算机科学</strong><span className={styles.separator}>|</span>Computer Science
            </Heading>
            <div className={styles.notebookContainer}>
              <Link to={useBaseUrl('/docs/oi/intro')}
                className={styles.notebook}>
                📝 算法竞赛<span className={styles.separator}>|</span>OI
              </Link>
              <Link to={useBaseUrl('/docs/native-stacks/intro')}
                className={styles.notebook}>
                📝 原生技术栈<span className={styles.separator}>|</span>Native Stacks
              </Link>
              <Link to={useBaseUrl('/docs/web-stacks/intro')}
                className={styles.notebook}>
                📝 Web 技术栈<span className={styles.separator}>|</span>Web Stacks
              </Link>
            </div>

            <Heading as='h2' id='academic-subjects' style={{ fontWeight: 'normal' }}>
              <strong>文化课</strong><span className={styles.separator}>|</span>Academic Subjects
            </Heading>
            <div className={styles.notebookContainer}>
              <Link to={useBaseUrl('/docs/math/intro')}
                className={styles.notebook}>
                📝 数学<span className={styles.separator}>|</span>Math
              </Link>
            </div>
            <hr />
            <p>
              如无特殊说明，本站中的内容采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a>
              （署名—非商业性使用—相同方式共享 4.0 协议国际版）公开许可。
              这些笔记中的一些也在 Cnblog、Bilibilli、Luogu 发布，我把它们搬到这里了。
            </p>
            <p>
              如果你的电脑上安装了思源宋体或者其他你喜欢的无衬线体，将获得更好的浏览体验（相比微软雅黑而言）。
            </p>
          </div>
        </div>
      </main>
    </Layout >
  );
}
