import React from 'react';
import moment from 'moment';
function ClientLists() {
    const time =  moment(new Date(1651955528 * 1000).toLocaleString()).calendar();
    return (
        <div>
            <h2 style={{ marginTop: '10px', fontWeight: '300' }}>List of Clients</h2>
            <hr />
            <h3>{time}</h3>
        </div>
    );
}

export default ClientLists;