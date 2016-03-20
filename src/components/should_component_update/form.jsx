import React,{Component,PropTypes} from 'react'
import Flash from '../flash';
import shallowCompare from 'react-addons-shallow-compare';

const styles = {
    form: {
        paddingTop: '12px',
        position: 'relative'
    }
}

// http://babeljs.io/docs/plugins/transform-react-constant-elements/
// http://babeljs.io/docs/plugins/transform-react-inline-elements/
const button = {
    $$typeof: Symbol.for('react.element'),
    type: 'button',
    key: null,
    ref: null,
    props: {
        role: "submit",
        children: [
            "Add"
        ]
    },
    _owner: null
};


export class Form extends Component {
    constructor() {
        super();

        this.state = {
            currentColorValue: ''
        };

        this.onAddColor = this.onAddColor.bind(this);
        this.onAddingColorChange = this.onAddingColorChange.bind(this);
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return shallowCompare(this, nextProps, nextState);
    }

    onAddColor( e ) {
        e.preventDefault();

        // notify parent
        this.props.onAddColor(this.state.currentColorValue);
        // clear the form
        this.setState({ currentColorValue: '' });
    }

    onAddingColorChange( e ) {
        this.setState({ currentColorValue: e.target.value });
    }

    render() {
        const {onAddManyColors} = this.props;
        const {currentColorValue} = this.state;
        const {onAddColor,onAddingColorChange} = this;

        return (<form onSubmit={onAddColor} style={styles.form}>
            <input name="color" value={currentColorValue} onChange={onAddingColorChange} type="text"/>
            {button}
            <button onClick={onAddManyColors}>Add 100</button>
            <Flash/>
        </form>);
    }
}

Form.propTypes = {
    onAddManyColors: PropTypes.func.isRequired,
    onAddColor: PropTypes.func.isRequired
};

export default Form;