import { SetStateAction, useEffect, useState } from "react";
import * as algorithms from "../algorithms/index";
import Intro from "./side-container/intro";
import Stats from "./side-container/stats";
import Legend from "./side-container/legend";
import Copyright from "./side-container/copyright";
import Controls from "./side-container/controls";
import LoadingSlider from "./main-container/loading-slider";
import Coordinates from "./main-container/coordinates";

export default function TSPVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("Nearest Neighbour");
  const [coordsAmount, setCoordsAmount] = useState<string>("3");
  const [coords, setCoords] = useState<number[][]>([]);
  const [possiblePaths, setPossiblePaths] = useState<number>(1);
  const [currentPathDistance, setcurrentPathDistance] = useState<number>(0);
  const [bestPathDistance, setbestPathDistance] = useState<number>(Infinity);

  useEffect(() => {
    plot(Number(coordsAmount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playNearestNeighbour = () => {
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

  const playDepthFirstSearch = () => {
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

  const playSimulatedAnnealing = () => {
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

  const playBranchAndBound = () => {
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
        playNearestNeighbour();
        break;
      case "Depth First Search":
        playDepthFirstSearch();
        break;
      case "Simulated Annealing":
        playSimulatedAnnealing();
        break;
      case "Branch and Bound":
        playBranchAndBound();
        break;
    }
  };

  const clearLines = () => {
    setcurrentPathDistance(0);
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
        <Intro />
        <hr className="line-break"></hr>
        <Stats
          currentPathDistance={currentPathDistance}
          bestPathDistance={bestPathDistance}
        />
        <Controls
          possiblePaths={possiblePaths}
          selectedAlgorithm={selectedAlgorithm}
          coordsAmount={coordsAmount}
          changeSelectedAlgorithm={changeSelectedAlgorithm}
          changePossiblePaths={changePossiblePaths}
          plot={plot}
          play={play}
          clearLines={clearLines}
        />
        <Legend />
        <Copyright />
      </div>
      <div className="main-container">
        <LoadingSlider />
        <Coordinates coords={coords} />
      </div>
    </div>
  );
}
