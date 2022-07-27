import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function LineG({ events }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [dynamicData, setDynamicData] = useState([]);

  const data = {
    series: [{ name: "Points", data: [0, 9.2, 9.5, 10, 11] }],
    options: {
      title: {
        text: "Performance Chart",
        align: "left",
      },
      subtitle: {
        text: "Overall Performance over previous terms",
        align: "left",
      },
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 6,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        hover: {
          size: 10,
        },
      },
      grid: {
        row: {
            colors: ['#e5e5e5', 'transparent'],
            opacity: 0.5
        }, 
        column: {
            colors: ['#f8f8f8', 'transparent'],
        }, 
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["", "F1Tm1", "F1Tm2", "F1Tm3", "F2Tm1"],
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: 40,
      },
    },
  };

  return (
    <div className=" relative h-full">
      <div className="mixed-chart">
        {typeof window !== "undefined" && (
          <Chart
            options={data.options}
            series={data.series}
            type="area"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
}
