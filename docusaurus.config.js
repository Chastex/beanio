const path = require("path");

module.exports = {
  title: "BeanIo",
  tagline: "",
  url: "https://www.beanio.cn",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "", // Usually your GitHub org/user name.
  projectName: "", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "BeanIo",
      logo: {
        alt: " beanio",
        src: "img/logo.svg",
      },
      items: [
      ],
    },
    footer: {
      style: "dark",
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BeanIo Built with Docusaurus.<p><a href="http://beian.miit.gov.cn">京ICP备2020034947号-1 </a></p>`,
    },
    prism: {
      darkTheme: require("prism-react-renderer/themes/vsDark"),
      defaultLanguage: "javascript",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/zxuqian/zxuqian.cn/tree/master/docs",
        },
        blog: {
          path: "./blog",
          routeBasePath: "/",
          feedOptions: {
            type: "all",
            title: "beanio",
            copyright: `Copyright © ${new Date().getFullYear()} BeanIo Built with Docusaurus.<p><a href="http://beian.miit.gov.cn">京ICP备2020034947号-1 </a></p>`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: "daily",
          priority: 0.5,
        },
      },
    ],
  ],
  themes: [require.resolve("@docusaurus/theme-live-codeblock")],
  plugins: [
    path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
  ],
};
