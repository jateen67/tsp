export default function Legend() {
  return (
    <div className="legend-container">
      <div className="legend-label">
        <span>Legend</span>
      </div>
      <div className="points-legend-container">
        <div className="legend-item legend-red-point-container">
          <div className="legend-red-point"></div>
          <p>Starting Point</p>
        </div>
        <div className="legend-item legend-blue-point-container">
          <div className="legend-blue-point"></div>
          <p>Other Points</p>
        </div>
      </div>
      <div className="lines-legend-container">
        <div className="line-item legend-item legend-orange-line-container">
          <div className="legend-orange-line"></div>
          <p>Analyzing Path</p>
        </div>
        <div className="line-item legend-item legend-grey-line-container">
          <div className="legend-grey-line"></div>
          <p>Crossed Path</p>
        </div>
        <div className="line-item legend-item legend-green-line-container">
          <div className="legend-green-line"></div>
          <p>Finalized Path</p>
        </div>
      </div>
    </div>
  );
}
