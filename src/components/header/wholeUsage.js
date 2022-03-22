import react, { Component } from 'react';
import axios from 'axios';
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
        const formatBytes = (bytes, decimals = 2) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
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