import React, { Component } from 'react';
import { Button, Slider, Stack } from '@mui/material';
import { Send, ArrowCircleUp, Downloading } from '@mui/icons-material';

class TotalUsageSliderSelector extends Component {
    render() {
        const myStyles = {
            display: 'flex',
            justifyContent: 'center'
        }
        return (
            <div style={myStyles}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <Downloading color='warning' fontSize='large' />
                    <Slider
                        onChange={this.props.onChangeHandler}
                        defaultValue={7}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={30}
                        sx={{
                            width: 300,
                            color: 'success.main',
                            '& .MuiSlider-thumb': {
                                borderRadius: '1px'
                            },
                        }}

                    />
                    <ArrowCircleUp fontSize='large' color='success' />
                    <Button
                        onClick={this.props.submitButtonHandler}
                        variant="contained"
                        endIcon={<Send />}>
                        {this.props.defaultValue} Days
                    </Button>
                </Stack>
            </div>
        );
    }
}

export default TotalUsageSliderSelector;