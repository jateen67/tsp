interface TSPResult {
  animations: Animation[];
}

type Animation = {
  compare?: number[][];
  cross?: number[][];
  backtrack?: number[][];
  finalPath?: number[][];
};

export const nearestNeighbor = (coordinates: number[][]): TSPResult => {
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

export const depthFirstSearch = (coordinates: number[][]): TSPResult => {
  const animations: Animation[] = [];
  const numCities = coordinates.length;
  const visited: boolean[] = new Array<boolean>(numCities).fill(false);
  const path: number[][] = [];
  const bestPath: number[][] = [];
  const currentCity = 0; // Start at city 0

  // Mark the starting city as visited
  visited[currentCity] = true;
  path.push(coordinates[currentCity]);

  let totalDistance = 0;
  let bestDistance = Infinity;

  // Recursive function to perform DFS
  function dfs(currentCity: number, depth: number) {
    if (depth === numCities) {
      // All cities visited, return to the starting city
      const distance = Math.hypot(
        coordinates[currentCity][0] - coordinates[0][0],
        coordinates[currentCity][1] - coordinates[0][1]
      );
      totalDistance += distance;
      animations.push({
        cross: [
          coordinates[currentCity],
          coordinates[0],
          [Infinity, Number(totalDistance.toFixed(2))],
        ],
      });

      if (totalDistance < bestDistance) {
        bestDistance = totalDistance;
        bestPath.splice(0);
        bestPath.push(...path);
      }

      totalDistance -= distance;
      return;
    }

    for (let nextCity = 0; nextCity < numCities; nextCity++) {
      if (!visited[nextCity]) {
        visited[nextCity] = true;
        path.push(coordinates[nextCity]);
        const distance = Math.hypot(
          coordinates[currentCity][0] - coordinates[nextCity][0],
          coordinates[currentCity][1] - coordinates[nextCity][1]
        );
        totalDistance += distance;
        animations.push({
          cross: [
            coordinates[currentCity],
            coordinates[nextCity],
            [0, Number(totalDistance.toFixed(2))],
          ],
        });

        dfs(nextCity, depth + 1);

        // Backtrack
        visited[nextCity] = false;
        path.pop();
        animations.push({
          backtrack: [
            coordinates[nextCity],
            [Number(totalDistance.toFixed(2))],
          ],
        });
        totalDistance -= distance;
      }
    }
  }

  dfs(currentCity, 1);

  animations.push({
    backtrack: [coordinates[currentCity], [0]],
  });
  bestPath.push(coordinates[0], [Number(bestDistance.toFixed(2))]);
  animations.push({
    finalPath: bestPath,
  });

  return {
    animations,
  };
};

export const simulatedAnnealing = (
  coordinates: number[][],
  temperature: number,
  coolingRate: number,
  stoppingTemperature: number
): TSPResult => {
  const animations: Animation[] = [];
  const numCities = coordinates.length;

  // Helper function to calculate the distance between two cities
  function calculateDistance(city1: number[], city2: number[]): number {
    const [x1, y1] = city1;
    const [x2, y2] = city2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  // Helper function to calculate the total distance of a path
  function calculateTotalDistance(path: number[][]): number {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += calculateDistance(path[i], path[i + 1]);
    }
    // Add the distance from the last city to the starting city
    totalDistance += calculateDistance(path[path.length - 1], path[0]);
    return totalDistance;
  }

  // Generate an initial random solution
  const initialPath = coordinates.slice(1); // Exclude the starting point
  for (let i = numCities - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [initialPath[i], initialPath[j]] = [initialPath[j], initialPath[i]];
  }
  const currentPath: number[][] = [coordinates[0], ...initialPath]; // Add the starting point at the beginning
  let currentDistance = calculateTotalDistance(currentPath);
  let bestPath: number[][] = [...currentPath];
  let bestDistance = currentDistance;
  const a = currentPath.slice();
  a.push([Number(bestDistance.toFixed(2))]);
  animations.push({
    compare: a,
  });

  let x = 0;
  while (temperature > stoppingTemperature) {
    // Generate a random neighboring solution
    const i = Math.floor(Math.random() * (numCities - 1)) + 1; // Exclude the starting point
    const j = Math.floor(Math.random() * (numCities - 1)) + 1; // Exclude the starting point
    const newPath = [...currentPath]; // Create a new array to store the updated path
    [newPath[i], newPath[j]] = [newPath[j], newPath[i]];

    // Calculate the total distance of the new solution
    const newDistance = calculateTotalDistance(newPath);

    const a = newPath.slice();
    a.push([Number(newDistance.toFixed(2))]);
    if (x % 10000 === 0) {
      animations.push({
        compare: a,
      });
    }

    // Determine if the new solution should be accepted
    if (
      newDistance < currentDistance ||
      Math.random() < Math.exp((currentDistance - newDistance) / temperature)
    ) {
      currentDistance = newDistance;
      currentPath.splice(0, currentPath.length, ...newPath); // Update the currentPath
      if (newDistance < bestDistance) {
        bestPath = [...currentPath];
        bestDistance = newDistance;
      }
    }

    // Cool down the temperature
    temperature *= coolingRate;
    x++;
  }

  // Add the starting point at the end of the best path
  bestPath.push(coordinates[0], [Number(bestDistance.toFixed(2))]);

  animations.push({
    finalPath: bestPath,
  });

  return {
    animations,
  };
};

export const branchAndBound = (coordinates: number[][]): TSPResult => {
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
