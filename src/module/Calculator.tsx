import React, { useCallback, useMemo, useState } from "react";
import { CalculatorMetric } from "./CalculatorMetric";
import { CalculatorVector } from "./CalculatorVector";
import { NotificationTooltip } from "../common/NotificationTooltip";
import { eventBus } from "../common/eventBus";

declare type Nullable<T> = T | null;

const COUNT = 3;
const INIT_VECTOR: Nullable<number>[] = new Array(COUNT).fill(null);
const INIT_RESULT: {
  evklid: Nullable<number>,
  city: Nullable<number>,
  cheb: Nullable<number>,
} = {
  evklid: null,
  city: null,
  cheb: null,
};

export const Calculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [vector1, setVector1] = useState([...INIT_VECTOR]);
  const [vector2, setVector2] = useState([...INIT_VECTOR]);

  const [result, setResult] = useState({...INIT_RESULT});
  const [normV1, setNormV1] = useState({...INIT_RESULT});
  const [normV2, setNormV2] = useState({...INIT_RESULT});

  const isDisabled = useMemo(() => {
    return vector1.concat(vector2).some(value => value === null);
  }, [vector1, vector2]);

  // // Функція onCalculateValue обчислює три різні норми (Евклідову, міську та Чебишова)
  // // для переданого вектора vectorValue.
  // const onCalculateValue = useCallback((vectorValue: number[]) => {
  //   // Евклідова норма (довжина вектора) — це квадратний корінь із суми квадратів його компонентів.
  //   const evklid = Math.sqrt(vectorValue.reduce((sum, value) => sum + Math.pow(value, 2), 0));

  //   // Міська (таксична) норма — це сума модулів всіх компонентів вектора.
  //   const city = vectorValue.reduce((sum, value) => sum + Math.abs(value), 0);

  //   // Норма Чебишова — це найбільший модуль серед компонентів вектора.
  //   const cheb = Math.max(...vectorValue.map(value => Math.abs(value)));

  //   // Функція повертає обчислені норми з точністю до чотирьох знаків після коми.
  //   return {
  //     evklid: parseFloat(evklid.toFixed(4)),
  //     city:  parseFloat(city.toFixed(4)),
  //     cheb:  parseFloat(cheb.toFixed(4)),
  //   };
  // }, []);


  // // Функція onCalculateResult обчислює різницю між двома векторами vector1 і vector2 
  // // і знаходить їхню норму, використовуючи onCalculateValue.
  // const onCalculateResult = useCallback(() => {
  //   // Створюємо новий масив нульових значень з довжиною COUNT
  //   const vectorValue: number[] = new Array(COUNT).fill(0);

  //   // Обчислюємо різницю між відповідними елементами vector1 та vector2
  //   for (let index = 0; index < COUNT; index++) {
  //     vectorValue[index] = vector1[index] - vector2[index];
  //   }

  //   // Обчислюємо норми для отриманого вектора-різниці
  //   const resultValue = onCalculateValue(vectorValue);

  //   // Зберігаємо результат у стані
  //   setResult({ ...resultValue });
  // }, [isDisabled, vector1, vector2, setResult]);


  // // Функція onCalculateNorm обчислює норми окремо для векторів vector1 та vector2.
  // const onCalculateNorm = useCallback(() => {
  //   // Обчислюємо норми для vector1
  //   const normV1Value = onCalculateValue(vector1);

  //   // Обчислюємо норми для vector2
  //   const normV2Value = onCalculateValue(vector2);

  //   // Зберігаємо результати у стані
  //   setNormV1({...normV1Value});
  //   setNormV2({...normV2Value});
  // }, [isDisabled, vector1, vector2, setResult]);


  const onCalculateValue = useCallback((vectorValue: number[]) => {
    const evklid = Math.sqrt(vectorValue.reduce((sum, value) => sum + Math.pow(value, 2), 0));
    const city = vectorValue.reduce((sum, value) => sum + Math.abs(value), 0);
    const cheb = Math.max(...vectorValue.map(value => Math.abs(value)));

    return {
      evklid: parseFloat(evklid.toFixed(4)),
      city:  parseFloat(city.toFixed(4)),
      cheb:  parseFloat(cheb.toFixed(4)),
    };
  }, []);

  const onCalculateResult = useCallback(() => {
    const vectorValue: number[] = new Array(COUNT).fill(0);
    for (let index = 0; index < COUNT; index++) {
      vectorValue[index] = vector1[index] - vector2[index];
    }

    const resultValue = onCalculateValue(vectorValue);

    setResult({ ...resultValue });
  }, [isDisabled, vector1, vector2, setResult]);

  const onCalculateNorm = useCallback(() => {
    const normV1Value = onCalculateValue(vector1);
    const normV2Value = onCalculateValue(vector2);

    setNormV1({...normV1Value});
    setNormV2({...normV2Value});
  }, [isDisabled, vector1, vector2, setResult]);

  const onCalculate = useCallback(() => {
    if (isDisabled) {
      eventBus.emit('showNotification', { message: 'Перед розрахунком потрібно заповнити всі поля!' });
      return;
    }

    onCalculateResult();
    onCalculateNorm();
  }, [isDisabled, vector1, vector2, setResult]);

  const onClear = useCallback(() => {
    setVector1([...INIT_VECTOR]);
    setVector2([...INIT_VECTOR]);
    setResult({
      ...INIT_RESULT,
    });
    setNormV1({
      ...INIT_RESULT,
    });
    setNormV2({
      ...INIT_RESULT,
    })
  }, [setResult]);

  return (
    <>
      <div className={`flex items-center justify-center min-h-screen p-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}>
        <div className="grid grid-cols-1 gap-[12px]">
          <div className="w-[596px] gap-[16px] mb-2 flex items-start justify-between">
            <p className={isDarkMode ? "text-white/80" : "text-gray-800"}>Калькулятор норм та метрик</p>
            <p className={isDarkMode ? "text-white/80 text-right" : "text-gray-800 text-right"}>
              розробив Денисенко І.О.<br />гр.Б-121-22-1-ПІ
            </p>
          </div>
          {/* Переключатель темы */}
          <div className="w-[596px] flex mb-2 justify-end">
            <button
              className={`py-1 px-3 border rounded ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                  : "bg-gray-300 text-black border-gray-400 hover:bg-gray-400"
              }`}
              onClick={toggleTheme}
            >
              {isDarkMode ? "Світла тема" : "Темна тема"}
            </button>
          </div>
          <CalculatorVector
            isDarkMode={isDarkMode}
            title="Vector 1"
            prefix="x"
            vector={vector1}
            setVector={setVector1}
          />
          <CalculatorVector
            isDarkMode={isDarkMode}
            title="Vector 2"
            prefix="y"
            vector={vector2}
            setVector={setVector2}
          />
          <div className="flex items-center gap-[16px] justify-start">
            <div className="w-[96px]" />
            <div className="flex gap-[8px]">
              <h3 className={`w-[156px] text-lg ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>розмір V1</h3>
              <h3 className={`w-[156px] text-lg ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>відстань V2-V1</h3>
              <h3 className={`w-[156px] text-lg ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>розмір V2</h3>
            </div>
          </div>
          <CalculatorMetric
            title="Evklid"
            value={result.evklid}
            normV1={normV1.evklid}
            normV2={normV2.evklid}
          />
          <CalculatorMetric
            title="City"
            value={result.city}
            normV1={normV1.city}
            normV2={normV2.city}
          />
          <CalculatorMetric
            title="Cheb"
            value={result.cheb}
            normV1={normV1.cheb}
            normV2={normV2.cheb}
          />
          <section className="w-[596px] flex items-center gap-[8px] justify-end">
            <button
              className={`w-[156px] py-2 px-2 border ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white/90 border-gray-600"
                  : "bg-gray-300 hover:bg-gray-400 text-black border-gray-400"
              }`}
              onClick={onClear}
            >
              Clear
            </button>
            <button
              className="w-[156px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 border border-blue-500"
              onClick={onCalculate}
            >
              Calculate
            </button>
          </section>
        </div>
      </div>
      <NotificationTooltip />
    </>
  );
};