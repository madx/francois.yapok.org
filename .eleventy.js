const pluginTailwindCSS = require("eleventy-plugin-tailwindcss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const markdownIt = require("markdown-it")
const mdEmoji = require("markdown-it-emoji")
const mdAnchor = require("markdown-it-anchor")
const mdContainer = require("markdown-it-container")
const mdTldr = require("./md-tldr-plugin")

module.exports = (eleventy) => {
  eleventy.addPassthroughCopy("src/img")

  eleventy.addPlugin(pluginTailwindCSS)
  eleventy.addPlugin(pluginSyntaxHighlight)

  const md = markdownIt({ html: true, xhtmlOut: true })
    .use(mdEmoji)
    .use(mdAnchor)
    .use(mdTldr)
    .use(mdContainer, "article", {
      validate: (params) => params.trim() === "article",
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          return "<article>"
        } else {
          return "</article>"
        }
      },
    })
  eleventy.setLibrary("md", md)

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
}
