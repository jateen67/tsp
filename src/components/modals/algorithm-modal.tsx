import { Dispatch, SetStateAction } from "react";
import "./modal.css";

export default function Modal({
  closeModal,
  selectedAlgorithm,
}: {
  closeModal: Dispatch<SetStateAction<boolean>>;
  selectedAlgorithm: string;
}) {
  const content = () => {
    switch (selectedAlgorithm) {
      case "Nearest Neighbour":
        return (
          <>
            <div className="title">
              <h2>Nearest Neighbour</h2>
            </div>
            <div className="body">
              <p className="desc">
                This is a heuristic, greedy algorithm. It constantly travels to
                the point closest to the current location.
              </p>
              <ol>
                <li>Start at the beginning point</li>
                <li>
                  Go through all "unvisited" points to find the one with the
                  shortest distance from the beginning point
                </li>
                <li>Travel to said closest point. Mark it as visited</li>
                <li>
                  Continue from Step 2 until there are no more unvisited points,
                  then return to the start
                </li>
              </ol>
              <p className="desc">
                Since the theory behind Nearest Neighbour is very simple, it is
                the most straightforward and easy-to-understand algorithm.
              </p>
            </div>
          </>
        );
      case "Depth First Search":
        return (
          <>
            <div className="title">
              <h2>Depth First Search</h2>
            </div>
            <div className="body">
              <p className="desc">
                This is an exhaustive, brute-force algorithm that's guaranteed
                to find the best possible path, but depending on the number of
                points plotted, it can be less than ideal to use. For example:
              </p>
              <ul>
                <li>
                  With 10 points plotted, there are 181,400 paths to evaluate
                </li>
                <li>
                  With 11 points plotted, there are 1,814,000 paths to evaluate
                </li>
                <li>
                  With 12 points plotted, there are 19,960,000 paths to evaluate
                </li>
                <li>
                  With 20 points plotted, there are 60,822,550,204,416,000 paths
                  to evaluate
                </li>
              </ul>
              <p className="desc">
                Since this growth is very inefficient (factorial growth), brute
                forcing a solution is very impractical. This is why heuristic
                algorithms exist; they provide a good approximation of the best
                path, but it comes at a cost of some uncertainty.
              </p>
              <p className="desc">Here's how the algorithm works:</p>
              <ol>
                <li>Start at the beginning point</li>
                <li>
                  Travel an arbitrary complete path, and mark that path as
                  "visited"
                </li>
                <li>
                  After travelling the complete path, recurse (backtrack) to a
                  previous point, and find a new "unvisited" complete path
                </li>
                <li>
                  Check back if the distance of this newly visited complete path
                  is shorter than any previously travelled complete path
                </li>
                <li>
                  Continue from Step 1 until there are no more unvisited
                  complete paths
                </li>
              </ol>
            </div>
          </>
        );
      case "Simulated Annealing":
        return (
          <>
            <div className="title">
              <h2>Simulated Annealing</h2>
            </div>
            <div className="body">
              <p className="desc">
                There's a lot of interesting theory behind this algorithm, so
                apologies for this essay :P
              </p>
              <p className="desc">
                This is a probabilistic optimization algorithm inspired by the
                annealing process in metallurgy, commonly used to solve
                combinatorial optimization problems, like this one. The main
                idea is to mimic the annealing process of slowly cooling a
                material to reach a low-energy state, which allows the atoms to
                settle into an optimal configuration. Similarly, Simulated
                Annealing explores the solution space by iteratively making
                small random changes to the current solution and accepting these
                changes based on some probabilistic criteria.
              </p>
              <p className="desc">
                During execution, it starts with an arbitrary initial solution,
                often obtained through a heuristic or random approach. Then, it
                repeatedly generates neighbouring solutions by applying small
                perturbations to the current solution, such as swapping two
                cities' positions in the completed path. If the new solution
                successfully shortens the total path length of the initial
                completed path, it is accepted as the new current solution.
                However, if the new solution worsens the objective function, it
                is still accepted with a certain probability. This probability
                is determined by a temperature parameter that controls the
                likelihood of accepting worse solutions early in the algorithm.
                As the algorithm progresses, the temperature decreases, reducing
                the probability of accepting worse solutions, and the process
                converges towards an optimal or near-optimal solution.
              </p>
              <p className="desc">
                Simulated Annealing is particularly useful in scenarios where
                finding an exact solution is computationally infeasible due to
                the enormous solution space. By allowing the algorithm to accept
                worse solutions with a certain probability, it can escape local
                optima and explore different regions of the solution space. This
                property makes Simulated Annealing a powerful technique for
                finding approximate solutions to complex optimization problems,
                especially when the objective function landscape is rugged or
                has many local optima. Additionally, it allows the algorithm to
                be applied in a variety of domains, not only in TSP but also in
                other problems like job scheduling, resource allocation, and
                network optimization.
              </p>
            </div>
          </>
        );
      case "Branch and Bound":
        return (
          <>
            <div className="title">
              <h2>Branch and Bound</h2>
            </div>
            <div className="body">
              <p className="desc">
                This is a recursive algorithm that guarantees the optimal
                solution, much like Depth First Search.
              </p>
              <p className="desc">
                It systematically divides the problem into smaller subproblems,
                discarding those subproblems that are guaranteed to lead to
                worse solutions than the current best-known solution. This
                pruning process significantly reduces the search space, allowing
                the algorithm to focus on promising areas of the solution space
                while ignoring unpromising regions. As a result, the Branch and
                Bound algorithm efficiently explores the solution space and can
                find optimal or near-optimal solutions for the TSP without
                having to exhaustively examine all possible permutations, like
                with Depth First Search.
              </p>
              <p className="desc">
                While evaluating paths, if at any point the current travalled
                path is already longer than the best complete path, there is no
                point continuing.
              </p>
              <p className="desc">For example, let's assume:</p>
              <ol>
                <li>
                  A -&gt; B -&gt; C -&gt; D -&gt; E -&gt; A is the path we found
                  that gives us the current shortest path distance. It is 100km
                  long
                </li>
                <li>
                  Moving forward with the algorithm, we come across the path A
                  -&gt; C -&gt; E, which is 120km long. Since it is already
                  longer than the current best path distance, we stop exploring
                  paths from this point immediately
                </li>
                <li>
                  Instead of continuing to evaluate all of the solutions from
                  here, we can go down a completely different path, eliminating
                  the hassle of going down paths that we know for sure will be
                  longer than 100km, like:
                  <ul>
                    <li>A -&gt; C -&gt; E -&gt; D -&gt; B -&gt; A</li>
                    <li>A -&gt; C -&gt; E -&gt; B -&gt; D -&gt; A</li>
                  </ul>
                </li>
              </ol>
              <p className="desc">
                In this sense, the implementation of Branch and Bound is very
                similar to Depth First Search, with the difference being that we
                don't continue down paths that we know for sure are already
                longer than the current best, making it generally more efficient
                than Depth First Search.
              </p>
            </div>
          </>
        );
    }
  };
  return (
    <div className="modal-background">
      <div className="algo-modal-container">
        <div className="title-close-btn">
          <button onClick={() => closeModal(false)}>x</button>
        </div>
        {content()}
      </div>
    </div>
  );
}
