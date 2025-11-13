import React from "react";
import Section from "../Section";

const AiUseCases = () => {
  const useCases = [
    {
      title: "Primary Healthcare",
      description: "Integrate AI screening into primary care settings for routine eye health checks"
    },
    {
      title: "Telemedicine",
      description: "Enable remote screening for patients in rural or underserved areas"
    },
    {
      title: "Mass Screening",
      description: "Deploy for large-scale screening programs in communities or workplaces"
    },
    {
      title: "Follow-up Monitoring",
      description: "Track disease progression and treatment effectiveness over time"
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-purple-50 to-white py-16" id="ai-use-cases">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-purple-900">
            Applications & Use Cases
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-purple-800">
            Versatile AI solutions adaptable to various healthcare settings and needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-900">{useCase.title}</h3>
              <p className="text-purple-700">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AiUseCases;