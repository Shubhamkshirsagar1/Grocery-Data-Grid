import React, { useEffect } from "react";

const DetailsPage = ({ product }) => {
  console.log("Productssssssssss:", product);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{product.id}</h2>
    </div>
  );
};

export default DetailsPage;
