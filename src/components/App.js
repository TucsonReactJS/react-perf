import React, {Component} from 'react'
import {Link} from 'react-router';

export class App extends Component {
    render() {
        return <div>
            <div>{this.props.children || <ul>
                <li><Link to="/scu">Should Component Update</Link></li>
            </ul> }</div>
        </div>
    }
}


export default App;