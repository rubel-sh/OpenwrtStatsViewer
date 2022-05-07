import React from "react";
import { Line } from "react-chartjs-2";
import { dataset_settings, options } from "./chart_settings";
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
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      ...dataset_settings,
      label: "Used",
      data: [11, 53, 3, 41, 45, 65],
      backgroundColor: "#187498",
      borderColor: "#187498",
    },
    {
      ...dataset_settings,
      label: "Free",
      data: [33, 53, 85, 41, 44, 65],
      backgroundColor: "#36AE7C",
      borderColor: "#36AE7C",
    },
    {
      ...dataset_settings,
      label: "Cached",
      data: [31, 33, 55, 41, 44, 87],
      backgroundColor: "#82954B",
      borderColor: "#82954B",
    },
  ],
};

export default function LoadChart() {
  return (
    <div>
      <Line
        width={document.documentElement.clientWidth}
        height={400}
        data={data}
        options={options}
      />
    </div>
  );
}
