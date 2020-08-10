// Do not remove any of the properties below.
module.exports = {
  siteMetadata: {
    title: `deverse.xyz`,
    logo: `/images/deverse.svg`,
    icon: `/images/deverse.svg`,
    titleImage: `/images/wall.jpg`,
    introTag: `FRONT END | BACK END | MOBILE`,
    description: `Professional full-stack freelance development and integration, at your service.`,
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
    aboutMessages: [
      { caption: "A development universe", label: "Expertise in a wide variety of technologies and functional domains" },
      { caption: "A diverse mindset", label: "Devoted to work only with engagement and interest" },
      { caption: "Enjoying makes it better", label: "Always thriving passion, creativity and fun" },
    ],
    navLinks: [{
        name: "home",
        url: "/"
      },
      {
        name: "about",
        url: "/about",
        anchor: true
      },
      {
        name: "portfolio",
        url: "/portfolio",
        anchor: true
      },
      {
        name: "blog",
        url: "/blog",
        anchor: true
      },
      {
        name: "contact",
        url: "/contact",
        anchor: true
      }
    ],
    footerLinks: [{
          name: "PRIVACY POLICY",
          url: "/privacy-policy"
        }
    ],
    social: [{
        name: "github",
        icon: "/images/github.svg",
        url: "#"
      },
      {
        name: "Linkedin",
        icon: "/images/linkedin.svg",
        url: "#"
      },
      {
        name: "Stackoverflow",
        icon: "/images/stackoverflow.svg",
        url: "#"
      }
    ],
    contact: {
      api_url: "./test.json",
      /* Leave this completely empty (no space either) if you don't want a contact form. */
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
      mail: "hi@akzhy.com",
      phone: "000-000-0000",
      address: "1234 \nLocation \nLocation"
    },

    capitalizeTitleOnHome: ""
  }
}