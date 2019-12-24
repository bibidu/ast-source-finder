# ast-source-finder

## Example
```js
import finder from 'ast-source-finder'
import parser from '@babel/parser'

const ast = parser.parse(`
  class Btn extends React.Component{
    render() {
      return <button>{this.props.btnText}</button>
    }
  }

  class App extends React.Component{
    renderA = () => {
      return <div>AAA</div>
    }
    render() {
      return <>
        <Btn></Btn>
        {
          this.renderA()
        }
      </>
    }
  }
`)

// case1: 输出Btn对应的AST Node
finder({
  startAst: '/* Btn JSXElement所在的AST Node */'
})

// case2: 输出renderA对应的AST Node
finder({
  startAst: '/* this.renderA() CallExpression所在的AST Node */'
})
```
