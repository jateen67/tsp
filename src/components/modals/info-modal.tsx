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
            The Traveling Salesman Problem is an infamous theoretical computer
            science problem asks the following: "Given a list of cities and the
            distances between each pair of cities, what is the shortest possible
            route that visits each city and returns to the origin city?".
          </p>
          <h3>This project</h3>
          <ul>
            <li>
              The goal of this site is to help users visualize, and learn
              different ways of attempting to solve the Traveling Salesman
              Problem in an accessible, friendly way
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
            Heuristic algorithms attempt to find good approximations of the
            optimal path in a relatively quick amount of time, sacrificing
            accuracy in the process. The heuristic algorithms implemented
            include:
          </p>
          <ul>
            <li>Nearest Neighbour</li>
            <li>Simulated Annealing</li>
          </ul>
          <h3>Exhaustive</h3>
          <p className="desc">
            Exhaustive algorithms always find the best solution by searching
            through and evaluating every single path possible. As a result, they
            are significantly less time-efficient than their heuristic
            counterpart. The exhaustive algorithms implemented include:
          </p>
          <ul>
            <li>Depth First Search</li>
            <li>Branch and Bound</li>
          </ul>
          <h2>Technologies</h2>
          <p>Built using:</p>
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
