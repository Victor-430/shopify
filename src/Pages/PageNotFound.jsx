import { Link } from "react-router-dom";
import { FrownIcon, HomeIcon } from "lucide-react";

export const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <FrownIcon className="w-24 h-24 text-gray-400 mx-auto" />

        <h1 className="text-6xl font-bold text-gray-800">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
};
