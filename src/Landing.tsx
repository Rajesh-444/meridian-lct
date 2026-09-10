import { KPIS, JD_MAP, OPERATOR, type RouteId } from "./data";
import { IconMark } from "./icons";

export function Landing({ go }: { go: (r: RouteId) => void }) {
  return (
    <div className="landing">
      <div className="landing-inner">
        <header className="landing-top">
          <div className="brand-lock">
            <IconMark />
            <div>
              <div className="brand-name">Meridian</div>
              <div className="brand-sub">Legal &amp; compliance control plane</div>
            </div>
          </div>
          <div className="operator-chip">
            <b>{OPERATOR.name}</b>
            <span>Candidate workbench · {OPERATOR.tenant}</span>
          </div>
        </header>

        <section className="hero">
          <div>
            <div className="kicker">Legal · Compliance · Technology</div>
            <h1>
              The applications
              <br />
              that keep
              <br />
              legal teams
              <br />
              <em>audit-ready</em>
            </h1>
            <p className="lede">
              Meridian is a working model of Legal &amp; Compliance Technology —
              KYC/KYD, trade compliance, contract lifecycle, legal documents,
              access, batch jobs, and evidence. Built to show how I would
              administer the stack, sit with the business, and leave a trail an
              auditor can follow.
            </p>
            <div className="cta-row">
              <button className="btn primary" onClick={() => go("command")}>
                Enter the control plane
              </button>
              <button className="btn" onClick={() => go("dossier")}>
                Open candidate dossier
              </button>
            </div>
            <div className="stat-row">
              {KPIS.map((k) => (
                <div key={k.k}>
                  <div className="n">{k.v}</div>
                  <div className="l">{k.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="globe-card">
            <Globe />
            <div className="globe-meta">
              <div>
                <small>Operating model</small>
                Configure · test · integrate · support · prove
              </div>
              <div>
                <small>AI-first, control-minded</small>
                Copilot drafts the requirement. SQL and job logs prove it.
              </div>
            </div>
          </div>
        </section>

        <nav className="domain-strip">
          {[
            ["01", "KYC / KYD", "Counterparty risk", "kyc"],
            ["02", "Trade", "Export & denied party", "trade"],
            ["03", "CLM", "Agreements & obligations", "clm"],
            ["04", "Access", "Users, SoD, recert", "access"],
            ["05", "Batch / API", "Jobs & integrations", "integrations"],
            ["06", "Audit", "Evidence, not slides", "audit"],
          ].map(([idx, t, s, r]) => (
            <button key={idx} onClick={() => go(r as RouteId)}>
              <span className="idx">{idx}</span>
              <strong>{t}</strong>
              <span>{s}</span>
            </button>
          ))}
        </nav>

        <section className="jd-map">
          <div>
            <h2>Mapped to the role, not a generic dashboard.</h2>
            <p>
              Every module is a response to the job description: administer
              legal and compliance applications, translate process into
              configuration, and keep the firm ready for audit.
            </p>
          </div>
          <div className="map-grid">
            <div className="map-row head">
              <div>How you will add value</div>
              <div>Where Meridian proves it</div>
              <div>Open</div>
            </div>
            {JD_MAP.map((row) => (
              <div className="map-row" key={row.jd}>
                <div>{row.jd}</div>
                <div className="muted">{row.proof}</div>
                <div>
                  <button className="btn small" onClick={() => go(row.route)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <p className="footnote">
          Fictional tenant: Helios International. No live customer data. Built
          as a portfolio operating system for Legal &amp; Compliance Technology.
        </p>
      </div>
    </div>
  );
}

function Globe() {
  return (
    <svg viewBox="0 0 480 280" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
      <rect width="480" height="280" fill="transparent" />
      <ellipse cx="240" cy="140" rx="118" ry="118" stroke="#d4b87a" strokeOpacity="0.7" />
      <ellipse cx="240" cy="140" rx="78" ry="118" stroke="#d4b87a" strokeOpacity="0.28" />
      <ellipse cx="240" cy="140" rx="38" ry="118" stroke="#d4b87a" strokeOpacity="0.28" />
      <path d="M240 22v236" stroke="#d4b87a" strokeWidth="1.4" />
      <path d="M122 140h236" stroke="#d4b87a" strokeOpacity="0.45" />
      <path
        d="M130 78c70 40 150 40 220 0"
        stroke="#d4b87a"
        strokeOpacity="0.35"
      />
      <path
        d="M130 202c70-40 150-40 220 0"
        stroke="#d4b87a"
        strokeOpacity="0.35"
      />
      <circle cx="240" cy="140" r="3" fill="#d4b87a" />
      <circle cx="302" cy="96" r="3.5" fill="#7dcec0" />
      <circle cx="188" cy="168" r="3.5" fill="#e0b15a" />
      <circle cx="268" cy="186" r="3.5" fill="#d4786a" />
      <text x="314" y="92" fill="#ece8de" fontSize="11" fontFamily="IBM Plex Sans">
        APAC distributors
      </text>
      <text x="40" y="172" fill="#ece8de" fontSize="11" fontFamily="IBM Plex Sans">
        Trade corridors
      </text>
      <text x="278" y="208" fill="#ece8de" fontSize="11" fontFamily="IBM Plex Sans">
        Enhanced DD
      </text>
    </svg>
  );
}
