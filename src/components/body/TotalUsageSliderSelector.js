import React from 'react';
import { Button, Slider, Stack } from '@mui/material';
import { Send, ArrowCircleUp, Downloading } from '@mui/icons-material';

const TotalUsageSliderSelector = (props) => {

    const myStyles = {
        display: 'flex',
        justifyContent: 'center',
        downAndUp: {
            cursor: 'pointer'
        }
    }
    return (
        <div style={myStyles}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Downloading
                    style={myStyles.downAndUp}
                    color='warning'
                    fontSize='large'
                    onClick={props.decreaseDaysHandler}
                />
                <Slider
                    onChange={props.onChangeHandler}
                    defaultValue={7}
                    value={props.stateValue}
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
                <ArrowCircleUp
                    fontSize='large'
                    color='success'
                    style={myStyles.downAndUp}
                    onClick={props.increaseDaysHandler}
                />
                <Button
                    onClick={props.submitButtonHandler}
                    variant="contained"
                    endIcon={<Send />}>
                    {props.stateValue} Days
                </Button>
            </Stack>
        </div>
    );
}


export default TotalUsageSliderSelector;