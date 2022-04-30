import { Component } from 'react';
import axios from 'axios';
import { formatBytes } from '../../customMethods/customMethods'
import { WHOLE_USAGE_API } from '../../jsonAPI/jsonAPI'
class WholeUsage extends Component {
    state = {
        data: [{ totaldownloads: 0, totaluploads: 0 }]
    }
    componentDidMount() {
        axios.get(WHOLE_USAGE_API)
            .then(response => {
                const result = response.data;
                this.setState({ ...this.state, data: result })
            })
            .catch(error => console.log(error))
    }
    render() {

        const TotalDown = formatBytes(this.state.data[0].totaldownloads);
        const TotalUp = formatBytes(this.state.data[0].totaluploads);
        const style = {
            display: "flex",
            flexDirection: "column",

            span: { paddingRight: '10px' }
        };

        return (
            <div style={style}>
                <span>D: {TotalDown}</span>
                <span>U: {TotalUp}</span>
            </div >
        );
    }

}

export default WholeUsage;