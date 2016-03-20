import React,{Component,PropTypes} from 'react'
import Flash from '../flash';
import shallowCompare from 'react-addons-shallow-compare';

const styles = {
    form: {
        paddingTop: '12px',
        position: 'relative'
    }
}

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
            <button role="submit">Add</button>
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