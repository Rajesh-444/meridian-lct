export type RouteId =
  | "landing"
  | "command"
  | "kyc"
  | "trade"
  | "clm"
  | "documents"
  | "integrations"
  | "access"
  | "releases"
  | "audit"
  | "support"
  | "sql"
  | "copilot"
  | "dossier";

export const ROUTES: {
  id: RouteId;
  label: string;
  group: string;
  count?: number;
}[] = [
  { id: "command", label: "Command center", group: "Operate" },
  { id: "kyc", label: "KYC / KYD", group: "Operate", count: 11 },
  { id: "trade", label: "Trade compliance", group: "Operate", count: 4 },
  { id: "clm", label: "Contract lifecycle", group: "Operate", count: 9 },
  { id: "documents", label: "Legal documents", group: "Operate" },
  { id: "integrations", label: "Integrations & batch", group: "Administer" },
  { id: "access", label: "Access & users", group: "Administer", count: 3 },
  { id: "releases", label: "Release management", group: "Administer" },
  { id: "support", label: "Application support", group: "Administer", count: 7 },
  { id: "audit", label: "Audit readiness", group: "Prove" },
  { id: "sql", label: "SQL workbench", group: "Prove" },
  { id: "copilot", label: "AI copilot", group: "Prove" },
  { id: "dossier", label: "Candidate dossier", group: "Hire" },
];

export const OPERATOR = {
  name: "Rajesh Palanthod",
  title: "Legal & Compliance Technology",
  env: "PROD-LCT",
  tenant: "Helios International",
};

export const KPIS = [
  { k: "Platform availability", v: "99.97%", d: "SLA within band", tone: "ok" as const },
  { k: "Open KYC / KYD cases", v: "11", d: "2 past 5-day SLA", tone: "warn" as const },
  { k: "Restricted-party hits", v: "4", d: "1 awaiting legal review", tone: "bad" as const },
  { k: "Contracts in 90-day window", v: "9", d: "3 auto-renew unless notice", tone: "warn" as const },
];

export const INCIDENTS = [
  {
    id: "INC-4412",
    app: "KYC Engine",
    title: "Overnight screening job stalled at 82%",
    sev: "Sev-2",
    age: "1h 14m",
    owner: "LCT Ops",
  },
  {
    id: "INC-4408",
    app: "CLM",
    title: "Obligation extractor timeout on scanned PDFs",
    sev: "Sev-3",
    age: "6h",
    owner: "App Support",
  },
  {
    id: "INC-4401",
    app: "Trade",
    title: "Denied-party API latency above 2.5s",
    sev: "Sev-3",
    age: "14h",
    owner: "Integrations",
  },
];

export const CALENDAR = [
  { date: "12 Sep", item: "SOX ITGC sample — access recertification evidence", type: "Audit" },
  { date: "18 Sep", item: "CLM 4.2.1 production window (CAB-8821)", type: "Release" },
  { date: "22 Sep", item: "EU dual-use list refresh — trade screening dictionaries", type: "Regulatory" },
  { date: "01 Oct", item: "KYD annual recertification for APAC distributors", type: "KYD" },
  { date: "09 Oct", item: "GDPR processor register attestation", type: "Privacy" },
];

export const PLATFORMS = [
  { name: "KYC / KYD engine", health: "Degraded", users: 214, sla: "99.2%" },
  { name: "Trade compliance", health: "Healthy", users: 86, sla: "99.9%" },
  { name: "Contract lifecycle", health: "Healthy", users: 401, sla: "99.8%" },
  { name: "Legal DMS", health: "Healthy", users: 318, sla: "99.9%" },
  { name: "Identity / IGA", health: "Healthy", users: 62, sla: "99.9%" },
];

export type Party = {
  id: string;
  name: string;
  type: "Customer" | "Distributor" | "Vendor";
  country: string;
  risk: "Low" | "Medium" | "High";
  status: "Cleared" | "Enhanced DD" | "In review" | "Hold";
  owner: string;
  sla: string;
  hits: string[];
  notes: string;
};

