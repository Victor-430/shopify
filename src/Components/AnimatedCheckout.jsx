import { CheckCircle } from "lucide-react";

export const AnimatedSuccessCheck = () => {
  return (
    <div className="relative w-20 h-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Multiple ribbons with different animations */}
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d={`M50,50 L${50 + 40 * Math.cos((i * Math.PI) / 4)},${
              50 + 40 * Math.sin((i * Math.PI) / 4)
            }`}
            stroke="none"
            fill="none"
            className={`
              origin-center
              animate-[ribbon_2s_ease-out_infinite]
              ${i % 4 === 0 ? "stroke-blue-500" : ""}
              ${i % 4 === 1 ? "stroke-purple-500" : ""}
              ${i % 4 === 2 ? "stroke-pink-500" : ""}
              ${i % 4 === 3 ? "stroke-yellow-500" : ""}
            `}
            style={{
              strokeDasharray: "0 40",
              strokeWidth: "4",
              strokeLinecap: "round",
              animation: `ribbon 2s ease-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
      </div>
      <style>
        {`
          @keyframes ribbon {
            0% {
              stroke-dasharray: 0 40;
              opacity: 1;
              transform: rotate(0deg) scale(1);
            }
            50% {
              stroke-dasharray: 40 40;
              opacity: 0.5;
              transform: rotate(${Math.random() * 180}deg) scale(1.2);
            }
            100% {
              stroke-dasharray: 40 40;
              opacity: 0;
              transform: rotate(${Math.random() * 360}deg) scale(1.5);
            }
          }
        `}
      </style>
    </div>
  );
};
