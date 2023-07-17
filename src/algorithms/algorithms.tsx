interface TSPResult {
  path: number[][];
  totalDistance: number;
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

    // Add the nearest coordinate to the path and mark it as visited
    path.push(coordinates[nearestIndex!]);
    animations.push({
      cross: [currentCoordinate, coordinates[nearestIndex!]],
    });
    visited[nearestIndex!] = true;
    currentCoordinate = coordinates[nearestIndex!];
    totalDistance += nearestDistance;
  }

  // Add the starting point again to complete the cycle
  path.push(start);
  animations.push({
    cross: [currentCoordinate, start],
  });
  totalDistance += Math.hypot(
    currentCoordinate[0] - start[0],
    currentCoordinate[1] - start[1]
  );

  return { path, totalDistance, animations };
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
      animations.push({
        cross: [coordinates[currentCity], coordinates[0]],
      });
      totalDistance += distance;

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
        animations.push({
          cross: [coordinates[currentCity], coordinates[nextCity]],
        });
        const distance = Math.hypot(
          coordinates[currentCity][0] - coordinates[nextCity][0],
          coordinates[currentCity][1] - coordinates[nextCity][1]
        );
        totalDistance += distance;

        dfs(nextCity, depth + 1);

        // Backtrack
        visited[nextCity] = false;
        path.pop();
        animations.push({
          backtrack: [coordinates[nextCity]],
        });
        totalDistance -= distance;
      }
    }
  }

  dfs(currentCity, 1);

  animations.push({
    backtrack: [coordinates[currentCity], coordinates[0]],
  });
  bestPath.push(coordinates[0]);
  animations.push({
    finalPath: bestPath,
  });

  return {
    path: bestPath,
    totalDistance: bestDistance,
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
    totalDistance += calculateDistance(path[path.length - 1], path[0]);
    return totalDistance;
  }

  // Generate an initial random solution
  const currentPath: number[][] = coordinates.slice();
  for (let i = numCities - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentPath[i], currentPath[j]] = [currentPath[j], currentPath[i]];
  }

  let currentDistance = calculateTotalDistance(currentPath);
  let bestPath: number[][] = [...currentPath];
  let bestDistance = currentDistance;

  while (temperature > stoppingTemperature) {
    // Generate a random neighboring solution
    const i = Math.floor(Math.random() * numCities);
    const j = Math.floor(Math.random() * numCities);
    [currentPath[i], currentPath[j]] = [currentPath[j], currentPath[i]];

    // Calculate the total distance of the new solution
    const newDistance = calculateTotalDistance(currentPath);

    // Determine if the new solution should be accepted
    if (
      newDistance < currentDistance ||
      Math.random() < Math.exp((currentDistance - newDistance) / temperature)
    ) {
      currentDistance = newDistance;
      if (newDistance < bestDistance) {
        bestPath = [...currentPath];
        bestDistance = newDistance;
      }
    } else {
      // Revert the change
      [currentPath[i], currentPath[j]] = [currentPath[j], currentPath[i]];
    }

    // Cool down the temperature
    temperature *= coolingRate;
  }

  bestPath.push(coordinates[0]);

  return {
    path: bestPath,
    totalDistance: bestDistance,
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
          cross: [coordinates[currentCity], coordinates[0]],
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
              cross: [coordinates[currentCity], coordinates[nextCity]],
            });
            branchAndBound(nextCity, depth + 1, newDistance);
          }
        }
      }
    }

    visited[currentCity] = false;
    path.pop();
    animations.push({
      backtrack: [coordinates[currentCity]],
    });
  }

  branchAndBound(0, 0, 0);

  animations.push({
    finalPath: bestPath,
  });

  return {
    path: bestPath,
    totalDistance: bestDistance,
    animations,
  };
};