export const PARTIES: Party[] = [
  {
    id: "P-10441",
    name: "Helios Brasil Distribuidora Ltda",
    type: "Distributor",
    country: "BR",
    risk: "Medium",
    status: "In review",
    owner: "KYD Ops",
    sla: "2d overdue",
    hits: ["Adverse media — logistics fine 2023"],
    notes: "Ownership chart requested from local counsel. Awaiting UBO affidavit.",
  },
  {
    id: "P-10388",
    name: "Caspian Petrochem Trading FZE",
    type: "Customer",
    country: "AE",
    risk: "High",
    status: "Enhanced DD",
    owner: "Financial Crime",
    sla: "Due 12 Sep",
    hits: ["PEP adjacency — 2nd-degree", "Near-match OFAC (cleared 2024)"],
    notes: "Source-of-funds narrative required before credit limit increase.",
  },
  {
    id: "P-10201",
    name: "Northern Star Logistics GmbH",
    type: "Vendor",
    country: "DE",
    risk: "Low",
    status: "Cleared",
    owner: "KYC Ops",
    sla: "On track",
    hits: [],
    notes: "Annual recertification completed. Screening dictionaries current.",
  },
  {
    id: "P-10177",
    name: "Pacific Rim Components Pte Ltd",
    type: "Distributor",
    country: "SG",
    risk: "Low",
    status: "Cleared",
    owner: "KYD Ops",
    sla: "On track",
    hits: ["False positive — similar vessel name"],
    notes: "False positive documented. Evidence pack attached to matter KYD-201.",
  },
  {
    id: "P-10112",
    name: "Atlas MedSupply Inc",
    type: "Customer",
    country: "US",
    risk: "Medium",
    status: "Hold",
    owner: "Legal",
    sla: "Paused",
    hits: ["Incomplete W-9 / tax packet"],
    notes: "Onboarding paused pending tax forms. No sanctions hits.",
  },
  {
    id: "P-10090",
    name: "Sahel Agricultural Inputs SA",
    type: "Distributor",
    country: "SN",
    risk: "High",
    status: "In review",
    owner: "Trade + KYD",
    sla: "Due today",
    hits: ["Country risk overlay", "End-use questionnaire incomplete"],
    notes: "Requires dual review: KYD ownership and export end-use.",
  },
];

export const SHIPMENTS = [
  {
    id: "TR-7781",
    sku: "RF-4400 transceiver",
    eccn: "3A001",
    dest: "Singapore",
    party: "Pacific Rim Components",
    license: "NLR / ECCN documented",
    status: "Cleared",
  },
  {
    id: "TR-7764",
    sku: "Process controller firmware",
    eccn: "5D002",
    dest: "UAE",
    party: "Caspian Petrochem Trading",
    license: "License exception ENC — pending",
    status: "Hold",
  },
  {
    id: "TR-7740",
    sku: "Lab centrifuge (medical)",
    eccn: "EAR99",
    dest: "Senegal",
    party: "Sahel Agricultural Inputs",
    license: "End-use cert required",
    status: "Review",
  },
  {
    id: "TR-7712",
    sku: "Spare seals / gaskets",
    eccn: "EAR99",
    dest: "Germany",
    party: "Northern Star Logistics",
    license: "NLR",
    status: "Cleared",
  },
];

