import React from "react";
import Button from "../Button";

const DiabeticRetinopathyCTA = () => {
  return (
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
          <a href="/register-patient">Get Started Today</a>
        </Button>
        <Button fill="outline">
          <a href="/contact">Schedule a Demo</a>
        </Button>
      </div>
    </div>
  );
};

export default DiabeticRetinopathyCTA;