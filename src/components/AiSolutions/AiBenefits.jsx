import React from "react";
import Section from "../Section";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4
} from "../../assets";

const AiBenefits = () => {
  const benefits = [
    {
      id: "1",
      title: "Early Detection",
      description: "Identifies eye diseases in early stages before symptoms appear, enabling timely intervention",
      icon: benefitIcon1
    },
    {
      id: "2",
      title: "High Accuracy",
      description: "Trained on thousands of validated retinal images with precision comparable to expert ophthalmologists",
      icon: benefitIcon2
    },
    {
      id: "3",
      title: "Scalable Screening",
      description: "Enable large-scale screening programs to reach underserved populations",
      icon: benefitIcon3
    },
    {
      id: "4",
      title: "Cost Effective",
      description: "Reduces healthcare costs by minimizing the need for specialist consultations for initial screening",
      icon: benefitIcon4
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-cyan-50 to-white py-16" id="ai-benefits">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-cyan-900">
            Why Choose AI-Powered Diagnostics?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-cyan-800">
            Advanced artificial intelligence solutions that revolutionize eye care delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-cyan-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={benefit.icon} width={64} height={64} alt={benefit.title} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">{benefit.title}</h3>
              <p className="text-cyan-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AiBenefits;