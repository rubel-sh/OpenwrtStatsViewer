import React, { Component } from 'react';
import stateJSON from './state.json'
class TotalUsage extends Component {

    render() {

        this.state = {
            data: stateJSON
        }
        const openwrtUser = this.state.data.data.map(user => {
            console.log(user);
            const idle = man => true;
            return (

                <div key={user.user} className="totalusage_container">
                    <h3>{user.user}</h3>
                    <div className='totalusage_stats'>
                        <p>Download : {(Number(user.download) / 1024).toFixed(2)}MB</p>
                        <p>Upload : {(Number(user.upload) / 1024).toFixed(2)}MB</p>
                        <p>Total Download : {(Number(user.totaldownload) / 1024).toFixed(2)}MB</p>
                        <p>Total Upload : {(Number(user.totalupload) / 1024).toFixed(2)}MB</p>
                    </div>

                </div>

            )
        });
        return (

            <div >
                <h1>TotalUsage</h1>
                <hr />
                <div className='totalUsage_parent'>
                    {openwrtUser}
                </div>

            </div >
        );
    }

}

export default TotalUsage;