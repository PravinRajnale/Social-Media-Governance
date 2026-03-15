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
 
// ── Manual per-theme percentages ─────────────────────────────────────────────
// Add every lens here. Key = exact lens name, value = % array in same order as top_themes.
const THEME_PCTS = {
  "Response Accountability": [32, 28, 22, 18],
  "Customer Escalation Signals": [34, 26, 22, 18],
  "Resolution Orientation":[30,26,24,20],
  "Brand Promise Consistency":[35,27,22,16],
  "Fraud & Impersonation Signals":[34,28,22,16],
  "Tone & Professionalism":[32,28,22,18],
  "Transparency & Disclosure":[36,26,22,16],
  "Community Sentiment Shift":[38,28,20,14],
  "Moderation Governance":[34,28,22,16],
  "Misinformation & Clarification":[40,28,20,12],
};
 
// Dummy lens definitions for tooltip
const LENS_DEFINITIONS = {
  "Response Accountability": "Measures whether the brand acknowledges customer queries, complaints, or issues in comments and how consistently it provides responses.",
  "Resolution Orientation": "Evaluates whether brand replies attempt to resolve the issue (guidance, support contact, escalation) rather than giving generic responses.",
  "Transparency & Disclosure": "Assesses whether the brand provides clear, honest information in posts and replies, including disclaimers, clarifications, or corrections.",
  "Tone & Professionalism": "Evaluates whether brand communication in posts and responses maintains a respectful, professional, and brand-aligned tone even in negative conversations.",
  "Misinformation & Clarification": "Identifies instances where incorrect claims, rumors, or fake information appear in comments and whether the brand actively corrects them.",
  "Fraud & Impersonation Signals": "Detects comments referencing fake websites, fake job offers, fraudulent numbers, or impersonation accounts affecting the brand.",
  "Moderation Governance": "Evaluates how the brand handles abusive, spam, or harmful comments (ignoring, deleting, addressing, or moderating).",
  "Customer Escalation Signals": "Identifies comments indicating unresolved issues, repeated complaints, or customers asking for higher-level intervention.",
  "Community Sentiment Shift": "Observes when comment threads show collective dissatisfaction or trust loss, indicating potential reputational risk.",
  "Brand Promise Consistency": "Assesses whether customer comments indicate a gap between brand claims in posts and the actual experience shared by users.",
};
 
 
function PctRing({ pct, color }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
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
  const badge = COUNT_BADGE_STYLES[index % COUNT_BADGE_STYLES.length];
  const [tipVisible, setTipVisible] = useState(false);
  const themePcts = THEME_PCTS[item.lens] ?? item.top_themes.map(() => null);
 
  const definition =
    LENS_DEFINITIONS[item.lens] ??
    `Analyzes responses through the "${item.lens}" perspective to surface patterns and insights.`;
 
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
      overflow: "visible",          // must be visible for tooltip to show
    }}>
 
      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${accent}, ${accent}99)`,
        borderRadius: "3px 0 0 3px",
      }} />
 
      {/* ── Lens Name + Tooltip ───────────────────────────────────────── */}
      <div
        style={{ minWidth: 160, maxWidth: 160, paddingLeft: 12, position: "relative" }}
        onMouseEnter={() => setTipVisible(true)}
        onMouseLeave={() => setTipVisible(false)}
      >
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#111827",
          lineHeight: 1.4,
          borderBottom: `1.5px dashed ${accent}`,
          cursor: "help",
          paddingBottom: 1,
        }}>
          {item.lens}
        </span>
 
        {/* Tooltip bubble */}
        {tipVisible && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            zIndex: 999,
            background: "#1f2937",
            color: "#f9fafb",
            fontSize: 12,
            lineHeight: 1.6,
            padding: "10px 14px",
            borderRadius: 10,
            width: 240,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            pointerEvents: "none",
          }}>
            {/* Caret */}
            <div style={{
              position: "absolute",
              top: -5,
              left: 16,
              width: 10,
              height: 10,
              background: "#1f2937",
              transform: "rotate(45deg)",
              borderRadius: 2,
            }} />
            <span style={{ fontWeight: 600, color: accent, display: "block", marginBottom: 4 }}>
              {item.lens}
            </span>
            {definition}
          </div>
        )}
      </div>
 
      {/* Arrow icon */}
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
 
      {/* ── Count ─────────────────────────────────────────────────────── */}
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
 
      {/* ── Top Themes — uniform fixed-height boxes with real % ─────── */}
      <div style={{ minWidth: 220, maxWidth: 220, display: "flex", flexDirection: "column", gap: 6 }}>
        {item.top_themes?.map((theme, i) => (
          <div key={i} style={{
            width: "100%",
            height: 44,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            borderRadius: 10,
            background: "#f9fafb",
            border: "0.5px solid #e5e7eb",
            gap: 8,
          }}>
            <span style={{
              flex: 1,
              fontSize: 12,
              fontWeight: 500,
              color: "#374151",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {theme}
            </span>
            {themePcts[i] != null && (
              <span style={{
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 700,
                color: accent,
                background: `${accent}15`,
                padding: "2px 7px",
                borderRadius: 8,
                whiteSpace: "nowrap",
              }}>
                {themePcts[i]}%
              </span>
            )}
          </div>
        ))}
      </div>
 
      <Divider />
 
      {/* ── Key Insights ──────────────────────────────────────────────── */}
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
 
      {/* ── Percentage Ring ───────────────────────────────────────────── */}
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
          fontSize: 15,
          color: "#818385",
          background: "#f3f4f6",
          fontWeight:600,
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
        padding: "0 24px 8px 36px",
      }}>
        {[
          { label: "Lens", width: 160 },
          { label: "", width: 36 },
          { label: "Count", width: 112 },
          { label: "Top Themes", width: 252 },
          { label: "Key Insights", flex: true },
          { label: "Share", width: 112 },
        ].map(({ label, width, flex: isFlex }, i) => (
          <div key={i} style={{
            ...(isFlex ? { flex: 1 } : { minWidth: width, maxWidth: width }),
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#000",
            paddingLeft:20
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
  const [step, setStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [bridgeLabels, setBridgeLabels] = useState([
    "19,671 Rows",
    "2,701 Clean",
    "Brand Perception Lenses",
    "Insights",
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