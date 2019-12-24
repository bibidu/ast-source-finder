const getMatchType = require('./getMatchType')
const Finder = {
  JSXElementFinder: require('./Finder/JSXElementFinder'),
  IdentifierFinder: require('./Finder/IdentifierFinder'),
}

function finder() {
  const _f = ({ startAst, matchTypes } = {}) => {
    let splitInputTypeNames = []

    if (startAst.type === 'JSXElement') {
      const jsxTagName = startAst.get('openingElement').get('name').node.name
      const array = splitInputType(jsxTagName)
      splitInputTypeNames = array.map((item, index) => ({
        type: index === array.length - 1 ? 'JSXElement' : 'Identifier',
        value: item,
      }))
    } else if (startAst.type === 'Identifier') {
      splitInputTypeNames = [{ type: 'Identifier', value: startAst.node.name }]
    } else {
      const msg = `暂不支持${startAst.type}`
      throw Error(msg)
    }
    return splitInputTypeNames.reduce((prev, curr) => {
      const { type: _type } = curr
      const fn = Finder[`${_type}Finder`]
      const { isMatched, node } = prev(fn(startAst))
      if (isMatched) {
        if ((matchTypes || getMatchType(startAst.type)).includes(node.type)) {
          return { isMatched, node }
        } else {
          console.log(`[_f] ${node.type}`)
          return _f({ startAst: node, matchTypes: getMatchType(node.type) })
        }
      }
      return { isMatched: false }
    }, (v) => v)
  }
  return _f
}

module.exports = finder()

const splitInputType = (name) => {
  const array = name.split('.')
  return array
}

