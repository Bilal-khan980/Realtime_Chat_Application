import React, { useState } from "react";

function Dashboard() {
  const [data, setdata] = useState(0);
  const handlebutton = () => {
    setdata(data + 1);
  };
  return (
    <div>
      {data}
      <button onClick={handlebutton}></button>
    </div>
  );
}

export default Dashboard;
