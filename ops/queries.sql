-- Meridian LCT — queries that encode controls.
-- Same statements as the in-product SQL workbench.

-- KYC cases past SLA
SELECT p.party_id, p.legal_name, c.case_status, c.sla_due,
       ROUND(EXTRACT(EPOCH FROM (now() - c.sla_due))/86400, 1) AS days_overdue
FROM kyc.cases c
JOIN kyc.parties p ON p.party_id = c.party_id
WHERE c.case_status IN ('In review', 'Enhanced DD')
  AND c.sla_due < now()
ORDER BY c.sla_due;

-- SoD conflicts still open
SELECT u.email, r.role_name, s.conflicting_role, a.request_id
FROM iga.access_requests a
JOIN iga.users u ON u.user_id = a.user_id
JOIN iga.roles r ON r.role_id = a.role_id
JOIN iga.sod_matrix s ON s.role_id = r.role_id
WHERE a.status = 'Pending'
  AND EXISTS (
    SELECT 1 FROM iga.user_roles ur
    WHERE ur.user_id = u.user_id
      AND ur.role_id = s.conflicting_role_id
  );

-- Contracts auto-renewing in 90 days
SELECT contract_id, title, renewal_date, notice_days,
       renewal_date - (notice_days || ' days')::interval AS last_notice
FROM clm.agreements
WHERE status = 'Executed'
  AND renewal_date BETWEEN current_date AND current_date + 90
ORDER BY last_notice;

-- Failed batch jobs — 7 days
SELECT job_id, job_name, status, finished_at, error_class
FROM ops.batch_runs
WHERE finished_at >= now() - interval '7 days'
  AND status IN ('Failed', 'Degraded')
ORDER BY finished_at DESC;
