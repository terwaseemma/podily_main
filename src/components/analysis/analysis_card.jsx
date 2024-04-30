import React from 'react';
import './AnalysisCard.css'; // Import the CSS file for styling

const AnalysisCard = ({ title, percentage, feedback }) => {
  return (
    <div className="analysis-card">
      <div className="card-header">
        <h4>{title}</h4>
        <span className="percentage">{percentage}%</span>
      </div>
      <div className="card-body">
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default AnalysisCard;