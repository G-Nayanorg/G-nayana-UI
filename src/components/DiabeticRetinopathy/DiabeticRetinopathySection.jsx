import React from "react";
import Section from "../Section";
import Button from "../Button";
import PredictionShowcase from "../PredictionShowcase/PredictionShowcase";
import { 
  benefitIcon1, 
  benefitIcon2, 
  benefitIcon3, 
  benefitIcon4, 
  benefitImage2,
  homeSmile,
  file02,
  searchMd,
  plusSquare,
  notification2,
  notification3,
  notification4
} from "../../assets";

const DiabeticRetinopathySection = () => {
  const detectionSteps = [
    {
      id: "1",
      title: "Image Upload",
      description: "Upload retinal images captured with fundus cameras",
      icon: homeSmile,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      title: "AI Processing",
      description: "Our ML model analyzes the images for signs of diabetic retinopathy",
      icon: file02,
      color: "from-cyan-500 to-teal-500"
    },
    {
      id: "3",
      title: "Analysis",
      description: "Advanced algorithms detect abnormalities in blood vessels",
      icon: searchMd,
      color: "from-teal-500 to-green-500"
    },
    {
      id: "4",
      title: "Results",
      description: "Receive detailed diagnosis and severity classification",
      icon: plusSquare,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const benefits = [
    {
      id: "1",
      title: "Early Detection",
      description: "Identifies early stages of diabetic retinopathy before symptoms appear",
      icon: benefitIcon1
    },
    {
      id: "2",
      title: "High Accuracy",
      description: "Trained on thousands of retinal images for precise diagnosis",
      icon: benefitIcon2
    },
    {
      id: "3",
      title: "Fast Results",
      description: "Get results within minutes instead of waiting for specialist appointment",
      icon: benefitIcon3
    },
    {
      id: "4",
      title: "Cost Effective",
      description: "Reduces healthcare costs by enabling early intervention",
      icon: benefitIcon4
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-900">
            Diabetic Retinopathy
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-blue-700">
              AI-Powered Detection
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-800">
            Our advanced AI system analyzes retinal images to detect signs of diabetic retinopathy, 
            enabling early intervention and treatment to prevent vision loss.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Get Started</Button>
            <Button fill="outline">Learn More</Button>
          </div>
        </div>

        {/* How Our Model Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            How Our AI Model Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detectionSteps.map((step) => (
              <div 
                key={step.id} 
                className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                  <img src={step.icon} width={24} height={24} alt={step.title} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{step.title}</h3>
                <p className="text-blue-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src={benefit.icon} width={64} height={64} alt={benefit.title} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{benefit.title}</h3>
                <p className="text-blue-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
            Our AI Model in Action
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Advanced Deep Learning Architecture</h3>
              <p className="text-blue-700 mb-4">
                Our model uses convolutional neural networks (CNNs) trained on thousands of labeled retinal images 
                to identify signs of diabetic retinopathy with high precision.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-blue-700">ResNet-based architecture for feature extraction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-blue-700">Multi-level classification (No DR, Mild, Moderate, Severe, Proliferative)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-blue-700">Real-time processing and analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-blue-700">Continuous learning from new data</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className=" bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-500">
                  AI Model Visualization
                </div>
                <p className="mt-4 text-blue-700">
                  Visualization of the neural network processing a retinal image
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Showcase */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Prediction Accuracy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">98.5%</div>
              <div className="text-cyan-200">Detection Rate</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">97.2%</div>
              <div className="text-cyan-200">Accuracy</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">96.8%</div>
              <div className="text-cyan-200">Sensitivity</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-cyan-100 max-w-2xl mx-auto">
              Our AI model has been validated against clinical standards and demonstrates 
              superior performance in detecting diabetic retinopathy compared to traditional screening methods.
            </p>
          </div>
        </div>
        
        {/* Interactive Prediction Demo */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Try Our AI Prediction
          </h2>
          <PredictionShowcase conditionName="Diabetic Retinopathy" />
        </div>
      </div>
    </Section>
  );
};

export default DiabeticRetinopathySection;