import React from "react";

const DiabeticRetinopathyBenefits = ({ benefits }) => {
  return (
    <div className="mb-20 scroll-mt-[5.25rem] lg:scroll-mt-[5.75rem]" id="key-benefits">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
        Why Choose Our Diabetic Retinopathy Detection?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <img
                src={benefit.icon}
                width={64}
                height={64}
                alt={benefit.title}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              {benefit.title}
            </h3>
            <p className="text-blue-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiabeticRetinopathyBenefits;