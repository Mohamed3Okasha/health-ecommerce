import React, { useState } from "react";

const OrderChart = () => {
  let totalOrdersNum = 0;
  let dashOffsetVal = 0;
  const [ordersData, setOrdersData] = useState({
    pending: 15,
    review: 5,
    progress: 9,
    onway: 11,
    delivered: 51,
  });
  let keyIndex = [];
  let pieColors = [
    // "#03a9f4",
    // "#2196f3",
    // "#cddc39",
    // "#ffee58",
    // "#1e8449",
    // "#d4ac0d",
    "#003f5c",
    "#58508d",
    "#bc5090",
    "#ff6361",
    "#f1a600",
  ];
  for (let key in ordersData) {
    totalOrdersNum += ordersData[key];
    keyIndex.push(key);
  }
  return (
    <>
      <style>
        {`
        .order-circle{
          fill: none;
          stroke-width: 70;
        }
        .order-circle:hover{
          stroke:  #99a3a4 ;
          cursor: pointer;
        }
        #pieText{
          display: none;
          border: 1px solid brown;
        }
        .order-circle:hover + #pieText{
          display: inline;
          // fill: #d4ac0d;
          font-size: .85em;
        }
      `}
      </style>
      <h4 className="mt-3">Orders</h4>
      <svg viewBox="0 0 250 250">
        {Object.keys(ordersData).map((key, indx) => (
          <>
            {
              (dashOffsetVal +=
                indx === 0
                  ? 0
                  : -(
                      (ordersData[keyIndex[indx - 1]] / totalOrdersNum) *
                      100 *
                      (2 * Math.PI * 50)
                    ) / 100)
            }

            <circle
              key={indx}
              r="20%"
              cy="40%"
              cx="50%"
              className="order-circle"
              strokeDasharray={`${
                ((ordersData[key] / totalOrdersNum) *
                  100 *
                  (2 * Math.PI * 50)) /
                100
              } ${2 * Math.PI * 50}`}
              stroke={pieColors[indx]}
              strokeDashoffset={dashOffsetVal}
            />

            <text x="50%" y="95%" fill="tomato" id="pieText">
              {`${key[0].toUpperCase() + key.slice(1)}: ${ordersData[key]} (${(
                (ordersData[key] / totalOrdersNum) *
                100
              ).toFixed(1)}%)`}
            </text>
          </>
        ))}
        <text y="95%">Total Num: {totalOrdersNum}</text>
      </svg>
    </>
  );
};

export default OrderChart;
