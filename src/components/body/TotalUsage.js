import React, { Component } from 'react';
import { formatBytes } from '../../customMethods/customMethods'
import Loading from './Loading'
import { fetchUsage } from '../../redux/actionCreators';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

const mapStateToProps = props => {
    console.log("TotalUsage mapStateToProps", props);
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
    componentDidMount() {
        this.props.fetchUsage();
    }
    render() {
        if (this.props.usageState.isLoading) {
            return (
                < div >
                    <div className='totalUsage_parent'>
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
            const timeFromEPOCH = new Date(parseInt(this.props.usageState.state.date));
            return (
                < div >
                    <h4 style={{ marginTop: '10px', fontWeight: '300' }}>Last Update: {timeFromEPOCH.toLocaleString()} </h4>
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