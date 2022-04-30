import React, { Component } from 'react';
import { Button, Slider, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import { Send, ArrowCircleUp, Downloading } from '@mui/icons-material';
import { connect } from 'react-redux';
import { fetchSlider } from '../../redux/actionCreators'
import { styled } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const mapStateToProps = props => {
    return {
        sliderState: props.sliderSelectorState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchSlider: (stateValue) => dispatch(fetchSlider(stateValue))
    }
}
class SliderDateSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 1
        }
        this.onSliderChangeHandler = this.onSliderChangeHandler.bind(this);
        this.increaseDaysHandler = this.increaseDaysHandler.bind(this);
        this.decreaseDaysHandler = this.decreaseDaysHandler.bind(this);
        // this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onSliderChangeHandler = e => {
        return this.setState({
            sliderValue: Math.round(e.target.value)
        })
    }
    increaseDaysHandler = () => {
        return this.setState({
            sliderValue: this.state.sliderValue + 1
        })
    }
    decreaseDaysHandler = () => {
        return this.setState({
            sliderValue: this.state.sliderValue - 1
        })
    }
    onSubmitHandler = (e) => {
        this.props.fetchSlider(this.state.sliderValue);
        this.setState({
            ...this.state
        })
        e.preventDefault();
    }

    componentDidMount() {

    }
    render() {
        const myStyles = {
            display: 'flex',
            justifyContent: 'center',
            downAndUp: {
                cursor: 'pointer'
            }
        }
        const ColorButton = styled(LoadingButton)(({ theme }) => ({
            color: theme.palette.getContrastText(cyan[500]),
            backgroundColor: '#00a152',
            '&:hover': {
                backgroundColor: '#6fbf73',
            },
        }));
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

                    <ColorButton
                        endIcon={<Send />}
                        loading={this.props.sliderState.state[0] === "default slider state" ? false : this.props.sliderState.isLoading}
                        loadingPosition="end"
                        variant="contained"
                        onClick={this.onSubmitHandler}
                        style={{
                            fontWeight: '600',
                            color: 'white'
                        }}
                    >
                        {this.state.sliderValue} Days
                        <Link
                            exact="true"
                            to="/OpenwrtStatsViewer/router"
                            className="nav-link"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%'
                            }}
                        >

                        </Link>
                    </ColorButton>

                </Stack>
            </div >
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(SliderDateSelector);