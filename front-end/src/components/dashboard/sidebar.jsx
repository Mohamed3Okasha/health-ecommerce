import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <ul className="nav nav-pills d-flex flex-column text-white mt-5">
        <li className="nav-item my-2">
          <NavLink
            to="/dashboard/statistics"
            role="button"
            className="nav-link  text-white"
          >
            <i className="bi bi-speedometer2 me-2 fs-3 fs-sm-5"></i>
            <span className="d-none d-sm-inline">Statistics</span>
          </NavLink>
        </li>
        <li className="nav-item my-2 ">
          <NavLink
            to="/dashboard/storeoperations"
            role="button"
            className="nav-link  text-white"
          >
            <i className="bi bi-tools me-2 fs-3 fs-sm-5"></i>
            <span className="d-none d-sm-inline">Store Operations</span>
          </NavLink>
        </li>

        <li className="nav-item my-2">
          <NavLink
            to="/dashboard/manageproducts"
            role="button"
            className="nav-link  text-white"
          >
            <i className="bi bi-bricks me-2 fs-3 fs-sm-5"></i>
            <span className="d-none d-sm-inline">Manage Products</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
