import React from "react";
import CustomerChart from "./customerChart";
import IncomeChart from "./incomeChart";
import OrderChart from "./orderChart";
import UserChart from "./userChart";

const Statistics = () => {
  return (
    <>
      <div className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <div className="col-10 col-sm-5 col-lg-4 col-xl-3 bg-white border rounded mb-3 mb-sm-5 m-sm-0 me-md-4">
          <IncomeChart />
        </div>
        <div className="col-10 col-sm-5 col-lg-4 col-xl-3 bg-white border rounded mb-3 mb-sm-5 m-sm-0 ms-md-4">
          <CustomerChart />
        </div>
      </div>
      <div className="row row-cols-2 justify-content-evenly justify-content-md-center align-items-stretch mt-3">
        <div className="col-10 col-sm-5 col-lg-4 col-xl-3 bg-white border rounded mb-3 mb-sm-5 m-sm-0 me-md-4">
          <OrderChart />
        </div>
        <div className="col-10 col-sm-5 col-lg-4 col-xl-3 bg-white border rounded mb-3 mb-sm-5 m-sm-0 ms-md-4">
          <UserChart />
        </div>
      </div>
    </>
  );
};

export default Statistics;
