import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Homepage from "./Pages/Homepage";
import WealthScoreFinalResult from "./Component/CheckMyWealthScore/WealthScoreFinalResult";
import CheckMyWealthScore from "./Component/CheckMyWealthScore/Checkmywealthscore";

function AppRoutes() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/checkmyscore" element={<CheckMyWealthScore/>}/>
        <Route path="/wealth-score-final-result" element={<WealthScoreFinalResult />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;