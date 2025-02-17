import React from "react";
import RoutesFile from "../src/routes/RoutesFile";
import Navbar from "../src/frontend/components/Navbar";
import Footer from "../src/frontend/components/Footer";




const App = () => {
  return (
    <div>
      <Navbar />
      <RoutesFile />
      <Footer />
    </div>
  );
};

export default App;
