export default function Stats({
  currentPathDistance,
  bestPathDistance,
}: {
  currentPathDistance: number;
  bestPathDistance: number;
}) {
  return (
    <div className="stats-info-container">
      <p className="stats">
        <span className="current-path-distance-label">
          Current Path Distance:
        </span>
        <span className="current-path-distance">{currentPathDistance}km</span>
      </p>
      <p className="stats">
        <span className="best-path-distance-label">Best Path Distance:</span>
        <span className="best-path-distance">
          {bestPathDistance === Infinity ? 0 : bestPathDistance}km
        </span>
      </p>
    </div>
  );
}
