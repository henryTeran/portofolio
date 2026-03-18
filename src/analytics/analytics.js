import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-LRP08EH75";
let initialized = false;

export const initAnalytics = () => {
  if (initialized) return;
  ReactGA.initialize(MEASUREMENT_ID);
  initialized = true;
};

export const trackPage = (path) => {
  if (!initialized) return;
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};