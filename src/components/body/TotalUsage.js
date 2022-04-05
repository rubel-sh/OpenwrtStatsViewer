import React, { Component } from 'react';
import { formatBytes } from '../../customMethods/customMethods'
import Loading from './Loading'
import { fetchUsage } from '../../redux/actionCreators';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import TotalUsageSliderSelector from './TotalUsageSliderSelector';
import axios from 'axios';

const mapStateToProps = props => {
    return {
        usageState: props.totalUsageState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUsage: () => dispatch(fetchUsage())
    }
}
class TotalUsage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 7
        }
    }
    onSliderChangeHandler = e => {
        return this.setState({
            sliderValue: Math.round(e.target.value)
        })
    }
    // POST request from the values of slider
    sendTableJSON = () => {
        const currentEPOCH = Math.floor(Date.now() / 1000);
        const fromEPOCH = currentEPOCH - (86400 * this.state.sliderValue);
        console.log(this.state.sliderValue + ' day before current EPOCH: ', fromEPOCH);
        axios.post('https://py.rexopenwrt.repl.co/selecteddata', { "fromdate": fromEPOCH })
            .then(response => console.log(response.data));
    }
    componentDidMount() {
        this.props.fetchUsage();
    }
    render() {
        if (this.props.usageState.isLoading) {
            return (
                < div >
                    <div className='totalUsage_parent_loading'>
                        <Loading />
                    </div>
                </div >
            )
        }
        else {
            let totalDownload = null;
            let totalUpload = null;
            let total = null;

            const tableUsers = this.props.usageState.state.data.map((user, index) => {
                let userdownload = parseFloat(user.totaldownload);
                let userupload = parseFloat(user.totalupload);
                let usertotal = parseFloat(user.total);

                totalDownload = totalDownload + userdownload;
                totalUpload = totalUpload + userupload;
                total = total + usertotal;
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{user.user}</td>
                        <td>{formatBytes(user.totaldownload)}</td>
                        <td>{formatBytes(user.totalupload)}</td>
                        <td>{formatBytes(user.total)}</td>
                    </tr>
                )
            })
            const timeFromEPOCH = new Date(parseInt(this.props.usageState.state.date * 1000));
            return (
                < div >
                    <h4 style={{ marginTop: '10px', fontWeight: '300' }}>Last Update: {timeFromEPOCH.toLocaleString()} </h4>
                    <TotalUsageSliderSelector
                        defaultValue={this.state.sliderValue}
                        onChangeHandler={this.onSliderChangeHandler.bind(this)}
                        submitButtonHandler={this.sendTableJSON.bind(this)}
                    />
                    <div className='totalUsage_parent'>
                        <Table striped bordered hover size="md">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Device Name</th>
                                    <th>T. Download</th>
                                    <th>T. Upload</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableUsers}
                                <tr>
                                    <td colSpan={2}><strong>Total</strong></td>
                                    <td><strong>{formatBytes(totalDownload)}</strong></td>
                                    <td><strong> {formatBytes(totalUpload)}</strong></td>
                                    <td><strong>{formatBytes(total)}</strong></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div >
            )
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalUsage);