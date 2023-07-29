import { Dispatch, SetStateAction } from "react";
import NearestNeighbour from "./algorithm-descriptions/nearest-neighbour-description.tsx";
import SimulatedAnnealing from "./algorithm-descriptions/simulated-annealing-description.tsx";
import DepthFirstSearch from "./algorithm-descriptions/depth-first-search-description.tsx";
import BranchAndBound from "./algorithm-descriptions/branch-and-bound-description.tsx";
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
        return <NearestNeighbour />;
      case "Depth First Search":
        return <DepthFirstSearch />;
      case "Simulated Annealing":
        return <SimulatedAnnealing />;
      case "Branch and Bound":
        return <BranchAndBound />;
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
