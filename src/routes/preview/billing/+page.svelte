<script lang="ts">
  import { getContext } from 'svelte';
  import { organizations } from '#lib/preview-data.js';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  let selected = $derived(organizations.find(item => item.id === organization.selected()));
  const invoices = [
    { organization: 'business', id: 'DEMO-001', date: '2026-11-01', status: 'paid', amount: 250 },
    { organization: 'business', id: 'DEMO-002', date: '2026-12-01', status: 'open', amount: 250 }
  ];
  let visible = $derived(selected?.role === 'owner' ? invoices.filter(item => item.organization === selected?.id) : []);
  function money(amount: number) { return new Intl.NumberFormat(language === 'nb' ? 'nb-NO' : 'en-GB', { style: 'currency', currency: 'NOK' }).format(amount); }
</script>
<svelte:head><title>Ploos Billing – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <h1>{language === 'nb' ? 'Fakturering' : 'Billing'}</h1>
  <p>{language === 'nb' ? 'Fiktive fakturaer og beløp. Ingen betaling eller fakturautstedelse utføres.' : 'Fictional invoices and amounts. No payments or invoice issuance are performed.'}</p>
  {#if selected?.role !== 'owner'}
    <p>{language === 'nb' ? 'Kun organisasjonens eier har tilgang til fakturering i denne demoen.' : 'Only the organization owner has billing access in this demo.'}</p>
  {:else}
    <h2>{selected.display_name}</h2>
    {#each visible as invoice (invoice.id)}
      <article>
        <h3>{invoice.id}</h3>
        <p>{invoice.date} · {money(invoice.amount)}</p>
        <p>{invoice.status === 'paid' ? (language === 'nb' ? 'Betalt' : 'Paid') : (language === 'nb' ? 'Åpen' : 'Open')}</p>
      </article>
    {:else}
      <p>{language === 'nb' ? 'Ingen fakturaer i valgt demoorganisasjon.' : 'No invoices in the selected demo organization.'}</p>
    {/each}
    <button disabled>{language === 'nb' ? 'Endre betalingsinformasjon (ikke aktivert)' : 'Change payment details (not enabled)'}</button>
  {/if}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; overflow-wrap: anywhere; }
</style>
