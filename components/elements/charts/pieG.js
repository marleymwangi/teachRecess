import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function PieG({ num }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [dynamicData, setDynamicData] = useState([]);

  const data = {
    series: [num],
    options: {
      chart: {  
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#0ea5e9",
              fontSize: "12px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              show: true,
              color: "#0284c7",
              fontSize: "30px",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Completed %"],
    },
  };

  return (
    <div className=" relative h-full">
      <div className="mixed-chart relative">
        {typeof window !== "undefined" && (
          <Chart
            options={data.options}
            series={data.series}
            type="radialBar"
            width="100%"
            height="250px"
          />
        )}
      </div>
    </div>
  );
}
