const baseFinder = require('./baseFinder')

module.exports = function JSXElementFinder(ast) {
  return baseFinder({
    ast,
    isValidType,
    Check,
  })
}

const validTypes = [
  // let Btn = () => {}
  'VariableDeclaration',
  // case 1: Btn = () => {} 
  // case 2: Btn = function() {}
  // case 3: Btn = this.t
  'AssignmentExpression',
  // class Btn extends Component {}
  'ClassDeclaration',
]

const isValidType = (type) => validTypes.includes(type) ? type : false

const Check = {
  // class Btn extends Component {}
  ClassDeclarationFinder(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode.get('openingElement').get('name')
    const classDeclarationRawName = maybeMatchdNode.get('id').node.name
    const isMatched = sourceTagNamePath.isJSXIdentifier({ name: classDeclarationRawName })

    return {
      isMatched,
      node: maybeMatchdNode,
    }
  },

  // const B = Btn
  VariableDeclarationFinder(maybeMatchdNode, sourceNode) {
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
  }
}