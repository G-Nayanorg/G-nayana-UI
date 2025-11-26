import React from "react";
import {
  benefitIcon1,
} from "../../assets";

const DiabeticRetinopathySolutions = ({ aiSolutions }) => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
        Diabetic Retinopathy AI Solution
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {aiSolutions.map((solution) => (
          <div
            key={solution.id}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-grow lg:w-3/5">
                <div className="flex items-start">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-4 flex-shrink-0`}
                  >
                    <img
                      src={solution.icon}
                      width={32}
                      height={32}
                      alt={solution.title}
                      className="text-white"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-blue-900 group-hover:text-blue-700 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-blue-700 mb-4">{solution.description}</p>

                    {/* Stats */}
                    <div className="flex justify-between mb-4">
                      {solution.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg font-bold text-blue-900">
                            {stat.value}
                          </div>
                          <div className="text-xs text-blue-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Learn More
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Image on the right side - full width on small screens, half on large screens */}
              <div className="w-full lg:w-2/5 flex items-center justify-center lg:justify-start">
                <img
                  src="/diabetic/right_2.jpg"
                  alt="Diabetic Retinopathy AI Solution"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto rounded-lg shadow-md object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiabeticRetinopathySolutions;