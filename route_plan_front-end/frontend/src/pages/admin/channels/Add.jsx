import React, { useState } from "react";
import ChannelForm from "./Form";

const AddChannel = () => {
  const [hasSelected, setHasSelected] = useState(false);
  return (
    <ChannelForm
      mode="add"
      initialValues={{
        active: false,
      }}
    />
  );
};

export default AddChannel;
