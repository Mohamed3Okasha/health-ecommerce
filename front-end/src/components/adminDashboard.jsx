import React from "react";
import BrandTable from "./brandTable";
import CategoryTable from "./categoryTable";
import User from "./user";

const AdminDashBoard = (props) => {
  console.log("AdminDashBoard - props: ", props);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <button className="btn btn-secondary my-4 fs-4">User</button>
          <User logedUser={props.logedUser} />

          <button className="btn btn-secondary my-4 fs-4">Category</button>
          <CategoryTable
            categoryList={props.categoryList}
            handleDeleteCategory={props.handleDeleteCategory}
            handleEditCategory={props.handleEditCategory}
          />

          <button className="btn btn-secondary my-4 fs-4">Brand</button>
          <BrandTable
            brandList={props.brandList}
            handleDeleteBrand={props.handleDeleteBrand}
            handleEditBrand={props.handleEditBrand}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashBoard;
