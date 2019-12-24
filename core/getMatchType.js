module.exports = function getMatchType(type) {
  switch(type) {
    case 'JSXElement':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
      ]
    case 'Identifier':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
      ]
    default:
      return []
  }
}