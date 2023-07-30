import { TSPResult, Animation } from "../types";

const depthFirstSearch = (coordinates: number[][]): TSPResult => {
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

      if (totalDistance < bestDistance) {
        animations.push({
          cross: [
            coordinates[currentCity],
            coordinates[0],
            [Infinity, Number(totalDistance.toFixed(2))],
          ],
        });
      } else {
        animations.push({
          cross: [
            coordinates[currentCity],
            coordinates[0],
            [0, Number(totalDistance.toFixed(2))],
          ],
        });
      }

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

export default depthFirstSearch;