export const CONTRACTS = [
  {
    id: "C-APAC-019",
    title: "Master Distribution Agreement — APAC",
    stage: "Negotiation",
    owner: "Commercial Legal",
    value: "$12.4M",
    renew: "15 Nov 2026",
  },
  {
    id: "C-DPA-088",
    title: "Data Processing Addendum — Cloud archive",
    stage: "Legal review",
    owner: "Privacy",
    value: "—",
    renew: "01 Mar 2027",
  },
  {
    id: "C-OC-221",
    title: "Outside counsel engagement — Brazil KYD",
    stage: "Approved",
    owner: "Legal Ops",
    value: "$180k",
    renew: "Matter-based",
  },
  {
    id: "C-NDA-9044",
    title: "Mutual NDA — joint venture diligence",
    stage: "Executed",
    owner: "M&A Legal",
    value: "—",
    renew: "12 Sep 2027",
  },
  {
    id: "C-SUP-440",
    title: "Strategic supply agreement — RF components",
    stage: "Obligation tracking",
    owner: "CLM Ops",
    value: "$4.1M",
    renew: "30 Oct 2026",
  },
];

export const OBLIGATIONS = [
  { contract: "C-APAC-019", item: "Notice of non-renewal", due: "16 Aug 2026", status: "Open" },
  { contract: "C-SUP-440", item: "Insurance certificate refresh", due: "01 Oct 2026", status: "Open" },
  { contract: "C-DPA-088", item: "Sub-processor notice review", due: "12 Sep 2026", status: "In progress" },
  { contract: "C-OC-221", item: "Monthly matter spend attestation", due: "30 Sep 2026", status: "Open" },
];

export const DOCUMENTS = [
  { id: "DOC-8891", title: "Board resolution — export compliance policy v4", matter: "REG-12", priv: "Attorney-client", version: "4.2" },
  { id: "DOC-8702", title: "UBO affidavit — Helios Brasil", matter: "KYD-441", priv: "Work product", version: "1.0" },
  { id: "DOC-8610", title: "Denied party SOP — first-line screening", matter: "TRADE-03", priv: "Business", version: "2.1" },
  { id: "DOC-8504", title: "SOX ITGC walkthrough — CLM access", matter: "AUDIT-26", priv: "Business", version: "1.3" },
  { id: "DOC-8411", title: "Model distribution clauses — APAC", matter: "CLM-LIB", priv: "Attorney-client", version: "6.0" },
];

export const JOBS = [
  { id: "BAT-KYD-NIGHT", name: "KYD overnight rescreen", system: "KYC engine", cron: "02:10 UTC", last: "Failed 02:18", status: "Failed" },
  { id: "BAT-SAP-PARTY", name: "SAP BP → party master sync", system: "ERP / API", cron: "Hourly", last: "OK 09:10", status: "Healthy" },
  { id: "BAT-TRADE-DICT", name: "Sanctions dictionary load", system: "Trade", cron: "Daily 04:00", last: "OK 04:06", status: "Healthy" },
  { id: "BAT-CLM-OBL", name: "Obligation extract (OCR)", system: "CLM", cron: "Every 4h", last: "Warn 08:02", status: "Degraded" },
  { id: "BAT-IGA-RECERT", name: "Privileged access recert dump", system: "IGA", cron: "Weekly", last: "OK Mon", status: "Healthy" },
];

export const APIS = [
  { name: "Denied-party screen", method: "POST /v2/screen", latency: "2.8s", status: "Degraded" },
  { name: "Party master upsert", method: "PUT /parties/{id}", latency: "180ms", status: "Healthy" },
  { name: "CLM obligation feed", method: "GET /obligations", latency: "410ms", status: "Healthy" },
  { name: "Identity recert", method: "POST /iga/campaigns", latency: "640ms", status: "Healthy" },
  { name: "Document retain", method: "POST /dms/hold", latency: "220ms", status: "Healthy" },
];

export const ACCESS_REQUESTS = [
  {
    id: "AR-5521",
    user: "m.chen@helios",
    role: "CLM — Obligation editor",
    system: "Contract lifecycle",
    sod: "None",
    risk: "Low",
  },
  {
    id: "AR-5518",
    user: "j.okonkwo@helios",
    role: "KYC — Case closer",
    system: "KYC engine",
    sod: "Conflicts with 'Case opener' — same user",
    risk: "High",
  },
  {
    id: "AR-5510",
    user: "ext.counsel.brasil",
    role: "DMS — Matter reader (KYD-441)",
    system: "Legal DMS",
    sod: "External identity — timeboxed 30d",
    risk: "Medium",
  },
];

