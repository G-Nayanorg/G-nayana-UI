import React from "react";

const DiabeticRetinopathyTechnology = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-blue-100 scroll-mt-24 lg:scroll-mt-[5.75rem]" id="technology">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
        Advanced AI Technology
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">
            Deep Learning for Medical Imaging
          </h3>
          <p className="text-blue-700 mb-4">
            Our AI models utilize state-of-the-art convolutional neural
            networks (CNNs) trained on extensive datasets of validated
            retinal images to deliver accurate diagnostic results.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-blue-700">
                Validated against expert ophthalmologist grading
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-blue-700">
                Compliance with medical device standards
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-blue-700">
                Continuous learning from new validated data
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-blue-700">
                Integration with existing healthcare systems
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className=" bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-dashed border-blue-300 rounded-xl w-64 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  AI
                </div>
                <div className="text-blue-700">Deep Learning Model</div>
              </div>
            </div>
            <p className="mt-4 text-blue-700 font-medium">
              AI-Powered Analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiabeticRetinopathyTechnology;