import React,{Component,PropTypes} from 'react'
import Flash from '../flash';

const styles = {
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
    }
}


export class List extends React.Component {
    constructor() {
        super();
    }

    setCurrentColor( c ) {
        this.props.setCurrentColor(c);
    }

    render() {
        const {setCurrentColor} = this;
        const {colors} = this.props;
        const {list,listItem} = styles;

        return (<div>
            <h2>Colors</h2>
            <ul style={list}>
                {colors.map(( c, idx ) => <li key={idx} onClick={setCurrentColor.bind(this,c)}
                                              style={listItem}>{c}</li>)}
            </ul>
        </div>);
    }
}

List.propTypes = {
    setCurrentColor: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired
};

export default List;