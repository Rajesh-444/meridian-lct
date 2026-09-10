import { useMemo, useState } from "react";
import {
  ACCESS_REQUESTS,
  APIS,
  CALENDAR,
  CONTROLS,
  CONTRACTS,
  DOCUMENTS,
  INCIDENTS,
  JOBS,
  JD_MAP,
  KPIS,
  OBLIGATIONS,
  OPERATOR,
  PARTIES,
  PLATFORMS,
  QUERIES,
  QUERY_RESULTS,
  RELEASES,
  SHIPMENTS,
  TICKETS,
  USERS,
  copilotReply,
  type Party,
  type RouteId,
} from "./data";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ok" | "warn" | "bad" | "gold";
}) {
  const cls =
    tone === "ok"
      ? "ok"
      : tone === "warn"
        ? "warn"
        : tone === "bad"
          ? "bad"
          : tone === "gold"
            ? "gold"
            : "";
  return <span className={`badge ${cls}`}>{children}</span>;
}

function statusTone(s: string): "ok" | "warn" | "bad" | "neutral" {
  const v = s.toLowerCase();
  if (["healthy", "cleared", "ready", "approved", "executed", "ok"].some((x) => v.includes(x)))
    return "ok";
  if (["review", "warn", "degraded", "pending", "hold", "negotiation", "overdue"].some((x) => v.includes(x)))
    return "warn";
  if (["fail", "high", "sev-2", "gap", "conflict"].some((x) => v.includes(x))) return "bad";
  return "neutral";
}

