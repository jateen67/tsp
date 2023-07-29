export default function DepthFirstSearch() {
  return (
    <>
      <div className="title">
        <h2>Depth First Search</h2>
      </div>
      <div className="body">
        <p className="desc">
          This is an exhaustive, brute-force algorithm that's guaranteed to find
          the best possible path, but depending on the number of points plotted,
          it can be less than ideal to use. For example:
        </p>
        <ul>
          <li>With 10 points plotted, there are 181,400 paths to evaluate</li>
          <li>With 11 points plotted, there are 1,814,000 paths to evaluate</li>
          <li>
            With 12 points plotted, there are 19,960,000 paths to evaluate
          </li>
          <li>
            With 20 points plotted, there are 60,822,550,204,416,000 paths to
            evaluate
          </li>
        </ul>
        <p className="desc">
          Since this growth is very inefficient (factorial growth), brute
          forcing a solution is very impractical. This is why heuristic
          algorithms exist; they provide a good approximation of the best path,
          but it comes at a cost of some uncertainty.
        </p>
        <p className="desc">Here's how the algorithm works:</p>
        <ol>
          <li>Start at the beginning point</li>
          <li>
            Travel an arbitrary complete path, and mark that path as "visited"
          </li>
          <li>
            After travelling the complete path, recurse (backtrack) to a
            previous point, and find a new "unvisited" complete path
          </li>
          <li>
            Check back if the distance of this newly visited complete path is
            shorter than any previously travelled complete path
          </li>
          <li>
            Continue from Step 1 until there are no more unvisited complete
            paths
          </li>
        </ol>
      </div>
    </>
  );
}
