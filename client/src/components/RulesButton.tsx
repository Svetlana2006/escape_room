import { useState } from "react";
import Modal from "./Modal";

export default function RulesButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="top-float top-left">
        <button className="btn" onClick={() => setOpen(true)}>
          Rules
        </button>
      </div>
      {open ? (
        <Modal title="Rules / Protocol" onClose={() => setOpen(false)}>
          <div className="panel-soft card">
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, color: "var(--muted)" }}>
              <li>
                Solve segments in order. You can view all 5 questions of a segment, but you must solve the segment to
                unlock the next.
              </li>
              <li>
                The stopwatch starts when Segment 1 appears and keeps running. Hints add <span className="warn">+1:00</span>{" "}
                penalty each.
              </li>
              <li>Only 2 hints are allowed per segment.</li>
              <li>The Logic segment is the final segment and provides no hints at all.</li>
              <li>Answers are typed into letter boxes (1 character per box). Spaces/punctuation are ignored.</li>
              <li>
                Use <span className="kbd">Submit Quiz</span> to leave early. Your progress and time will be recorded.
              </li>
            </ul>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
