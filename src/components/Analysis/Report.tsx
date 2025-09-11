import React from "react";
// import Image from 'next/image';

interface EyeData {
  predicted_class: number;
  Stage: string;
  confidence: number;
  explanation: string;
  Note: string;
  Risk_Factor: number;
}

interface ReportProps {
  patientId: string;
  leftEyeImage: string;
  rightEyeImage: string;
  leftEyeData: EyeData;
  rightEyeData: EyeData;
}

export function Report({
  leftEyeImage,
  rightEyeImage,
  leftEyeData,
  rightEyeData,
}: ReportProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black border-2 border-blue-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Patient Report
      </h1>

      <table className="table-auto w-full border-collapse border border-blue-300 mb-8">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-blue-300 px-4 py-2 text-blue-800">
              Attribute
            </th>
            <th className="border border-blue-300 px-4 py-2 text-blue-800">
                Right Eye
            </th>
            <th className="border border-blue-300 px-4 py-2 text-blue-800">
              {/* Right Eye */} Left Eye
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-center text-blue-700">
              Image
            </td>
            <td className="border border-blue-300 px-4 py-2 text-center">
              <div className="w-32 h-32 mx-auto bg-black flex items-center justify-center rounded-md">
                {/* <Image 
                  src={leftEyeImage} 
                  alt="Left Eye" 
                  width={128} 
                  height={128} 
                  className="object-cover rounded-md"
                /> */}
                {/* <img
                  src={leftEyeImage}
                  alt="Left Eye"
                  width={128}
                  height={128}
                  className="object-cover rounded-md"
                /> */}
                 <img
                  src={rightEyeImage}
                  alt="Right Eye"
                  width={128}
                  height={128}
                  className="object-cover rounded-md"
                />
              </div>
            </td>
            <td className="border border-blue-300 px-4 py-2 text-center">
              <div className="w-32 h-32 mx-auto bg-black flex items-center justify-center rounded-md">
                {/* <img
                  src={rightEyeImage}
                  alt="Right Eye"
                  width={128}
                  height={128}
                  className="object-cover rounded-md"
                /> */}
                <img
                  src={leftEyeImage}
                  alt="Left Eye"
                  width={128}
                  height={128}
                  className="object-cover rounded-md"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Predicted Class
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.predicted_class} */}
               {rightEyeData.predicted_class}
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.predicted_class} */}
              {leftEyeData.predicted_class}
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Stage
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.Stage} */}  {rightEyeData.Stage}
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.Stage} */}{leftEyeData.Stage}
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Confidence
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.confidence.toFixed(2)}% */}
                {rightEyeData.confidence.toFixed(2)}%
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.confidence.toFixed(2)}% */}
              {leftEyeData.confidence.toFixed(2)}%
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Risk Factor
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.Risk_Factor} */}
                {rightEyeData.Risk_Factor}
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.Risk_Factor} */}
              {leftEyeData.Risk_Factor}
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Explanation
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.explanation} */}
               {rightEyeData.explanation}
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.explanation} */}
              {leftEyeData.explanation}
            </td>
          </tr>
          <tr>
            <td className="border border-blue-300 px-4 py-2 font-semibold text-blue-700">
              Note
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {leftEyeData.Note} */}
                   {rightEyeData.Note}
            </td>
            <td className="border border-blue-300 px-4 py-2">
              {/* {rightEyeData.Note} */}
              {leftEyeData.Note}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          This report is generated by{" "}
          <span className="font-bold text-blue-700">
            G-Nayana AI-powered Diabetic Retinopathy Analysis System
          </span>
          .
        </p>
        <p>
          Please consult with a healthcare professional for a comprehensive
          evaluation.
        </p>
      </div>
    </div>
  );
}