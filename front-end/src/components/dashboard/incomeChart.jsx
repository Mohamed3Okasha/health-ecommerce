import React, { useState } from "react";
const IncomeChart = () => {
  const svgHeight = 270;
  const highestBar = svgHeight - 50;
  let maxIncome = 0;
  const [incomeData, setIncomeData] = useState({
    Sat: 10,
    Sun: 20,
    Mon: 30,
    Tue: 9,
    Wed: 50,
    Thur: 70,
    Fri: 5,
  });
  for (let key in incomeData) {
    maxIncome = incomeData[key] > maxIncome ? incomeData[key] : maxIncome;
  }
  return (
    <>
      <style>
        {` 
          .spark-bar{
            fill: #aaa;
          }
          .spark-bar-tallest{
            fill: blue;
          }
          .spark-bar:hover, .spark-bar:focus, .spark-bar-tallest:hover, .spark-bar-tallest:focus{
          fill: black !important;
          cursor: pointer;
          }
        `}
      </style>

      <h4 className="mt-3">Income</h4>
      <svg
        // height={svgHeight}
        // width="100%"
        viewBox="0 0 250 270"
        // className="ps-0"
      >
        {Object.keys(incomeData).map((key, indx) => (
          <g key={indx} transform={`translate(${indx * 35}, 0)`}>
            <text
              y={svgHeight - (incomeData[key] / maxIncome) * highestBar - 35}
              fontSize=".8em"
            >
              {incomeData[key]}
            </text>
            <rect
              height={(incomeData[key] / maxIncome) * highestBar}
              width="20"
              y={svgHeight - (incomeData[key] / maxIncome) * highestBar - 30}
              className={
                incomeData[key] === maxIncome
                  ? "spark-bar-tallest"
                  : "spark-bar"
              }
            ></rect>
            <text y={svgHeight - 10} fontSize=".85em">
              {key}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};

export default IncomeChart;
