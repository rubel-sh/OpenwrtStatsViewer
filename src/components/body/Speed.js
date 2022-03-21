import React, { Component } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    console.log("Home mapStateToProps", state);
    return {
        router1: state.speedStats.router1
    }
}

class Speed extends Component {

    componentDidMount() {
        console.log("Home state", this.state);
        console.log("Home props", this.props);
    }
    render() {


        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );
        const options = {
            padding: true,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Router Model: Mi4C',
                },
            },
        };
        const options1 = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Router Model: Mi4A',
                },
            },
        };
        const calculateData = data => parseFloat(Number(data) / 1024);
        // console.log(calculateData());
        // label = Timelinesdfsdfsdfsdfsdfsfsf
        const labels = this.props.router1.map(timeState => timeState.time);
        // Data Array for downloadfgf
        const downloadArray = this.props.router1.map(downState => calculateData(downState.download))
        // Data array for upload
        const uploadArray = this.props.router1.map(upState => calculateData(upState.upload))
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Download',
                    data: downloadArray.map(me => me),
                    fill: false,
                    lineTension: 0.4,
                    backgroundColor: '#151D3B',
                    borderColor: '#00C897',
                    borderWidth: 2,
                    pointRadius: 6,
                    pointBorderWidth: 4,
                    pointHoverRadius: 8,

                },
                {
                    label: 'Upload',
                    data: uploadArray,
                    lineTension: 0.4,
                    backgroundColor: '#151D3B',
                    borderColor: '#FFC300',
                    borderWidth: 2,

                },
            ],
        };
        return (
            <div>
                <h2 style={{ marginTop: '10px', fontWeight: '300' }}>Speed</h2>
                <hr />
                <div className="canvus-container">
                    <div className="router1">
                        <Line
                            width={document.documentElement.clientWidth}
                            height={document.documentElement.clientHeight / 3}
                            options={options}
                            data={data}

                        />
                    </div>
                    <div className="router2">
                        <Line
                            width={document.documentElement.clientWidth}
                            height={document.documentElement.clientHeight / 3}
                            options={options1}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(Speed);