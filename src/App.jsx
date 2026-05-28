import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import ArticlePage from "./pages/ArticlePage";
import Navbar from "./components/Navbar";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<CaseStudy />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
