import { TSPResult, Animation } from "../types";

const simulatedAnnealing = (
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

export default simulatedAnnealing;
