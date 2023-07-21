import { SetStateAction, useEffect, useState } from "react";
import * as algorithms from "../algorithms/algorithms";

export default function TSPVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("Nearest Neighbour");
  const [coordsAmount, setCoordsAmount] = useState<string>("3");
  const [coords, setCoords] = useState<number[][]>([]);

  useEffect(() => {
    plot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nearestNeighbour = () => {
    clearLines();
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

  const depthFirstSearch = () => {
    clearLines();
    const { path, totalDistance, animations } =
      algorithms.depthFirstSearch(coords);
    for (let i = 0; i < animations.length; i++) {
      const { cross, backtrack, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
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
          const x1 = cross[1][0];
          const x2 = cross[0][0];
          const y1 = cross[1][1];
          const y2 = cross[0][1];
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
          lines[backtrack[0][2]].style.backgroundColor = "transparent";
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 1; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 > x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "red";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
        }
      }, i * 500);
    }
  };

  const simulatedAnnealing = () => {
    clearLines();
    const xLength = coords[0][0] - coords[1][0];
    const yLength = coords[0][1] - coords[1][1];
    const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
    const { path, totalDistance, animations } = algorithms.simulatedAnnealing(
      coords,
      100 * distance,
      1 - 1e-4,
      1e-6
    );
    for (let i = 0; i < animations.length; i++) {
      const { compare, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
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
          for (let i = 0; i < compare.length - 1; i++) {
            const x2 = compare[i][0];
            const x1 = compare[i + 1][0];
            const y2 = compare[i][1];
            const y1 = compare[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 > x1) {
              angle += 180;
            }
            lines[compare[i][2]].style.backgroundColor = "blue";
            lines[compare[i][2]].style.width = `${distance}%`;
            lines[compare[i][2]].style.transform = `rotate(${angle}deg)`;
          }
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 1; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 > x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "red";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
        }
      }, i * 500);
    }
  };

  const branchAndBound = () => {
    clearLines();
    const { path, totalDistance, animations } =
      algorithms.branchAndBound(coords);
    for (let i = 0; i < animations.length; i++) {
      const { cross, backtrack, compare, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
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
        if (backtrack != undefined) {
          lines[backtrack[0][2]].style.backgroundColor = "transparent";
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 1; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 > x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "red";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
        }
      }, i * 500);
    }
  };

  const randomCoordFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const plot = () => {
    clearLines();

    const newCoords: number[][] = [];

    for (let i = 0; i < Number(coordsAmount); i++) {
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

  const changeSelectedAlgorithm = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedAlgorithm(e.target.value);
  };

  const isArrayInArray = (array: number[][], item: number[]) => {
    const itemAsString = JSON.stringify(item);

    const contains = array.some(function (ele) {
      return JSON.stringify(ele) === itemAsString;
    });

    return contains;
  };

  const play = () => {
    switch (selectedAlgorithm) {
      case "Nearest Neighbour":
        nearestNeighbour();
        break;
      case "Depth First Search":
        depthFirstSearch();
        break;
      case "Simulated Annealing":
        simulatedAnnealing();
        break;
      case "Branch and Bound":
        branchAndBound();
        break;
    }
  };

  const clearLines = () => {
    const lines = document.getElementsByClassName(
      "line"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < lines.length; i++) {
      lines[i].style.backgroundColor = "transparent";
    }
  };

  return (
    <div className="container">
      <div className="side-container">
        <div className="intro-info-container">
          <div className="intro-title">
            Travelling Salesman Problem Visualizer
          </div>
          <div className="intro-description">
            This site helps to visualize trying to solve the traveling salesman
            problem. Simply plot points onto the graph, select an algorithm, and
            watch the process! (Click here for more info)
          </div>
        </div>
        <div className="stats-info-container">
          <p>Best Path Distance: 0km</p>
          <p>Current Path Distance: 0km</p>
          <p>Time Elapsed: 0s</p>
        </div>
        <div className="controls-container">
          <div className="algorithm-select">
            <div className="algorithm-label">Algorithm</div>
            <div className="algorithm-choose-and-info">
              <select id="algorithms" onChange={changeSelectedAlgorithm}>
                <option value="Nearest Neighbour">Nearest Neighbour</option>
                <option value="Depth First Search">Depth First Search</option>
                <option value="Simulated Annealing">Simulated Annealing</option>
                <option value="Branch and Bound">Branch and Bound</option>
              </select>
              <button>?</button>
            </div>
          </div>
          <div className="controls-select">
            <div className="controls-label">Controls</div>
            <div className="controls-choose">
              <button onClick={play}>Play</button>
              <button>Skip</button>
              <button onClick={clearLines}>Clear Lines</button>
            </div>
          </div>
          <div className="delay-select">
            <div className="controls-label">Delay</div>
            <div className="controls-choose">
              <input
                type="range"
                min="1"
                max="100"
                value="50"
                className="slider"
                id="myRange"
              ></input>
            </div>
          </div>
          <div className="points-select">
            <div className="points-label">Number of Random Points</div>
            <div className="points-choose">
              <input
                className="slider"
                type="range"
                min="3"
                max="10"
                step="1"
                defaultValue="3"
                onChange={(e) => setCoordsAmount(e.target.value)}
              ></input>
              <button onClick={plot}>Plot</button>
            </div>
            <p>Possible Paths: 0</p>
          </div>
        </div>
      </div>
      <div className="main-container">
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
      </div>
    </div>
  );
}
