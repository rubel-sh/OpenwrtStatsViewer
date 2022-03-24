import React, { Component } from 'react';
import { formatBytes } from '../../customMethods/customMethods'
import Loading from './Loading'
import { fetchUsage } from '../../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {

    return {
        usageState: state.totalUsageState
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
                    <h2 style={{ marginTop: '10px', fontWeight: '300' }}> Loading   </h2>
                    <hr />
                    <div className='totalUsage_parent'>
                        <Loading />
                    </div>
                </div >
            )
        }
        else {
            const openwrtUser = this.props.usageState.state.data.map(user => {
                const styles = { indicator_icon: { width: '40px' } }
                return (

                    <div className='totalUsage_parent'>
                        <div key={user.user} className="totalusage_container">
                            <h4 >{user.user}</h4>
                            <div className='totalusage_stats'>
                                <p>
                                    <img style={styles.indicator_icon} src="https://github.com/Rubrex/OpenwrtStatesViewer/blob/main/public/assets/icons/cloud-download.png?raw=true" alt="download_icon" />
                                    <strong>
                                        {formatBytes(user.totaldownload)}
                                    </strong>
                                </p>
                                <p>
                                    <img style={styles.indicator_icon} src="https://github.com/Rubrex/OpenwrtStatesViewer/blob/main/public/assets/icons/cloud-upload.png?raw=true" alt="download_icon" />
                                    <strong>
                                        {formatBytes(user.totalupload)}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })
            return (
                < div >
                    <h2 style={{ marginTop: '10px', fontWeight: '300' }}> {this.props.usageState.state.date} </h2>
                    <hr />
                    <div className='totalUsage_parent'>
                        {openwrtUser}
                    </div>
                </div >
            )
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalUsage);