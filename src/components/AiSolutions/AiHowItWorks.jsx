import React from "react";
import { Link } from "react-router-dom";
import Section from "../Section";
import Button from "../Button";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  homeSmile,
  file02,
  searchMd,
  plusSquare
} from "../../assets";

const AiHowItWorks = () => {
  const detectionSteps = [
    {
      id: "1",
      title: "Image Capture",
      description: "High-resolution retinal images captured using fundus cameras or smartphone devices",
      icon: homeSmile,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      title: "Preprocessing",
      description: "Advanced image enhancement and standardization for optimal analysis",
      icon: file02,
      color: "from-cyan-500 to-teal-500"
    },
    {
      id: "3",
      title: "AI Analysis",
      description: "Deep learning algorithms analyze images for signs of eye disease",
      icon: searchMd,
      color: "from-teal-500 to-green-500"
    },
    {
      id: "4",
      title: "Results & Report",
      description: "Comprehensive diagnostic report with severity classification",
      icon: plusSquare,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-blue-50 to-white py-16" id="ai-how-it-works">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900">
            How Our AI Diagnostics Work
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-800">
            Our advanced system follows a comprehensive 4-step process to deliver accurate diagnostic results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {detectionSteps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}>
                <img src={step.icon} width={32} height={32} alt={step.title} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">{step.title}</h3>
              <p className="text-blue-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AiHowItWorks;