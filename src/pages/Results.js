import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaCheckCircle, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import './Results.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Results = () => {
  // Chart Data
  const accuracyData = {
    labels: ['Tadasana', 'Vrikshasana', 'Trikonasana', 'Bhujangasana', 'Vajrasana', 'Padmasana'],
    datasets: [
      {
        label: 'Detection Accuracy (%)',
        data: [95, 92, 88, 94, 90, 86],
        backgroundColor: 'rgba(161, 119, 180, 0.6)',
        borderColor: 'rgba(161, 119, 180, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const precisionRecallData = {
    labels: ['Precision', 'Recall', 'F1-Score'],
    datasets: [
      {
        data: [94, 91, 92.5],
        backgroundColor: [
          'rgba(161, 119, 180, 0.8)',
          'rgba(159, 197, 167, 0.8)',
          'rgba(243, 156, 18, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Average Accuracy',
        data: [75, 80, 85, 88, 91, 93],
        borderColor: 'rgba(161, 119, 180, 1)',
        backgroundColor: 'rgba(161, 119, 180, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const observations = [
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'High Detection Accuracy',
      description: 'The system achieves 90%+ accuracy for most standard yoga poses when proper lighting and positioning are maintained.'
    },
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'Real-time Processing',
      description: 'Pose detection runs at 30+ FPS, providing smooth real-time feedback without noticeable lag.'
    },
    {
      type: 'warning',
      icon: <FaExclamationCircle />,
      title: 'Similar Pose Confusion',
      description: 'Some poses with similar body positions may occasionally be confused, particularly intermediate poses.'
    },
    {
      type: 'success',
      icon: <FaCheckCircle />,
      title: 'Progressive Improvement',
      description: 'Model accuracy improves with additional training data and user feedback integration.'
    }
  ];

  const metrics = [
    { label: 'Overall Accuracy', value: '91.5%', color: '#a177b4' },
    { label: 'Precision', value: '94%', color: '#9fc5a7' },
    { label: 'Recall', value: '91%', color: '#f39c12' },
    { label: 'F1-Score', value: '92.5%', color: '#3498db' },
  ];

  return (
    <div className="results-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Performance</span>
          <h1>Results & Analysis</h1>
          <p>
            Detailed performance metrics and accuracy analysis of our 
            AI-powered yoga pose detection system.
          </p>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="section metrics-section">
        <div className="container">
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div 
                  className="metric-value" 
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="section charts-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <span>Visual Analytics</span>
            <h2>Performance Charts</h2>
          </div>
          
          <div className="charts-grid">
            <div className="chart-container">
              <h3>Accuracy by Pose Type</h3>
              <div className="chart-wrapper">
                <Bar data={accuracyData} options={chartOptions} />
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Model Performance Metrics</h3>
              <div className="chart-wrapper doughnut">
                <Doughnut data={precisionRecallData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="chart-container full-width">
            <h3>Accuracy Improvement Over Time</h3>
            <div className="chart-wrapper">
              <Line data={performanceData} options={chartOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Precision & Recall Explanation */}
      <section className="section explanation-section">
        <div className="container">
          <div className="explanation-grid">
            <div className="explanation-card">
              <h3>Precision</h3>
              <p>
                Precision measures how many of the poses the system identified 
                as correct were actually correct. Our 94% precision means that 
                when the system says you're doing a pose correctly, it's right 
                94% of the time.
              </p>
              <div className="formula">
                Precision = True Positives / (True Positives + False Positives)
              </div>
            </div>
            
            <div className="explanation-card">
              <h3>Recall</h3>
              <p>
                Recall measures how many of the actual correct poses were 
                successfully identified by the system. Our 91% recall means 
                the system catches 91% of all correct pose attempts.
              </p>
              <div className="formula">
                Recall = True Positives / (True Positives + False Negatives)
              </div>
            </div>
            
            <div className="explanation-card">
              <h3>F1-Score</h3>
              <p>
                The F1-Score is the harmonic mean of precision and recall, 
                providing a single metric that balances both. Our 92.5% F1-Score 
                indicates excellent overall model performance.
              </p>
              <div className="formula">
                F1 = 2 × (Precision × Recall) / (Precision + Recall)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Observations */}
      <section className="section observations-section">
        <div className="container">
          <div className="section-title">
            <span>Key Insights</span>
            <h2>Observations</h2>
          </div>
          
          <div className="observations-grid">
            {observations.map((obs, index) => (
              <div key={index} className={`observation-card ${obs.type}`}>
                <div className="observation-icon">
                  {obs.icon}
                </div>
                <div className="observation-content">
                  <h4>{obs.title}</h4>
                  <p>{obs.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Improvements */}
      <section className="section improvements-section gradient-bg-light">
        <div className="container">
          <div className="section-title">
            <span>Roadmap</span>
            <h2>Future Improvements</h2>
          </div>
          
          <div className="improvements-grid">
            <div className="improvement-item">
              <FaChartLine />
              <h4>More Poses</h4>
              <p>Expanding the library to include 50+ yoga poses</p>
            </div>
            <div className="improvement-item">
              <FaChartLine />
              <h4>Better Accuracy</h4>
              <p>Training on larger datasets for improved detection</p>
            </div>
            <div className="improvement-item">
              <FaChartLine />
              <h4>Voice Guidance</h4>
              <p>Adding audio instructions and real-time voice feedback</p>
            </div>
            <div className="improvement-item">
              <FaChartLine />
              <h4>Progress Tracking</h4>
              <p>Personal analytics and improvement tracking over time</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
