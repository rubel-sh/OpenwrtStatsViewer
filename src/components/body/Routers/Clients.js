import React from 'react'
import { formatBytes } from '../../../customMethods/customMethods'
import { ArrowCircleUp, Downloading } from '@mui/icons-material';
import { connect } from 'react-redux';

const mapStateToProps = (props) => {
    return {
        selectedDate: props.sliderSelectorState.dateSelected
    }
}
const Clients = (props) => {
    // Get Users list
    const user = props.selectedRouter.users.map((userr, index) => {
        let totalDownload = null;
        let totalUpload = null;
        userr.totaldownloads.map(adding => totalDownload = totalDownload + parseFloat(adding))
        userr.totaluploads.map(adding => totalUpload = totalUpload + parseFloat(adding))
        // Render Client Lists and added event listener
        const style = {
            animationDelay: 50 * index + "ms",
        }
        return (
            <li
                key={index}
                className={`rc_container rc_${index}`}
                style={style}
                onClick={() => props.fetchSelectedClient(userr)}
            >
                <div className='rc_username '>{userr.user}</div>
                <div className='rc_usermac '>{userr.macAdderess}</div>
                <div className='rc_data_container '>
                    <div className='rc_down'>
                        <Downloading color='warning' style={{ marginRight: '10px' }} />
                        {formatBytes(totalDownload)}
                    </div>
                    <div className='rc_up'>
                        <ArrowCircleUp color='success' style={{ marginRight: '10px' }} />
                        {formatBytes(totalUpload)}
                    </div>
                </div>
            </li >
        )
    })
    return (
        <div>
            <h5 className='rc'
            >{props.selectedRouter.router}: {props.selectedDate} days data. Please re-select router to update clients usage.
            </h5>
            <ul
                style={{ perspective: "1000px" }}
                className="rc_parent">
                {user}
            </ul>
        </div >

    )
}

export default connect(mapStateToProps)(Clients)