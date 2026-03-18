import AppRouter from './router/AppRouter';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPage } from './analytics/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPage(location.pathname + location.hash);
  }, [location]);

  return <AppRouter />;
}

export default App;