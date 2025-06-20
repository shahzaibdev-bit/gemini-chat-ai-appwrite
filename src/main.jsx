import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./context/Context.jsx";
import { Provider } from "react-redux";
import store from "./store/conf"; // Make sure the path is correct
import HomePage from "./pages/HomePage.jsx";
import AuthOptionsPage from "./pages/AuthOptionsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /* ↓↓↓ use lowercase and make child paths relative ↓↓↓ */
    children: [
      { index: true, element: <AuthOptionsPage /> }, // default route
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "home", element: <HomePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Provider>
  </StrictMode>
);