export const USERS = [
  { user: "legal.ops.bot", type: "Service", roles: "CLM API, batch submitter", last: "09:12" },
  { user: "a.reyes@helios", type: "Human", roles: "Trade analyst, DMS reader", last: "Yesterday" },
  { user: "s.iyer@helios", type: "Human", roles: "KYC manager, IGA recertifier", last: "08:40" },
];

export const RELEASES = [
  { id: "CAB-8821", title: "CLM 4.2.1 — obligation OCR hotfix", window: "18 Sep 22:00 UTC", status: "CAB approved", env: "PROD" },
  { id: "CAB-8804", title: "KYC dictionary pack 2026-Q3", window: "12 Sep 03:00 UTC", status: "UAT sign-off", env: "UAT" },
  { id: "CAB-8790", title: "IGA recertification UI", window: "25 Sep 16:00 UTC", status: "Build", env: "DEV" },
];

export const TICKETS = [
  { id: "SR-9102", user: "Privacy", title: "Cannot export processor register to Excel", pri: "P2", age: "3h" },
  { id: "SR-9098", user: "Trade", title: "License exception ENC not visible on TR-7764", pri: "P2", age: "5h" },
  { id: "SR-9088", user: "Legal Ops", title: "Need matter hold on DOC-8702", pri: "P3", age: "1d" },
  { id: "SR-9071", user: "KYD Ops", title: "Reset MFA for Brasil local counsel", pri: "P3", age: "1d" },
  { id: "SR-9060", user: "Audit", title: "Evidence pack for ITGC-CLM-04", pri: "P2", age: "2d" },
];

export const CONTROLS = [
  { id: "ITGC-CLM-04", title: "Joiner-mover-leaver for CLM privileged roles", owner: "LCT", evidence: "IGA dump + CAB tickets", status: "Ready" },
  { id: "AML-KYD-02", title: "Distributor rescreen within 24h of list update", owner: "KYD", evidence: "BAT-KYD-NIGHT logs", status: "Gap — job failed" },
  { id: "EXP-02", title: "No shipment without screening ID", owner: "Trade", evidence: "ERP block + API logs", status: "Ready" },
  { id: "PRIV-07", title: "Legal hold prevents purge", owner: "DMS", evidence: "Hold audit trail", status: "Ready" },
];

export const QUERIES = [
  {
    id: "q1",
    name: "KYC cases past SLA",
    why: "Shows application support can quantify operational risk, not just ticket volume.",
    sql: `SELECT p.party_id, p.legal_name, c.case_status, c.sla_due,
       ROUND(EXTRACT(EPOCH FROM (now() - c.sla_due))/86400, 1) AS days_overdue
FROM kyc.cases c
JOIN kyc.parties p ON p.party_id = c.party_id
WHERE c.case_status IN ('In review', 'Enhanced DD')
  AND c.sla_due < now()
ORDER BY c.sla_due;`,
  },
  {
    id: "q2",
    name: "SoD conflicts still open",
    why: "Access administration with a control mindset — segregation of duties before approval.",
    sql: `SELECT u.email, r.role_name, s.conflicting_role, a.request_id
FROM iga.access_requests a
JOIN iga.users u ON u.user_id = a.user_id
JOIN iga.roles r ON r.role_id = a.role_id
JOIN iga.sod_matrix s ON s.role_id = r.role_id
WHERE a.status = 'Pending'
  AND EXISTS (
    SELECT 1 FROM iga.user_roles ur
    WHERE ur.user_id = u.user_id
      AND ur.role_id = s.conflicting_role_id
  );`,
  },
  {
    id: "q3",
    name: "Contracts auto-renewing in 90 days",
    why: "Translates a legal process (notice periods) into a system control with a date trigger.",
    sql: `SELECT contract_id, title, renewal_date, notice_days,
       renewal_date - (notice_days || ' days')::interval AS last_notice
FROM clm.agreements
WHERE status = 'Executed'
  AND renewal_date BETWEEN current_date AND current_date + 90
ORDER BY last_notice;`,
  },
  {
    id: "q4",
    name: "Failed batch jobs — 7 days",
    why: "Release and run-the-business hygiene. Failed KYD jobs are an audit finding waiting to happen.",
    sql: `SELECT job_id, job_name, status, finished_at, error_class
FROM ops.batch_runs
WHERE finished_at >= now() - interval '7 days'
  AND status IN ('Failed', 'Degraded')
ORDER BY finished_at DESC;`,
  },
];

