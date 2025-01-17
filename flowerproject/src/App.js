import React from "react";
import RoutesFile from "./routes/RoutesFile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";




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
