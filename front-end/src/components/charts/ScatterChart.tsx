import React, { useState, ChangeEvent } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import regression from 'regression';

// Register necessary components for Scatter chart
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

// Define types
interface ExerciseData {
  [category: string]: {
    [exercise: string]: number; // Adjust type if needed
  };
}

interface ScatterChartProps {
  data: ExerciseData[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data }) => {
  const [xCategory, setXCategory] = useState<string>('');
  const [xExercise, setXExercise] = useState<string>('');
  const [yCategory, setYCategory] = useState<string>('');
  const [yExercise, setYExercise] = useState<string>('');
  const [showRegression, setShowRegression] = useState<boolean>(true);
  const [pointColor, setPointColor] = useState<string>('rgba(75, 192, 192, 1)');
  const [lineColor, setLineColor] = useState<string>('rgba(75, 192, 192, 1)');
  const [startFromZero, setStartFromZero] = useState<boolean>(true);

  // Extract categories dynamically from data
  const categories: Record<string, string[]> = {};
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'object' && item[key] !== null) {
        categories[key] = Object.keys(item[key]);
      } else if (typeof item[key] === 'number') {
        if (!categories[key]) categories[key] = [];
      }
    });
  });

  // Handle category and exercise changes
  const handleXCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setXCategory(event.target.value);
    setXExercise(''); // Reset exercise selection when changing category
  };

  const handleXExerciseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setXExercise(event.target.value);
  };

  const handleYCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYCategory(event.target.value);
    setYExercise(''); // Reset exercise selection when changing category
  };

  const handleYExerciseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYExercise(event.target.value);
  };

  const handleStartFromZeroChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartFromZero(event.target.checked);
  };

  // Prepare data for the scatter plot
  const filteredData = data
    .map(item => {
      const xValue = xCategory && xExercise ? item[xCategory]?.[xExercise] : item[xCategory];
      const yValue = yCategory && yExercise ? item[yCategory]?.[yExercise] : item[yCategory];

      if (xValue != null && yValue != null) {
        return { x: xValue, y: yValue };
      }
      return null;
    })
    .filter((item): item is { x: number; y: number } => item !== null);

  // Perform regression if needed
  const regressionResult = showRegression ? regression.linear(filteredData.map(point => [point.x, point.y])) : null;
  const regressionEquation = regressionResult ? `y = ${regressionResult.equation[0].toFixed(2)}x + ${regressionResult.equation[1].toFixed(2)}` : '';
  const rSquared = regressionResult ? `R² = ${regressionResult.r2.toFixed(2)}` : '';

  // Prepare scatter chart data
  const chartData = {
    datasets: [
      {
        label: `${xExercise || xCategory || 'X'} vs ${yExercise || yCategory || 'Y'}`,
        data: filteredData,
        backgroundColor: pointColor,
        borderColor: pointColor,
        borderWidth: 1,
        showLine: false, // No line for data points
      },
      {
        label: 'Line of Best Fit',
        data: regressionResult ? regressionResult.points.map(([x, y]) => ({ x, y })) : [],
        borderColor: lineColor,
        borderWidth: 2,
        showLine: true,
        fill: false, // No fill for line of best fit
        pointRadius: 0, // Make points on line of best fit invisible
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: xExercise || xCategory || 'X-Axis',
        },
        min: startFromZero ? 0 : undefined,
      },
      y: {
        title: {
          display: true,
          text: yExercise || yCategory || 'Y-Axis',
        },
        min: startFromZero ? 0 : undefined,
      },
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label>X-Axis Category:</label>
            <select value={xCategory} onChange={handleXCategoryChange}>
              <option value="">Select Category</option>
              {Object.keys(categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {xCategory && (
              <div>
                <label>X-Axis Exercise:</label>
                <select value={xExercise} onChange={handleXExerciseChange}>
                  <option value="">Select Exercise</option>
                  {(categories[xCategory] || []).map(exercise => (
                    <option key={exercise} value={exercise}>{exercise}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label>Y-Axis Category:</label>
            <select value={yCategory} onChange={handleYCategoryChange}>
              <option value="">Select Category</option>
              {Object.keys(categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {yCategory && (
              <div>
                <label>Y-Axis Exercise:</label>
                <select value={yExercise} onChange={handleYExerciseChange}>
                  <option value="">Select Exercise</option>
                  {(categories[yCategory] || []).map(exercise => (
                    <option key={exercise} value={exercise}>{exercise}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Additional controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <label>Show Line of Best Fit: </label>
            <input type="checkbox" checked={showRegression} onChange={(e) => setShowRegression(e.target.checked)} />
          </div>
          <div>
            <label>Point Color: </label>
            <input type="color" value={pointColor} onChange={(e) => setPointColor(e.target.value)} />
          </div>
          <div>
            <label>Line Color: </label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
          </div>
          <div>
            <label>Start Axis from Zero: </label>
            <input type="checkbox" checked={startFromZero} onChange={handleStartFromZeroChange} />
          </div>
        </div>
      </div>

      {showRegression && regressionResult && (
        <div style={{ marginTop: '16px' }}>
          <strong>Equation of the Line of Best Fit:</strong>
          <p>{regressionEquation}</p>
          <strong>R² Value:</strong>
          <p>{rSquared}</p>
        </div>
      )}

      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterChart;
