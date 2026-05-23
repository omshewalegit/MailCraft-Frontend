import { useState, useRef, useEffect } from "react";

const TONES = [
  {
    value: "professional",
    label: "Professional",
    desc: "Polished & structured",
  },
  { value: "formal", label: "Formal", desc: "Executive-level" },
  { value: "friendly", label: "Friendly", desc: "Warm & approachable" },
  { value: "apologetic", label: "Apologetic", desc: "Empathetic & sincere" },
  { value: "assertive", label: "Assertive", desc: "Direct & confident" },
  { value: "concise", label: "Concise", desc: "Brief, no fluff" },
  { value: "persuasive", label: "Persuasive", desc: "Compelling & clear" },
  { value: "diplomatic", label: "Diplomatic", desc: "Tactful & measured" },
];

const SAMPLE_EMAILS = [
  {
    label: "Meeting Reschedule",
    preview: "Unable to attend Thursday's meeting...",
    content: `Hi Sarah,

I hope you're doing well. I'm writing to let you know that I won't be able to attend our scheduled meeting this Thursday at 2 PM due to an unexpected client escalation that requires my immediate attention.

Could we move it to Friday afternoon, say 3 PM, or early Monday next week? I want to make sure we have adequate time to go through the Q3 roadmap without rushing.

I apologize for the short notice and appreciate your flexibility.

Best regards,
Arjun Mehta
Product Manager`,
  },
  {
    label: "Project Deadline Extension",
    preview: "Requesting additional time for delivery...",
    content: `Hi Neha,

I wanted to reach out regarding the website redesign project due this Friday. Our team encountered some unexpected technical issues during the integration phase with the payment gateway, which has set us back by approximately 3 days.

We've been working extended hours to minimize the delay and currently have about 70% of the work completed. I'm requesting a deadline extension until next Tuesday, 18th, to ensure we deliver a thoroughly tested and polished product rather than a rushed one.

I'm happy to share a detailed progress report if that would help. Please let me know your thoughts at your earliest convenience.

Regards,
Priya Nair
Tech Lead, WebSolutions`,
  },
  {
    label: "Client Complaint",
    preview: "Disappointed with recent service quality...",
    content: `Dear Support Team,

I am writing to formally raise a concern regarding the service I received on my account (#ACC-20948) over the past two weeks.

Despite raising a support ticket on the 4th of this month, I have not received any resolution or even an acknowledgment beyond the automated response. The issue — incorrect billing of Rs. 4,800 on my October invoice — remains unresolved and is now impacting my monthly reconciliation.

As a customer of three years, I expect a higher standard of responsiveness. I would appreciate a detailed explanation and a corrected invoice at the earliest.

Sincerely,
Rajesh Iyer`,
  },
  {
    label: "Job Application Follow-up",
    preview: "Following up on my application status...",
    content: `Dear Hiring Team,

I applied for the Senior Data Analyst position at your organization on October 12th (Reference: DA-2024-334) and wanted to follow up on the current status of my application.

I remain genuinely enthusiastic about this opportunity. My background in SQL, Python, and building BI dashboards for FMCG clients aligns closely with the role requirements. I recently completed a project where I reduced reporting turnaround by 40% using automated pipelines — something I'd love to bring to your team.

Please let me know if any additional information or references are required from my end.

Thank you for your time and consideration.

Warm regards,
Simran Kaur`,
  },
  {
    label: "Vendor Payment Delay",
    preview: "Update on pending invoice settlement...",
    content: `Dear Mr. Sharma,

I'm writing with reference to Invoice #INV-0892 dated September 30th for Rs. 1,25,000, which was due for payment on October 15th.

Due to an internal finance system migration we undertook this month, several outgoing payments were held up in approval queues. We have now resolved the issue and your payment has been initiated today. Please expect it to reflect in your account within 2–3 business days.

We sincerely apologize for the inconvenience this delay may have caused to your operations. We value our partnership and assure you this will not recur.

Warm regards,
Ankita Desai
Finance Manager, BuildCorp Ltd.`,
  },
  {
    label: "Partnership Proposal",
    preview: "Exploring a potential collaboration...",
    content: `Hi Vikram,

I hope this message finds you well. I'm reaching out from GreenLogix, a supply chain analytics firm that works with mid-to-large retail brands across India. We've been following TrendMart's expansion and believe there's a compelling opportunity for both our organizations.

Specifically, we think an integration between our demand forecasting platform and your inventory system could reduce stockouts by an estimated 25–30% based on results we've seen with similar clients.

Would you be open to a 30-minute exploratory call this week or next? I can also share a brief case study beforehand if that would help frame the conversation.

Looking forward to connecting.

Best,
Aisha Mehrotra
Head of Partnerships, GreenLogix`,
  },
  {
    label: "Apology for Delay",
    preview: "Sincerely sorry for the late delivery...",
    content: `Hi Rohan,

I want to personally apologize for the delay in delivering the audit report that was originally due last Wednesday. I understand this has likely disrupted your board presentation timeline, and I take full responsibility for the inconvenience caused.

The delay occurred due to an error we identified in the financial statements provided to us, which required us to re-run portions of the analysis to maintain accuracy. We did not want to deliver a report that could mislead your stakeholders.

The final report is now complete and attached to this email. I've also added an executive summary section to make it easier to reference during your presentation.

Once again, I apologize for the disruption. Please don't hesitate to call me directly if you have any questions.

Sincerely,
Deepak Joshi
Senior Auditor, ClearBooks LLP`,
  },
  {
    label: "Salary Negotiation",
    preview: "Discussing the offered compensation...",
    content: `Dear Ms. Verma,

Thank you sincerely for extending the offer for the role of Senior Marketing Manager. I'm very excited about the opportunity to join your team and contribute to the brand's growth initiatives.

After careful consideration, I'd like to respectfully discuss the compensation component. Based on my 7 years of experience, my track record of scaling digital campaigns that delivered 3x ROI, and the current market range for this role in Mumbai, I was hoping we could explore a base salary closer to Rs. 18 LPA rather than the offered Rs. 15 LPA.

I'm very flexible on other components such as performance bonuses or review timelines, and I'm genuinely committed to making this work. I believe I can add significant value to your team and hope we can find a mutually agreeable package.

Thank you for your time and consideration.

Warm regards,
Meera Pillai`,
  },
];

