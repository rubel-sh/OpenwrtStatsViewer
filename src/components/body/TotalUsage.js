import React, { Component } from 'react';
import stateJSON from './state.json'
class TotalUsage extends Component {

    render() {

        this.state = {
            data: stateJSON
        }
        const openwrtUser = this.state.data.data.map(user => {
            console.log(user);
            const calculateData = data => (Number(data) / 1024) < 1024 ? (Number(data) / 1024).toFixed(2) + " MB" : ((Number(data) / 1024) / 1024).toFixed(2) + " GB";
            const styles = { indicator_icon: { width: '40px' } }
            return (

                <div key={user.user} className="totalusage_container">
                    <h4 >{user.user}</h4>
                    <div className='totalusage_stats'>
                        {/* <p>Download : {calculateData(user.download)}</p>
                        <p>Upload : {calculateData(user.upload)}</p> */}
                        <p>

                            <img style={styles.indicator_icon} src="./assets/icons/cloud-download.png" alt="download_icon" />
                            <strong>
                                {calculateData(user.totaldownload)}
                            </strong>
                        </p>
                        <p>

                            <img style={styles.indicator_icon} src="./assets/icons/cloud-upload.png" alt="download_icon" />
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
                <h1 style={{ marginTop: '10px' }}> Data Usage of Clients</h1>
                <hr />
                <div className='totalUsage_parent'>
                    {openwrtUser}
                </div>

            </div >
        );
    }

}

export default TotalUsage;