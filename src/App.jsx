import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/menu/MenuBar.jsx";
import Content from "./components/content/Content.jsx";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Container style={({ padding: "2rem" }, { marginTop: "2rem" })}>
          <MenuBar />
          <Content />
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
