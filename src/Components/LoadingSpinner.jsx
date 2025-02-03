import ClipLoader from "react-spinners/ClipLoader";

export const LoadingSpinner = ({ loading }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Preserve navbar space */}
      <div className="h-[64px] sm:h-[46px] bg-white border-b border-white" />

      <div className="flex-1 flex items-start justify-center">
        <ClipLoader
          color="orange"
          loading={loading}
          size={150}
          aria-label="loading Spinner"
          data-testid="loader"
          speedmultipler={3}
        />
      </div>
    </div>
  );
};
