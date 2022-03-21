import React, { Component } from 'react';
import axios from "axios"
import stateJSON from './state_updated.json'
class TotalUsage extends Component {
    state = {
        data: stateJSON[0]
    }
    componentDidMount() {
        axios.get('https://py.rexopenwrt.repl.co/rawdata')
            .then(response => {
                const result = response.data[response.data.length - 1];
                this.setState({ data: result })
            })
            .catch(error => console.log(error))
    }

    render() {
        const openwrtUser = this.state.data.data.map(user => {
            const calculateData = data => (Number(data) / 1024) < 1024 ? (Number(data) / 1024).toFixed(2) + " MB" : ((Number(data) / 1024) / 1024).toFixed(2) + " GB";
            const styles = { indicator_icon: { width: '40px' } }
            return (

                <div key={user.user} className="totalusage_container">
                    <h4 >{user.user}</h4>
                    <div className='totalusage_stats'>
                        <p>
                            <img style={styles.indicator_icon} src="https://github.com/Rubrex/OpenwrtStatesViewer/blob/main/public/assets/icons/cloud-download.png?raw=true" alt="download_icon" />
                            <strong>
                                {calculateData(user.totaldownload)}
                            </strong>
                        </p>
                        <p>
                            <img style={styles.indicator_icon} src="https://github.com/Rubrex/OpenwrtStatesViewer/blob/main/public/assets/icons/cloud-upload.png?raw=true" alt="download_icon" />
                            <strong>
                                {calculateData(user.totalupload)}
                            </strong>
                        </p>
                    </div>

                </div>

            )
        });
        return (

            <div >
                <h2 style={{ marginTop: '10px', fontWeight: '300' }}> Data Usage of Clients</h2>
                <hr />
                <div className='totalUsage_parent'>
                    {openwrtUser}
                </div>

            </div >
        );
    }

}

export default TotalUsage;