import RootPage from "../pages/RootPage";
import AuthPage from "../pages/AuthPage";
import ChatPage from "../pages/ChatPage";

import { ROUTES } from "../constants";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  {
    path: ROUTES.CHAT_URL,
    element: <RootPage />,
    children: [
      {
        path: ROUTES.CHAT_URL,
        element: (
          <ProtectedRoute
            navigateTo={ROUTES.AUTH_URL}
            requireAuth={true}
          >
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.AUTH_URL,
        element: (
          <ProtectedRoute
            navigateTo={ROUTES.CHAT_URL}
            requireAuth={false}
          >
            <AuthPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
