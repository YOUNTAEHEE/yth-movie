import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import "./index.css";
function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
        <Route path="/create-review" element={<CreateReviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
