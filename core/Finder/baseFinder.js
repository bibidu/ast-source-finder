const {
  hasFinish,
  getParent,
} = require('./common')
const getMatchType = require('../getMatchType')

module.exports = function baseFinder({
  ast,
  Check,
}) {
  const isValidType = (type) => {
    return getMatchType(ast.type).includes(type) ? type : false
  }
  let parent = getParent(ast)
  while (!hasFinish(parent.type)) {
    // 寻找前面的节点
    if (parent.inList && parent.key > 0) {
      for (let i = 0; i < parent.key; i++) {
        const currentSibling = parent.getSibling(i)
        // 节点类型校验
        let validType = ''
        console.log(`currentSibling.type ${currentSibling.type}`)
        if (validType = isValidType(currentSibling.type)) {
          console.log(`[Check] ${validType}`)
          const fn = Check[`${validType}`]
          if (typeof fn !== 'function') {
            const msg = `没有匹配的Check方法: ${validType}`
            throw Error(msg)
          }
          const { isMatched, node } = fn(currentSibling, ast)
          if (isMatched) {
            return { isMatched: true, node }
          }
        }
      }
    }
    parent = getParent(parent)
  }
  console.log('not match anything')
  return {
    isMatched: false,
    node: '',
  }
}