import ReactGA from "react-ga4";

export const initAnalytics = () => {
  ReactGA.initialize("G-LRP08EH75");
};

export const trackPage = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};