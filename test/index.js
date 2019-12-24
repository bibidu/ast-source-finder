const finder = require('../core/app')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const code = `
class Btn2 extends React.Component{
  render() {
    return <button>{this.props.btnText}</button>
  }
}
const Btn3 = Btn2
const B = Btn3
class App extends React.Component{
  renderA = () => {
    return <div>AAA</div>
  }
  render() {
    return <>
      <B></B>
      {
        this.renderA()
      }
    </>
  }
}`

const ast = parser.parse(code, {
  sourceType: "module",
  plugins: [
    'classProperties',
    'jsx'
  ]
})

let testStartAst = null
traverse(ast, {
  JSXElement(path) {
    if (path.get('openingElement').get('name').isJSXIdentifier({ name: 'B' })) {
      testStartAst = path
      path.stop()
    }
  } 
})

const result = finder({
  startAst: testStartAst
})

console.log('======================== result ========================')
console.log(result.isMatched && result.node.type)