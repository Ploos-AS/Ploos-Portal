<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const domains = [
    { organization: 'business', name: 'demo-business.example', status: 'active', expiry: '2027-11-25', renewal: true, nameservers: ['ns1.example', 'ns2.example', 'ns3.example'] },
    { organization: 'business', name: 'demo-shop.example', status: 'pending', expiry: null, renewal: false, nameservers: [] },
    { organization: 'association', name: 'demo-association.example', status: 'active', expiry: '2027-06-01', renewal: false, nameservers: ['ns1.example', 'ns2.example'] }
  ];
  let visible = $derived(domains.filter(item => item.organization === organization.selected()));
</script>
<svelte:head><title>Ploos Domains – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Ploos Domains</h1>
  <p>{language === 'nb' ? 'Fiktiv domeneportefølje. Registrering, overføring og endringer er ikke aktivert.' : 'Fictional domain portfolio. Registration, transfers and changes are not enabled.'}</p>
  {#each visible as item (item.name)}
    <article>
      <h2>{item.name}</h2>
      <dl>
        <dt>Status</dt><dd>{item.status === 'active' ? (language === 'nb' ? 'Aktiv' : 'Active') : (language === 'nb' ? 'Venter' : 'Pending')}</dd>
        <dt>{language === 'nb' ? 'Utløpsdato' : 'Expiry date'}</dt><dd>{item.expiry ?? '—'}</dd>
        <dt>{language === 'nb' ? 'Automatisk fornyelse' : 'Automatic renewal'}</dt><dd>{item.renewal ? (language === 'nb' ? 'På' : 'On') : (language === 'nb' ? 'Av' : 'Off')}</dd>
        <dt>{language === 'nb' ? 'Navneservere' : 'Name servers'}</dt><dd>{item.nameservers.join(', ') || '—'}</dd>
      </dl>
    </article>
  {:else}
    <p>{language === 'nb' ? 'Ingen domener i valgt demoorganisasjon.' : 'No domains in the selected demo organization.'}</p>
  {/each}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; overflow-wrap: anywhere; }
  h2 { font-size: 1.2rem; }
  dt { font-weight: bold; }
  dd { margin: 0 0 .75rem; }
</style>
