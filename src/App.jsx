import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="app">
        <Home />
      </div>
    </ChakraProvider>
  );
}

export default App;
