module.exports = function getMatchType(type) {
  switch(type) {
    case 'JSXElement':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
        'ArrowFunctionExpression',
      ]
    case 'Identifier':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
        'ArrowFunctionExpression',
      ]
    default:
      return []
  }
}