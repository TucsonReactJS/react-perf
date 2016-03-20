import React,{Component} from "react"
import Flash from '../flash';
import assign from 'lodash.assign';

const styles = {
    detail: {
        width: '80vw',
        height: '100vh',
        backgroundColor: "blue",
        position: 'relative'
    },
    innerDetail: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
export class Detail extends Component {

    shouldComponentUpdate( nextProps, nextState ) {
        return nextProps.currentColor !== this.props.currentColor
    }

    render() {

        const {currentColor} = this.props;

        return <div style={styles.detail}>
            <div style={assign({},styles.innerDetail,{backgroundColor:currentColor})}>
                <span>{currentColor}</span>
            </div>
            <Flash/>
        </div>;
    }
}

export default Detail;