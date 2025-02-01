import React, { useState } from "react";
import MerchandiserForm from "./Form";
import { Card } from "antd";

const AddMerchandiser = () => {
  const [hasSelected, setHasSelected] = useState(false);
  return (
    <MerchandiserForm
      mode="add"
      initialValues={{
        active: false,
        outlet_ids: [],
      }}
    />
  );
};

export default AddMerchandiser;
