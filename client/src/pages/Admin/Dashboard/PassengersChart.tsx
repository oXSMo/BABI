import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import moment from "moment";
import { usePassengerSlice } from "../../../store/dashboardSlice";

function PassengersChart() {
  const { passengers } = usePassengerSlice();
  const [options, setOptions] = useState<ApexCharts.ApexOptions>();

  console.log({ options, passengers });

  const series = [
    {
      name: "In",
      data: passengers?.map((p) => p.in),
    },
    {
      name: "Out",
      data: passengers?.map((p) => p.out),
    },
    {
      name: "InFrame",
      data: passengers?.map((p) => p.inFrame),
    },
  ];

  useEffect(() => {
    setOptions({
      chart: {
        type: "area",
        animations: {
          speed: 2500, // Increase the speed for faster animation
        },
        toolbar: { show: false },
      },
      colors: ["#2563eb", "#9333ea", "#36B9CF"],
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "#00000555",
      },
      xaxis: {
        categories: passengers?.map((p) =>
          moment(p._id).format("MMM-DD, HH:mm")
        ),
      },

      fill: {
        gradient: {
          shadeIntensity: 0.3,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [50, 100, 100, 100],
        },
      },

      tooltip: {
        x: { format: "MMMM yyyy" },
        y: {
          formatter: (value) =>
            `$${value >= 1000 ? `${value / 1000}k` : value}`,
        },
        custom: function ({ series, dataPointIndex, w }) {
          return `<div class="min-w-48 bg-[#09090B]  Border  rounded-md p-4 py-3">
        <p class="text-sm text-white  font-medium">Total Earned</p>
        ${series
          .map(
            (s: any, i: any) => `
          <div class="flex items-center mt-2">
            <span class="w-2 h-2 rounded-sm mr-2" style="background-color: ${
              w.globals.colors[i]
            }"></span>
            <div class="flex justify-between w-full">
              <span class="text-gray-500 text-xs">${
                ["In", "Out", "In Frame"][i]
              }</span>
              <span class="opacity-60 text-xs font-medium">
                ${s[dataPointIndex].toLocaleString()} Passenger
              </span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>`;
        },
      },
    });
  }, [passengers]);

  if (passengers.length && options)
    return <Chart options={options} series={series} type="area" height={370} />;
  else
    return (
      <div className="w-full h-96 grid place-content-center">
        <div className="loader w-16 h-16" />
      </div>
    );
}

export default PassengersChart;
