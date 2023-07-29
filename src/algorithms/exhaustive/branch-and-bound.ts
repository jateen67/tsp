import { TSPResult, Animation } from "../types";

const branchAndBound = (coordinates: number[][]): TSPResult => {
  const animations: Animation[] = [];
  const numCities = coordinates.length;
  const visited: boolean[] = new Array<boolean>(numCities).fill(false);
  const path: number[][] = [];
  let bestPath: number[][] = [];
  let bestDistance = Infinity;

  // Helper function to calculate the distance between two cities
  function calculateDistance(city1: number[], city2: number[]): number {
    animations.push({
      compare: [city1, city2],
    });
    const [x1, y1] = city1;
    const [x2, y2] = city2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  // Recursive function for branch and bound
  function branchAndBound(
    currentCity: number,
    depth: number,
    currentDistance: number
  ) {
    visited[currentCity] = true;
    path.push(coordinates[currentCity]);

    if (depth === numCities - 1) {
      const lastCity = path[path.length - 1];
      const distanceToStart = calculateDistance(lastCity, coordinates[0]);
      const totalDistance = currentDistance + distanceToStart;
      if (totalDistance < bestDistance) {
        animations.push({
          cross: [
            coordinates[currentCity],
            coordinates[0],
            [Infinity, Number(totalDistance.toFixed(2))],
          ],
        });
        bestDistance = totalDistance;
        bestPath = [...path, coordinates[0]];
      }
    } else {
      for (let nextCity = 1; nextCity < numCities; nextCity++) {
        if (!visited[nextCity]) {
          const distance = calculateDistance(
            coordinates[currentCity],
            coordinates[nextCity]
          );
          const newDistance = currentDistance + distance;

          if (newDistance < bestDistance) {
            animations.push({
              cross: [
                coordinates[currentCity],
                coordinates[nextCity],
                [0, Number(newDistance.toFixed(2))],
              ],
            });
            branchAndBound(nextCity, depth + 1, newDistance);
          }
        }
      }
    }

    visited[currentCity] = false;
    path.pop();
    animations.push({
      backtrack: [coordinates[currentCity], [0]],
    });
  }

  branchAndBound(0, 0, 0);

  bestPath.push([Number(bestDistance.toFixed(2))]);

  animations.push({
    finalPath: bestPath,
  });

  return {
    animations,
  };
};

export default branchAndBound;
