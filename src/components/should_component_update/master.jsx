import React, {Component} from 'react';
import debug from 'debug';
import Flash from '../flash';
import Detail from './detail';
import Form from './form';
import List from './list';

const d = debug('should_component_update:master');
const randomInt = ( max ) => Math.round(Math.random() * max);

export class Master extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            colors: [],
            currentColor: `rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`
        };

        // bind handlers
        this.setCurrentColor = this.setCurrentColor.bind(this);
        this.onAddColor = this.onAddColor.bind(this);
        this.onAddManyColors = this.onAddManyColors.bind(this);
    }

    getStyle() {
        return {
            container: {
                width: '100vw',
                height: '100vh',
                display: 'flex'
            },
            listContainer: {
                width: '20vw',
                height: '98vh',
                padding: '12px',
                paddingTop: '0px',
                marginTop: '12px',
                overflowY: 'auto'
            }
        }
    }

    setCurrentColor( c ) {
        this.setState({ currentColor: c });
    }

    onAddColor( value ) {
        if ( value ) {
            this.setState({ colors: [...this.state.colors, value] });
        }
    }

    onAddManyColors() {

        let colors = [];
        for ( let i = 0; i < 100; i++ ) {
            colors.push(`rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`);
        }

        function* nextColor() {

            while ( colors.length )
                yield colors.pop();
        }

        const setNewState = ()=> {
            const gen = nextColor();
            const color = gen.next().value;

            if ( color ) {
                let colors = this.state.colors;
                colors.push(color);

                setTimeout(()=> {
                    this.setState({ colors }, setNewState);
                }, 150)
            }

        };

        // start the process
        setNewState();


    }

    render() {

        // get state
        const {currentColor,colors} = this.state;
        const {container,listContainer} = this.getStyle();
        const {onAddColor,setCurrentColor, onAddManyColors} = this;

        return (<div style={container}>
            <div style={listContainer}>
                <List setCurrentColor={setCurrentColor} colors={colors}/>
                <Form onAddColor={onAddColor} onAddManyColors={onAddManyColors}/>
            </div>
            <Detail currentColor={currentColor}/>
            <Flash/>
        </div>);
    }
}

export default Master;