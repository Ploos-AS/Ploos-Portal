# Portal monitoring on Mimir

The Forseti pilot exposes HTTPS at beta.account.ploos.no. Probe the public homepage and /healthz from Mimir using its existing Blackbox Exporter. Keep the container port and Core private. The login endpoint intentionally returns 503 and is not a health target.

## Operator procedure

1. Inspect existing Prometheus and Blackbox configuration, including container networking and rule_files. Verify the exporter address and http_2xx module, TLS verification enabled, timeout below scrape timeout.
2. Back up the existing configuration. Merge the example scrape job into scrape_configs and install portal.rules.yml in an existing rule directory. Do not replace the existing configuration.
3. Run promtool check rules and promtool check config using the deployed Prometheus version before reloading through the existing operator procedure.
4. Confirm both targets are up and probe_success equals 1 for both checks. Inspect HTTP status and certificate expiry metrics. Confirm alert delivery through the existing notification path, using a disposable test target rather than disrupting the portal.
5. Add Grafana panels for probe_success, probe_duration_seconds, probe_http_status_code and certificate expiry. Check both IPv4 and IPv6 separately if required.

The health endpoint indicates process availability, not Core readiness or authentication readiness. A 2xx probe does not validate page contents. The examples have not been applied or tested on Mimir. Restore the backed-up configuration if validation or reload fails.
