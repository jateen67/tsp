export default function NearestNeighbour() {
  return (
    <>
      <div className="title">
        <h2>Nearest Neighbour</h2>
      </div>
      <div className="body">
        <p className="desc">
          This is a heuristic, greedy algorithm. It constantly travels to the
          point closest to the current location.
        </p>
        <ol>
          <li>Start at the beginning point</li>
          <li>
            Go through all "unvisited" points to find the one with the shortest
            distance from the beginning point
          </li>
          <li>Travel to said closest point. Mark it as visited</li>
          <li>
            Continue from Step 2 until there are no more unvisited points, then
            return to the start
          </li>
        </ol>
        <p className="desc">
          Since the theory behind Nearest Neighbour is very simple, it is the
          most straightforward and easy-to-understand algorithm.
        </p>
      </div>
    </>
  );
}
