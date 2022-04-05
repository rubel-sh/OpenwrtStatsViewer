import React, { Component } from 'react';
class Home extends Component {
    state = {
        sliderValue: 7
    }
    onChangeHandler = e => {
        return this.setState({
            sliderValue: Math.round((e.target.value / 3.333333333))
        })
    }
    render() {
        return (
            <div >
                <h2 style={{ marginTop: '10px', fontWeight: '300' }}>Home</h2>
                <hr />
            </div >
        )
    }
}

export default Home;