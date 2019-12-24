const baseFinder = require('./baseFinder')

module.exports = function IdentifierFinder(ast) {
  return baseFinder({
    ast,
    isValidType,
    Check,
  })
}

const validTypes = [
  // class Btn extends Component {}
  'ClassDeclaration',
  'VariableDeclaration',
]

const isValidType = (type) => validTypes.includes(type) ? type : false

const Check = {
  // class Btn extends Component {}
  ClassDeclaration(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode
    const classDeclarationRawName = maybeMatchdNode.get('id').node.name
    const isMatched = sourceTagNamePath.isIdentifier({ name: classDeclarationRawName })
    return {
      isMatched,
      node: maybeMatchdNode,
    }
  },

  // const Btn3 = Btn2
  VariableDeclaration(maybeMatchdNode, sourceNode) {
    const isMatched = (name) => sourceNode.isIdentifier({ name })
    const declarations = maybeMatchdNode.get('declarations')
    for (let decl of declarations) {
      const name = decl.get('id').node.name
      if (isMatched(name)) {
        const node = getVariableDeclaratorValue(declarations[decl.key])
        return {
          isMatched: true,
          node,
        }
      }
    }
    return {
      isMatched: false,
      node: '',
    }

    function getVariableDeclaratorValue(variableDeclaratorPath) {
      const initPath = variableDeclaratorPath.get('init')
      if (initPath.isIdentifier()) {
        return initPath
      } else {
        const msg = `getVariableDeclaratorValue缺少${initPath.type}类型`
        throw Error(msg)
      }
    }
  }
}