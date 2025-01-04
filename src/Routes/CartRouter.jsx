import { createBrowserRouter } from "react-router-dom";
import { NavBar } from "@/Components/NavBar";
import { Home } from "../Pages/Home";
import { ErrorPage } from "../Pages/ErrorPage";
import { PageNotFound } from "@/Pages/PageNotFound";
import { Collections } from "@/Pages/Collections";
import { Payment } from "@/Pages/Payment";
import { CheckoutSucess } from "@/Pages/CheckoutSucess";
import { Login } from "../Pages/Login";
import { AuthProvider } from "../Auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Men } from "@/Pages/Men";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      ),

      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "collections",
          element: (
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout-success",
          element: (
            <ProtectedRoute>
              <CheckoutSucess />
            </ProtectedRoute>
          ),
        },
        {
          path: "men",
          element: <Men />,
        },
      ],
    },
  ],

  {
    future: {
      v7_startTransition: true, // Enables React.startTransition wrapper
      v7_relativeSplatPath: true, // New relative route resolution within splat routes
      v7_fetcherPersist: true, // New fetcher persistence behavior
      v7_normalizeFormMethod: true, // Uppercase form method normalization
      v7_partialHydration: true, // New hydration behavior for RouterProvider
      v7_skipActionErrorRevalidation: true, // New revalidation behavior after 4xx/5xx actions
    },
  }
);
