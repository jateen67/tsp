# Travelling Salesman Problem Visualizer

The Traveling Salesman Problem is an infamous theoretical computer science problem asks the following: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".

![tspgif](https://github.com/jateen67/tsp/assets/106696411/35152fa7-8e62-40ca-978f-8c53fbdf0c9a)

## Project

- The goal of this site is to help users visualize, and learn different ways of attempting to solve the Traveling Salesman Problem in an accessible, friendly way
- As you apply different algorithms, the current best path is saved so that you can compare it with the best path found in other
  algorithms (Once you change the number of points, then the best path recorded is cleared, obviously :P)

## Algorithms

### Heuristic

Heuristic algorithms attempt to find good approximations of the optimal path in a relatively quick amount of time, sacrificing accuracy in the process. The heuristic algorithms implemented include:

- Nearest Neighbour
- Simulated Annealing

### Exhaustive

Exhaustive algorithms always find the best solution by searching through and evaluating every single path possible. As a result, they are significantly less time-efficient than their heuristic counterpart. The exhaustive algorithms implemented include:

- Depth First Search
- Branch and Bound

## How to run

1. Run `npm install` in the root directory to install dependencies
2. Run `npm run dev`

## Technologies

Built using:

- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
