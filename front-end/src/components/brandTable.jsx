import React from "react";
import BrandItem from "./brandItem";

const BrandTable = (props) => {
  return (
    <React.Fragment>
      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.brandList.map((b) => {
            return (
              <BrandItem
                key={b._id}
                brand={b}
                handleDeleteBrand={props.handleDeleteBrand}
                handleEditBrand={props.handleEditBrand}
              />
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default BrandTable;
