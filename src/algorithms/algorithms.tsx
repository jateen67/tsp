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
        console.log(path.pop());
        animations.push({
          backtrack: [coordinates[currentCity], coordinates[nextCity]],
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
