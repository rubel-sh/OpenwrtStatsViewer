import react, { Component } from 'react';
import axios from 'axios';
import { formatBytes } from '../../customMethods/customMethods'
class WholeUsage extends Component {
    state = {
        data: { Total_Download: 0, Total_Upload: 0 }
    }
    componentDidMount() {
        axios.get('https://py.rexopenwrt.repl.co/counter')
            .then(response => {
                const result = response.data;
                this.setState({ data: result })
            })
            .catch(error => console.log(error))
    }
    render() {

        const TotalDown = formatBytes(this.state.data.Total_Download);
        const TotalUp = formatBytes(this.state.data.Total_Upload);
        const style = { display: "flex", flexDirection: "column", span: { paddingRight: '10px' } };

        return (
            <div style={style}>
                <span>D: {TotalDown}</span>
                <span>U: {TotalUp}</span>
            </div >
        );
    }

}

export default WholeUsage;