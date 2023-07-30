import { SetStateAction, useEffect, useState } from "react";
import * as algorithms from "../algorithms/index";
import Intro from "./side-container/intro";
import Stats from "./side-container/stats";
import Legend from "./side-container/legend";
import Copyright from "./side-container/copyright";
import Controls from "./side-container/controls";
import LoadingSlider from "./main-container/loading-slider";
import Coordinates from "./main-container/coordinates";
import { animatePath, updateUI } from "../animations";

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

  const play = () => {
    switch (selectedAlgorithm) {
      case "Nearest Neighbour":
        playNearestNeighbour();
        break;
      case "Simulated Annealing":
        playSimulatedAnnealing();
        break;
      case "Depth First Search":
        playDepthFirstSearch();
        break;
      case "Branch and Bound":
        playBranchAndBound();
        break;
    }
  };

  const playNearestNeighbour = () => {
    clearLines();
    const { animations } = algorithms.nearestNeighbor(coords);
    updateUI(true);
    animatePath(
      animations,
      selectedAlgorithm,
      setcurrentPathDistance,
      setbestPathDistance
    );
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
    updateUI(true);
    animatePath(
      animations,
      selectedAlgorithm,
      setcurrentPathDistance,
      setbestPathDistance
    );
  };

  const playDepthFirstSearch = () => {
    clearLines();
    const { animations } = algorithms.depthFirstSearch(coords);
    updateUI(true);
    animatePath(
      animations,
      selectedAlgorithm,
      setcurrentPathDistance,
      setbestPathDistance
    );
  };

  const playBranchAndBound = () => {
    clearLines();
    const { animations } = algorithms.branchAndBound(coords);
    updateUI(true);
    animatePath(
      animations,
      selectedAlgorithm,
      setcurrentPathDistance,
      setbestPathDistance
    );
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

  const isArrayInArray = (array: number[][], item: number[]) => {
    const itemAsString = JSON.stringify(item);

    const contains = array.some(function (ele) {
      return JSON.stringify(ele) === itemAsString;
    });

    return contains;
  };

  const randomCoordFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

  const changeSelectedAlgorithm = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedAlgorithm(e.target.value);
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
