import React from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../notFound";
import Sidebar from "./sidebar";

const AdminDashboard = (props) => {
  if (props.logedUser.userRole !== "admin") {
    return (
      <>
        <NotFound />
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-2">
          <div className="bg-dark col-3 col-sm-4 col-md-3 col-lg-2 min-height-100 d-flex justify-content-center">
            <Sidebar />
          </div>
          <div className="col-9 col-sm-8 col-md-9 col-lg-10 bg-light">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
