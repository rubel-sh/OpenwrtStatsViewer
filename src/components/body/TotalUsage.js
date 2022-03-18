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
            return (

                <div key={user.user} className="totalusage_container">
                    <h3>{user.user}</h3>
                    <div className='totalusage_stats'>
                        <p>Download : {calculateData(user.download)}</p>
                        <p>Upload : {calculateData(user.upload)}</p>
                        <p>Total Download : {calculateData(user.totaldownload)}</p>
                        <p>Total Upload : {calculateData(user.totalupload)}</p>
                    </div>

                </div>

            )
        });
        return (

            <div >
                <h1>Total Data Usage of Clients</h1>
                <hr />
                <div className='totalUsage_parent'>
                    {openwrtUser}
                </div>

            </div >
        );
    }

}

export default TotalUsage;