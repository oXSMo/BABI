import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { usePassengerSlice } from "../../../store/dashboardSlice";
import { type TUsers } from "../../../store/dashboardSlice";

const PieChartWithBottomLegend: React.FC = () => {
  const { users } = usePassengerSlice();

  useEffect(() => {}, [users]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
      background: "transparent",
    },
    labels: ["Normal", "Worker", "Admin"],
    legend: {
      position: "bottom",

      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
      labels: {
        // Your custom color
        useSeriesColors: true, // Important: disable automatic color matching
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    stroke: {
      show: false, // This removes the borders
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#10B981", "#3B82F6", "#EF4444", "#F59E0B", , "#8B5CF6"],
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            fontSize: "12px",
          },
        },
      },
    ],
  };

  const series = [users.normal, users.worker, users.admin];
  console.log();

  if (users.normal)
    return (
      <Chart
        options={chartOptions}
        series={series}
        type="pie"
        width="100%"
        height={320}
      />
    );
};

export default PieChartWithBottomLegend;
