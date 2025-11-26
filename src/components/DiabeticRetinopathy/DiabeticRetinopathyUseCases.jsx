import React from "react";

const DiabeticRetinopathyUseCases = ({ useCases }) => {
  return (
    <div className="mb-20 scroll-mt-24 lg:scroll-mt-[5.75rem]" id="ai-model-in-action">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
        Applications & Use Cases
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-900">
              {useCase.title}
            </h3>
            <p className="text-blue-700">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiabeticRetinopathyUseCases;