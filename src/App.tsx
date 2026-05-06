import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Homepage from "./Pages/Homepage";
import WealthScoreFinalResult from "./Component/CheckMyWealthScore/WealthScoreFinalResult";
import CheckMyWealthScore from "./Component/CheckMyWealthScore/Checkmywealthscore";

import ProtectedRoute from "./routes/ProtectedRoute"; 

function AppRoutes() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Homepage />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/checkmyscore"
          element={
            <ProtectedRoute>
              <CheckMyWealthScore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wealth-score-final-result"
          element={
            <ProtectedRoute>
              <WealthScoreFinalResult />
            </ProtectedRoute>
          }
        />
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