import React from "react";
import CategoryItem from "./categoryItem";

const CategoryTable = (props) => {
  return (
    <React.Fragment>
      <table className="table table-striped table-success">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.categoryList.map((c) => {
            return (
              <CategoryItem
                category={c}
                handleDeleteCategory={props.handleDeleteCategory}
                handleEditCategory={props.handleEditCategory}
              />
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CategoryTable;
