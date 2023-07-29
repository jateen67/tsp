export default function BranchAndBound() {
  return (
    <>
      <div className="title">
        <h2>Branch and Bound</h2>
      </div>
      <div className="body">
        <p className="desc">
          This is a recursive algorithm that guarantees the optimal solution,
          much like Depth First Search.
        </p>
        <p className="desc">
          It systematically divides the problem into smaller subproblems,
          discarding those subproblems that are guaranteed to lead to worse
          solutions than the current best-known solution. This pruning process
          significantly reduces the search space, allowing the algorithm to
          focus on promising areas of the solution space while ignoring
          unpromising regions. As a result, the Branch and Bound algorithm
          efficiently explores the solution space and can find optimal or
          near-optimal solutions for the TSP without having to exhaustively
          examine all possible permutations, like with Depth First Search.
        </p>
        <p className="desc">
          While evaluating paths, if at any point the current travalled path is
          already longer than the best complete path, there is no point
          continuing.
        </p>
        <p className="desc">For example, let's assume:</p>
        <ol>
          <li>
            A -&gt; B -&gt; C -&gt; D -&gt; E -&gt; A is the path we found that
            gives us the current shortest path distance. It is 100km long
          </li>
          <li>
            Moving forward with the algorithm, we come across the path A -&gt; C
            -&gt; E, which is 120km long. Since it is already longer than the
            current best path distance, we stop exploring paths from this point
            immediately
          </li>
          <li>
            Instead of continuing to evaluate all of the solutions from here, we
            can go down a completely different path, eliminating the hassle of
            going down paths that we know for sure will be longer than 100km,
            like:
            <ul>
              <li>A -&gt; C -&gt; E -&gt; D -&gt; B -&gt; A</li>
              <li>A -&gt; C -&gt; E -&gt; B -&gt; D -&gt; A</li>
            </ul>
          </li>
        </ol>
        <p className="desc">
          In this sense, the implementation of Branch and Bound is very similar
          to Depth First Search, with the difference being that we don't
          continue down paths that we know for sure are already longer than the
          current best, making it generally more efficient than Depth First
          Search.
        </p>
      </div>
    </>
  );
}
