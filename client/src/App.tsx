import React from "react";
import styled from "styled-components";

function App() {
  return (
    <div>
      <header></header>
      <Package></Package>
    </div>
  );
}

const Package = styled.div`
  width: 300px;
  height: 200px;
  background-color: red;
`;

export default App;
