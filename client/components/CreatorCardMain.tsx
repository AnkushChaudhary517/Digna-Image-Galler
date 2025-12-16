import React from "react";

type SectionData = {
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type Props = {
  a?: SectionData;
  b?: SectionData;
  c?: SectionData;
  d?: SectionData;
  e?: SectionData;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CreatorCardMain
 * - Transparent outer container so a background ribbon can show through.
 * - 3 stacked horizontal rows:
 *   Row1: A (40%) | B (60%)
 *   Row2: C (100%)
 *   Row3: D (60%) | E (40%)
 *
 * Each section receives heading/description/image via props.
 * Uses a similar visual language to CreatorCard (rounded, padding, subtle shadow).
 */
export default function CreatorCardMain({
  a = {},
  b = {},
  c = {},
  d = {},
  e = {},
  className,
  style,
}: Props) {
  const outerStyle: React.CSSProperties = {
    background: "transparent",
    margin: "2rem",
    position: "relative",
    zIndex: 10,
    ...style,
  };

  const cardInnerStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 10px 30px rgba(11,16,51,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

  const sectionBase: React.CSSProperties = {
    padding: 12,
    boxSizing: "border-box" as const,
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: 8,
  };

  return (
    <div className={className} style={outerStyle}>
      <div style={cardInnerStyle}>
        {/* Row 1: A (40%) | B (60%) */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Section A */}
          <div style={{ width: "40%", ...sectionBase }}>
            <div style={{ display: "flex", flexDirection: "column", height: 260, gap: 8 }}>
              {/* upper half: horizontal split 40/60 */}
              <div style={{ display: "flex", height: "50%", gap: 8 }}>
                <div style={{ width: "40%", padding: 8 }}>
                  <h4 style={{ margin: 0, fontSize: 18, wordWrap: "break-word" }}>{a.heading}</h4>
                </div>
                <div style={{ width: "60%", padding: 8 }}>
                  <p style={{ margin: 0, color: "#334155", fontSize: 14, wordWrap: "break-word" }}>{a.description}</p>
                </div>
              </div>
              {/* lower half: image */}
              <div style={{ height: "50%", padding: 8 }}>
                {a.imageSrc ? <img src={a.imageSrc} alt={a.imageAlt ?? ""} style={imgStyle} /> : null}
              </div>
            </div>
          </div>

          {/* Section B */}
          <div style={{ width: "60%", ...sectionBase }}>
            <div style={{ display: "flex", flexDirection: "column", height: 260 }}>
              {/* upper 30%: heading full width */}
              <div style={{ height: "30%", padding: 8 }}>
                <h4 style={{ margin: 0, fontSize: 18 }}>{b.heading}</h4>
              </div>
              {/* lower 70%: description left, image right */}
              <div style={{ height: "70%", display: "flex", gap: 8, padding: 8 }}>
                <div style={{ width: "60%" }}>
                  <p style={{ margin: 0, color: "#334155", fontSize: 14 }}>{b.description}</p>
                </div>
                <div style={{ width: "40%" }}>
                  {b.imageSrc ? <img src={b.imageSrc} alt={b.imageAlt ?? ""} style={imgStyle} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: C (single full-width row) */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: "100%", ...sectionBase }}>
            <div style={{ display: "flex", height: 220 }}>
              {/* left 30% width & 70% height area (stack heading + description vertically) */}
              <div style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 8 }}>
                <h4 style={{ margin: 0, fontSize: 18 }}>{c.heading}</h4>
                <p style={{ marginTop: 8, color: "#334155", fontSize: 14 }}>{c.description}</p>
              </div>
              {/* right 70%: image */}
              <div style={{ width: "70%", padding: 8 }}>
                {c.imageSrc ? <img src={c.imageSrc} alt={c.imageAlt ?? ""} style={imgStyle} /> : null}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: D (60%) | E (40%) */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Section D (60%) */}
          <div style={{ width: "60%", ...sectionBase }}>
            <div style={{ display: "flex", flexDirection: "column", height: 200 }}>
              <div style={{ padding: 8 }}>
                <h4 style={{ margin: 0, fontSize: 18 }}>{d.heading}</h4>
              </div>
              <div style={{ padding: 8, display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: "#334155" }}>{d.description}</p>
                </div>
                <div style={{ width: 160 }}>
                  {d.imageSrc ? <img src={d.imageSrc} alt={d.imageAlt ?? ""} style={imgStyle} /> : null}
                </div>
              </div>
            </div>
          </div>

          {/* Section E (40%) */}
          <div style={{ width: "40%", ...sectionBase }}>
            <div style={{ display: "flex", flexDirection: "column", height: 200 }}>
              <div style={{ padding: 8 }}>
                <h4 style={{ margin: 0, fontSize: 18 }}>{e.heading}</h4>
              </div>
              <div style={{ padding: 8, marginTop: 8 }}>
                <p style={{ margin: 0, color: "#334155" }}>{e.description}</p>
              </div>
              <div style={{ marginTop: "auto", padding: 8 }}>
                {e.imageSrc ? <img src={e.imageSrc} alt={e.imageAlt ?? ""} style={imgStyle} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}