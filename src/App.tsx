import { useEffect, useMemo, useState } from "react";
import { OPERATOR, ROUTES, type RouteId } from "./data";
import { ICON_MAP, IconMark } from "./icons";
import { Landing } from "./Landing";
import {
  Access,
  Audit,
  Clm,
  Command,
  Copilot,
  Documents,
  Dossier,
  Integrations,
  Kyc,
  Releases,
  Sql,
  Support,
  Trade,
} from "./views";

function parseHash(): RouteId {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h || h === "landing") return "landing";
  const id = h.split("/")[0] as RouteId;
  if (id === "landing" || ROUTES.some((r) => r.id === id)) return id;
  return "landing";
}

export default function App() {
  const [route, setRoute] = useState<RouteId>(parseHash);
  const [navOpen, setNavOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [clock, setClock] = useState(() => new Date());

  const go = (r: RouteId) => {
    window.location.hash = r === "landing" ? "" : r;
    setRoute(r);
    setNavOpen(false);
    setPalette(false);
  };

  const notify = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    const t = window.setInterval(() => setClock(new Date()), 1000);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
      if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
      window.clearInterval(t);
    };
  }, []);

  if (route === "landing") {
    return (
      <>
        <Landing go={go} />
        {toast ? <div className="toast">{toast}</div> : null}
      </>
    );
  }

  const groups = ["Operate", "Administer", "Prove", "Hire"];

  return (
    <div className="shell">
      <header className="topbar">
        <div className="top-left">
          <button className="menu-btn" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            Menu
          </button>
          <IconMark width={22} height={22} />
          <strong style={{ letterSpacing: "0.18em", fontSize: 12 }}>MERIDIAN</strong>
          <span className="env">{OPERATOR.env}</span>
          <button className="search-btn" onClick={() => setPalette(true)}>
            Search modules, parties, CAB…
            <kbd>⌘K</kbd>
          </button>
        </div>
        <div className="top-right">
          <span className="pulse" />
          <span className="muted">SLA 99.97%</span>
          <span className="mono muted">
            {clock.toLocaleTimeString("en-GB", { hour12: false })} UTC
          </span>
          <button className="btn small" onClick={() => go("landing")}>
            Cover
          </button>
        </div>
      </header>
      <aside className={`sidebar ${navOpen ? "open" : ""}`}>
        {groups.map((g) => (
          <div className="nav-group" key={g}>
            <div className="nav-label">{g}</div>
            {ROUTES.filter((r) => r.group === g).map((r) => {
              const Icon = ICON_MAP[r.id as keyof typeof ICON_MAP];
              return (
                <button
                  key={r.id}
                  className={`nav-item ${route === r.id ? "active" : ""}`}
                  onClick={() => go(r.id)}
                >
                  {Icon ? <Icon /> : null}
                  {r.label}
                  {r.count ? <span className="nav-count">{r.count}</span> : null}
                </button>
              );
            })}
          </div>
        ))}
        <div className="sidebar-foot">
          <div className="name">{OPERATOR.name}</div>
          <div className="role">{OPERATOR.title}</div>
        </div>
      </aside>
      <main className="main">
        <View route={route} go={go} toast={notify} />
      </main>
      {palette ? <Palette onClose={() => setPalette(false)} go={go} /> : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

function View({
  route,
  go,
  toast,
}: {
  route: RouteId;
  go: (r: RouteId) => void;
  toast: (m: string) => void;
}) {
  switch (route) {
    case "command":
      return <Command go={go} toast={toast} />;
    case "kyc":
      return <Kyc toast={toast} />;
    case "trade":
      return <Trade toast={toast} />;
    case "clm":
      return <Clm />;
    case "documents":
      return <Documents toast={toast} />;
    case "integrations":
      return <Integrations toast={toast} />;
    case "access":
      return <Access toast={toast} />;
    case "releases":
      return <Releases />;
    case "support":
      return <Support toast={toast} />;
    case "audit":
      return <Audit toast={toast} />;
    case "sql":
      return <Sql toast={toast} />;
    case "copilot":
      return <Copilot />;
    case "dossier":
      return <Dossier go={go} />;
    default:
      return <Command go={go} toast={toast} />;
  }
}

function Palette({
  go,
  onClose,
}: {
  go: (r: RouteId) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const n = q.toLowerCase();
    return ROUTES.filter((r) => (r.label + r.group).toLowerCase().includes(n));
  }, [q]);
  return (
    <div className="palette-bg" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Jump to a workbench…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && items[0]) go(items[0].id);
          }}
        />
        {items.map((r, i) => (
          <button key={r.id} className={i === 0 ? "active" : ""} onClick={() => go(r.id)}>
            {r.label}
            <span className="muted">{r.group}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
