import React from "react";
import {
  homeSmile,
  file02,
  searchMd,
  plusSquare,
} from "../../assets";

const DiabeticRetinopathyHowItWorks = ({ detectionSteps }) => {
  return (
    <div className="mb-20 scroll-mt-[5.25rem] lg:scroll-mt-[5.75rem]" id="ai-model-works">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
        How Our AI Diagnostics Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {detectionSteps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow text-center"
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}
            >
              <img
                src={step.icon}
                width={32}
                height={32}
                alt={step.title}
                className="text-white"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              {step.title}
            </h3>
            <p className="text-blue-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiabeticRetinopathyHowItWorks;