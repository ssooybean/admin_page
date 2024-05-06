import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App";
import UserPage from "./components/pages/UserPage";
import AdminPage from "./components/pages/AdminPage";
import GenSublimPage from "./components/pages/admin_resourses/subliminals/general/GenSublimPage";
import Subliminal from "./components/pages/admin_resourses/subliminals/Subliminal";
import LoveSublimPage from "./components/pages/admin_resourses/subliminals/themes/LoveSublimPage";
import MoneySubliminalPage from "./components/pages/admin_resourses/subliminals/themes/MoneySubliminalPage";
import SuccessSubliminalPage from "./components/pages/admin_resourses/subliminals/themes/SuccessSubliminalPage";
import WorkSublimPage from "./components/pages/admin_resourses/subliminals/themes/WorkSublimPage";
import Mediataions from "./components/pages/admin_resourses/meditations/Meditations";

const router = createBrowserRouter([
  {
    path: "/user_panel",
    element: <UserPage />,
  },
  {
    path: "/admin_panel",
    element: <AdminPage />,
    children: [
      {
        path: import.meta.env.VITE_SUBLIMINAL_PATH,
        element: <Subliminal />,
        children: [
          {
            path: import.meta.env.VITE_GEN_PATH,
            element: <GenSublimPage />,
          },
          {
            path: import.meta.env.VITE_LOVE_PATH,
            element: <LoveSublimPage />,
          },
          {
            path: import.meta.env.VITE_MONEY_PATH,
            element: <MoneySubliminalPage />,
          },
          {
            path: import.meta.env.VITE_WORK_PATH,
            element: <WorkSublimPage />,
          },
          {
            path: import.meta.env.VITE_FRIEND_PATH,
            element: <GenSublimPage />,
          },
          {
            path: import.meta.env.VITE_SUCCESS_PATH,
            element: <SuccessSubliminalPage />,
          },
        ],
      },
      {
        path: import.meta.env.VITE_MEDITATION_PATH,
        element: <Mediataions />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
