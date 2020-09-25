/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useState } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import BlogPostItem from "../BlogPostItem";
import BlogListPaginator from "@theme/BlogListPaginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faQq,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import useBaseUrl from "@docusaurus/useBaseUrl";
// import bilibiliIcon from "@site/static/icons/bilibili.svg";

import useThemeContext from "@theme/hooks/useThemeContext";

function BlogListPage(props) {
  const { metadata, items } = props;

  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const isBlogOnlyMode = metadata.permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : "Blog";
  const description = `我的知识笔记`;

  // Get all post views
  const postIds = items.map(({ content }) => {
    return content?.frontMatter?.slug;
  });
  const [views, setViews] = useState([]);
  const getViews = async () => {
    try {
      const res = await fetch("https://api.zxuqian.cn/post/views", {
        method: "POST",
        body: JSON.stringify(postIds),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const views = await res.json();
      setViews(views);
    } catch (error) {}
  };

  useEffect(() => {
    getViews();
  }, []);

  return (
    <Layout title={title} description={description}>
      <div className="container margin-vert--xl">
        {/* 个人简介 */}
        <div className="row">
          <div className="col col--10 col--offset-1 bloghome__intro">
            <h1>
              Hello! 我是<span className="intro__name">Bean</span>
            </h1>
            <p>
              欢迎来到我的博客！
            </p>
            <SocialLinks />
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <div className="content__divider"></div>
            <p className="blog__section_title">
              最新博客&nbsp;
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.8333 5.16666H5.16668C3.73293 5.16666 2.59626 6.31624 2.59626 7.74999L2.58334 23.25C2.58334 24.6837 3.73293 25.8333 5.16668 25.8333H25.8333C27.2671 25.8333 28.4167 24.6837 28.4167 23.25V7.74999C28.4167 6.31624 27.2671 5.16666 25.8333 5.16666ZM10.9792 19.375H9.42918L6.13543 14.8542V19.375H4.52084V11.625H6.13543L9.36459 16.1458V11.625H10.9792V19.375ZM17.4375 13.2525H14.2083V14.6992H17.4375V16.3267H14.2083V17.7604H17.4375V19.375H12.2708V11.625H17.4375V13.2525ZM26.4792 18.0833C26.4792 18.7937 25.8979 19.375 25.1875 19.375H20.0208C19.3104 19.375 18.7292 18.7937 18.7292 18.0833V11.625H20.3438V17.4504H21.8033V12.9037H23.4179V17.4375H24.8646V11.625H26.4792V18.0833Z"
                  fill="#4490D6"
                />
              </svg>
            </p>
            {items.map(({ content: BlogPostContent }) => (
              <BlogPostItem
                key={BlogPostContent.metadata.permalink}
                frontMatter={BlogPostContent.frontMatter}
                metadata={BlogPostContent.metadata}
                truncated={BlogPostContent.metadata.truncated}
                views={
                  views.find((v) => v.slug == BlogPostContent.frontMatter.slug)
                    ?.views
                }
              >
                <BlogPostContent />
              </BlogPostItem>
            ))}
            <BlogListPaginator metadata={metadata} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SocialLinks({ ...props }) {
  const { isDarkTheme } = useThemeContext();
  return (
    <div className="social__links">

    </div>
  );
}

export default BlogListPage;
