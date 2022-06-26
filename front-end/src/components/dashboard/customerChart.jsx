import React, { useState } from "react";

const CustomerChart = () => {
  const svgHeight = 270;
  const highestPoint = svgHeight - 50;
  let maxCustomerNum = 0;
  const [customerData, setcustomerData] = useState({
    Sat: 100,
    Sun: 200,
    Mon: 300,
    Tue: 90,
    Wed: 500,
    Thur: 700,
    Fri: 50,
  });

  for (let key in customerData) {
    maxCustomerNum =
      customerData[key] > maxCustomerNum ? customerData[key] : maxCustomerNum;
  }
  return (
    <>
      <h4 className="mt-3">Customers</h4>
      <svg viewBox="0 0 250 270">
        {Object.keys(customerData).map((key, indx) => (
          <>
            <circle
              // key={indx}
              cx={indx === 0 ? 10 : indx * 35}
              cy={240 - (customerData[key] / maxCustomerNum) * highestPoint}
              fill="#ff4136"
              strokeWidth="1"
              r="5"
            ></circle>
            <text
              // key={indx + 10}
              x={indx * 35}
              y={240 - (customerData[key] / maxCustomerNum) * highestPoint - 10}
              fontSize=".8em"
            >
              {customerData[key]}
            </text>
            <text x={indx * 35} y="250" fontSize=".85em">
              {key}
            </text>
          </>
        ))}
      </svg>
    </>
  );
};

export default CustomerChart;
