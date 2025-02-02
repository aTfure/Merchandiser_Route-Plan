import React, { useState } from "react";
import OutletForm from "./Form";

const AddOutlet = () => {
  const [hasSelected, setHasSelected] = useState(false);
  return (
    <OutletForm
      mode="add"
      initialValues={{
        active: false,
        channel_type_id: null,
      }}
    />
  );
};

export default AddOutlet;
