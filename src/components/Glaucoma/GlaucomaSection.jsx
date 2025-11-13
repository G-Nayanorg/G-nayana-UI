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

const GlaucomaSection = () => {
  const detectionSteps = [
    {
      id: "1",
      title: "Optic Nerve Scan",
      description: "Capture detailed images of the optic nerve and surrounding tissue",
      icon: homeSmile,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "2",
      title: "AI Analysis",
      description: "Our ML model assesses optic nerve health and cup-to-disc ratio",
      icon: file02,
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "3",
      title: "Pattern Recognition",
      description: "Advanced algorithms detect changes in optic nerve structure",
      icon: searchMd,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "4",
      title: "Risk Assessment",
      description: "Comprehensive evaluation of glaucoma risk and progression",
      icon: plusSquare,
      color: "from-cyan-500 to-teal-500"
    }
  ];

  const benefits = [
    {
      id: "1",
      title: "Early Detection",
      description: "Identifies glaucoma in early stages before irreversible damage occurs",
      icon: benefitIcon1
    },
    {
      id: "2",
      title: "High Precision",
      description: "Trained on diverse datasets for accurate glaucoma detection across populations",
      icon: benefitIcon2
    },
    {
      id: "3",
      title: "Non-invasive",
      description: "Uses standard retinal imaging without uncomfortable procedures",
      icon: benefitIcon3
    },
    {
      id: "4",
      title: "Monitoring",
      description: "Tracks changes over time to assess treatment effectiveness",
      icon: benefitIcon4
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-purple-900">
            Glaucoma Detection
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-purple-700">
              Advanced AI Analysis
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-purple-800">
            Our AI-powered system analyzes retinal images to detect early signs of glaucoma, 
            enabling timely treatment to preserve vision and prevent irreversible damage.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Get Started</Button>
            <Button fill="outline">Learn More</Button>
          </div>
        </div>

        {/* How Our Model Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
            How Our AI Model Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detectionSteps.map((step) => (
              <div 
                key={step.id} 
                className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                  <img src={step.icon} width={24} height={24} alt={step.title} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-900">{step.title}</h3>
                <p className="text-purple-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src={benefit.icon} width={64} height={64} alt={benefit.title} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-900">{benefit.title}</h3>
                <p className="text-purple-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-purple-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-900">
            Our AI Model in Action
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-800">Deep Learning for Glaucoma Detection</h3>
              <p className="text-purple-700 mb-4">
                Our model uses advanced computer vision techniques to analyze optic nerve images 
                and detect characteristic changes associated with glaucoma.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-purple-700">Optic disc and cup segmentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-purple-700">Cup-to-disc ratio calculation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-purple-700">Retinal nerve fiber layer analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-purple-700">Progression tracking algorithms</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className=" bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-500">
                  Glaucoma AI Model Visualization
                </div>
                <p className="mt-4 text-purple-700">
                  Visualization of the neural network analyzing optic nerve structure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Showcase */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Prediction Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">96.7%</div>
              <div className="text-indigo-200">Detection Rate</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">95.4%</div>
              <div className="text-indigo-200">Accuracy</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-4xl font-bold mb-2">94.9%</div>
              <div className="text-indigo-200">Specificity</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-indigo-100 max-w-2xl mx-auto">
              Our AI model demonstrates exceptional performance in detecting glaucoma, 
              allowing for early intervention to preserve patients' vision.
            </p>
          </div>
        </div>
        
        {/* Interactive Prediction Demo */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
            Try Our AI Prediction
          </h2>
          <PredictionShowcase conditionName="Glaucoma" />
        </div>
      </div>
    </Section>
  );
};

export default GlaucomaSection;