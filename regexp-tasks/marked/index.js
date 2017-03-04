function Marked (text) {
  this.text = text
  this.parser(text)
}

Maked.prototype = {
  constructor: Maked,
  re: {
    title: /#{1,6} [^\n]+/,
    list: /(?:(?:(-)|(\*)|(\d+\.)) [^\n]*(?:\n(?:\1|\2|(\d+\.))) [^\n]*)+/,
    blockquote: /> [^\n]*(?:\n> [^\n]*)*/,
    block: /[ ]{4,}[^\n]*(?:\n[ ]{4,}[^\n]*)*/,
    code: /`([^`]+)`/,
    img: /!\[([^\n])*\](\([^\n]*\))/,
    link: /\[([^\n])*\](\([^\n]*\))/
  },
  match: function (text) {
    for (var key in this.re) {
      var rule = this.re[key]
      if (rule.test(text)) {
        return true
      }
    }
  }
}

