import { SetStateAction, useEffect, useState } from "react";
import * as algorithms from "../algorithms/algorithms";
import Modal from "./modals/algorithm-modal";
import InfoModal from "./modals/info-modal";

export default function TSPVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("Nearest Neighbour");
  const [coordsAmount, setCoordsAmount] = useState<string>("3");
  const [coords, setCoords] = useState<number[][]>([]);
  const [possiblePaths, setPossiblePaths] = useState<number>(1);
  const [currentPathDistance, setcurrentPathDistance] = useState<number>(0);
  const [bestPathDistance, setbestPathDistance] = useState<number>(Infinity);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

  useEffect(() => {
    plot(Number(coordsAmount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nearestNeighbour = () => {
    clearLines();

    const { animations } = algorithms.nearestNeighbor(coords);

    const algoSelector = document.getElementsByClassName(
      "algorithms"
    ) as HTMLCollectionOf<HTMLElement>;

    algoSelector[0].style.pointerEvents = "none";
    algoSelector[0].style.opacity = "0.5";

    const playButton = document.getElementsByClassName(
      "play-button"
    ) as HTMLCollectionOf<HTMLElement>;

    playButton[0].style.pointerEvents = "none";
    playButton[0].style.opacity = "0.5";

    const clearButton = document.getElementsByClassName(
      "clear-button"
    ) as HTMLCollectionOf<HTMLElement>;

    clearButton[0].style.pointerEvents = "none";
    clearButton[0].style.opacity = "0.5";

    const plotButton = document.getElementsByClassName(
      "plot-button"
    ) as HTMLCollectionOf<HTMLElement>;

    plotButton[0].style.pointerEvents = "none";
    plotButton[0].style.opacity = "0.5";

    const slider = document.getElementsByClassName(
      "slider"
    ) as HTMLCollectionOf<HTMLElement>;

    slider[0].style.pointerEvents = "none";
    slider[0].style.opacity = "0.5";

    const loadingSlider = document.getElementsByClassName(
      "loading-slider"
    ) as HTMLCollectionOf<HTMLElement>;

    loadingSlider[0].style.visibility = "visible";

    for (let i = 0; i < animations.length; i++) {
      const { compare, cross, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        if (i === animations.length - 1) {
          algoSelector[0].style.pointerEvents = "all";
          algoSelector[0].style.opacity = "1";
          playButton[0].style.pointerEvents = "all";
          playButton[0].style.opacity = "1";
          clearButton[0].style.pointerEvents = "all";
          clearButton[0].style.opacity = "1";
          plotButton[0].style.pointerEvents = "all";
          plotButton[0].style.opacity = "1";
          slider[0].style.pointerEvents = "all";
          slider[0].style.opacity = "1";
          loadingSlider[0].style.visibility = "hidden";
        }
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "rgb(201, 199, 199)") {
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
          if (x2 >= x1) {
            angle += 180;
          }
          lines[compare[0][2]].style.backgroundColor = "rgb(255, 89, 0)";
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
          if (x2 >= x1) {
            angle += 180;
          }
          lines[cross[0][2]].style.backgroundColor = "rgb(201, 199, 199)";
          lines[cross[0][2]].style.width = `${distance}%`;
          lines[cross[0][2]].style.transform = `rotate(${angle}deg)`;
          setcurrentPathDistance(cross[2][1]);
          if (cross[2][0] === Infinity && cross[2][1] < bestPathDistance) {
            setbestPathDistance(cross[2][1]);
          }
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 2; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "rgb(0, 200, 0)";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
          setcurrentPathDistance(finalPath[finalPath.length - 1][0]);
          if (finalPath[finalPath.length - 1][0] < bestPathDistance) {
            setbestPathDistance(finalPath[finalPath.length - 1][0]);
          }
        }
      }, i * 250);
    }
  };

  const depthFirstSearch = () => {
    clearLines();

    const { animations } = algorithms.depthFirstSearch(coords);

    const algoSelector = document.getElementsByClassName(
      "algorithms"
    ) as HTMLCollectionOf<HTMLElement>;

    algoSelector[0].style.pointerEvents = "none";
    algoSelector[0].style.opacity = "0.5";

    const playButton = document.getElementsByClassName(
      "play-button"
    ) as HTMLCollectionOf<HTMLElement>;

    playButton[0].style.pointerEvents = "none";
    playButton[0].style.opacity = "0.5";

    const clearButton = document.getElementsByClassName(
      "clear-button"
    ) as HTMLCollectionOf<HTMLElement>;

    clearButton[0].style.pointerEvents = "none";
    clearButton[0].style.opacity = "0.5";

    const plotButton = document.getElementsByClassName(
      "plot-button"
    ) as HTMLCollectionOf<HTMLElement>;

    plotButton[0].style.pointerEvents = "none";
    plotButton[0].style.opacity = "0.5";

    const slider = document.getElementsByClassName(
      "slider"
    ) as HTMLCollectionOf<HTMLElement>;

    slider[0].style.pointerEvents = "none";
    slider[0].style.opacity = "0.5";

    const loadingSlider = document.getElementsByClassName(
      "loading-slider"
    ) as HTMLCollectionOf<HTMLElement>;

    loadingSlider[0].style.visibility = "visible";

    for (let i = 0; i < animations.length; i++) {
      const { cross, backtrack, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        if (i === animations.length - 1) {
          algoSelector[0].style.pointerEvents = "all";
          algoSelector[0].style.opacity = "1";
          playButton[0].style.pointerEvents = "all";
          playButton[0].style.opacity = "1";
          clearButton[0].style.pointerEvents = "all";
          clearButton[0].style.opacity = "1";
          plotButton[0].style.pointerEvents = "all";
          plotButton[0].style.opacity = "1";
          slider[0].style.pointerEvents = "all";
          slider[0].style.opacity = "1";
          loadingSlider[0].style.visibility = "hidden";
        }
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "rgb(201, 199, 199)") {
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
          if (x2 >= x1) {
            angle += 180;
          }
          lines[cross[0][2]].style.backgroundColor = "rgb(201, 199, 199)";
          lines[cross[0][2]].style.width = `${distance}%`;
          lines[cross[0][2]].style.transform = `rotate(${angle}deg)`;
          setcurrentPathDistance(cross[2][1]);
          if (cross[2][0] === Infinity && cross[2][1] < bestPathDistance) {
            setbestPathDistance(cross[2][1]);
          }
        }
        if (backtrack != undefined) {
          lines[backtrack[0][2]].style.backgroundColor = "transparent";
          setcurrentPathDistance(backtrack[1][0]);
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 2; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "rgb(0, 200, 0)";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
          setcurrentPathDistance(finalPath[finalPath.length - 1][0]);
          if (finalPath[finalPath.length - 1][0] < bestPathDistance) {
            setbestPathDistance(finalPath[finalPath.length - 1][0]);
          }
        }
      }, i * 110);
    }
  };

  const simulatedAnnealing = () => {
    clearLines();

    const xLength = coords[0][0] - coords[1][0];
    const yLength = coords[0][1] - coords[1][1];
    const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
    const { animations } = algorithms.simulatedAnnealing(
      coords,
      100 * distance,
      1 - 1e-4,
      1e-6
    );

    const algoSelector = document.getElementsByClassName(
      "algorithms"
    ) as HTMLCollectionOf<HTMLElement>;

    algoSelector[0].style.pointerEvents = "none";
    algoSelector[0].style.opacity = "0.5";

    const playButton = document.getElementsByClassName(
      "play-button"
    ) as HTMLCollectionOf<HTMLElement>;

    playButton[0].style.pointerEvents = "none";
    playButton[0].style.opacity = "0.5";

    const clearButton = document.getElementsByClassName(
      "clear-button"
    ) as HTMLCollectionOf<HTMLElement>;

    clearButton[0].style.pointerEvents = "none";
    clearButton[0].style.opacity = "0.5";

    const plotButton = document.getElementsByClassName(
      "plot-button"
    ) as HTMLCollectionOf<HTMLElement>;

    plotButton[0].style.pointerEvents = "none";
    plotButton[0].style.opacity = "0.5";

    const slider = document.getElementsByClassName(
      "slider"
    ) as HTMLCollectionOf<HTMLElement>;

    slider[0].style.pointerEvents = "none";
    slider[0].style.opacity = "0.5";

    const loadingSlider = document.getElementsByClassName(
      "loading-slider"
    ) as HTMLCollectionOf<HTMLElement>;

    loadingSlider[0].style.visibility = "visible";

    for (let i = 0; i < animations.length; i++) {
      const { compare, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        if (i === animations.length - 1) {
          algoSelector[0].style.pointerEvents = "all";
          algoSelector[0].style.opacity = "1";
          playButton[0].style.pointerEvents = "all";
          playButton[0].style.opacity = "1";
          clearButton[0].style.pointerEvents = "all";
          clearButton[0].style.opacity = "1";
          plotButton[0].style.pointerEvents = "all";
          plotButton[0].style.opacity = "1";
          slider[0].style.pointerEvents = "all";
          slider[0].style.opacity = "1";
          loadingSlider[0].style.visibility = "hidden";
        }
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "rgb(201, 199, 199)") {
            lines[i].style.backgroundColor = "transparent";
          }
        }
        if (compare != undefined) {
          for (let i = 0; i < compare.length - 2; i++) {
            const x2 = compare[i][0];
            const x1 = compare[i + 1][0];
            const y2 = compare[i][1];
            const y1 = compare[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            lines[compare[i][2]].style.backgroundColor = "rgb(255, 89, 0)";
            lines[compare[i][2]].style.width = `${distance}%`;
            lines[compare[i][2]].style.transform = `rotate(${angle}deg)`;
          }
          setcurrentPathDistance(compare[compare.length - 1][0]);
          if (compare[compare.length - 1][0] < bestPathDistance) {
            setbestPathDistance(compare[compare.length - 1][0]);
          }
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 2; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "rgb(0, 200, 0)";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
          setcurrentPathDistance(finalPath[finalPath.length - 1][0]);
          if (finalPath[finalPath.length - 1][0] < bestPathDistance) {
            setbestPathDistance(finalPath[finalPath.length - 1][0]);
          }
        }
      }, i * 250);
    }
  };

  const branchAndBound = () => {
    clearLines();

    const { animations } = algorithms.branchAndBound(coords);

    const algoSelector = document.getElementsByClassName(
      "algorithms"
    ) as HTMLCollectionOf<HTMLElement>;

    algoSelector[0].style.pointerEvents = "none";
    algoSelector[0].style.opacity = "0.5";

    const playButton = document.getElementsByClassName(
      "play-button"
    ) as HTMLCollectionOf<HTMLElement>;

    playButton[0].style.pointerEvents = "none";
    playButton[0].style.opacity = "0.5";

    const clearButton = document.getElementsByClassName(
      "clear-button"
    ) as HTMLCollectionOf<HTMLElement>;

    clearButton[0].style.pointerEvents = "none";
    clearButton[0].style.opacity = "0.5";

    const plotButton = document.getElementsByClassName(
      "plot-button"
    ) as HTMLCollectionOf<HTMLElement>;

    plotButton[0].style.pointerEvents = "none";
    plotButton[0].style.opacity = "0.5";

    const slider = document.getElementsByClassName(
      "slider"
    ) as HTMLCollectionOf<HTMLElement>;

    slider[0].style.pointerEvents = "none";
    slider[0].style.opacity = "0.5";

    const loadingSlider = document.getElementsByClassName(
      "loading-slider"
    ) as HTMLCollectionOf<HTMLElement>;

    loadingSlider[0].style.visibility = "visible";

    for (let i = 0; i < animations.length; i++) {
      const { cross, backtrack, compare, finalPath } = animations[i]; // [[x1, y1, idx of element in dom], [x2, y2, idx of element in dom]]
      setTimeout(() => {
        if (i === animations.length - 1) {
          algoSelector[0].style.pointerEvents = "all";
          algoSelector[0].style.opacity = "1";
          playButton[0].style.pointerEvents = "all";
          playButton[0].style.opacity = "1";
          clearButton[0].style.pointerEvents = "all";
          clearButton[0].style.opacity = "1";
          plotButton[0].style.pointerEvents = "all";
          plotButton[0].style.opacity = "1";
          slider[0].style.pointerEvents = "all";
          slider[0].style.opacity = "1";
          loadingSlider[0].style.visibility = "hidden";
        }
        const lines = document.getElementsByClassName(
          "line"
        ) as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].style.backgroundColor != "rgb(201, 199, 199)") {
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
          if (x2 >= x1) {
            angle += 180;
          }
          lines[cross[0][2]].style.backgroundColor = "rgb(201, 199, 199)";
          lines[cross[0][2]].style.width = `${distance}%`;
          lines[cross[0][2]].style.transform = `rotate(${angle}deg)`;
          setcurrentPathDistance(cross[2][1]);
          if (cross[2][0] === Infinity && cross[2][1] < bestPathDistance) {
            setbestPathDistance(cross[2][1]);
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
          if (x2 >= x1) {
            angle += 180;
          }
          lines[compare[0][2]].style.backgroundColor = "rgb(255, 89, 0)";
          lines[compare[0][2]].style.width = `${distance}%`;
          lines[compare[0][2]].style.transform = `rotate(${angle}deg)`;
        }
        if (backtrack != undefined) {
          lines[backtrack[0][2]].style.backgroundColor = "transparent";
          setcurrentPathDistance(backtrack[1][0]);
        }
        if (finalPath != undefined) {
          for (let i = 0; i < finalPath.length - 2; i++) {
            const x2 = finalPath[i][0];
            const x1 = finalPath[i + 1][0];
            const y2 = finalPath[i][1];
            const y1 = finalPath[i + 1][1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            lines[finalPath[i][2]].style.backgroundColor = "rgb(0, 200, 0)";
            lines[finalPath[i][2]].style.width = `${distance}%`;
            lines[finalPath[i][2]].style.transform = `rotate(${angle}deg)`;
          }
          setcurrentPathDistance(finalPath[finalPath.length - 1][0]);
          if (finalPath[finalPath.length - 1][0] < bestPathDistance) {
            setbestPathDistance(finalPath[finalPath.length - 1][0]);
          }
        }
      }, i * 110);
    }
  };

  const randomCoordFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const plot = (amount: number) => {
    setcurrentPathDistance(0);
    setbestPathDistance(Infinity);
    clearLines();

    const newCoords: number[][] = [];

    for (let i = 0; i < amount; i++) {
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

  const changePossiblePaths = (e: string) => {
    let num = Number(e) - 1;
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    num /= 2;
    setCoordsAmount(e);
    setPossiblePaths(num);
    plot(Number(e));
  };

  return (
    <div className="container">
      <div className="side-container">
        <div className="intro-info-container">
          <div className="intro-title">
            <h3>Travelling Salesman Problem Visualizer</h3>
          </div>
          <div className="intro-description">
            This site allows you to visualize algorithms that attempt to solve
            the Travelling Salesman Problem. Simply plot points, select an
            algorithm, and observe!{" "}
            <a
              className="click-here"
              onClick={() => {
                setOpenInfoModal(true);
              }}
            >
              Click here
            </a>{" "}
            for more info.
          </div>
        </div>
        <hr className="line-break"></hr>
        <div className="stats-info-container">
          <p className="stats">
            <span style={{ color: "#c9c7c7" }}>Best Path Distance:</span>
            <span style={{ fontWeight: "bolder" }}>
              {bestPathDistance === Infinity ? 0 : bestPathDistance}km
            </span>
          </p>
          <p className="stats">
            <span style={{ color: "#c9c7c7" }}>Current Path Distance: </span>
            <span style={{ fontWeight: "bolder" }}>
              {currentPathDistance}km
            </span>
          </p>
        </div>
        <div className="controls-container">
          <div className="algorithm-select">
            <div className="algorithm-label">
              <span style={{ color: "#c9c7c7" }}>Algorithm</span>
            </div>
            <div className="algorithm-choose-and-info">
              <select className="algorithms" onChange={changeSelectedAlgorithm}>
                <optgroup label="Heuristic">
                  <option value="Nearest Neighbour">Nearest Neighbour</option>
                  <option value="Simulated Annealing">
                    Simulated Annealing
                  </option>
                </optgroup>
                <optgroup label="Exhaustive">
                  <option value="Depth First Search">Depth First Search</option>
                  <option value="Branch and Bound">Branch and Bound</option>
                </optgroup>
              </select>
              <button
                className="open-modal-button"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                ?
              </button>
            </div>
          </div>
          <div className="controls-select">
            <div className="controls-label">
              <span style={{ color: "#c9c7c7" }}>Controls</span>
            </div>
            <div className="controls-choose">
              <button className="play-button" onClick={play}>
                Play
              </button>
              <button className="clear-button" onClick={clearLines}>
                Clear Lines
              </button>
            </div>
          </div>
          <div className="points-select">
            <div className="points-label">
              <span style={{ color: "#c9c7c7" }}>
                Points{" "}
                <span style={{ fontSize: "0.7rem" }}>
                  Max. 5 for practicality/efficiency
                </span>
              </span>
            </div>
            <div className="points-choose">
              <input
                className="slider"
                type="range"
                min="3"
                max="5"
                step="1"
                defaultValue="3"
                onChange={(e) => {
                  changePossiblePaths(e.target.value);
                }}
              ></input>
              <button
                className="plot-button"
                onClick={() => plot(Number(coordsAmount))}
              >
                Plot
              </button>
            </div>
            <p className="number-of-paths">
              <span style={{ color: "#c9c7c7" }}>Unique Paths: </span>
              <span style={{ fontWeight: "bolder" }}>
                {possiblePaths === 1
                  ? `${possiblePaths} path`
                  : `${possiblePaths} paths`}
              </span>
            </p>
          </div>
        </div>
        <div className="legend-container">
          <div className="legend-label">
            <span style={{ color: "#c9c7c7" }}>Legend</span>
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
        <div className="copyright-container">
          <p style={{ color: "#c9c7c7" }}>
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: "rgb(255, 145, 0)" }}>Jatin Kalsi</span>
          </p>
        </div>
      </div>
      <div className="main-container">
        <div className="loading-slider">
          <div className="loading-line"></div>
          <div className="subline inc"></div>
          <div className="subline dec"></div>
        </div>
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
      </div>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          selectedAlgorithm={selectedAlgorithm}
        />
      )}
      {openInfoModal && <InfoModal closeInfoModal={setOpenInfoModal} />}
    </div>
  );
}
