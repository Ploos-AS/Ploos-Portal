<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const zones = [
    { organization: 'business', name: 'demo-business.example', delegated: false, dnssec: true, records: [
      { name: '@', type: 'A', value: '192.0.2.10', ttl: 3600 },
      { name: '@', type: 'AAAA', value: '2001:db8::10', ttl: 3600 },
      { name: 'www', type: 'CNAME', value: 'demo-business.example.', ttl: 3600 },
      { name: '@', type: 'MX', value: '10 mail.example.', ttl: 3600 },
      { name: '@', type: 'TXT', value: 'v=spf1 -all', ttl: 3600 },
      { name: '@', type: 'CAA', value: '0 issue "ca.example"', ttl: 3600 }
    ] },
    { organization: 'association', name: 'demo-association.example', delegated: false, dnssec: false, records: [
      { name: '@', type: 'A', value: '192.0.2.20', ttl: 3600 }
    ] },
    { organization: 'association', name: 'sirdal.seniornett.example', delegated: true, dnssec: false, records: [{ name: '@', type: 'A', value: '192.0.2.30', ttl: 3600 }] }
  ];
  let visible = $derived(zones.filter(zone => zone.organization === organization.selected()));
</script>
<svelte:head><title>Ploos DNS – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Ploos DNS</h1>
  <p>{language === 'nb' ? 'Fiktive DNS-soner. Ingen DNS-endringer utføres.' : 'Fictional DNS zones. No DNS changes are performed.'}</p>
  {#each visible as zone (zone.name)}
    <article>
      <h2>{zone.name}</h2>
      <p>{zone.delegated ? (language === 'nb' ? 'Delegert undersone' : 'Delegated child zone') : (language === 'nb' ? 'Domenesone' : 'Domain zone')}</p>
      <p>DNSSEC: {zone.dnssec ? (language === 'nb' ? 'Aktiv' : 'Active') : (language === 'nb' ? 'Av' : 'Off')}</p>
      <p>{language === 'nb' ? 'Planlagte navneservere' : 'Planned name servers'}: ns1.ousdal.net, ns2.ousdal.net, ns3.ousdal.net</p>
      <p>{language === 'nb' ? 'Alternative merkenavn (planlagt)' : 'Alternative branded names (planned)'}: ns1.ploos.no, ns2.ploos.no, ns3.ploos.no</p>
      <div class="scroll" role="region" aria-label={language === 'nb' ? 'DNS-poster' : 'DNS records'} tabindex="0">
        <table><thead><tr><th scope="col">{language === 'nb' ? 'Navn' : 'Name'}</th><th scope="col">Type</th><th scope="col">{language === 'nb' ? 'Verdi' : 'Value'}</th><th scope="col">TTL</th></tr></thead>
        <tbody>{#each zone.records as record}<tr><td>{record.name}</td><td>{record.type}</td><td>{record.value}</td><td>{record.ttl}</td></tr>{/each}</tbody></table>
      </div>
    </article>
  {:else}
    <p>{language === 'nb' ? 'Ingen DNS-soner i valgt demoorganisasjon.' : 'No DNS zones in the selected demo organization.'}</p>
  {/each}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; min-width: 0; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: .5rem; text-align: left; border-bottom: 1px solid var(--border); }
</style>
