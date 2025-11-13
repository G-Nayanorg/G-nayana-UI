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
  plusSquare,
} from "../../assets";

const AiSolutions = () => {
  const detectionSteps = [
    {
      id: "1",
      title: "Image Capture",
      description:
        "High-resolution retinal images captured using fundus cameras or smartphone devices",
      icon: homeSmile,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "2",
      title: "Preprocessing",
      description:
        "Advanced image enhancement and standardization for optimal analysis",
      icon: file02,
      color: "from-cyan-500 to-teal-500",
    },
    {
      id: "3",
      title: "AI Analysis",
      description:
        "Deep learning algorithms analyze images for signs of eye disease",
      icon: searchMd,
      color: "from-teal-500 to-green-500",
    },
    {
      id: "4",
      title: "Results & Report",
      description:
        "Comprehensive diagnostic report with severity classification",
      icon: plusSquare,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const aiSolutions = [
    {
      id: "1",
      title: "Diabetic Retinopathy Detection",
      description:
        "Early detection of diabetic retinopathy through advanced AI analysis of retinal images, preventing vision loss in diabetic patients.",
      icon: benefitIcon1,
      route: "/diabetic-retinopathy",
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Accuracy", value: "98.5%" },
        { label: "Sensitivity", value: "97.2%" },
      ],
    },
    {
      id: "2",
      title: "Glaucoma Screening",
      description:
        "Comprehensive optic nerve assessment for early glaucoma detection and monitoring of disease progression.",
      icon: benefitIcon2,
      route: "/glaucoma",
      color: "from-purple-500 to-indigo-500",
      stats: [
        { label: "Accuracy", value: "96.7%" },
        { label: "Specificity", value: "95.4%" },
      ],
    },
  ];

  const benefits = [
    {
      id: "1",
      title: "Early Detection",
      description:
        "Identifies eye diseases in early stages before symptoms appear, enabling timely intervention",
      icon: benefitIcon1,
    },
    {
      id: "2",
      title: "High Accuracy",
      description:
        "Trained on thousands of validated retinal images with precision comparable to expert ophthalmologists",
      icon: benefitIcon2,
    },
    {
      id: "3",
      title: "Scalable Screening",
      description:
        "Enable large-scale screening programs to reach underserved populations",
      icon: benefitIcon3,
    },
    {
      id: "4",
      title: "Cost Effective",
      description:
        "Reduces healthcare costs by minimizing the need for specialist consultations for initial screening",
      icon: benefitIcon4,
    },
  ];

  const useCases = [
    {
      title: "Primary Healthcare",
      description:
        "Integrate AI screening into primary care settings for routine eye health checks",
    },
    {
      title: "Telemedicine",
      description:
        "Enable remote screening for patients in rural or underserved areas",
    },
    {
      title: "Mass Screening",
      description:
        "Deploy for large-scale screening programs in communities or workplaces",
    },
    {
      title: "Follow-up Monitoring",
      description:
        "Track disease progression and treatment effectiveness over time",
    },
  ];

  return (
    <Section
      className="bg-gradient-to-b from-blue-50 to-white py-16"
      id="ai-solutions"
    >
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-900">
            AI-Powered Eye Care
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-blue-700">
              Transforming Diagnostics with Artificial Intelligence
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-800">
            Advanced AI solutions for early detection and screening of
            vision-threatening eye diseases, bringing expert-level diagnostics
            to primary care settings.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button>
              <Link to="/diabetic-retinopathy">
                Explore Diabetic Retinopathy
              </Link>
            </Button>
            <Button fill="outline">
              <Link to="/glaucoma">Explore Glaucoma Detection</Link>
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            How Our AI Diagnostics Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detectionSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <img
                    src={step.icon}
                    width={32}
                    height={32}
                    alt={step.title}
                    className="text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {step.title}
                </h3>
                <p className="text-blue-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Solutions Overview */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Our AI Diagnostic Solutions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiSolutions.map((solution) => (
              <div
                key={solution.id}
                className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 group"
              >
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

                    <Link
                      to={solution.route}
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Why Choose AI-Powered Diagnostics?
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

        {/* Use Cases */}
        <div className="mb-20">
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

        {/* Technology Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-blue-100">
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

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Eye Care in Your Practice
          </h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-8">
            Implement our AI-powered diagnostic tools to improve patient
            outcomes, increase efficiency, and expand access to quality eye
            care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>
              <Link to="/register-patient">Get Started Today</Link>
            </Button>
            <Button fill="outline">
              <Link to="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AiSolutions;
