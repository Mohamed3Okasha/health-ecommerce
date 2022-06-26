import React, { useState } from "react";

const CategoryItem = ({
  category,
  handleDeleteCategory,
  handleEditCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    categoryName: category.name,
    categoryDescription: category.description,
    categoryId: category._id,
  });

  const handleInputChange = (e) => {
    let cloneCategoryData = { ...categoryData };
    cloneCategoryData[e.target.name] = e.target.value;
    setCategoryData(cloneCategoryData);
  };
  return (
    <>
      <tr>
        <td style={{ maxWidth: "15px" }}>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="categoryName"
            type="text"
            value={categoryData.categoryName}
          />
        </td>
        <td style={{ minWidth: "350px" }}>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="categoryDescription"
            type="text"
            value={categoryData.categoryDescription}
          />
        </td>
        <td>
          <i
            role="button"
            onClick={() => {
              handleEditCategory(categoryData);
            }}
            className="bi bi-pencil-square fs-4"
          ></i>
        </td>
        <td>
          <i
            role="button"
            onClick={() => {
              handleDeleteCategory(category._id);
            }}
            className="bi bi-trash3-fill fs-4"
          ></i>
        </td>
      </tr>
    </>
  );
};

export default CategoryItem;
