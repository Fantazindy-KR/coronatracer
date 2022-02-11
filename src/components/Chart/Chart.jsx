import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

//if occur error like 'Uncaught Error: "category" is not a registered scale.' add code above.
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

import styles from "./Chart.module.css";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);
//--------------------------------------------------------------------------------------------

const Charts = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    console.log(dailyData);

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "red",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Charts;
