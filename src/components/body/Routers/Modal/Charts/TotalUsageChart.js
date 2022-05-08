import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import moment from "moment";

const Chart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  const options = {
    padding: false,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    animation: {
      duration: 250 * 1.5,
      easing: "linear",
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };
  options.plugins.title.text =
    "Total Usage Timelaps: " + props.selectedClient.user;
  const formatMB = (perm) => perm / 1048576;
  // Using momentJS
  const labels = props.selectedClient.date.map((data) =>
    moment(new Date(data * 1000).toLocaleString()).format("D/MM [-] LT")
  );
  const tDownData = props.selectedClient.totaldownloads.map((data) =>
    parseInt(formatMB(data))
  );
  const tUpData = props.selectedClient.totaluploads.map((data) =>
    parseInt(formatMB(data))
  );
  // Calculating Total Usage for Doughnut
  let tDownloadClient = null;
  let tUploadClient = null;
  props.selectedClient.totaldownloads.map((down) => {
    tDownloadClient = tDownloadClient + parseFloat(down);
  });
  props.selectedClient.totaluploads.map((up) => {
    tUploadClient = tUploadClient + parseInt(up);
  });
  tDownloadClient = parseInt(formatMB(tDownloadClient));
  tUploadClient = parseInt(formatMB(tUploadClient));
  // Calculating Total Usage for Doughnut ends
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Download",
        data: tDownData,
        lineTension: 0.2,
        borderColor: "#3cba9f",
        pointRadius: 0,
        pointHoverRadius: 5,
        backgroundColor: "#3cba9f",
        fill: false,
        borderWidth: 1.5,
      },
      {
        label: "Upload",
        data: tUpData,
        lineTension: 0.2,
        borderColor: "#8e5ea2",
        pointRadius: 0,
        pointHoverRadius: 5,
        backgroundColor: "#8e5ea2",
        fill: false,
        borderWidth: 1.5,
      },
    ],
  };
  const dataForPie = {
    datasets: [
      {
        label: "Donloads in MB",
        data: [tDownloadClient, tUploadClient],
        backgroundColor: ["#3cba9f", "#ad60ce"],
        borderColor: ["#3cba9f", "#ad60ce"],
        borderWidth: 1,
      },
    ],
  };
  const userGraph = (
    <div className="router1">
      <Line
        width={document.documentElement.clientWidth}
        height={400}
        options={options}
        data={data}
      />
      {/* <Bar
                width={document.documentElement.clientWidth}
                height={400}
                options={options}
                data={data}
            /> */}
    </div>
  );
  const styles = {
    totalUsageHeader: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "70px",
    },
    p: {
      marginTop: "10px",
      textAlign: "center",
      fontWeight: "300",
      fontSize: "1.5rem",
    },
    pie: {
      display: "inline-block",
      maxWidth: "100px",
      maxHeight: "100px",
    },
    chartAndText: {
      display: "flex",
      flexBasis: "25%",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: "10px",
    },
    downUpText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-around",
      alignItems: "center",
      fontSize: "0.7rem",
      lineHeight: "1.35rem",
      paddingTop: "10px",
    },
  };
  return (
    <div>
      <div style={styles.totalUsageHeader}>
        <p style={styles.p}>{props.selectedClient.user} in Total Usage</p>
        <div style={styles.chartAndText}>
          <Pie
            style={styles.pie}
            data={dataForPie}
            options={{
              segmentShowStroke: false,
              animateScale: true,
            }}
          />
          <div style={styles.downUpText}>
            <strong>Downloads: {tDownloadClient} MB</strong>
            <strong>Uploads : {tUploadClient} MB</strong>
          </div>
        </div>
      </div>

      <hr />
      <div className="canvus-container">{userGraph}</div>
    </div>
  );
};

export default Chart;
