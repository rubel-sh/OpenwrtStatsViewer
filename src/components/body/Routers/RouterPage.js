import React, { Component } from 'react'
import graphData from './graphdata.json'
import { Container } from '@mui/material'
import Clients from './Clients'
import ModalGraph from './Modal/ModalGraph'

class Routers extends Component {
    constructor() {
        super();
        this.state = {
            graphData: graphData,
            selectedRouter: {},
            selectedClient: {},
            modalOpen: false
        }
    }

    selectRouterHandler(router) {
        this.setState({
            ...this.state,
            selectedRouter: router,
        })
    }
    // Passed to Client.js 
    selectedClientHandler(client) {
        this.setState({
            ...this.state,
            selectedClient: client,
            modalOpen: true
        })
    }

    toggleModalHandler = () => [
        this.setState({ modalOpen: !this.state.modalOpen })
    ]

    render() {
        // Returns Routers list
        const totalRouters = this.state.graphData.map((router, index) => {
            const totalDownload = [];
            router.users.map(user => {
                totalDownload.push(user.totaldownloads);
            })

            return (
                <div
                    className='router_child'
                    key={index}
                    onClick={() => {
                        this.selectRouterHandler(router)
                    }}
                >
                    {router.router}
                </div >
            )
        });
        return (
            <Container>
                {/* Render Routers */}
                < div >
                    <div className='router_parent' >
                        {totalRouters}
                    </div>
                </div >
                {/* Render Clients */}
                < div >
                    {Object.keys(this.state.selectedRouter).length !== 0 ? <Clients selectedRouter={this.state.selectedRouter} fetchSelectedClient={this.selectedClientHandler.bind(this)} /> : <p>Please Select Router</p>}
                </div >
                {/* Render Graph ? */}
                < ModalGraph
                    selectedClient={this.state.selectedClient}
                    toggleModalHandler={this.toggleModalHandler.bind(this)}
                    modalOpen={this.state.modalOpen}
                />
            </Container >


        )
    }

}

export default Routers