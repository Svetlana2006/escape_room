import React from "react";

export default function Modal({
  title,
  children,
  onClose,
  footer
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="panel modal" onMouseDown={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
          <div>
            <div className="brand">
              <span className="brand-dot" />
              <span>Escape Room</span>
            </div>
            <h2 style={{ margin: "10px 0 0", fontFamily: "var(--mono)", letterSpacing: "0.02em" }}>{title}</h2>
          </div>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
        {footer ? (
          <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end", gap: 10 }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