export function Command({
  go,
  toast,
}: {
  go: (r: RouteId) => void;
  toast: (m: string) => void;
}) {
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Operate · Command</div>
          <h1>Morning brief, {OPERATOR.tenant}</h1>
          <p>
            Availability is inside SLA. The overnight KYD rescreen failed — that
            is the control gap to close before audit asks.
          </p>
        </div>
        <button className="btn" onClick={() => go("copilot")}>
          Ask copilot for the brief
        </button>
      </header>
      <div className="kpis">
        {KPIS.map((k) => (
          <article className="kpi" key={k.k}>
            <div className="k">{k.k}</div>
            <div className="v">{k.v}</div>
            <div className={`d ${k.tone === "ok" ? "" : k.tone}`}>{k.d}</div>
          </article>
        ))}
      </div>
      <div className="grid-3">
        <div className="panel">
          <div className="panel-h">
            <h2>Open incidents</h2>
            <Badge tone="warn">{INCIDENTS.length} active</Badge>
          </div>
          <table className="data">
            <thead>
              <tr>
                <th>ID</th>
                <th>Issue</th>
                <th>Sev</th>
              </tr>
            </thead>
            <tbody>
              {INCIDENTS.map((i) => (
                <tr key={i.id}>
                  <td className="mono">{i.id}</td>
                  <td>
                    {i.title}
                    <div className="muted">
                      {i.app} · {i.age} · {i.owner}
                    </div>
                  </td>
                  <td>
                    <Badge tone={i.sev === "Sev-2" ? "bad" : "warn"}>{i.sev}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div className="panel-h">
            <h2>Platform health</h2>
          </div>
          <div className="panel-b">
            {PLATFORMS.map((p) => (
              <div className="job-row" key={p.name}>
                <div>
                  <strong>{p.name}</strong>
                  <div className="muted">
                    {p.users} users · SLA {p.sla}
                  </div>
                </div>
                <Badge tone={statusTone(p.health)}>{p.health}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-h">
            <h2>Regulatory calendar</h2>
          </div>
          <div className="panel-b">
            {CALENDAR.map((c) => (
              <div className="job-row" key={c.item}>
                <div>
                  <span className="tag">{c.date}</span>
                  <div>{c.item}</div>
                </div>
                <Badge>{c.type}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="stack" style={{ marginTop: 12 }}>
        <div className="panel">
          <div className="panel-h">
            <h2>Operator note</h2>
            <button className="btn small" onClick={() => toast("Brief copied to incident INC-4412")}>
              Attach to INC-4412
            </button>
          </div>
          <div className="panel-b">
            <p className="brief">
              I would start the day on BAT-KYD-NIGHT, not on green KPIs. A failed
              distributor rescreen is an AML-KYD-02 exception. Then AR-5518 — a
              SoD conflict that should never reach a human approver as a
              “normal” request. Then CAB-8821 sequenced after the 12 Sep SOX
              sample so we do not change CLM while evidence is being pulled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Kyc({ toast }: { toast: (m: string) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Party>(PARTIES[0]);
  const rows = PARTIES.filter((p) =>
    (p.name + p.id + p.country).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Operate · Know your customer / distributor</div>
          <h1>KYC / KYD workbench</h1>
          <p>
            Counterparty onboarding, rescreen, and enhanced due diligence — the
            process legal and compliance actually run, with SLA and hits visible.
          </p>
        </div>
        <button
          className="btn primary"
          onClick={() => toast("Screening submitted for " + sel.id + " — dictionary pack 2026-Q3")}
        >
          Run screening
        </button>
      </header>
      <div className="toolbar">
        <input
          className="field grow"
          placeholder="Search legal name, party ID, country…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Badge tone="warn">{rows.filter((r) => r.status !== "Cleared").length} open</Badge>
      </div>
      <div className="split">
        <div className="panel">
          <table className="data">
            <thead>
              <tr>
                <th>Party</th>
                <th className="hide-sm">Type</th>
                <th>Risk</th>
                <th className="hide-sm">Status</th>
                <th className="hide-sm">SLA</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr
                  key={p.id}
                  className={sel.id === p.id ? "selected" : ""}
                  onClick={() => setSel(p)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {p.name}
                    <div className="muted mono">
                      {p.id} · {p.country}
                    </div>
                  </td>
                  <td className="hide-sm">{p.type}</td>
                  <td>
                    <Badge tone={p.risk === "High" ? "bad" : p.risk === "Medium" ? "warn" : "ok"}>
                      {p.risk}
                    </Badge>
                  </td>
                  <td className="hide-sm">
                    <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                  </td>
                  <td className={`hide-sm ${p.sla.includes("overdue") ? "muted" : ""}`}>{p.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="panel detail">
          <div className="panel-h">
            <h2>Case file</h2>
            <span className="mono">{sel.id}</span>
          </div>
          <div className="panel-b">
            <dl>
              <dt>Legal name</dt>
              <dd>{sel.name}</dd>
              <dt>Owner</dt>
              <dd>{sel.owner}</dd>
              <dt>Hits</dt>
              <dd>
                {sel.hits.length ? sel.hits.map((h) => <div key={h}>{h}</div>) : "None on current lists"}
              </dd>
              <dt>Notes</dt>
              <dd>{sel.notes}</dd>
            </dl>
            <div className="timeline" style={{ marginTop: 16 }}>
              <div className="t-item">
                <div className="dot" />
                <div>
                  <div>List screening</div>
                  <div className="muted">Sanctions / PEP / adverse media</div>
                </div>
              </div>
              <div className="t-item">
                <div className="dot" />
                <div>
                  <div>Ownership &amp; UBO</div>
                  <div className="muted">KYD packet, local counsel where needed</div>
                </div>
              </div>
              <div className="t-item">
                <div className="dot" />
                <div>
                  <div>Four-eyes decision</div>
                  <div className="muted">Opener and closer cannot be the same user</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Trade({ toast }: { toast: (m: string) => void }) {
  const [id, setId] = useState(SHIPMENTS[1].id);
  const row = SHIPMENTS.find((s) => s.id === id)!;
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Operate · Trade compliance</div>
          <h1>Export control &amp; denied parties</h1>
          <p>
            Classification, license determination, and screening correlation IDs
            — nothing leaves ERP without a decision.
          </p>
        </div>
        <button className="btn" onClick={() => toast("End-use questionnaire sent for " + id)}>
          Request end-use cert
        </button>
      </header>
      <div className="split">
        <div className="panel">
          <table className="data">
            <thead>
              <tr>
                <th>Shipment</th>
                <th>ECCN</th>
                <th>Destination</th>
                <th>License</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SHIPMENTS.map((s) => (
                <tr
                  key={s.id}
                  className={id === s.id ? "selected" : ""}
                  onClick={() => setId(s.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {s.sku}
                    <div className="muted mono">{s.id}</div>
                  </td>
                  <td className="mono">{s.eccn}</td>
                  <td>{s.dest}</td>
                  <td>{s.license}</td>
                  <td>
                    <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="panel">
          <div className="panel-h">
            <h2>Determination</h2>
          </div>
          <div className="panel-b detail">
            <dl>
              <dt>Party</dt>
              <dd>{row.party}</dd>
              <dt>ECCN</dt>
              <dd className="mono">{row.eccn}</dd>
              <dt>Rule</dt>
              <dd>
                A shipment cannot be goods-issued without a screening ID and a
                license determination, including NLR.
              </dd>
            </dl>
            <p className="brief" style={{ marginTop: 16 }}>
              Combined decision: if the counterparty is in enhanced DD (Caspian,
              Sahel), trade does not “clear around” KYC. Same case, two controls.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Clm() {
  const cols = ["Negotiation", "Legal review", "Approved", "Obligation tracking"] as const;
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Operate · Contract lifecycle</div>
          <h1>Agreements, notice periods, obligations</h1>
          <p>
            Workflow from negotiation to executed control — auto-renewals are
            calendar events, not surprises.
          </p>
        </div>
      </header>
      <div className="kanban">
        {cols.map((c) => (
          <div className="kanban-col" key={c}>
            <h3>
              {c}{" "}
              <span className="muted">
                {CONTRACTS.filter((x) =>
                  c === "Obligation tracking"
                    ? x.stage === "Obligation tracking" || x.stage === "Executed"
                    : x.stage === c,
                ).length}
              </span>
            </h3>
            {CONTRACTS.filter((x) =>
              c === "Obligation tracking"
                ? x.stage === "Obligation tracking" || x.stage === "Executed"
                : x.stage === c,
            ).map((k) => (
              <div className="card" key={k.id}>
                <strong>{k.title}</strong>
                <div className="muted mono">{k.id}</div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {k.owner} · Renew {k.renew}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 12 }}>
        <div className="panel-h">
          <h2>Obligation register</h2>
        </div>
        <table className="data">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Obligation</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {OBLIGATIONS.map((o) => (
              <tr key={o.item}>
                <td className="mono">{o.contract}</td>
                <td>{o.item}</td>
                <td>{o.due}</td>
                <td>
                  <Badge tone={o.status === "Open" ? "warn" : "gold"}>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Documents({ toast }: { toast: (m: string) => void }) {
  const [q, setQ] = useState("");
  const rows = DOCUMENTS.filter((d) =>
    (d.title + d.matter).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Operate · Legal document management</div>
          <h1>Matters, privilege, legal hold</h1>
          <p>
            Documents are not a shared drive. Privilege flags, versioning, and
            holds that actually prevent purge.
          </p>
        </div>
        <button className="btn" onClick={() => toast("Legal hold placed on DOC-8702 · matter KYD-441")}>
          Place legal hold
        </button>
      </header>
      <div className="toolbar">
        <input
          className="field grow"
          placeholder="Search title or matter…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="panel">
        <table className="data">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Matter</th>
              <th>Privilege</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.id}>
                <td className="mono">{d.id}</td>
                <td>{d.title}</td>
                <td className="mono">{d.matter}</td>
                <td>
                  <Badge tone={d.priv.includes("Attorney") ? "gold" : "neutral"}>{d.priv}</Badge>
                </td>
                <td className="mono">{d.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Integrations({ toast }: { toast: (m: string) => void }) {
  const [running, setRunning] = useState(false);
  const [jobs, setJobs] = useState(JOBS);
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Administer · Data, integrations, batch</div>
          <h1>APIs and overnight jobs</h1>
          <p>
            SAP party master, sanctions dictionaries, OCR, IGA dumps — the work
            that makes the workbenches true.
          </p>
        </div>
        <button
          className="btn primary"
          disabled={running}
          onClick={() => {
            setRunning(true);
            toast("Rerunning BAT-KYD-NIGHT partition 03…");
            window.setTimeout(() => {
              setJobs((j) =>
                j.map((x) =>
                  x.id === "BAT-KYD-NIGHT"
                    ? { ...x, status: "Healthy", last: "OK just now" }
                    : x,
                ),
              );
              setRunning(false);
              toast("KYD overnight rescreen completed — 11,402 parties, 2 exceptions");
            }, 1600);
          }}
        >
          {running ? "Running…" : "Rerun failed KYD batch"}
        </button>
      </header>
      <div className="grid-2">
        <div className="panel">
          <div className="panel-h">
            <h2>Batch processing</h2>
          </div>
          <div className="panel-b">
            {jobs.map((j) => (
              <div key={j.id}>
                <div className="job-row">
                  <div>
                    <strong>{j.name}</strong>
                    <div className="muted mono">
                      {j.id} · {j.cron} · {j.last}
                    </div>
                  </div>
                  <Badge tone={statusTone(j.status)}>{j.status}</Badge>
                </div>
                <div className={`bar ${running && j.id === "BAT-KYD-NIGHT" ? "progress-live" : ""}`}>
                  <span
                    style={{
                      width:
                        j.status === "Healthy" ? "100%" : j.status === "Degraded" ? "72%" : "28%",
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="muted" style={{ marginTop: 14 }}>
              Offline twin: <span className="mono">ops/kyd_batch.py</span> scores a
              distributor file and writes an Excel-ready exception CSV — same
              control, two runtimes.
            </p>
          </div>
        </div>
        <div className="panel">
          <div className="panel-h">
            <h2>API catalog</h2>
          </div>
          <table className="data">
            <thead>
              <tr>
                <th>Service</th>
                <th>Latency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {APIS.map((a) => (
                <tr key={a.name}>
                  <td>
                    {a.name}
                    <div className="muted mono">{a.method}</div>
                  </td>
                  <td className="mono">{a.latency}</td>
                  <td>
                    <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Access({ toast }: { toast: (m: string) => void }) {
  const [reqs, setReqs] = useState(ACCESS_REQUESTS);
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Administer · Access &amp; users</div>
          <h1>Identity, recertification, segregation of duties</h1>
          <p>
            User administration with a control: opener and closer cannot stack.
            External identities expire.
          </p>
        </div>
      </header>
      <div className="panel" style={{ marginBottom: 12 }}>
        <div className="panel-h">
          <h2>Pending requests</h2>
        </div>
        <table className="data">
          <thead>
            <tr>
              <th>Request</th>
              <th>Role</th>
              <th>SoD</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reqs.map((r) => (
              <tr key={r.id}>
                <td>
                  <span className="mono">{r.id}</span>
                  <div>{r.user}</div>
                  <div className="muted">{r.system}</div>
                </td>
                <td>{r.role}</td>
                <td>
                  <Badge tone={r.risk === "High" ? "bad" : r.risk === "Medium" ? "warn" : "ok"}>
                    {r.risk}
                  </Badge>
                  <div className="muted" style={{ marginTop: 6 }}>
                    {r.sod}
                  </div>
                </td>
                <td>
                  <div className="toolbar" style={{ margin: 0, justifyContent: "flex-end" }}>
                    <button
                      className="btn small"
                      onClick={() => {
                        setReqs((x) => x.filter((i) => i.id !== r.id));
                        toast(
                          r.risk === "High"
                            ? r.id + " rejected — SoD conflict retained on the record"
                            : r.id + " approved with expiry and ticket trail",
                        );
                      }}
                    >
                      {r.risk === "High" ? "Reject" : "Approve"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <div className="panel-h">
          <h2>Privileged and service accounts</h2>
        </div>
        <table className="data">
          <thead>
            <tr>
              <th>Identity</th>
              <th>Type</th>
              <th>Roles</th>
              <th>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.user}>
                <td className="mono">{u.user}</td>
                <td>{u.type}</td>
                <td>{u.roles}</td>
                <td>{u.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Releases() {
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Administer · Release management</div>
          <h1>CAB, UAT, production windows</h1>
          <p>
            Configure, test, promote. Do not change CLM in the middle of a SOX
            sample.
          </p>
        </div>
      </header>
      <div className="grid-2">
        <div className="panel">
          <div className="panel-h">
            <h2>Change calendar</h2>
          </div>
          <table className="data">
            <thead>
              <tr>
                <th>CAB</th>
                <th>Window</th>
                <th>Env</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RELEASES.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.title}
                    <div className="muted mono">{r.id}</div>
                  </td>
                  <td>{r.window}</td>
                  <td className="mono">{r.env}</td>
                  <td>
                    <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div className="panel-h">
            <h2>UAT checklist · CAB-8821</h2>
          </div>
          <div className="panel-b">
            {[
              "Scanned PDF > 20 pages extracts obligation dates",
              "Native digital PDF unchanged",
              "Agreements on legal hold are not rewritten",
              "Rollback note reviewed with QA",
              "Business sign-off: Legal Ops + CLM champion",
            ].map((x, i) => (
              <label key={x} className="job-row" style={{ cursor: "pointer" }}>
                <span>
                  <input type="checkbox" defaultChecked={i < 2} /> {x}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Support({ toast }: { toast: (m: string) => void }) {
  const [rows, setRows] = useState(TICKETS);
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Administer · Application support</div>
          <h1>Tickets, access, and “it does not export”</h1>
          <p>
            First-line support for legal and compliance users — with enough
            product knowledge to know when it is a defect versus training.
          </p>
        </div>
      </header>
      <div className="panel">
        <table className="data">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Request</th>
              <th>Pri</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td className="mono">{t.id}</td>
                <td>
                  {t.title}
                  <div className="muted">{t.user}</div>
                </td>
                <td>
                  <Badge tone={t.pri === "P2" ? "warn" : "neutral"}>{t.pri}</Badge>
                </td>
                <td>{t.age}</td>
                <td>
                  <button
                    className="btn small"
                    onClick={() => {
                      setRows((x) => x.filter((i) => i.id !== t.id));
                      toast(t.id + " resolved with note in the knowledge base");
                    }}
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Audit({ toast }: { toast: (m: string) => void }) {
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Prove · Audit &amp; regulatory readiness</div>
          <h1>Controls with evidence, not screenshots of green.</h1>
          <p>
            ITGC, AML rescreen, export blocks, legal hold. One gap is called a
            gap.
          </p>
        </div>
        <button
          className="btn primary"
          onClick={() => toast("Evidence pack ITGC-CLM-04 generated · IGA dump + CAB tickets")}
        >
          Generate evidence pack
        </button>
      </header>
      <div className="panel">
        <table className="data">
          <thead>
            <tr>
              <th>Control</th>
              <th>Evidence</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {CONTROLS.map((c) => (
              <tr key={c.id}>
                <td>
                  <span className="mono">{c.id}</span>
                  <div>{c.title}</div>
                </td>
                <td className="muted">{c.evidence}</td>
                <td>{c.owner}</td>
                <td>
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Sql({ toast }: { toast: (m: string) => void }) {
  const [id, setId] = useState(QUERIES[0].id);
  const q = QUERIES.find((x) => x.id === id)!;
  const result = QUERY_RESULTS[id];
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Prove · SQL workbench</div>
          <h1>Queries that encode the control</h1>
          <p>
            Foundational SQL against KYC, IGA, CLM, and batch logs — the same
            questions I would run in week one.
          </p>
        </div>
        <button
          className="btn"
          onClick={() => toast("Result exported · meridian_" + id + ".xlsx")}
        >
          Export Excel
        </button>
      </header>
      <div className="sql-grid">
        <div className="panel query-list">
          {QUERIES.map((item) => (
            <button
              key={item.id}
              className={item.id === id ? "active" : ""}
              onClick={() => setId(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="stack">
          <div className="panel">
            <div className="panel-h">
              <h2>{q.name}</h2>
              <Badge tone="gold">PostgreSQL</Badge>
            </div>
            <pre className="code">{q.sql}</pre>
            <div className="panel-b muted">{q.why}</div>
          </div>
          <div className="panel">
            <div className="panel-h">
              <h2>Result</h2>
            </div>
            <table className="data">
              <thead>
                <tr>
                  {result[0].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 0 ? "mono" : ""}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Copilot() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; body: string }[]>([
    {
      role: "ai",
      body: "I am the Meridian copilot — the AI-first layer on this control plane. Ask about KYD batch failure, SoD, CAB sequencing, trade holds, or how this maps to the job.",
    },
  ]);
  const send = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setMsgs((m) => [...m, { role: "user", body: v }, { role: "ai", body: copilotReply(v) }]);
    setText("");
  };
  const prompts = [
    "Why did KYD overnight fail and what do I tell audit?",
    "Should I approve AR-5518?",
    "Sequence CAB-8821 against SOX",
    "How do SQL, Python, and APIs show up in this role?",
  ];
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Prove · AI-first</div>
          <h1>Copilot that speaks process, not slogans</h1>
          <p>
            Hands-on with ChatGPT, Codex, Claude, Copilot — used here to draft
            the requirement, then proven with jobs, SQL, and tickets.
          </p>
        </div>
      </header>
      <div className="panel chat">
        <div className="messages">
          {msgs.map((m, i) => (
            <div className={`msg ${m.role === "user" ? "user" : ""}`} key={i}>
              <div className="who">{m.role === "user" ? "You" : "Meridian copilot"}</div>
              {m.body.split("\n").map((line, j) => (
                <p key={j} style={{ margin: "0 0 8px" }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="prompts">
          {prompts.map((p) => (
            <button key={p} className="btn small" onClick={() => send(p)}>
              {p}
            </button>
          ))}
        </div>
        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
        >
          <input
            className="field grow"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask how you would operate this stack…"
          />
          <button className="btn primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export function Dossier({ go }: { go: (r: RouteId) => void }) {
  const spark = useMemo(() => [40, 55, 48, 70, 62, 80, 88, 76, 90, 96], []);
  return (
    <div>
      <header className="page-head">
        <div>
          <div className="crumbs">Hire · Dossier</div>
          <h1>Rajesh Palanthod</h1>
          <p>
            Bachelor’s-track foundation in technology and business. AI-first.
            Ready to administer legal and compliance platforms, sit with
            stakeholders, and own the outcome.
          </p>
        </div>
        <button className="btn primary" onClick={() => go("command")}>
          See it in the product
        </button>
      </header>
      <div className="dossier-hero">
        <div className="avatar" aria-hidden>
          RP
        </div>
        <div>
          <div className="kicker">Legal &amp; Compliance Technology</div>
          <p className="lede" style={{ marginBottom: 16 }}>
            I built Meridian to make the interview concrete: here is how I
            would triage a failed KYD job, refuse a SoD-breaking access request,
            sequence a CLM release around SOX, and still answer the business in
            plain language.
          </p>
          <div className="spark" aria-hidden>
            {spark.map((n, i) => (
              <i key={i} style={{ height: `${n}%` }} />
            ))}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Skills the JD names: APIs · SQL · Python · Excel · enterprise /
            ERP exposure · application support · system administration ·
            ChatGPT, Codex, Claude, Copilot
          </div>
        </div>
      </div>
      <div className="panel" style={{ marginBottom: 12 }}>
        <div className="panel-h">
          <h2>Job description → demonstrated work</h2>
        </div>
        <div className="map-grid">
          <div className="map-row head">
            <div>Requirement</div>
            <div>Proof in Meridian</div>
            <div></div>
          </div>
          {JD_MAP.map((row) => (
            <div className="map-row" key={row.jd}>
              <div>{row.jd}</div>
              <div className="muted">{row.proof}</div>
              <div>
                <button className="btn small" onClick={() => go(row.route)}>
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ninety">
        <article>
          <h3>Days 1–30</h3>
          <p className="muted">
            Map every in-scope application. Confirm batch SLAs against
            regulatory clocks. Shadow KYC, trade, and legal ops until tickets
            use their words.
          </p>
        </article>
        <article>
          <h3>Days 31–60</h3>
          <p className="muted">
            Own a queue: access recert, failed jobs, and one enhancement from
            a documented requirement. Pair with QA on a CAB item.
          </p>
        </article>
        <article>
          <h3>Days 61–90</h3>
          <p className="muted">
            Deliver a control that used to be tribal knowledge — a query, a
            job monitor, a SoD rule — with evidence an auditor can reuse.
          </p>
        </article>
      </div>
    </div>
  );
}
