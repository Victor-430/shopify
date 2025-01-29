import ClipLoader from "react-spinners/ClipLoader";

const overRide = {
  display: "block",
  margin: "100px auto",
};

export const LoadingSpinner = ({ loading }) => {
  return (
    <ClipLoader
      color="orange"
      loading={loading}
      cssOverride={overRide}
      size={150}
      aria-label="loading Spinner"
      data-testid="loader"
      speedmultipler={3}
    />
  );
};

// import { Footprints } from "lucide-react";

// export const LoadingSpinner = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <Footprints size={150} className="animate-spin text-orange-500" />
//       <p className="mt-4 text-orange-500 font-bold">Loading...</p>
//     </div>
//   );
// };
