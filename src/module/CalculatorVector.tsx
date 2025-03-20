import React, { useCallback } from "react";

type Props = {
  isDarkMode?: boolean;
  title: string;
  prefix: string;
  vector: number[];
  setVector: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CalculatorVector = ({ isDarkMode, title, prefix, vector, setVector }: Props) => {
  const onChange = useCallback((index: number, value: string) => {
    setVector(prev => {
      const nextVector = [...prev];
      nextVector[index] = parseFloat(value);
      return nextVector;
    })
  }, []);

  return (
    <div className="flex items-center gap-[16px] justify-start">
      <h3 className={`w-[96px] text-lg ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{title}</h3>
      <div className="flex gap-[8px]">
        {new Array(3).fill('').map((_, index) => (
          <input
            key={`${prefix}_${index}`}
            type="number"
            placeholder={`${prefix}${index + 1}`}
            step={1}
            className={`w-[156px] rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              isDarkMode
                ? "bg-gray-700 text-white border border-gray-600 focus:ring-white/80"
                : "bg-gray-200 text-black border border-gray-400 focus:ring-gray-600"
            }`}
            value={vector[index] ?? ''}
            onChange={(e) => onChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