const MAX = 2000;

const GlowOrb = ({ style }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      pointerEvents: "none",
      filter: "blur(80px)",
      opacity: 0.25,
      ...style,
    }}
  />
);

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{ animation: "spin 0.8s linear infinite" }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill="url(#lg)" />
    <rect
      x="5"
      y="10"
      width="18"
      height="13"
      rx="2"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeOpacity="0.9"
    />
    <path
      d="M5 12.5l9 6 9-6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.9"
    />
    <rect
      x="20"
      y="6"
      width="6"
      height="2.5"
      rx="1.2"
      fill="url(#lg2)"
      transform="rotate(-45 20 6)"
    />
    <path
      d="M17.8 14.2l3.5-3.5"
      stroke="#c7d2fe"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeOpacity="0.8"
    />
    <circle
      cx="25"
      cy="7"
      r="2.5"
      fill="#c7d2fe"
      fillOpacity="0.25"
      stroke="#a78bfa"
      strokeWidth="1"
    />
    <path
      d="M24 7l.8.8 1.5-1.5"
      stroke="#a78bfa"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FEATURES = [
  {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.15)",
    title: "Sub-3s Generation",
    desc: "Lightning-fast replies powered by advanced language models, ready before your coffee cools.",
  },
  {
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.15)",
    title: "8 Distinct Tones",
    desc: "From boardroom formal to warm & friendly — nail every context with precision tone control.",
  },
  {
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.15)",
    title: "Zero Data Retention",
    desc: "Your emails never touch a database. All processing is ephemeral and real-time.",
  },
  {
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.15)",
    title: "80% Time Saved",
    desc: "Reclaim hours each week. Let AI handle the drafting while you handle the strategy.",
  },
];

const SAMPLE_ICONS = [
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 12 12 8 8 12" />
    <line x1="12" y1="16" x2="12" y2="8" />
  </svg>,
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>,
];

