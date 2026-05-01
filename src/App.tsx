import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Homepage from "./Pages/Homepage";
import WealthScoreFinalResult from "./Component/CheckMyWealthScore/WealthScoreFinalResult";
import CheckMyWealthScore from "./Component/CheckMyWealthScore/Checkmywealthscore";
// import SignUpPopup from "./Component/Signup/Signuppopup";

function AppRoutes() {
  // const location = useLocation();
  // const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Header />

      {/* MAIN ROUTES */}
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
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
