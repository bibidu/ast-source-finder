const baseFinder = require('./baseFinder')

module.exports = function JSXElementFinder(ast) {
  return baseFinder({
    ast,
    Check,
  })
}

const Check = {
  // class Btn extends Component {}
  ClassDeclaration(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode.get('openingElement').get('name')
    const classDeclarationRawName = maybeMatchdNode.get('id').node.name
    const isMatched = sourceTagNamePath.isJSXIdentifier({ name: classDeclarationRawName })

    return {
      isMatched,
      node: maybeMatchdNode,
    }
  },

  // const B = Btn
  VariableDeclaration(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode.get('openingElement').get('name')
    const isMatched = (name) => sourceTagNamePath.isJSXIdentifier({ name })
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
  },

  ExpressionStatement(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode.get('openingElement').get('name')
    const sourceTagName = sourceTagNamePath.node.name
    const isMatched = maybeMatchdNode.get('expression').get('left').isIdentifier({ name: sourceTagName })
    if (isMatched) {
      const node = maybeMatchdNode.get('expression').get('right')
      return {
        isMatched: true,
        node,
      }
    }
    return {
      isMatched: false,
      node: '',
    }
  },

  // function Btn2() { return <button></button> }
  FunctionDeclaration(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode.get('openingElement').get('name')
    const sourceTagName = sourceTagNamePath.node.name
    const isMatched = maybeMatchdNode.get('id').isIdentifier({ name: sourceTagName })
    if (isMatched) {
      const node = maybeMatchdNode
      return {
        isMatched: true,
        node,
      }
    }
    return {
      isMatched: false,
      node: '',
    }
  }
}