const SampleMailsSection = ({ onSelect, workspaceRef }) => {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleSelect = (content, idx) => {
    onSelect(content);
    setActiveIdx(idx);
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            height: "1px",
            width: "28px",
            background: "rgba(99,102,241,0.3)",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#3d4f6e",
          }}
        >
          Sample Emails
        </span>
        <div
          style={{ height: "1px", flex: 1, background: "rgba(99,102,241,0.1)" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
        }}
      >
        {SAMPLE_EMAILS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => handleSelect(s.content, i)}
            style={{
              padding: "11px 13px",
              borderRadius: "10px",
              border:
                activeIdx === i
                  ? "1px solid rgba(99,102,241,0.45)"
                  : "1px solid rgba(255,255,255,0.07)",
              background:
                activeIdx === i
                  ? "rgba(99,102,241,0.1)"
                  : "rgba(255,255,255,0.025)",
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              textAlign: "left",
              minHeight: "72px",
            }}
            onMouseEnter={(e) => {
              if (activeIdx !== i) {
                e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.22)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeIdx !== i) {
                e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  flexShrink: 0,
                  background:
                    activeIdx === i
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    activeIdx === i
                      ? "1px solid rgba(99,102,241,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                  color: activeIdx === i ? "#a5b4fc" : "#6366f1",
                  transition: "all 0.15s",
                }}
              >
                {SAMPLE_ICONS[i]}
              </span>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: "500",
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeIdx === i ? "#c7d2fe" : "#8896b3",
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
            </div>
            <p
              style={{
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#3d4f6e",
                margin: 0,
                lineHeight: 1.5,
                paddingLeft: "29px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {s.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function EmailWriter() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedReply, setEditedReply] = useState("");

  const workspaceRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCharCount(email.length);
  }, [email]);

 // LINE 273-293 — REPLACE KARO
