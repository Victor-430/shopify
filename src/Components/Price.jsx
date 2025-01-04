export const Price = ({ price = "$250.00", myPrice }) => {
  return (
    <div className="font-kumbh flex justify-between sm:flex-col">
      <div className="flex items-center gap-4">
        <h3 className="flex font-bold text-2xl">$125.00</h3>
        <span className="flex items-center justify-center bg-blue-veryDark rounded-md text-base text-white px-2">
          50%
        </span>
      </div>
      <p className="line-through text-blue-darkGrayish text-md lg:py-2">
        {price}
      </p>
    </div>
  );
};
