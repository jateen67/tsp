import { SetStateAction, useState } from "react";
import Modal from "../modals/algorithm-modal";

export default function Controls({
  possiblePaths,
  selectedAlgorithm,
  coordsAmount,
  changeSelectedAlgorithm,
  changePossiblePaths,
  plot,
  play,
  clearLines,
}: {
  possiblePaths: number;
  selectedAlgorithm: string;
  coordsAmount: string;
  changeSelectedAlgorithm: (e: {
    target: { value: SetStateAction<string> };
  }) => void;
  changePossiblePaths: (params: string) => void;
  plot: (params: number) => void;
  play: () => void;
  clearLines: () => void;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="controls-container">
        <div className="algorithm-select">
          <div className="algorithm-label">
            <span>Algorithm</span>
          </div>
          <div className="algorithm-choose-and-info">
            <select className="algorithms" onChange={changeSelectedAlgorithm}>
              <optgroup label="Heuristic">
                <option value="Nearest Neighbour">Nearest Neighbour</option>
                <option value="Simulated Annealing">Simulated Annealing</option>
              </optgroup>
              <optgroup label="Exhaustive">
                <option value="Depth First Search">Depth First Search</option>
                <option value="Branch and Bound">Branch and Bound</option>
              </optgroup>
            </select>
            <button
              className="open-modal-button"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              ?
            </button>
          </div>
        </div>
        <div className="controls-select">
          <div className="controls-label">
            <span>Controls</span>
          </div>
          <div className="controls-choose">
            <button className="play-button" onClick={play}>
              Play
            </button>
            <button className="clear-button" onClick={clearLines}>
              Clear Lines
            </button>
          </div>
        </div>
        <div className="points-select">
          <div className="points-label">
            <span>
              Points{" "}
              <span className="points-label-warning">
                Max. 5 for practicality/efficiency
              </span>
            </span>
          </div>
          <div className="points-choose">
            <input
              className="slider"
              type="range"
              min="3"
              max="5"
              step="1"
              defaultValue="3"
              onChange={(e) => {
                changePossiblePaths(e.target.value);
              }}
            ></input>
            <button
              className="plot-button"
              onClick={() => plot(Number(coordsAmount))}
            >
              Plot
            </button>
          </div>
          <p className="number-of-paths">
            <span className="unique-paths-label">Unique Paths: </span>
            <span className="unique-paths">
              {possiblePaths === 1
                ? `${possiblePaths} path`
                : `${possiblePaths} paths`}
            </span>
          </p>
        </div>
      </div>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          selectedAlgorithm={selectedAlgorithm}
        />
      )}
    </>
  );
}
