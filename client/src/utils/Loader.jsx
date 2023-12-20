import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div>
      <ClipLoader color={"red"} size={50} />
    </div>
  );
};

export default Loader;