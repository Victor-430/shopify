import { useRouteError, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const ErrorPage = () => {
  const error = useRouteError();

  // Extract meaningful error message
  const getErrorMessage = () => {
    if (error.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    if (error.message) {
      return error.message;
    }
    return "An unexpected error occurred.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="ml-2">Error</AlertTitle>
          <AlertDescription>{getErrorMessage()}</AlertDescription>
        </Alert>

        <div className="text-center space-y-4">
          {error.status === 404 ? (
            <div className="space-y-2">
              <p className="text-gray-600">
                The page you&#39re trying to access cannot be found. You can:
              </p>
              <ul className="list-disc text-left pl-8 text-gray-600">
                <li>Check if the URL is correct</li>
                <li>Go back to where you were</li>
                <li>Return to the homepage</li>
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">
              We&#39ve encountered an unexpected error. Our team has been
              notified and is working on it.
            </p>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Go Back
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Home
            </Link>
          </div>

          {import.meta.env.MODE === "development" && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <p className="text-sm font-mono text-gray-700 break-all">
                {error.stack || error.message || String(error)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
