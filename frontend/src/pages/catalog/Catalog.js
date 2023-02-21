import React from "react";
import requireAuth from "../../utils/RequireAuth";

const Catalog = () => {
  return <p>Catalog</p>;
};

export default requireAuth(Catalog);
