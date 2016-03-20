import React, {Component} from 'react';
import debug from 'debug';
import Flash from '../flash';
import Detail from './detail';

const d = debug('should_component_update:master');
const randomInt = ( max ) => Math.round(Math.random() * max);

export class Master extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            colors: [],
            currentColorValue: "",
            currentColor: `rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`
        };

        // bind handlers
        this.setCurrentColor = this.setCurrentColor.bind(this);
        this.onAddColor = this.onAddColor.bind(this);
        this.onAddingColorChange = this.onAddingColorChange.bind(this);
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
            },
            list: {
                listStyle: 'none',
                padding: 0,
                margin: "0 auto"
            },
            listItem: {
                width: "100%",
                padding: '6px',
                borderBottom: "1px solid #ddd",
                cursor: 'pointer'
            },
            form: {
                paddingTop: '12px'
            }
        }
    }

    setCurrentColor( c ) {
        this.setState({ currentColor: c });
    }

    onAddColor( e ) {
        e.preventDefault();
        if ( this.state.currentColorValue ) {
            this.setState({ colors: [...this.state.colors, this.state.currentColorValue], currentColorValue: "" });
        }
    }

    onAddingColorChange( e ) {
        this.setState({ currentColorValue: e.target.value });
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
        const {currentColor,colors,currentColorValue} = this.state;
        const {container,detail,list,listContainer, innerDetail, listItem,form} = this.getStyle();
        const {onAddColor,onAddingColorChange,setCurrentColor, onAddManyColors} = this;

        return (<div style={container}>
            <div style={listContainer}>
                <h2>Colors</h2>
                <ul style={list}>
                    {colors.map(( c, idx ) => <li key={idx} onClick={setCurrentColor.bind(this,c)}
                                                  style={listItem}>{c}</li>)}
                </ul>
                <form onSubmit={onAddColor} style={form}>
                    <input name="color" value={currentColorValue} onChange={onAddingColorChange} type="text"/>
                    <button role="submit">Add</button>
                    <button onClick={onAddManyColors}>Add 100</button>
                </form>
            </div>
            <Detail currentColor={currentColor}/>
            <Flash/>
        </div>);
    }
}

export default Master;