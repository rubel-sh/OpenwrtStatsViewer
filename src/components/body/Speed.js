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
import { Line, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux'
import { fetchSpeed } from '../../redux/actionCreators';
import Loading from './Loading';

const mapStateToProps = props => {
    return {
        speedUsage: props.speedUsageState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchSpeed: () => dispatch(fetchSpeed())
    }
}
class Speed extends Component {

    componentDidMount() {
        this.props.fetchSpeed();
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


        if (this.props.speedUsage.isLoading) {
            return <Loading />
        }
        else {

            const selectArrayFromProps = this.props.speedUsage.state;
            const getLast10Array = selectArrayFromProps.slice(Math.max(this.props.speedUsage.state.length - 40, 1));
            const calculateData = data => parseInt(Number(data) / 1048576);
            // console.log(calculateData());
            // label = Timelinesdfsdfsdfsdfsdfsfsf
            const labels = getLast10Array.map((timeState, index) => index);
            // Data Array for downloadfgf
            const downloadArray = getLast10Array.map(downState => calculateData(downState.totaldownload))
            // Data array for upload
            const uploadArray = getLast10Array.map(upState => calculateData(upState.totalupload))


            const options = {
                padding: true,
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                    },
                },
            }
            options.plugins.title.text = "Total Download Timelaps: " + selectArrayFromProps[0].user;

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Download',
                        data: downloadArray.map(me => me),
                        lineTension: 0.2,
                        backgroundColor: '#151D3B',
                        borderColor: '#00C897',
                        borderWidth: 2,

                    },
                    {
                        label: 'Upload',
                        data: uploadArray,
                        lineTension: 0.2,
                        backgroundColor: '#151D3B',
                        borderColor: '#FFC300',
                        borderWidth: 2,

                    },
                ],
            };
            const userGraph =
                <div className="router1">
                    <Line
                        width={document.documentElement.clientWidth}
                        height={document.documentElement.clientHeight / 3}
                        options={options}
                        data={data}
                    />
                </div>
            return (
                <div>
                    <h2 style={{ marginTop: '10px', fontWeight: '300' }}>Speed</h2>
                    <hr />
                    <div className="canvus-container">
                        {userGraph}
                    </div>
                </div>
            );
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Speed);