# Travelling Salesman Problem Visualizer

[gif]

The Traveling Salesman Problem is an infamous theoretical computer science problem asks the following: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".

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

## Technologies

Built using:

- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
