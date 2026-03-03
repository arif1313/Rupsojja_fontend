import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './Router/AppRoutes'
import { SearchProvider } from "./context/SearchContext";
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <SearchProvider>
      <Router>
     <Navbar></Navbar>
        <AppRoutes></AppRoutes>
         <Toaster position="top-right" />
      </Router>
    </SearchProvider>

  );
}

export default App;
