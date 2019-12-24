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
]

const isValidType = (type) => validTypes.includes(type) ? type : false

const Check = {
  // class Btn extends Component {}
  ClassDeclarationFinder(maybeMatchdNode, sourceNode) {
    const sourceTagNamePath = sourceNode
    const classDeclarationRawName = maybeMatchdNode.get('id').node.name
    const isMatched = sourceTagNamePath.isIdentifier({ name: classDeclarationRawName })
    return {
      isMatched,
      node: maybeMatchdNode,
    }
  },
}