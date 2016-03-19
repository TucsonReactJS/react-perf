import React, {Component} from 'react'
import Detail from './detail';
import debug from 'debug';

const d = debug('should_component_update:master');
const randoColor = () => Math.round(Math.random() * 255);


export class Master extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            backgroundColor: "red"
        };

        // bind handlers
        this.updateState = this.updateState.bind(this);
    }

    getStyle() {
        return {
            container: {
                backgroundColor: this.state.backgroundColor,
                width: '100vw',
                height: '100vh'
            },
            detail: {
                width: '80vw',
                height: '100vh'
            }
        }
    }

    updateState() {
        const backgroundColor = `rgb(${randoColor()},${randoColor()},${randoColor()})`;
        this.setState({ backgroundColor });
    }

    render() {
        // log
        d('Rendering');

        // get state
        const {container,detail} = this.getStyle();
        const {updateState} = this;
        const {backgroundColor} = this.state;

        return (<div style={container}>
            <button onClick={updateState}>Update Local State</button>
            <div style={detail}></div>
        </div>);
    }
}

export default Master;