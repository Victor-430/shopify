import { createBrowserRouter } from "react-router-dom";
import { NavBar } from "@/Components/NavBar";
import { Home } from "../Pages/Home";
import { ErrorPage } from "../Pages/ErrorPage";
import { PageNotFound } from "@/Pages/PageNotFound";
import { Collections } from "@/Pages/Collections";
import { Payment } from "@/Pages/Payment";
import { CheckoutSucess } from "@/Pages/CheckoutSucess";
import { Login } from "../Pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { MenCollections } from "@/Pages/MenCollections";
import { ProductDescription } from "@/Components/ProductDescription";
import { Category } from "@/Pages/Category";
import { MenCategory } from "@/Pages/MenCategory";
import { WomenCategory } from "../Pages/WomenCategory";
import { WomenCollection } from "../Pages/WomenCollection";
import { WishListItems } from "@/Components/WishListItems";
import { About } from "@/Pages/About";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <NavBar />
        </ProtectedRoute>
      ),

      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "checkout-success",
          element: <CheckoutSucess />,
        },
        {
          path: "collections",
          element: <Collections />,
        },
        {
          path: "collections/:category",
          element: <Category />,
        },
        {
          path: "men",
          element: <MenCollections />,
        },
        {
          path: "men/:category",
          element: <MenCategory />,
        },
        {
          path: "women",
          element: <WomenCollection />,
        },
        { path: "women/:category", element: <WomenCategory /> },

        {
          path: "products/:id",
          element: <ProductDescription />,
        },
        {
          path: "wishList",
          element: <WishListItems />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
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