export const QUERY_RESULTS: Record<string, string[][]> = {
  q1: [
    ["party_id", "legal_name", "case_status", "sla_due", "days_overdue"],
    ["P-10441", "Helios Brasil Distribuidora Ltda", "In review", "2026-09-08", "2.1"],
    ["P-10090", "Sahel Agricultural Inputs SA", "In review", "2026-09-10", "0.4"],
  ],
  q2: [
    ["email", "role_name", "conflicting_role", "request_id"],
    ["j.okonkwo@helios", "KYC — Case closer", "KYC — Case opener", "AR-5518"],
  ],
  q3: [
    ["contract_id", "title", "renewal_date", "notice_days", "last_notice"],
    ["C-SUP-440", "Strategic supply agreement", "2026-10-30", "60", "2026-08-31"],
    ["C-APAC-019", "Master Distribution Agreement — APAC", "2026-11-15", "90", "2026-08-17"],
  ],
  q4: [
    ["job_id", "job_name", "status", "finished_at", "error_class"],
    ["BAT-KYD-NIGHT", "KYD overnight rescreen", "Failed", "2026-09-10 02:18", "TIMEOUT"],
    ["BAT-CLM-OBL", "Obligation extract (OCR)", "Degraded", "2026-09-10 08:02", "OCR_TIMEOUT"],
  ],
};

export const JD_MAP = [
  {
    jd: "Administer and support legal and compliance applications",
    proof: "Command center, support queue, platform health",
    route: "command" as RouteId,
  },
  {
    jd: "Configure, test, and maintain enterprise platforms",
    proof: "Release CAB, UAT sign-off, environment promotion",
    route: "releases" as RouteId,
  },
  {
    jd: "Manage data, integrations, and batch processing",
    proof: "API catalog, KYD overnight job, SAP party sync",
    route: "integrations" as RouteId,
  },
  {
    jd: "Support access management and user administration",
    proof: "IGA requests, SoD conflict on AR-5518",
    route: "access" as RouteId,
  },
  {
    jd: "Troubleshoot application issues / release management",
    proof: "Sev-2 stalled batch, CLM OCR hotfix CAB-8821",
    route: "support" as RouteId,
  },
  {
    jd: "KYC / KYD, trade, agreements, CLM, legal DMS, regulatory",
    proof: "Dedicated workbenches with realistic cases",
    route: "kyc" as RouteId,
  },
  {
    jd: "Document requirements and translate into enhancements",
    proof: "AI copilot briefs + SQL that encode controls",
    route: "copilot" as RouteId,
  },
  {
    jd: "Audit and regulatory readiness",
    proof: "Control library, evidence packs, failed-job gap",
    route: "audit" as RouteId,
  },
  {
    jd: "SQL, Python, APIs, Excel, AI-first tools",
    proof: "SQL workbench, ops/kyd_batch.py, export actions, copilot",
    route: "sql" as RouteId,
  },
];

