export default function Coordinates({ coords }: { coords: number[][] }) {
  return (
    <div className="coordinate-container">
      {coords.map((items, idx) => {
        return (
          <div
            className="coordinate"
            key={idx}
            style={{
              position: "absolute",
              left: `${items[0]}%`,
              top: `${items[1]}%`,
              transition: "0.3s",
            }}
          ></div>
        );
      })}
      {coords.map((items, idx) => {
        return (
          <div
            className="line"
            key={idx}
            style={{
              left: `${items[0]}%`,
              top: `${items[1]}%`,
              width: "1%",
            }}
          ></div>
        );
      })}
    </div>
  );
}
