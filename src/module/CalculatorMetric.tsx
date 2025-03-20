import React from "react";

type Props = {
  isDarkMode?: boolean;
  title: string;
  value: number;
  normV1: number;
  normV2: number;
}

export const CalculatorMetric = ({ isDarkMode, title, value, normV1, normV2 }: Props) => {
  return (
    <div className="flex items-center gap-[16px] justify-start">
      <h3 className={`w-[96px] text-lg ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{title}</h3>
      <div className="flex gap-[8px]">
        <input
          type="text"
          readOnly={true}
          placeholder="-"
          value={normV1 ?? ''}
          className={`w-[156px] rounded px-3 py-2 focus:outline-none focus:ring-1 ${
            isDarkMode
              ? "bg-gray-700 text-white border border-gray-600 focus:ring-white/80"
              : "bg-gray-200 text-black border border-gray-400 focus:ring-gray-600"
          }`}
        />
        <input
          type="text"
          readOnly={true}
          placeholder="-"
          value={value ?? ''}
          className={`w-[156px] rounded px-3 py-2 focus:outline-none focus:ring-1 ${
            isDarkMode
              ? "bg-gray-700 text-white border border-gray-600 focus:ring-white/80"
              : "bg-gray-200 text-black border border-gray-400 focus:ring-gray-600"
          }`}
        />
        <input
          type="text"
          readOnly={true}
          placeholder="-"
          value={normV2 ?? ''}
          className={`w-[156px] rounded px-3 py-2 focus:outline-none focus:ring-1 ${
            isDarkMode
              ? "bg-gray-700 text-white border border-gray-600 focus:ring-white/80"
              : "bg-gray-200 text-black border border-gray-400 focus:ring-gray-600"
          }`}
        />    
      </div>
    </div>
  );
};