export function copilotReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("kyc") || q.includes("kyd") || q.includes("distributor")) {
    return "Overnight KYD rescreen (BAT-KYD-NIGHT) failed at 02:18 UTC — timeout against the sanctions provider. Two distributor cases are already past SLA: Helios Brasil (P-10441) and Sahel Agricultural Inputs (P-10090). Recommended path: rerun the batch for the failed partition, raise Sev-2 if the API is still above 2.5s, and keep enhanced DD on Caspian Petrochem independent of the batch (PEP adjacency is a case decision, not a job failure).\n\nI would log this as a functional requirement: “Distributor rescreen must complete within 24h of a list update, with a visible control gap if the job fails.” That is how a batch failure becomes an audit finding instead of a silent miss.";
  }
  if (q.includes("access") || q.includes("sod") || q.includes("segregation")) {
    return "AR-5518 should not be approved as requested. j.okonkwo already holds KYC Case opener; Case closer on the same identity breaks segregation of duties for AML case handling. Options: (1) reject and ask for a four-eyes design, (2) timebox closer to a backup roster with compensating review, (3) split the function across two users. External counsel on AR-5510 is acceptable if the DMS ACL is matter-scoped to KYD-441 and expires in 30 days.\n\nRequirement language: “Privileged KYC roles opener and closer cannot be stacked; SoD must block at request time, not at audit time.”";
  }
  if (q.includes("release") || q.includes("cab") || q.includes("uat")) {
    return "CAB-8821 (CLM 4.2.1 OCR hotfix) is the change that unblocks obligation extraction on scanned PDFs — the same class of failure as INC-4408. I would not promote until UAT includes: a scanned PDF > 20 pages, a native digital PDF, and a regression on executed agreements with legal hold. Production window 18 Sep 22:00 UTC is after the SOX sample on 12 Sep, which is the right sequence: do not change CLM in the middle of ITGC evidence collection.\n\nRelease note for business: “Obligation dates will backfill; no clause text is rewritten.”";
  }
  if (q.includes("audit") || q.includes("sox") || q.includes("evidence")) {
    return "Control AML-KYD-02 is the only open gap: evidence depends on BAT-KYD-NIGHT, which failed. For SOX ITGC-CLM-04 we already have the IGA dump and CAB tickets — that pack can be generated today. EXP-02 is proven by the ERP block that refuses a shipment without a screening ID (see TR-7764 on hold).\n\nI would brief audit as: one operational exception, documented, with a compensating manual rescreen list, rather than a silent green dashboard.";
  }
  if (q.includes("sql") || q.includes("python") || q.includes("excel") || q.includes("api")) {
    return "The SQL workbench encodes the same questions I would run on day one: overdue KYC, open SoD, 90-day auto-renewals, failed jobs. The Python batch in ops/kyd_batch.py is the offline twin of BAT-KYD-NIGHT — score, threshold, and write an exception file that legal can open in Excel. APIs are first-class objects here: denied-party screen is currently the degraded dependency (2.8s).\n\nAI-first does not mean skipping the query. It means using the copilot to draft the requirement, then proving it with SQL and a job log.";
  }
  if (q.includes("trade") || q.includes("export") || q.includes("license")) {
    return "TR-7764 (firmware, ECCN 5D002, UAE) is blocked for license exception ENC documentation, and the counterparty is already in enhanced DD. That is a combined trade + KYC decision — do not split the tickets. TR-7740 to Senegal needs an end-use certificate before EAR99 can be treated as clean. Dictionary refresh for EU dual-use is on the 22 Sep calendar; I would freeze non-urgent ECCN reclassifications that week.\n\nRequirement: “A shipment cannot leave ERP without a screening correlation ID and a license determination, including NLR.”";
  }
  return "Meridian is how I would operate Legal & Compliance Technology: administer the platforms, see the batch jobs, resolve the access request with SoD in mind, and leave an evidence trail an auditor can follow.\n\nIf I joined the team, the first 30 days would be: map every in-scope application, confirm job SLAs against regulatory clocks (KYD rescreen, list updates), and sit with KYC, trade, and legal ops until the ticket language matches how they actually work. Ask me to open any module — the cases are deliberately the same work this JD describes.";
}
