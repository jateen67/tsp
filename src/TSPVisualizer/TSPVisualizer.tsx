import { useEffect, useState } from "react";
import * as algorithms from "../algorithms/algorithms";
import "./TSPVisualizer.css";

export default function TSPVisualizer() {
  const [coords, setCoords] = useState<number[][]>([]);

  useEffect(() => {
    resetCoords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const depthFirstSearch = () => {
    const { path, totalDistance, animations } =
      algorithms.depthFirstSearch(coords);
    //console.log(path);
    //console.log(totalDistance);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const { cross, backtrack } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "red") {
            lines[i].style.backgroundColor = "transparent";
          }
        }
        if (cross != undefined) {
          const x2 = cross[0][0];
          const x1 = cross[1][0];
          const y2 = cross[0][1];
          const y1 = cross[1][1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
          if (x2 > x1) {
            angle += 180;
          }
          lines[cross[0][2]].style.backgroundColor = "red";
          lines[cross[0][2]].style.width = `${distance}%`;
          lines[cross[0][2]].style.transform = `rotate(${angle}deg)`;
        }
        if (backtrack != undefined) {
          lines[backtrack[1][2]].style.backgroundColor = "transparent";
        }
      }, i * 500);
    }
  };

  const nearestNeighbour = () => {
    const animations = algorithms.nearestNeighbor(coords).animations;
    for (let i = 0; i < animations.length; i++) {
      const { compare, cross } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "red") {
            lines[i].style.backgroundColor = "transparent";
          }
        }
        if (compare != undefined) {
          const x2 = compare[0][0];
          const x1 = compare[1][0];
          const y2 = compare[0][1];
          const y1 = compare[1][1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
          if (x2 > x1) {
            angle += 180;
          }
          lines[compare[0][2]].style.backgroundColor = "blue";
          lines[compare[0][2]].style.width = `${distance}%`;
          lines[compare[0][2]].style.transform = `rotate(${angle}deg)`;
        }
        if (cross != undefined) {
          const x2 = cross[0][0];
          const x1 = cross[1][0];
          const y2 = cross[0][1];
          const y1 = cross[1][1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
          if (x2 > x1) {
            angle += 180;
          }
          lines[cross[0][2]].style.backgroundColor = "red";
          lines[cross[0][2]].style.width = `${distance}%`;
          lines[cross[0][2]].style.transform = `rotate(${angle}deg)`;
        }
      }, i * 500);
    }
  };

  const simulatedAnnealing = () => {
    return 0;
  };

  const bruteForce = () => {
    return 0;
  };

  const randomCoordFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetCoords = () => {
    const lines = document.getElementsByClassName(
      "line"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < lines.length; i++) {
      lines[i].style.backgroundColor = "rgba(255, 255, 255, 0)";
    }

    const newCoords: number[][] = [];

    for (let i = 0; i < 3; i++) {
      let coord = [
        randomCoordFromInterval(0, 100),
        randomCoordFromInterval(0, 100),
        i,
      ];

      while (isArrayInArray(newCoords, coord)) {
        coord = [
          randomCoordFromInterval(0, 100),
          randomCoordFromInterval(0, 100),
          i,
        ];
      }

      newCoords.push(coord);
    }
    setCoords([...newCoords]);
  };

  const isArrayInArray = (array: number[][], item: number[]) => {
    const itemAsString = JSON.stringify(item);

    const contains = array.some(function (ele) {
      return JSON.stringify(ele) === itemAsString;
    });

    return contains;
  };

  return (
    <div className="container">
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
              }}
            >
              {items[0]}, {items[1]}
            </div>
          );
        })}
        {coords.map((items, idx) => {
          const x1 = coords[0][0];
          const x2 = items[0];
          const y1 = coords[0][1];
          const y2 = items[1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          return (
            <div
              className="line"
              key={idx}
              style={{
                left: `${items[0]}%`,
                top: `${items[1]}%`,
                width: `${distance}%`,
              }}
            ></div>
          );
        })}
      </div>
      <button onClick={resetCoords}>Generate New Coordinates</button>
      <button onClick={nearestNeighbour}>Nearest Neighbour</button>
      <button onClick={simulatedAnnealing}>Simulated Annealing</button>
      <button onClick={depthFirstSearch}>Depth First Search</button>
      <button onClick={bruteForce}>Brute Force</button>
    </div>
  );
}
