import React, {Component} from 'react';
import snabbt from 'snabbt.js';

export class Flash extends Component {

    constructor() {
        super();

        this.state = {
            playState: "idle",
            currentTime: 0
        }
    }

    componentDidMount() {
        this.flash = this.refs.flash;
        snabbt(this.flash, { fromOpacity: 1, opacity: 0, duration: 250 });
    }


    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate() {
        snabbt(this.flash, { fromOpacity: 0, opacity: 1, duration: 250 }).snabbt({
            fromOpacity: 1,
            opacity: 0,
            duration: 250
        })
    }

    render() {
        return <div ref="flash" className="flash">
            Rendered
        </div>
    }
}


export default Flash;