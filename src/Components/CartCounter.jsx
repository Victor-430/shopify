export const CartCounter = ({ quantity, onQuantityChange }) => {
  const handlePlusCount = () => {
    onQuantityChange((prev) => Math.min(99, prev + 1));
  };

  const handleMinusCount = () => {
    onQuantityChange((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className=" font-bold font-kumbh flex items-center justify-between max-sm:w-full w-[150px] h-12 rounded-lg bg-blue-lightGrayish text-lg  px-3">
      <button
        className="flex justify-center  text-orange-500 font-bold text-xl w-8 h-8"
        onClick={handleMinusCount}
      >
        -
      </button>

      <p className="">{quantity}</p>

      <button
        className="flex justify-center text-orange-500 w-8 h-8 font-bold text-xl"
        onClick={handlePlusCount}
      >
        +
      </button>
    </div>
  );
};
