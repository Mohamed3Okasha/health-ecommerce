import React, { useState } from "react";

const UserChart = () => {
  let totalUsersNum = 0;
  let strokeOffsetVal = 0;
  let pieColors = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#f1a600"];
  const [usersData, setUsersData] = useState({
    active: 30,
    deactivated: 17,
  });
  for (let key in usersData) {
    totalUsersNum += usersData[key];
  }
  return (
    <>
      <style>
        {`
          .user-circle{
            fill: none;
            // stroke: #0074d9;
            stroke-width: 100;
            // strokeDasharray: ${(10 * (2 * Math.PI * 40)) / 100} ${
          2 * Math.PI * 40
        }
          }
        `}
      </style>
      <h4 className="mt-3">Users</h4>
      <svg viewBox="0 0 250 250">
        {/* <circle r="80" cy="125" cx="125" fill="tomato" /> */}
        {Object.keys(usersData).map((key, indx) => (
          <>
            <circle
              key={indx}
              r="20%"
              cy="40%"
              cx="50%"
              className="user-circle"
              strokeDasharray={`${
                ((usersData[key] / totalUsersNum) * 100 * (2 * Math.PI * 50)) /
                100
              } ${2 * Math.PI * 50}`}
              stroke={pieColors[indx]}
              strokeDashoffset={
                indx === 0
                  ? 0
                  : -(
                      2 * Math.PI * 50 -
                      ((usersData[key] / totalUsersNum) *
                        100 *
                        (2 * Math.PI * 50)) /
                        100
                    )
              }
            />
            <text y="95%" x={indx * 90}>
              {key[0].toUpperCase() + key.slice(1)}: {usersData[key]}
            </text>
          </>
        ))}
      </svg>
    </>
  );
};

export default UserChart;