const generate = async () => {
  if (!email.trim()) return;
  setLoading(true);
  setError("");
  setReply("");
  setEditing(false);
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/email/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent: email, tone }),
      },
    );
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const r = await res.text();
    setReply(r);
    setEditedReply(r);
  } catch (e) {
    setError(e.message || "Could not connect. Is the backend running?");
  } finally {
    setLoading(false);
  }
};
  const copy = () => {
    navigator.clipboard.writeText(editedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToWorkspace = () =>
    workspaceRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const pct = (charCount / MAX) * 100;
  const circleR = 9;
  const circleDash = 2 * Math.PI * circleR;
  const circleOffset = circleDash * (1 - pct / 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#050712;--bg2:#080c1a;
          --surface:rgba(255,255,255,0.03);--surface2:rgba(255,255,255,0.05);--surface3:rgba(255,255,255,0.07);
          --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);--border3:rgba(255,255,255,0.15);
          --text:#e2e8f8;--text2:#8896b3;--text3:#3d4f6e;
          --accent:#6366f1;--accent2:#818cf8;--accent3:#c7d2fe;
          --gold:#d4a95a;--success:#4ade80;--danger:#f87171;
          --r:16px;--r2:12px;--r3:8px;
        }
        html{scroll-behavior:smooth;background:var(--bg)}
        body{background:var(--bg);overflow-x:hidden;min-height:100vh}
        .root{min-height:100vh;font-family:'DM Sans',sans-serif;color:var(--text);background:var(--bg);position:relative;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes pip{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes blink{0%,80%,100%{opacity:.1}40%{opacity:1}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        .nav{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1rem 2.5rem;border-bottom:1px solid var(--border);background:rgba(5,7,18,0.8);backdrop-filter:blur(20px) saturate(1.8);}
        .nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none}
        .nav-name{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:#f0f2ff;letter-spacing:-0.02em}
        .nav-name span{background:linear-gradient(135deg,#a78bfa,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .nav-right{display:flex;align-items:center;gap:10px}
        .nav-btn{padding:6px 16px;border-radius:8px;border:1px solid var(--border2);background:var(--surface2);color:var(--text2);font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;cursor:pointer;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
        .nav-btn:hover{background:var(--surface3);border-color:var(--border3);color:var(--text)}
        .nav-btn-primary{background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.3);color:#a5b4fc}
        .nav-btn-primary:hover{background:rgba(99,102,241,0.25);border-color:rgba(99,102,241,0.5);color:#c7d2fe}
        .hero{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:6rem 2rem 5rem;overflow:hidden;}
        .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent);pointer-events:none;}
        .hero-badge{position:relative;display:inline-flex;align-items:center;gap:8px;padding:7px 18px;border-radius:100px;border:1px solid rgba(99,102,241,0.2);background:rgba(99,102,241,0.06);margin-bottom:2rem;animation:fadeUp 0.6s ease both;}
        .hero-badge::before{content:'';position:absolute;inset:0;border-radius:100px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent);background-size:200% 100%;animation:gradShift 3s ease infinite;}
        .hero-badge-dot{width:5px;height:5px;border-radius:50%;background:#818cf8;animation:pip 2s infinite}
        .hero-badge-text{font-family:'JetBrains Mono',monospace;font-size:11px;color:#818cf8;letter-spacing:0.1em;text-transform:uppercase;position:relative;z-index:1}
        .hero-h1{font-family:'Syne',sans-serif;font-size:clamp(2.6rem,6vw,5rem);font-weight:800;color:#f0f2ff;line-height:1.06;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:760px;animation:fadeUp 0.6s 0.1s ease both;}
        .hero-h1 .grad{background:linear-gradient(135deg,#c7d2fe 0%,#818cf8 35%,#6366f1 65%,#4f46e5 100%);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 4s ease infinite;}
        .hero-sub{font-size:1.05rem;font-weight:300;color:var(--text3);line-height:1.75;max-width:500px;margin-bottom:2.5rem;animation:fadeUp 0.6s 0.2s ease both;letter-spacing:0.01em}
        .hero-cta-row{display:flex;align-items:center;gap:12px;margin-bottom:4rem;animation:fadeUp 0.6s 0.3s ease both}
        .cta-main{padding:12px 28px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;border:none;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:500;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px;box-shadow:0 4px 24px rgba(99,102,241,0.3),inset 0 1px 0 rgba(255,255,255,0.1);letter-spacing:0.01em;}
        .cta-main:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(99,102,241,0.45),inset 0 1px 0 rgba(255,255,255,0.1)}
        .cta-main:active{transform:translateY(0)}
        .cta-sub{padding:12px 20px;border-radius:12px;background:var(--surface2);border:1px solid var(--border2);color:var(--text2);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:all 0.15s;}
        .cta-sub:hover{background:var(--surface3);color:var(--text);border-color:var(--border3)}
        .hero-stats{display:flex;align-items:center;gap:2px;animation:fadeUp 0.6s 0.4s ease both}
        .hstat{display:flex;flex-direction:column;align-items:center;padding:0 2.5rem;border-right:1px solid var(--border)}
        .hstat:last-child{border-right:none}
        .hstat-val{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:700;color:#f0f2ff;letter-spacing:-0.04em;line-height:1.1}
        .hstat-val .acc{background:linear-gradient(135deg,#818cf8,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hstat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);letter-spacing:0.1em;text-transform:uppercase;margin-top:2px}
        .section{position:relative;max-width:1160px;margin:0 auto;padding:5rem 2.5rem}
        .section-tag{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:0.75rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:8px;}
        .section-tag::before,.section-tag::after{content:'';height:1px;width:32px;background:linear-gradient(90deg,transparent,var(--gold))}
        .section-tag::after{background:linear-gradient(90deg,var(--gold),transparent)}
        .section-h2{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:#eef0ff;letter-spacing:-0.03em;text-align:center;margin-bottom:0.75rem}
        .section-sub{font-size:0.9rem;font-weight:300;color:var(--text3);text-align:center;line-height:1.75;max-width:480px;margin:0 auto 3.5rem}
        .workspace{background:rgba(255,255,255,0.025);border:1px solid var(--border2);border-radius:24px;overflow:hidden;box-shadow:0 0 0 1px rgba(99,102,241,0.05),0 40px 120px rgba(0,0,0,0.6),0 0 80px rgba(99,102,241,0.04);position:relative;}
        .workspace::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(129,140,248,0.4),transparent);}
        .ws-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-bottom:1px solid var(--border);background:rgba(0,0,0,0.2);}
        .ws-header-left{display:flex;align-items:center;gap:10px}
        .ws-dots{display:flex;gap:6px}
        .ws-dot{width:10px;height:10px;border-radius:50%}
        .ws-header-title{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text3);letter-spacing:0.08em}
        .ws-header-right{display:flex;align-items:center;gap:8px}
        .ws-tag{padding:3px 10px;border-radius:100px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15);font-family:'JetBrains Mono',monospace;font-size:10px;color:#818cf8;letter-spacing:0.06em}
        .panels{display:grid;grid-template-columns:1fr 1fr;min-height:340px}
        @media(max-width:800px){.panels{grid-template-columns:1fr}}
        .panel{display:flex;flex-direction:column;position:relative}
        .panel+.panel{border-left:1px solid var(--border)}
        @media(max-width:800px){.panel+.panel{border-left:none;border-top:1px solid var(--border)}}
        .panel-bar{display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.5rem;border-bottom:1px solid var(--border)}
        .panel-bar-left{display:flex;align-items:center;gap:10px}
        .panel-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px}
        .panel-title{font-size:0.8rem;font-weight:500;color:var(--text2);letter-spacing:0.02em}
        .char-counter{display:flex;align-items:center;gap:6px}
        .char-text{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);letter-spacing:0.04em}
        .char-text.warn{color:#f6ad55}
        textarea{flex:1;width:100%;background:transparent;border:none;outline:none;padding:1.25rem 1.5rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;line-height:1.8;resize:none;min-height:280px;letter-spacing:0.01em;transition:background 0.2s;}
        textarea::placeholder{color:var(--text3)}
        textarea:focus{background:rgba(99,102,241,0.02)}
        .edit-textarea{border:1px solid rgba(99,102,241,0.25)!important;border-radius:0!important;background:rgba(99,102,241,0.03)!important;color:var(--text)!important;font-family:'DM Sans',sans-serif!important;font-size:0.875rem!important;font-weight:300!important;line-height:1.9!important;letter-spacing:0.015em!important;resize:none!important;outline:none!important;transition:border-color 0.2s,background 0.2s!important;}
        .edit-textarea:focus{background:rgba(99,102,241,0.05)!important;border-color:rgba(99,102,241,0.4)!important}
        .panel-focused{box-shadow:inset 0 0 30px rgba(99,102,241,0.03)}
        .out-content{flex:1;padding:1.25rem 1.5rem;font-size:0.875rem;font-weight:300;line-height:1.9;color:var(--text);white-space:pre-wrap;min-height:280px;letter-spacing:0.015em;font-family:'DM Sans',sans-serif;overflow-y:auto}
        .out-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;min-height:280px;padding:2rem}
        .empty-orb{width:56px;height:56px;border-radius:16px;border:1px solid var(--border2);background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(99,102,241,0.03));display:flex;align-items:center;justify-content:center;font-size:22px;position:relative;overflow:hidden;}
        .empty-orb::after{content:'';position:absolute;top:-100%;left:-100%;right:-100%;bottom:-100%;background:linear-gradient(135deg,transparent 40%,rgba(99,102,241,0.08),transparent 60%);animation:scanline 3s ease-in-out infinite;}
        .empty-title{font-size:0.85rem;font-weight:500;color:var(--text2);text-align:center}
        .empty-sub{font-size:0.75rem;font-weight:300;color:var(--text3);text-align:center;line-height:1.7;max-width:200px}
        .loading-wrap{flex:1;padding:1.5rem;min-height:280px}
        .skel-bar{height:10px;border-radius:5px;margin-bottom:10px;background:linear-gradient(90deg,rgba(99,102,241,0.06) 0%,rgba(129,140,248,0.12) 50%,rgba(99,102,241,0.06) 100%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;}
        .ws-controls{border-top:1px solid var(--border);padding:1.5rem;display:flex;flex-direction:column;gap:1.5rem;background:rgba(0,0,0,0.1)}
        .tone-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.875rem}
        .tone-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--text3);display:flex;align-items:center;gap:8px}
        .tone-label::before{content:'';width:16px;height:1px;background:var(--border2)}
        .selected-tone{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent2);letter-spacing:0.06em}
        .tone-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}
        @media(max-width:900px){.tone-grid{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:500px){.tone-grid{grid-template-columns:repeat(2,1fr)}}
        .tone-btn{padding:0.65rem 0.6rem;border-radius:10px;border:1px solid var(--border);background:transparent;cursor:pointer;transition:all 0.15s;display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;position:relative;overflow:hidden;}
        .tone-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),transparent);opacity:0;transition:opacity 0.15s}
        .tone-btn:hover{border-color:var(--border2);background:var(--surface2)}
        .tone-btn:hover::before{opacity:1}
        .tone-btn.active{background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.35);box-shadow:inset 0 0 20px rgba(99,102,241,0.05),0 0 0 1px rgba(99,102,241,0.1)}
        .tone-btn.active::before{opacity:1}
        .tone-name{font-size:0.75rem;font-weight:500;color:var(--text2);letter-spacing:0.01em;white-space:nowrap}
        .tone-btn.active .tone-name{color:#a5b4fc}
        .tone-desc{font-size:0.65rem;font-weight:300;color:var(--text3);line-height:1.3}
        .action-row{display:flex;gap:10px;align-items:stretch}
        .gen-btn{flex:1;padding:1rem 1.5rem;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);color:#fff;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:500;letter-spacing:0.02em;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 4px 24px rgba(99,102,241,0.25),inset 0 1px 0 rgba(255,255,255,0.12);position:relative;overflow:hidden;}
        .gen-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.1),transparent);opacity:0;transition:opacity 0.2s}
        .gen-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 40px rgba(99,102,241,0.4),inset 0 1px 0 rgba(255,255,255,0.12)}
        .gen-btn:hover::before{opacity:1}
        .gen-btn:active:not(:disabled){transform:translateY(0)}
        .gen-btn:disabled{opacity:0.35;cursor:not-allowed;box-shadow:none}
        .icon-btn{padding:0 1.1rem;border-radius:12px;border:1px solid var(--border2);background:var(--surface2);color:var(--text2);cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;min-width:80px;}
        .icon-btn:hover{background:var(--surface3);color:var(--text);border-color:var(--border3)}
        .icon-btn.ok{color:var(--success);border-color:rgba(74,222,128,0.25);background:rgba(74,222,128,0.06)}
        .icon-btn.editing{color:#a78bfa;border-color:rgba(167,139,250,0.3);background:rgba(167,139,250,0.08)}
        .icon-btn.editing:hover{background:rgba(167,139,250,0.14);border-color:rgba(167,139,250,0.45);color:#c4b5fd}
        .err-box{padding:0.8rem 1.1rem;border-radius:10px;border:1px solid rgba(248,113,113,0.15);background:rgba(248,113,113,0.05);color:#fca5a5;font-size:0.8rem;font-family:'JetBrains Mono',monospace;letter-spacing:0.02em;display:flex;align-items:center;gap:8px;}
        .dots{display:inline-flex;gap:3px;align-items:center}
        .dots span{width:3px;height:3px;border-radius:50%;background:#a5b4fc;animation:blink 1.2s infinite;display:inline-block}
        .dots span:nth-child(2){animation-delay:0.2s}
        .dots span:nth-child(3){animation-delay:0.4s}
        .features-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border-radius:20px;overflow:hidden;border:1px solid var(--border)}
        @media(max-width:900px){.features-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:500px){.features-grid{grid-template-columns:1fr}}
        .feat{background:var(--bg2);padding:2rem 1.75rem;transition:background 0.2s;position:relative;overflow:hidden}
        .feat:hover{background:rgba(255,255,255,0.025)}
        .feat-icon{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:1.25rem;position:relative}
        .feat-title{font-size:0.875rem;font-weight:500;color:#dde3f0;margin-bottom:0.5rem;font-family:'Syne',sans-serif;letter-spacing:-0.01em}
        .feat-desc{font-size:0.78rem;font-weight:300;color:var(--text3);line-height:1.75}
        .divider{height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent);margin:0}
        .footer{border-top:1px solid var(--border);padding:2rem 2.5rem;background:rgba(0,0,0,0.2)}
        .footer-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem}
        .footer-brand{display:flex;align-items:center;gap:10px}
        .footer-name{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;color:var(--text3);letter-spacing:-0.01em}
        .footer-stack{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);letter-spacing:0.04em}
        .stack-pill{padding:3px 9px;border-radius:4px;background:var(--surface2);border:1px solid var(--border);color:var(--text2);font-family:'JetBrains Mono',monospace;font-size:10px}
        @media(max-width:900px){.sample-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>

      <div className="root">
        <GlowOrb
          style={{
            width: 700,
            height: 500,
            top: -150,
            right: -100,
            background:
              "radial-gradient(ellipse,rgba(99,102,241,1),transparent)",
          }}
        />
        <GlowOrb
          style={{
            width: 500,
            height: 400,
            bottom: -100,
            left: -100,
            background:
              "radial-gradient(ellipse,rgba(99,70,150,1),transparent)",
          }}
        />
        <GlowOrb
          style={{
            width: 350,
            height: 250,
            top: "45%",
            left: "40%",
            background:
              "radial-gradient(ellipse,rgba(99,102,241,1),transparent)",
          }}
        />

        <nav className="nav">
          <div className="nav-brand">
            <LogoMark />
            <span className="nav-name">
              Mail<span>Craft</span>
            </span>
          </div>
          <div className="nav-right">
            <button
              className="nav-btn nav-btn-primary"
              onClick={scrollToWorkspace}
            >
              Try Now →
            </button>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-grid-bg" />
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span className="hero-badge-text">
              AI-Powered Email Intelligence
            </span>
          </div>
          <h1 className="hero-h1">
            Write Perfect Emails
            <br />
            <span className="grad">10× Faster with AI</span>
          </h1>
          <p className="hero-sub">
            Paste any email, select your communication style, and receive a
            polished, context-aware reply in under 3 seconds.
          </p>
          <div className="hero-cta-row">
            <button className="cta-main" onClick={scrollToWorkspace}>
              <SendIcon /> Start Generating
            </button>
            <button className="cta-sub" onClick={scrollToWorkspace}>
              See Demo ↓
            </button>
          </div>
          <div className="hero-stats">
            {[
              { val: "10K+", label: "Emails Generated" },
              { val: "<3s", label: "Avg Response" },
              { val: "8", label: "Tone Styles" },
              { val: "99.9%", label: "Uptime" },
            ].map((s, i) => (
              <div key={i} className="hstat">
                <div className="hstat-val">
                  <span className="acc">{s.val}</span>
                </div>
                <div className="hstat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" ref={workspaceRef}>
          <div className="section-tag">AI Workspace</div>
          <h2 className="section-h2" style={{ marginBottom: "2rem" }}>
            Compose Your Reply
          </h2>

          <SampleMailsSection onSelect={setEmail} workspaceRef={workspaceRef} />

          <div className="workspace">
            <div className="ws-header">
              <div className="ws-header-left">
                <div className="ws-dots">
                  <div className="ws-dot" style={{ background: "#ff5f57" }} />
                  <div className="ws-dot" style={{ background: "#febc2e" }} />
                  <div className="ws-dot" style={{ background: "#28c840" }} />
                </div>
                <span className="ws-header-title">mailcraft — workspace</span>
              </div>
              <div className="ws-header-right">
                <div className="ws-tag">v2.1</div>
              </div>
            </div>

            <div className="panels">
              <div className={`panel ${focused ? "panel-focused" : ""}`}>
                <div className="panel-bar">
                  <div className="panel-bar-left">
                    <div
                      className="panel-icon"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.15)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="panel-title">Original Email</span>
                  </div>
                  <div className="char-counter">
                    <svg width="22" height="22" viewBox="0 0 22 22">
                      <circle
                        cx="11"
                        cy="11"
                        r={circleR}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r={circleR}
                        fill="none"
                        stroke={pct > 90 ? "#f59e0b" : "#6366f1"}
                        strokeWidth="2"
                        strokeDasharray={circleDash}
                        strokeDashoffset={circleOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 11 11)"
                        style={{
                          transition: "stroke-dashoffset 0.2s, stroke 0.2s",
                        }}
                      />
                    </svg>
                    <span
                      className={`char-text${charCount > MAX * 0.9 ? " warn" : ""}`}
                    >
                      {charCount}/{MAX}
                    </span>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, MAX))}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={
                    "Paste the email you received here…\n\nHi,\nI hope this finds you well. I wanted to follow up on our discussion from last week regarding..."
                  }
                />
              </div>

              <div className="panel">
                <div className="panel-bar">
                  <div className="panel-bar-left">
                    <div
                      className="panel-icon"
                      style={{
                        background: "rgba(52,211,153,0.08)",
                        border: "1px solid rgba(52,211,153,0.12)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                      </svg>
                    </div>
                    <span className="panel-title">
                      {loading ? (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span className="dots">
                            <span />
                            <span />
                            <span />
                          </span>
                          Generating
                        </span>
                      ) : reply ? (
                        editing ? (
                          "Editing Reply"
                        ) : (
                          "Generated Reply"
                        )
                      ) : (
                        "AI Output"
                      )}
                    </span>
                  </div>
                  {reply && !loading && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className={`icon-btn${editing ? " editing" : ""}`}
                        onClick={() => setEditing(!editing)}
                      >
                        {editing ? "✓ Done" : "✎ Edit"}
                      </button>
                      <button
                        className={`icon-btn${copied ? " ok" : ""}`}
                        onClick={copy}
                      >
                        {copied ? (
                          <>
                            <CheckIcon /> Copied
                          </>
                        ) : (
                          <>
                            <CopyIcon /> Copy
                          </>
                        )}
                      </button>
                      <button className="icon-btn" onClick={generate}>
                        <RefreshIcon /> Retry
                      </button>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="loading-wrap">
                    <div style={{ marginBottom: 20 }}>
                      {[100, 85, 90, 70, 95, 60, 80, 45].map((w, i) => (
                        <div
                          key={i}
                          className="skel-bar"
                          style={{
                            width: `${w}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "1rem",
                        borderRadius: 10,
                        background: "rgba(99,102,241,0.05)",
                        border: "1px solid rgba(99,102,241,0.1)",
                      }}
                    >
                      <SpinnerIcon />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 11,
                          color: "#818cf8",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Crafting your {tone} reply…
                      </span>
                    </div>
                  </div>
                ) : reply ? (
                  editing ? (
                    <textarea
                      className="edit-textarea"
                      value={editedReply}
                      onChange={(e) => setEditedReply(e.target.value)}
                      style={{
                        flex: 1,
                        minHeight: 280,
                        padding: "1.25rem 1.5rem",
                      }}
                    />
                  ) : (
                    <div className="out-content">{editedReply}</div>
                  )
                ) : (
                  <div className="out-empty">
                    <div className="empty-orb">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(129,140,248,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                      </svg>
                    </div>
                    <div className="empty-title">
                      Your reply will appear here
                    </div>
                    <div className="empty-sub">
                      Paste an email, choose a tone, and hit Generate
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="ws-controls">
              {error && (
                <div className="err-box">
                  <span>⚠</span> {error}
                </div>
              )}
              <div>
                <div className="tone-header">
                  <div className="tone-label">Reply Tone</div>
                  <span className="selected-tone">
                    {TONES.find((t) => t.value === tone)?.label}
                  </span>
                </div>
                <div className="tone-grid">
                  {TONES.map((t) => (
                    <button
                      key={t.value}
                      className={`tone-btn${tone === t.value ? " active" : ""}`}
                      onClick={() => setTone(t.value)}
                      title={t.desc}
                    >
                      <span className="tone-name">{t.label}</span>
                      <span className="tone-desc">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="action-row">
                <button
                  className="gen-btn"
                  onClick={generate}
                  disabled={loading || !email.trim()}
                >
                  {loading ? (
                    <>
                      <SpinnerIcon /> Generating reply…
                    </>
                  ) : (
                    <>
                      <SendIcon /> Generate AI Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section className="section">
          <div className="section-tag">Why MailCraft</div>
          <h2 className="section-h2">Built for professionals</h2>
          <p className="section-sub">
            Every feature engineered to make email communication faster,
            sharper, and more effective.
          </p>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="feat">
                <div
                  className="feat-icon"
                  style={{ background: f.bg, border: `1px solid ${f.border}` }}
                >
                  {i === 0 && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={f.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={f.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={f.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={f.color}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  )}
                </div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <LogoMark />
              <span className="footer-name">MailCraft</span>
            </div>
            <div className="footer-stack">
              <span
                style={{
                  color: "var(--text3)",
                  letterSpacing: "0.06em",
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                STACK
              </span>
              {["AI", "Spring Boot", "React"].map((s) => (
                <span key={s} className="stack-pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
