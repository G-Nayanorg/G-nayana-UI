import React from "react";
import Section from "../Section";

// Import individual section components
import DiabeticRetinopathyHero from "./DiabeticRetinopathyHero";
import DiabeticRetinopathyHowItWorks from "./DiabeticRetinopathyHowItWorks";
import DiabeticRetinopathySolutions from "./DiabeticRetinopathySolutions";
import DiabeticRetinopathyBenefits from "./DiabeticRetinopathyBenefits";
import DiabeticRetinopathyUseCases from "./DiabeticRetinopathyUseCases";
import DiabeticRetinopathyTechnology from "./DiabeticRetinopathyTechnology";
import DiabeticRetinopathyCTA from "./DiabeticRetinopathyCTA";

// Import assets
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

const DiabeticRetinopathyPage = () => {
  const detectionSteps = [
    {
      id: "1",
      title: "Image Capture",
      description: "High-resolution retinal images captured using fundus cameras or smartphone devices",
      icon: homeSmile,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "2",
      title: "Preprocessing",
      description: "Advanced image enhancement and standardization for optimal analysis",
      icon: file02,
      color: "from-cyan-500 to-teal-500",
    },
    {
      id: "3",
      title: "AI Analysis",
      description: "Deep learning algorithms analyze images for signs of eye disease",
      icon: searchMd,
      color: "from-teal-500 to-green-500",
    },
    {
      id: "4",
      title: "Results & Report",
      description: "Comprehensive diagnostic report with severity classification",
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
    <Section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container">
        {/* Hero Section */}
        <DiabeticRetinopathyHero />

        {/* How It Works */}
        <DiabeticRetinopathyHowItWorks detectionSteps={detectionSteps} />

        {/* AI Solutions Overview */}
        <DiabeticRetinopathySolutions aiSolutions={aiSolutions} />

        {/* Key Benefits */}
        <DiabeticRetinopathyBenefits benefits={benefits} />

        {/* Use Cases */}
        <DiabeticRetinopathyUseCases useCases={useCases} />

        {/* Technology Overview */}
        <DiabeticRetinopathyTechnology />

        {/* Call to Action */}
        <DiabeticRetinopathyCTA />
      </div>
    </Section>
  );
};

export default DiabeticRetinopathyPage;