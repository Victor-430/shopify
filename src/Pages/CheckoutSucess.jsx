import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "../hooks/use-toast";

export const CheckoutSucess = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          navigate("/");
          toast({
            title: "Order Successful",
            description: "Thank you for your purchase",
            className: "bg-black text-white font-kumbh hover:bg-black/50",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500 animate-checkmark" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been processed successfully.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">
              Order confirmation sent to your email
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Redirecting to homepage in {countDown} second(s)...
          </p>
        </div>
      </div>
    </div>
  );
};
