<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const tickets = [
    { organization: 'business', id: 'DEMO-S001', product: 'Ploos Hosting', subject: { nb: 'Spørsmål om HTTPS', en: 'HTTPS question' }, status: { nb: 'Åpen', en: 'Open' }, date: '2026-11-24' },
    { organization: 'business', id: 'DEMO-S002', product: 'Ploos Mail', subject: { nb: 'Oppsett av alias', en: 'Alias setup' }, status: { nb: 'Løst', en: 'Resolved' }, date: '2026-11-20' },
    { organization: 'association', id: 'DEMO-S003', product: 'Ploos DNS', subject: { nb: 'Delegering av subdomene', en: 'Subdomain delegation' }, status: { nb: 'Venter på svar', en: 'Awaiting reply' }, date: '2026-11-25' }
  ];
  let visible = $derived(tickets.filter(ticket => ticket.organization === organization.selected()));
</script>
<svelte:head><title>Ploos Support – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <h1>{language === 'nb' ? 'Kundestøtte' : 'Support'}</h1>
  <p>{language === 'nb' ? 'Fiktive supportsaker. Ingen henvendelser sendes eller lagres.' : 'Fictional support tickets. No requests are sent or stored.'}</p>
  <button disabled>{language === 'nb' ? 'Ny supportsak (ikke aktivert)' : 'New support ticket (not enabled)'}</button>
  {#each visible as ticket (ticket.id)}
    <article>
      <h2>{ticket.subject[language]}</h2>
      <p>{ticket.id} · {ticket.product}</p>
      <p>{language === 'nb' ? 'Status' : 'Status'}: {ticket.status[language]}</p>
      <p>{language === 'nb' ? 'Sist oppdatert' : 'Last updated'}: {ticket.date}</p>
    </article>
  {:else}
    <p>{language === 'nb' ? 'Ingen supportsaker i valgt demoorganisasjon.' : 'No support tickets in the selected demo organization.'}</p>
  {/each}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; overflow-wrap: anywhere; }
  h2 { font-size: 1.2rem; }
</style>
