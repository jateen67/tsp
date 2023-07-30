import { Dispatch, SetStateAction } from "react";
import { Animation } from "../algorithms/types";

const animatePath = (
  animations: Animation[],
  selectedAlgorithm: string,
  setcurrentPathDistance: Dispatch<SetStateAction<number>>,
  setbestPathDistance: Dispatch<SetStateAction<number>>
) => {
  let bestPathDistance = Infinity;

  for (let i = 0; i < animations.length; i++) {
    const { cross, compare, backtrack, finalPath } = animations[i];

    setTimeout(() => {
      const lines = document.getElementsByClassName(
        "line"
      ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].style.backgroundColor != "rgb(201, 199, 199)") {
          lines[i].style.backgroundColor = "transparent";
        }
      }

      if (cross !== undefined) {
        const [x2, y2] = cross[0];
        const [x1, y1] = cross[1];
        const xLength = x2 - x1;
        const yLength = y2 - y1;
        const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
        let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
        if (x2 >= x1) {
          angle += 180;
        }
        setLineStyles(
          lines[cross[0][2]],
          "rgb(201, 199, 199)",
          distance,
          angle
        );
        setcurrentPathDistance(cross[2][1]);
        if (cross[2][0] === Infinity && cross[2][1] < bestPathDistance) {
          bestPathDistance = cross[2][1];
          setbestPathDistance(cross[2][1]);
        }
      }

      if (compare !== undefined) {
        if (selectedAlgorithm === "Simulated Annealing") {
          for (let i = 0; i < compare.length - 2; i++) {
            const [x2, y2] = compare[i];
            const [x1, y1] = compare[i + 1];
            const xLength = x2 - x1;
            const yLength = y2 - y1;
            const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
            let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
            if (x2 >= x1) {
              angle += 180;
            }
            setLineStyles(
              lines[compare[i][2]],
              "rgb(255, 89, 0)",
              distance,
              angle
            );
          }
          setcurrentPathDistance(compare[compare.length - 1][0]);
          if (compare[compare.length - 1][0] < bestPathDistance) {
            bestPathDistance = compare[compare.length - 1][0];
            setbestPathDistance(bestPathDistance);
          }
        } else {
          const [x2, y2] = compare[0];
          const [x1, y1] = compare[1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
          if (x2 >= x1) {
            angle += 180;
          }
          setLineStyles(
            lines[compare[0][2]],
            "rgb(255, 89, 0)",
            distance,
            angle
          );
        }
      }

      if (backtrack !== undefined) {
        setLineStyles(lines[backtrack[0][2]], "transparent", 0, 0);
        setcurrentPathDistance(backtrack[1][0]);
      }

      if (finalPath !== undefined) {
        for (let i = 0; i < finalPath.length - 2; i++) {
          const [x2, y2] = finalPath[i];
          const [x1, y1] = finalPath[i + 1];
          const xLength = x2 - x1;
          const yLength = y2 - y1;
          const distance = Math.sqrt(xLength ** 2 + yLength ** 2);
          let angle = (Math.atan(yLength / xLength) * 180) / Math.PI;
          if (x2 >= x1) {
            angle += 180;
          }
          setLineStyles(
            lines[finalPath[i][2]],
            "rgb(0, 200, 0)",
            distance,
            angle
          );
        }
        setcurrentPathDistance(finalPath[finalPath.length - 1][0]);
        if (finalPath[finalPath.length - 1][0] < bestPathDistance) {
          bestPathDistance = finalPath[finalPath.length - 1][0];
          setbestPathDistance(bestPathDistance);
        }
      }

      if (i === animations.length - 1) {
        updateUI(false);
      }
    }, i * setDelay(selectedAlgorithm));
  }
};

const updateUI = (disabled: boolean) => {
  const elements = [
    "algorithms",
    "play-button",
    "clear-button",
    "plot-button",
    "slider",
  ];

  for (const element of elements) {
    const el = document.getElementsByClassName(element)[0] as HTMLElement;
    el.style.pointerEvents = disabled ? "none" : "all";
    el.style.opacity = disabled ? "0.5" : "1";
  }

  const loadingSlider = document.getElementsByClassName(
    "loading-slider"
  )[0] as HTMLElement;
  loadingSlider.style.visibility = disabled ? "visible" : "hidden";
};

const setLineStyles = (
  lines: HTMLElement,
  color: string,
  distance: number,
  angle: number
) => {
  lines.style.backgroundColor = color;
  lines.style.width = `${distance}%`;
  lines.style.transform = `rotate(${angle}deg)`;
};

const setDelay = (selectedAlgorithm: string) => {
  switch (selectedAlgorithm) {
    case "Nearest Neighbour":
      return 250;
    case "Simulated Annealing":
      return 250;
    case "Depth First Search":
      return 100;
    case "Branch and Bound":
      return 100;
    default:
      return 250;
  }
};

export { animatePath, updateUI };
