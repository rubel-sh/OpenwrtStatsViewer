import React, { Component } from 'react';
import { Button, Slider, Stack } from '@mui/material';
import { Send, ArrowCircleUp, Downloading } from '@mui/icons-material';
import axios from 'axios';

class TotalUsageSliderSelector extends Component {
    constructor() {
        super();
        this.state = {
            sliderValue: 7
        }
        this.onSliderChangeHandler = this.onSliderChangeHandler.bind(this);
        this.increaseDaysHandler = this.increaseDaysHandler.bind(this);
        this.decreaseDaysHandler = this.decreaseDaysHandler.bind(this);
        this.sendTableJSON = this.sendTableJSON.bind(this);
    }
    onSliderChangeHandler = e => {
        return this.setState({
            sliderValue: Math.round(e.target.value)
        })
    }
    increaseDaysHandler = e => {
        return this.setState({
            sliderValue: this.state.sliderValue + 1
        })
    }
    decreaseDaysHandler = e => {
        return this.setState({
            sliderValue: this.state.sliderValue - 1
        })
    }
    // POST request from the values of slider
    sendTableJSON = () => {
        const currentEPOCH = Math.floor(Date.now() / 1000);
        const fromEPOCH = currentEPOCH - (86400 * this.state.sliderValue);
        console.log(this.state.sliderValue + ' day before current EPOCH: ', fromEPOCH);
        axios.post('https://py.rexopenwrt.repl.co/selecteddata', { "fromdate": fromEPOCH })
            .then(response => console.log(response.data));
    }
    render() {
        const myStyles = {
            display: 'flex',
            justifyContent: 'center',
            downAndUp: {
                cursor: 'pointer'
            }
        }
        return (
            <div style={myStyles}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
                >
                    <Stack
                        direction={{ sm: 'row' }}
                        spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
                        alignItems="center"

                    >
                        <Button >
                            <Downloading
                                style={myStyles.downAndUp}
                                color='warning'
                                fontSize='large'
                                onClick={this.decreaseDaysHandler}
                            />
                        </Button>

                        <Slider
                            onChange={this.onSliderChangeHandler}
                            defaultValue={7}
                            value={this.state.sliderValue}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={30}
                            sx={{
                                width: 180,
                                color: 'success.main',
                                '& .MuiSlider-thumb': {
                                    borderRadius: '1px'
                                },
                            }}

                        />
                        <Button >
                            <ArrowCircleUp
                                fontSize='large'
                                color='success'
                                style={myStyles.downAndUp}
                                onClick={this.increaseDaysHandler}
                            />
                        </Button>
                    </Stack>
                    <Button
                        onClick={this.sendTableJSON}
                        variant="contained"
                        endIcon={<Send />}>
                        {this.state.sliderValue} Days
                    </Button>
                </Stack>
            </div>
        );
    }

}


export default TotalUsageSliderSelector;