// import { getAuth } from "firebase/auth";

// import { useState } from "react";

// import { LoadingSpinner } from "@/Components/LoadingSpinner";
// import { Navigate } from "react-router-dom";

// export const ProtectedRoute = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (isLoading) {
//     setIsLoading(false);
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <LoadingSpinner />;
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react"; // Added useEffect
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "@/Components/LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Authentication Error:", error);
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
