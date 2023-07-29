import { TSPResult, Animation } from "../types";

const nearestNeighbor = (coordinates: number[][]): TSPResult => {
  const animations: Animation[] = [];
  const numCoordinates = coordinates.length;
  const visited: boolean[] = new Array<boolean>(numCoordinates).fill(false);
  const path: number[][] = [];

  // Set the starting point as the first coordinate
  const start: number[] = coordinates[0];
  path.push(start);
  visited[0] = true;

  let currentCoordinate: number[] = start;
  let totalDistance = 0;

  // Iterate until all coordinates have been visited
  while (path.length < numCoordinates) {
    let nearestIndex: number | null = null;
    let nearestDistance = Infinity;

    // Find the nearest unvisited coordinate
    for (let i = 0; i < numCoordinates; i++) {
      if (!visited[i]) {
        animations.push({
          compare: [currentCoordinate, coordinates[i]],
        });
        const distance: number = Math.hypot(
          currentCoordinate[0] - coordinates[i][0],
          currentCoordinate[1] - coordinates[i][1]
        );
        if (distance < nearestDistance) {
          nearestIndex = i;
          nearestDistance = distance;
        }
      }
    }

    totalDistance += nearestDistance;
    // Add the nearest coordinate to the path and mark it as visited
    path.push(coordinates[nearestIndex!]);
    animations.push({
      cross: [
        currentCoordinate,
        coordinates[nearestIndex!],
        [0, Number(totalDistance.toFixed(2))],
      ],
    });
    visited[nearestIndex!] = true;
    currentCoordinate = coordinates[nearestIndex!];
  }

  totalDistance += Math.hypot(
    currentCoordinate[0] - start[0],
    currentCoordinate[1] - start[1]
  );
  // Add the starting point again to complete the cycle
  path.push(start, [Number(totalDistance.toFixed(2))]);
  animations.push({
    finalPath: path,
  });

  return { animations };
};

export default nearestNeighbor;
