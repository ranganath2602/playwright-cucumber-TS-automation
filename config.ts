const config = {
    baseUrl: "https://trello.com",
    recordVideos: false,
    browser: process.env.BROWSER || "chromium", // chromium or firefox or webkit
    defaultTimeout: 30 * 1000, // milliseconds
    runHeadless: true,
    runSlow: 500, // milliseconds
  };
  
  export default config;