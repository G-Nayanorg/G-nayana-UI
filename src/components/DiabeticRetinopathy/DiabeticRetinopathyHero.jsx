import React from "react";
import Button from "../Button";
import GNayanaBot from "../GNayana/GNayanaBot";

const DiabeticRetinopathyHero = () => {
  return (
    <div className="text-center mb-16  scroll-mt-[5.25rem] lg:scroll-mt-[5.75rem] " id="home">
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center md:mb-5 ">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold  text-blue-900">
            <span className="inline-block relative">
              Diabetic Retinopathy
              <svg
                viewBox="0 0 624 28"
                fill="none"
                className="absolute top-full left-0 w-full xl:-mt-2"
              >
                <defs>
                  <linearGradient
                    id="threeColorGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path
                  d="M3 25C142.5 3.5 290.5 3.5 621 25"
                  stroke="url(#threeColorGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

        </div>
      </div>
      <GNayanaBot />

      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-800">
        Advanced AI solutions for early detection and screening of
        vision-threatening Diabetic Retinopathy, bringing expert-level diagnostics
        to primary care settings.
      </p>
    </div>
  );
};

export default DiabeticRetinopathyHero;