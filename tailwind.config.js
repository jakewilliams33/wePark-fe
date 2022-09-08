/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./Navigation/Screens/ScreenComponents/BottomComponent.js",
    "./Navigation/Screens/ScreenComponents/SpotsComponent.js",
    "./Navigation/Screens/ScreenComponents/LoginComponent.js",
    "./Navigation/Screens/ScreenComponents/SignUpComponent.js",
    "./Navigation/Screens/ScreenComponents/MainLoginComponent.js",
    "./Navigation/Screens/HomeScreen.js",
    "./Navigation/Screens/MapScreen.js",
    "./Navigation/Screens/LoginScreen.js",
    "./Navigation/Screens/UserScreen.js",
    "./Navigation/MainContainer.js",
    "./Navigation/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
