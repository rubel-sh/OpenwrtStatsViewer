import React, { Component } from 'react';
import stateJSON from './state.json'
class TotalUsage extends Component {

    render() {

        this.state = {
            data: stateJSON
        }
        const openwrtUser = this.state.data.data.map(user => {
            console.log(user)
            return (

                <div key={user.user}>
                    <h3>{user.user}</h3>
                    <p>Download : {(Number(user.download) / 1024).toFixed(2)}MB</p>
                    <p>Upload : {(Number(user.upload) / 1024).toFixed(2)}MB</p>
                    <p>Total Download : {(Number(user.totaldownload) / 1024).toFixed(2)}MB</p>
                    <p>Total Upload : {(Number(user.totalupload) / 1024).toFixed(2)}MB</p>
                </div>

            )
        });
        return (

            <div>
                <h1>TotalUsage</h1>
                <hr />
                {openwrtUser}
            </div >
        );
    }

}

export default TotalUsage;