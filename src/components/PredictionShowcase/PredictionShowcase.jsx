import React, { useState } from "react";
import { Button } from "../ui/button";
import { Upload, Eye, EyeOff, Activity, RotateCcw } from "lucide-react";
import { FileUpload } from "../ui/file-upload";

const PredictionShowcase = ({ conditionName }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Simulate AI prediction
        simulatePrediction();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulatePrediction = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Generate random prediction results for demo purposes
      const results = conditionName === "Diabetic Retinopathy" 
        ? {
            condition: "Moderate Non-Proliferative Diabetic Retinopathy",
            confidence: 92,
            stage: "Stage 2 of 5",
            recommendations: [
              "Schedule follow-up exam in 3 months",
              "Maintain tight blood sugar control",
              "Monitor blood pressure",
              "Consider consultation with retinal specialist"
            ],
            keyFindings: [
              "Multiple hemorrhages detected",
              "Hard exudates present", 
              "Microaneurysms identified"
            ]
          }
        : {
            condition: "Early Glaucoma Suspect",
            confidence: 87,
            stage: "Early Stage",
            recommendations: [
              "Schedule follow-up exam in 6 months",
              "Monitor intraocular pressure",
              "Visual field testing recommended",
              "Family history screening advised"
            ],
            keyFindings: [
              "Optic disc changes noted",
              "Cup-to-disc ratio elevated",
              "Nerve fiber layer thinning"
            ]
          };
      
      setPredictionResult(results);
      setIsLoading(false);
      setShowResult(true);
    }, 3000); // 3 seconds simulation time
  };

  const resetPrediction = () => {
    setSelectedImage(null);
    setPredictionResult(null);
    setShowResult(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            {conditionName} Prediction System
          </h3>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800">Upload Retinal Image</h4>
              
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded retina" 
                    className="w-full h-64 object-contain rounded-lg border-2 border-gray-200"
                  />
                  <Button 
                    onClick={resetPrediction}
                    variant="outline" 
                    className="mt-4 w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Upload Different Image
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop a retinal image here, or click to select
                  </p>
                  <FileUpload onChange={handleImageUpload} />
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h5 className="font-semibold text-blue-800 mb-2">Image Requirements:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Clear retinal fundus photograph</li>
                  <li>• Minimum 512x512 pixels</li>
                  <li>• Centered optic disc and macula</li>
                  <li>• Good lighting and focus</li>
                </ul>
              </div>
            </div>
            
            {/* Prediction Results Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800">Analysis Results</h4>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Analyzing image with AI model...</p>
                  <p className="text-sm text-gray-500 mt-2">This typically takes 10-30 seconds</p>
                </div>
              ) : showResult && predictionResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-green-800">Prediction Result</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-700">
                          Confidence: {predictionResult.confidence}%
                        </span>
                        <Eye className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-800 mt-2">{predictionResult.condition}</p>
                    <p className="text-sm text-green-600">{predictionResult.stage}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Key Findings:</h5>
                      <ul className="space-y-1">
                        {predictionResult.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span className="text-gray-700">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Recommendations:</h5>
                      <ul className="space-y-1">
                        {predictionResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowResult(!showResult)}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {showResult ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showResult ? 'Hide' : 'Show'} Details
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Activity className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center">
                    {selectedImage 
                      ? "Click 'Analyze' to get AI prediction" 
                      : "Upload a retinal image to see AI analysis"}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {selectedImage && !isLoading && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={simulatePrediction}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                {isLoading ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionShowcase;