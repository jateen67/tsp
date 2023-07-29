import { useState } from "react";
import InfoModal from "../modals/info-modal";

export default function Intro() {
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

  return (
    <>
      <div className="intro-info-container">
        <div className="intro-title">
          <h3>Travelling Salesman Problem Visualizer</h3>
        </div>
        <div className="intro-description">
          This site allows you to visualize algorithms that attempt to solve the
          Travelling Salesman Problem. Simply plot points, select an algorithm,
          and observe!{" "}
          <a
            className="click-here"
            onClick={() => {
              setOpenInfoModal(true);
            }}
          >
            Click here
          </a>{" "}
          for more info.
        </div>
      </div>
      {openInfoModal && <InfoModal closeInfoModal={setOpenInfoModal} />}
    </>
  );
}
