import { useState, useEffect, CSSProperties } from "react";
// take from lib folder
import MEDUSA from "../assets/aegis-logo.png";
import PILLAR from "../assets/goldColumn.png";

// ─── Types ────────────────────────────────────────────────────────────────────
type CSSVars = CSSProperties & { [key: string]: string | number };

// ─── Constants ────────────────────────────────────────────────────────────────
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#F5D76E";
const GOLD_DARK  = "#9A7B1C";
const NAVY       = "#0D1B4B";
const NAVY_DEEP  = "#080F2E";

const CORNERS: CSSProperties[] = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 },
];

export default function AegisWelcome() {
  const [glowing, setGlowing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setGlowing((g) => !g), 1800);
    return () => clearInterval(id);
  }, []);

  // ─── Styles ──────────────────────────────────────────────────────────────────
  const rootStyle: CSSProperties = {
    minHeight: "100vh",
    background: `radial-gradient(ellipse at 50% 30%, #152460 0%, ${NAVY_DEEP} 70%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Palatino Linotype', Georgia, serif",
    padding: "24px 0",          // no horizontal padding — pillars touch edges
    position: "relative",
    overflow: "hidden",
  };

  // Card fills full width so pillars reach the gold border
  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    background: `linear-gradient(160deg, #162158 0%, ${NAVY} 55%, #0D1640 100%)`,
    borderRadius: 28,
    border: `2.5px solid ${GOLD_DARK}`,
    boxShadow: `0 0 80px 12px rgba(10,20,70,.85), 0 0 0 1px rgba(212,175,55,.18)`,
    maxWidth: 760,
    width: "calc(100% - 32px)",  // 16px margin each side so border stays visible
    position: "relative",
    overflow: "hidden",
  };

  const cornerStyle: CSSProperties = {
    position: "absolute",
    width: 22,
    height: 22,
    border: `2px solid ${GOLD_DARK}`,
    borderRadius: 3,
    opacity: 0.7,
    zIndex: 2,
  };

  // Pillars are 2× thicker (220 px) and stretch full card height
  const pillarWrapStyle: CSSProperties = {
    flexShrink: 0,
    width: 220,
    display: "flex",
    alignItems: "stretch",
  };

  const pillarStyle: CSSProperties = {
    width: 220,
    height: "100%",
    objectFit: "fill",
    display: "block",
    mixBlendMode: "lighten",
  };

  const centerStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: "44px 8px",
  };

  // Tight wrapper — small padding so glow hugs the logo
  const medallionWrapStyle: CSSProperties = {
    borderRadius: "50%",
    padding: 4,                  // tighter negative space
    background: `radial-gradient(circle, rgba(212,175,55,.06) 0%, transparent 65%)`,
    boxShadow: glowing
      ? `0 0 55px 28px rgba(212,175,55,.6), 0 0 100px 50px rgba(212,175,55,.22), 0 0 8px 4px rgba(245,215,110,.7)`
      : `0 0 28px 10px rgba(212,175,55,.28), 0 0 6px 3px rgba(212,175,55,.45)`,
    transition: "box-shadow 1.8s ease-in-out",
  };

  // Logo 1.5× larger: was 200px → now 300px
  const medallionStyle: CSSProperties = {
    width: 300,
    height: 300,
    borderRadius: "50%",
    display: "block",
  };

  const subtitleStyle: CSSProperties = {
    color: GOLD_LIGHT,
    fontSize: 20,
    margin: 0,
    letterSpacing: "0.2em",
    fontStyle: "italic",
    textShadow: `0 0 18px rgba(212,175,55,.65)`,
  };

  const buttonStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 45%, ${GOLD_DARK} 100%)`,
    border: "none",
    borderRadius: 8,
    padding: "13px 60px",
    cursor: "pointer",
    boxShadow: pressed
      ? `0 2px 8px rgba(212,175,55,.2)`
      : hovered
      ? `0 6px 32px rgba(212,175,55,.6), 0 1px 0 rgba(255,255,255,.2) inset`
      : `0 4px 20px rgba(212,175,55,.38), 0 1px 0 rgba(255,255,255,.15) inset`,
    transform: pressed ? "scale(0.96)" : hovered ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.12s, box-shadow 0.15s",
    outline: "none",
    letterSpacing: "0.25em",
  };

  const buttonTextStyle: CSSProperties = {
    color: NAVY_DEEP,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Palatino Linotype', Georgia, serif",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  };

  const inscriptionStyle: CSSProperties = {
    marginTop: 20,
    color: GOLD_DARK,
    fontSize: 11,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    opacity: 0.65,
  };

  return (
    <div style={rootStyle}>
      <div style={cardStyle}>
        {/* Corner ornaments */}
        {CORNERS.map((pos, i) => (
          <div key={i} style={{ ...cornerStyle, ...pos }} />
        ))}

        {/* Left pillar — full height, 2× width */}
        <div style={pillarWrapStyle}>
          <img src={PILLAR} alt="Left pillar" style={pillarStyle} />
        </div>

        {/* Centre content */}
        <div style={centerStyle}>
          {/* Medallion with tight glow */}
          <div style={medallionWrapStyle}>
            <img src={MEDUSA} alt="Aegis medallion" style={medallionStyle} />
          </div>

          <p style={subtitleStyle}>Welcome to Aegis</p>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", width: "65%", gap: 10 }}>
            <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, transparent, ${GOLD_DARK}, transparent)` }} />
            <div style={{ width: 8, height: 8, background: GOLD, transform: "rotate(45deg)", boxShadow: `0 0 6px ${GOLD}`, flexShrink: 0 }} />
            <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${GOLD_DARK}, transparent)` }} />
          </div>

          {/* Button */}
          <button
            style={buttonStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
            onClick={() => alert("Entering Aegis…")}
          >
            <span style={buttonTextStyle}>Start</span>
          </button>
        </div>

        {/* Right pillar — mirrored */}
        <div style={{ ...pillarWrapStyle, transform: "scaleX(-1)" }}>
          <img src={PILLAR} alt="Right pillar" style={pillarStyle} />
        </div>
      </div>
    </div>
  );
}