import { Dispatch, SetStateAction } from "react";
import "./modal.css";

export default function InfoModal({
  closeInfoModal,
}: {
  closeInfoModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="modal-background">
      <div className="modal-container info-modal-container">
        <div className="title-close-btn">
          <button onClick={() => closeInfoModal(false)}>x</button>
        </div>
        <div className="title">
          <h1>Travelling Salesman Problem</h1>
        </div>
        <div className="body">
          <p className="desc">
            The Traveling Salesman Problem asks the following: "Given a list of
            cities and the distances between each pair of cities, what is the
            shortest possible route that visits each city and returns to the
            origin city?".
          </p>
          <h3>This project</h3>
          <ul>
            <li>
              The goal of this site is to help visualize, learn, and develop
              different algorithms for the traveling salesman problem in a way
              that's easily accessible
            </li>
            <li>
              As you apply different algorithms, the current best path is saved
              so that you can compare it with the best path found in other
              algorithms (Once you change the number of points, then the best
              path recorded is cleared, obviously :P)
            </li>
          </ul>
          <h2>Algorithms</h2>
          <h3>Heuristic</h3>
          <p className="desc">
            Heuristic algorithms attempt to find a good approximation of the
            optimal path within a more reasonable amount of time. The heuristic
            algorithms implemented include:
          </p>
          <ul>
            <li>Nearest Neighbour</li>
            <li>Simulated Annealing</li>
          </ul>
          <h3>Exhaustive</h3>
          <p className="desc">
            Exhaustive algorithms will always find the best possible solution by
            evaluating every possible path. They are significantly more
            expensive than heuristic algorithms. The exhaustive algorithms
            implemented include:
          </p>
          <ul>
            <li>Depth First Search</li>
            <li>Branch and Bound</li>
          </ul>
          <h2>Technologies</h2>
          <p>These were the main tools used to build this site:</p>
          <ul>
            <li>
              <a className="link" href="https://react.dev/" target="_blank">
                React.js
              </a>
            </li>
            <li>
              <a
                className="link"
                href="https://www.typescriptlang.org/"
                target="_blank"
              >
                TypeScript
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
