import React, { useState } from "react";

const BrandItem = ({ brand, handleDeleteBrand, handleEditBrand }) => {
  const [brandData, setBrandData] = useState({
    brandName: brand.name,
    brandDescription: brand.description,
    brandId: brand._id,
  });

  const handleInputChange = (e) => {
    let cloneBrandData = { ...brandData };
    cloneBrandData[e.target.name] = e.target.value;
    setBrandData(cloneBrandData);
  };

  return (
    <>
      <tr>
        <td style={{ maxWidth: "15px" }}>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="brandName"
            type="text"
            value={brandData.brandName}
          />
        </td>
        <td style={{ minWidth: "350px" }}>
          <input
            className="form-control"
            onChange={handleInputChange}
            name="brandDescription"
            type="text"
            value={brandData.brandDescription}
          />
        </td>
        <td>
          <i
            role="button"
            onClick={() => {
              handleEditBrand(brandData);
            }}
            className="bi bi-pencil-square fs-4"
          ></i>
        </td>
        <td>
          <i
            role="button"
            onClick={() => {
              handleDeleteBrand(brand._id);
            }}
            className="bi bi-trash3-fill fs-4"
          ></i>
        </td>
      </tr>
    </>
  );
};

export default BrandItem;
