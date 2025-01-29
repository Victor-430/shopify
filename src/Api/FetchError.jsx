import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const FetchError = ({ error, isHome }) => {
  return (
    <div className="flex flex-1 items-center justify-center col-span-2 my-20">
      <div className="text-center tracking-wide">
        <h1 className="text-2xl text-gray-500 mb-4 font-semibold">{error}</h1>
        <span className="space-y-4 ">
          <p className="text-gray-400 ">Please try again</p>
          {isHome ? (
            ""
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Return Home
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
