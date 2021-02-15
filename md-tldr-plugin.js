// Process block-level custom containers
//
const yaml = require("yaml")
const { format } = require("date-fns")

module.exports = function front_matter_plugin(md) {
  function frontMatter(state, startLine, endLine, silent) {
    var marker,
      len,
      params,
      nextLine,
      mem,
      token,
      markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    if (pos + 3 > max) {
      return false
    }

    marker = state.src.charCodeAt(pos)

    if (marker !== 0x25 /* % */) {
      return false
    }

    // scan marker length
    mem = pos
    pos = state.skipChars(pos, marker)

    len = pos - mem

    if (len < 3) {
      return false
    }

    markup = state.src.slice(mem, pos)
    params = state.src.slice(pos, max)

    if (marker === 0x25 /* % */) {
      if (params.indexOf(String.fromCharCode(marker)) >= 0) {
        return false
      }
    }

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true
    }

    // search end of block
    nextLine = startLine

    for (;;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (pos < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (state.src.charCodeAt(pos) !== marker) {
        continue
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue
      }

      pos = state.skipChars(pos, marker)

      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) {
        continue
      }

      // make sure tail has spaces only
      pos = state.skipSpaces(pos)

      if (pos < max) {
        continue
      }

      haveEndMarker = true
      // found!
      break
    }

    // If a fence has heading spaces, they should be removed from its inner block
    len = state.sCount[startLine]

    state.line = nextLine + (haveEndMarker ? 1 : 0)

    token = state.push("front_matter", null, 0)
    token.info = params
    token.content = state.getLines(startLine + 1, nextLine, len, true)
    token.markup = markup
    token.map = [startLine, state.line]

    return true
  }

  md.block.ruler.before("fence", "front_matter", frontMatter, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  })
  md.renderer.rules["front_matter"] = (tokens, idx, options, env, slf) => {
    const content = tokens[idx].content
    const meta = yaml.parse(content)
    return `<header>
<h3>${meta.title}</h3>
<time datetime="${meta.date}">${format(Date.parse(meta.date), "PP")}</time>
<ul>${meta.tags
      .split(",")
      .map((s) => `<li>#${s.trim()}</li>`)
      .join("")}</ul>
</header>`
  }
}
