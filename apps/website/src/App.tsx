import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "./utils/useScrollAnimation";
import api from "./lib/axios";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/common/BackToTop";

// Page Components
import Home from "./pages/Home";
import AnimatedPage from "./components/common/AnimatedPage";

const hexToHSL = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.startsWith("#")) hex = hex.slice(1);

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h,
    s: +(s * 100).toFixed(1),
    l: +(l * 100).toFixed(1),
  };
};

function AppContent() {
  useScrollAnimation();
  const location = useLocation();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await api.get("/website-content/items?section=theme");
        if (res.data && res.data.length > 0) {
          const primaryColorItem = res.data.find(
            (item: any) => item.key === "primary_color",
          );
          if (primaryColorItem && primaryColorItem.subtitle) {
            const { h, s, l } = hexToHSL(primaryColorItem.subtitle);
            document.documentElement.style.setProperty(
              "--primary-h",
              h.toString(),
            );
            document.documentElement.style.setProperty("--primary-s", s + "%");
            document.documentElement.style.setProperty("--primary-l", l + "%");
          }
        }
      } catch (e) {
        console.error("Failed to fetch theme", e);
      }
    };
    fetchTheme();
  }, []);

  return (
    <div className="App font-sans text-gray-900">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
