import React from "react";
import { Bar } from "react-chartjs-2";
import Array1DRenderer from "../Array1DRenderer";
import styles from "./ChartRenderer.module.scss";

class ChartRenderer extends Array1DRenderer {
  renderData() {
    const {
      data: [row],
    } = this.props.data;

    const chartData = {
      labels: row.map((col) => `${col.value}`),
      datasets: [
        {
          backgroundColor: row.map((col) =>
            col.selectTrue
              ? styles.colorTrue
              : col.patched
              ? styles.colorPatched
              : col.selected
              ? styles.colorSelected
              : styles.colorFont
          ),
          data: row.map((col) => col.value),
        },
      ],
    };
    return (
      <Bar
        type="bar"
        data={chartData}
        options={{
          scales: { y: {beginAtZero:true} },
          animation: {
            duration: 150,
          },
          legend: false,
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    );
  }
}

export default ChartRenderer;
