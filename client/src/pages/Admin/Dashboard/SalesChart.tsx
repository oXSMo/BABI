import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { usePassengerSlice } from "../../../store/dashboardSlice";
import moment from "moment";

interface ChartData {
  categories: string[];
  values: number[];
}

const ColumnChartDarkMode: React.FC = () => {
  const { sales } = usePassengerSlice();
  console.log(sales);

  const [darkMode] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({
    categories: [],
    values: [],
  });

  // Simulated data loading
  useEffect(() => {
    setChartData({
      categories: sales.map((s) => moment(s._id).format("MMM")),
      values: sales.map((s) => s.totalPrice * -1),
    });
  }, [sales]);

  // Chart configuration
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: darkMode ? "dark" : "light",
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        columnWidth: "80%",
        horizontal: false,
        // Reduce gap between columns:
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: darkMode ? "#E0E0E0" : "#333",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? "#E0E0E0" : "#333",
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: darkMode ? "dark" : "light",
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: [darkMode ? "#3B82F6" : "#3182F6AA"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
      },
    },
    grid: {
      borderColor: darkMode ? "#444" : "#EEE",
    },
    tooltip: {
      theme: darkMode ? "dark" : "light",
    },
  };

  const series = [
    {
      name: "Sales",
      data: chartData.values,
    },
  ];

  if (sales.length)
    return (
      <Chart options={chartOptions} series={series} type="bar" height={370} />
    );
  else {
    return (
      <div className="w-full h-full grid place-content-center">
        <div className="loader w-12 h-12" />
      </div>
    );
  }
};

export default ColumnChartDarkMode;
