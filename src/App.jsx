import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './Router/AppRoutes'
import { SearchProvider } from "./context/SearchContext";
import Navbar from './components/Navbar'

function App() {
  return (
    <SearchProvider>
      <Router>
     <Navbar></Navbar>
        <AppRoutes></AppRoutes>
      </Router>
    </SearchProvider>

  );
}

export default App;
