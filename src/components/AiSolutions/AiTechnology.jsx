import React from "react";
import Section from "../Section";

const AiTechnology = () => {
  return (
    <Section className="bg-gradient-to-b from-emerald-50 to-white py-16" id="ai-technology">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-emerald-900">
            Advanced AI Technology
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-emerald-800">
            State-of-the-art deep learning models for precision medical imaging analysis.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-800">Deep Learning for Medical Imaging</h3>
              <p className="text-emerald-700 mb-4">
                Our AI models utilize state-of-the-art convolutional neural networks (CNNs) trained on 
                extensive datasets of validated retinal images to deliver accurate diagnostic results.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-emerald-700">Validated against expert ophthalmologist grading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-emerald-700">Compliance with medical device standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-emerald-700">Continuous learning from new validated data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-emerald-700">Integration with existing healthcare systems</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-dashed border-emerald-300 rounded-xl w-64 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">AI</div>
                    <div className="text-emerald-700">Deep Learning Model</div>
                  </div>
                </div>
                <p className="mt-4 text-emerald-700 font-medium">
                  AI-Powered Analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AiTechnology;