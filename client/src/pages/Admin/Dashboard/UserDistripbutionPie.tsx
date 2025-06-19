import React from "react";
import Chart from "react-apexcharts";

const PieChartWithBottomLegend: React.FC = () => {
  // Chart configuration
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
      background: "transparent",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
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

  const series = [44, 55, 13, 43, 22];

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
