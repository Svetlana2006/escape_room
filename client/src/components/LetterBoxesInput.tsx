import { useEffect, useMemo, useRef, useState } from "react";

function normalize(raw: string): string {
  return raw.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export default function LetterBoxesInput({
  length,
  value,
  onChange,
  disabled
}: {
  length: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);
  const v = useMemo(() => normalize(value).slice(0, length), [value, length]);

  useEffect(() => {
    if (disabled) return;
    onChange(v);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }}
      onClick={() => inputRef.current?.focus()}
      role="textbox"
      aria-label="Answer input"
      aria-disabled={disabled ? "true" : "false"}
    >
      <input
        ref={inputRef}
        value={v}
        disabled={disabled}
        onChange={(e) => onChange(normalize(e.target.value).slice(0, length))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none"
        }}
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
      />
      {Array.from({ length }).map((_, i) => {
        const ch = v[i] ?? "";
        return (
          <div
            key={i}
            className="panel-soft"
            style={{
              width: 38,
              height: 44,
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--mono)",
              fontSize: 16,
              letterSpacing: "0.06em",
              borderColor: ch
                ? "rgba(102, 242, 255, 0.42)"
                : focused
                  ? "rgba(167, 139, 250, 0.34)"
                  : "rgba(146, 175, 255, 0.16)",
              boxShadow: focused && !disabled ? "0 0 0 3px rgba(102, 242, 255, 0.08), 0 0 26px rgba(167, 139, 250, 0.12)" : undefined,
              color: ch ? "var(--text)" : "rgba(246, 247, 255, 0.48)"
            }}
            title={disabled ? "Locked" : "Type your answer"}
          >
            {ch || "."}
          </div>
        );
      })}
    </div>
  );
}
