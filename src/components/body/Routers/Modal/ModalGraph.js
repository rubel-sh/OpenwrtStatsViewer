import React from 'react'
import { Modal, ModalBody, Button, ModalFooter } from 'reactstrap'
import TotalUsageChart from './Charts/TotalUsageChart'
import SpeedChart from './Charts/SpeedChart'

const ModalGraph = (props) => {
    const style = {
        opacity: "0.95"
    }
    return (
        <Modal style={style}
            isOpen={props.modalOpen}
            fullscreen='xl'
            size="xl"
            centered
            toggle={props.toggleModalHandler}
        >
            <ModalBody>
                <TotalUsageChart selectedClient={props.selectedClient} />
                <SpeedChart selectedClient={props.selectedClient} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => props.toggleModalHandler()} color="danger">Close</Button>
            </ModalFooter>
        </Modal >
    );

}

export default ModalGraph