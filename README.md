# Meridian

A Legal & Compliance Technology **control plane** — the portfolio product for a role that administers KYC/KYD, trade compliance, contract lifecycle, legal documents, access, batch jobs, and audit evidence.

Fictional tenant: Helios International. No live customer data.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL. From the cover, enter the control plane or open the candidate dossier.

## What it demonstrates

| JD theme | In the product |
| --- | --- |
| Administer legal & compliance apps | Command center, platform health, support queue |
| Configure / test / release | CAB calendar, UAT checklist |
| Data, integrations, batch | API catalog, KYD overnight job, `ops/kyd_batch.py` |
| Access & user admin | SoD conflict on AR-5518 |
| KYC/KYD, trade, CLM, DMS | Dedicated workbenches |
| SQL, Python, Excel, APIs | SQL workbench, batch script, export actions |
| AI-first | Copilot that drafts requirements in process language |
| Audit readiness | Control library with one honest gap |

## Offline batch

```bash
python3 ops/kyd_batch.py
```

Scores `ops/distributors.csv` and writes `ops/kyd_exceptions.csv`.
