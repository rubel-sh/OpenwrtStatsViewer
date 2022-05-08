import React from "react";
import { Line } from "react-chartjs-2";
import { dataset_settings, options, height } from "./chart_settings";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LoadChart(props) {
  const data = {
    labels: props.dates,
    datasets: [
      {
        ...dataset_settings,
        label: "Free",
        data: props.memortUsage.freeMemory,
        backgroundColor: "#4E944F",
        borderColor: "#4E944F",
      },
      {
        ...dataset_settings,
        label: "Used",
        data: props.memortUsage.usedMemory,
        backgroundColor: "#4D4C7D",
        borderColor: "#4D4C7D",
      },

      {
        ...dataset_settings,
        label: "Cached",
        data: props.memortUsage.cachedMemory,
        backgroundColor: "#E9D5DA",
        borderColor: "#E9D5DA",
      },
    ],
  };

  options.plugins.title.text = "Memort Usage";
  return (
    <div>
      <Line
        width={document.documentElement.clientWidth}
        height={height}
        data={data}
        options={options}
      />
    </div>
  );
}
