import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Battle from './Components/Battle'
import Popular from './Components/Popular'

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Battle />
            </div>
            
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)