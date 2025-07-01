import React, { useState } from "react";

const App = () => {
  const [c, setC] = useState(0);
  const handleClc = () => {
    setC(c + 1);
    setC(c + 1);
    setC((p) => {
      console.log(p);
      return p + 1;
    });
    setC((p) => {
      console.log(p);
      return p + 1;
    });
  };
  console.log(c);
  return (
    <div className="">
      <button onClick={handleClc}>clic</button>
      <div className="absolute left-1/2 top-1/2">APP</div>
    </div>
  );
};

export default App;
