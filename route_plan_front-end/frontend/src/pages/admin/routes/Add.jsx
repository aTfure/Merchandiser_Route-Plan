import React, { useState } from "react";
import RouteForm from "./Form";

const AddRoute = () => {
  const [hasSelected, setHasSelected] = useState(false);
  return (
    <RouteForm
      mode="add"
      initialValues={{
        active: false,
        outlet_ids: [],
      }}
    />
  );
};

export default AddRoute;
