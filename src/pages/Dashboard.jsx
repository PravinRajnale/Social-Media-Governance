import { useState } from "react";
import ProgressNav from "../components/ProgressNavigation";
import UploadData from "../components/UploadData";

const ACCENT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const COUNT_BADGE_STYLES = [
  { bg: "#f0f0ff", color: "#4f46e5", border: "#c7d2fe" },
  { bg: "#ecfdf5", color: "#047857", border: "#6ee7b7" },
  { bg: "#fffbeb", color: "#b45309", border: "#fcd34d" },
  { bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5" },
  { bg: "#f5f3ff", color: "#6d28d9", border: "#c4b5fd" },
];

function PctRing({ pct, color }) {
  const r      = 22;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div style={{ position: "relative", width: 56, height: 56 }}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 600,
        color,
      }}>
        {pct.toFixed(0)}%
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      width: "0.5px",
      background: "#e5e7eb",
      margin: "0 16px",
      alignSelf: "stretch",
    }} />
  );
}

function LensCard({ item, index }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const badge  = COUNT_BADGE_STYLES[index % COUNT_BADGE_STYLES.length];

  return (
    <div style={{
      background: "#ffffff",
      border: "0.5px solid #e5e7eb",
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      marginBottom: 12,
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${accent}, ${accent}99)`,
        borderRadius: "3px 0 0 3px",
      }} />

      {/* Lens Name */}
      <div style={{ minWidth: 160, maxWidth: 160, paddingLeft: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>
          {item.lens}
        </span>
      </div>

      {/* Arrow */}
      <div style={{ padding: "0 8px", flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: "#9ca3af" }}>
          <path
            d="M4 10h12M12 6l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Divider />

      {/* Count */}
      <div style={{ minWidth: 80, maxWidth: 80, display: "flex", justifyContent: "center" }}>
        <span style={{
          background: badge.bg,
          color: badge.color,
          border: `0.5px solid ${badge.border}`,
          fontFamily: "monospace",
          fontSize: 18,
          fontWeight: 500,
          padding: "6px 14px",
          borderRadius: 10,
          whiteSpace: "nowrap",
        }}>
          {item.count}
        </span>
      </div>

      <Divider />

      {/* Top Themes */}
      <div style={{ minWidth: 170, maxWidth: 170, display: "flex", flexDirection: "column", gap: 5 }}>
        {item.top_themes?.map((theme, i) => (
          <span key={i} style={{
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 10px",
            // borderRadius: 20,
            background: "#f9fafb",
            color: "#000",
            border: "0.5px solid #e5e7eb",
            width: "fit-content",
          }}>
            {theme}
          </span>
        ))}
      </div>

      <Divider />

      {/* Key Insights */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {item.key_insights?.map((insight, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            fontSize: 13,
            color: "#4b5563",
            lineHeight: 1.55,
          }}>
            <span style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: accent,
              flexShrink: 0,
              marginTop: 6,
            }} />
            {insight}
          </div>
        ))}
      </div>

      <Divider />

      {/* Percentage Ring */}
      <div style={{ minWidth: 80, display: "flex", justifyContent: "center" }}>
        <PctRing pct={item.percentage} color={accent} />
      </div>

    </div>
  );
}

function ReportView({ result }) {
  const totalCount = result?.reduce((sum, r) => sum + r.count, 0) ?? 0;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111827", margin: 0 }}>
          Final Report
        </h2>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#000",
          background: "#f3f4f6",
          padding: "3px 10px",
          borderRadius: 20,
          border: "0.5px solid #e5e7eb",
        }}>
          {result?.length} lenses · {totalCount.toLocaleString()} total responses
        </span>
      </div>

      {/* Column Headers */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0 24px 8px 65px",
      }}>
        {[
          { label: "Lens",         width: 160       },
          { label: "",             width: 36        },
          { label: "Count",        width: 112       },
          { label: "Top Themes",   width: 202       },
          { label: "Key Insights", flex: true       },
          { label: "Share",        width: 112       },
        ].map(({ label, width, flex: isFlex }, i) => (
          <div key={i} style={{
            ...(isFlex ? { flex: 1 } : { minWidth: width, maxWidth: width }),
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#000",
            paddingLeft:20,
          }}>
            {label}
          </div>
        ))}
      </div>

      {result?.map((item, i) => (
        <LensCard key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function Dashboard() {
  const [step,         setStep        ] = useState(-1);
  const [result,       setResult      ] = useState(null);
  const [bridgeLabels, setBridgeLabels] = useState([
    "19,751 total rows",     
    "2,191 clean data",    
    "Brand Perception categories",    
    "Insights generated",     
  ]);

  const updateBridgeLabel = (gapIndex, text) => {
    setBridgeLabels(prev => {
      const next = [...prev];
      next[gapIndex] = text;
      return next;
    });
  };

  const renderContent = () => {
    if (step < 5) {
      return (
        <UploadData
          step={step}
          setStep={setStep}
          setResult={setResult}
          updateBridgeLabel={updateBridgeLabel}
        />
      );
    }
    return <ReportView result={result} />;
  };

  return (
    <div className="h-full">
      <div className="px-8">
        <ProgressNav step={step} bridgeLabels={bridgeLabels} />
        <div className="max-w-9xl mx-auto py-7">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;