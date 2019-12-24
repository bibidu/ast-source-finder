module.exports = function getMatchType(type) {
  switch(type) {
    case 'JSXElement':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
        'ArrowFunctionExpression',
        'FunctionDeclaration',
      ]
    case 'Identifier':
      return [
        'ClassDeclaration',
        'VariableDeclaration',
        'ExpressionStatement',
        'ArrowFunctionExpression',
        'FunctionDeclaration',
      ]
    default:
      return []
  }
}