<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const sites = [
    { organization: 'business', name: 'demo-business.example', dns: { nb: 'Registrert domene', en: 'Registered domain' }, cms: 'WordPress', used: 2, quota: 5, https: true, backup: '2026-11-24' },
    { organization: 'association', name: 'sirdal.seniornett.example', dns: { nb: 'Delegert subdomene', en: 'Delegated subdomain' }, cms: 'WonderCMS', used: 0.2, quota: 5, https: true, backup: '2026-11-24' },
    { organization: 'association', name: 'lokallag.example', dns: { nb: 'Ekstern DNS', en: 'External DNS' }, cms: 'WonderCMS', used: 0.1, quota: 5, https: false, backup: null }
  ];
  let visible = $derived(sites.filter(site => site.organization === organization.selected()));
</script>
<svelte:head><title>Ploos Hosting – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Ploos Hosting</h1>
  <p>{language === 'nb' ? 'Fiktive webhotell. Kapasitet og driftsstatus er kun eksempler. Ingen endringer utføres.' : 'Fictional hosting accounts. Capacity and operational status are illustrative only. No changes are performed.'}</p>
  {#each visible as site (site.name)}
    <article>
      <h2>{site.name}</h2>
      <dl>
        <dt>{language === 'nb' ? 'Domenetype' : 'Domain type'}</dt><dd>{site.dns[language]}</dd>
        <dt>CMS</dt><dd>{site.cms}</dd>
        <dt>{language === 'nb' ? 'Lagring' : 'Storage'}</dt><dd><meter min="0" max={site.quota} value={site.used} aria-label={language === 'nb' ? 'Lagringsbruk' : 'Storage usage'}></meter> {site.used} / {site.quota} GB</dd>
        <dt>HTTPS</dt><dd>{site.https ? (language === 'nb' ? 'Aktiv' : 'Active') : (language === 'nb' ? 'Venter' : 'Pending')}</dd>
        <dt>{language === 'nb' ? 'Siste backup' : 'Last backup'}</dt><dd>{site.backup ?? (language === 'nb' ? 'Ikke tilgjengelig' : 'Unavailable')}</dd>
      </dl>
    </article>
  {:else}
    <p>{language === 'nb' ? 'Ingen webhotell i valgt demoorganisasjon.' : 'No hosting accounts in the selected demo organization.'}</p>
  {/each}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; overflow-wrap: anywhere; }
  h2 { font-size: 1.2rem; }
  dt { font-weight: bold; }
  dd { margin: 0 0 .75rem; }
  meter { max-width: 100%; }
</style>
