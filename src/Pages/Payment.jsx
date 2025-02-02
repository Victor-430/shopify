import { useState } from "react";

import { CreditCard, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/Components/CartProvider";

export const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
  });
  const { clearCart } = useCart();

  const { cartTotal } = location.state || {};
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    const errors = {};

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }

    // CVC validation (3-4 digits)
    if (!/^\d{3,4}$/.test(formData.cvc)) {
      errors.cvc = "Please enter a valid CVC (3-4 digits)";
    }

    // Name validation
    if (formData.nameOnCard.trim().length < 3) {
      errors.nameOnCard = "Please enter the full name on your card";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/")
        .substr(0, 5);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check your payment details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();
      navigate("/checkout-success");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  // Back to cart handler
  const handleBackToCart = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg shadow-orange-300">
          {/* Header with Back Button */}
          <div className="border-b border-gray-200 p-6">
            <button
              onClick={handleBackToCart}
              className="flex items-center text-gray-600 mb-4 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </button>
            <h1 className="text-2xl font-semibold text-orange-500">
              Payment Details
            </h1>
            <p className="text-gray-500 mt-1">
              Complete your purchase securely
            </p>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-medium text-gray-700 mb-3">Order Summary</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tax</span>
                <span>$9.90</span>
              </div>
              <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>${(cartTotal + 9.9).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h2 className="font-medium text-orange-500">Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === "card"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>
                <button
                  className={`p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === "paypal"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <span className="font-bold text-blue-600">Pay</span>
                  <span className="font-bold text-blue-800">Pal</span>
                </button>
              </div>
            </div>

            {/* Card Details Form */}
            {paymentMethod === "card" && (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    type="text"
                    maxLength="19"
                    placeholder="1234 5678 9012 3456"
                    className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500  ${
                      formErrors.cardNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  {formErrors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength="5"
                      className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        formErrors.cardNumber
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {formErrors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input
                      name="cvc"
                      type="text"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      maxLength="4"
                      className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        formErrors.cardNumber
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {formErrors.cvc && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.cvc}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    name="nameOnCard"
                    type="text"
                    placeholder="John Doe"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      formErrors.cardNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  {formErrors.nameOnCard && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.nameOnCard}
                    </p>
                  )}
                </div>
              </form>
            )}

            {/* Security Note */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="relative w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-400 transition-colors"
            >
              {isLoading ? (
                <span className="visible">Processing ...</span>
              ) : (
                `Pay ${(cartTotal + 9.9).toFixed(2)}`
              )}
            </button>

            {/* Additional Info */}
            <div className="flex items-start gap-2 text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p>
                By clicking &#39;Pay&#39;, you agree to our terms of service and
                privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
