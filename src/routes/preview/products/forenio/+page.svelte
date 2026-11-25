<script lang="ts">
  import { getContext } from 'svelte';
  import { organizations } from '#lib/preview-data.js';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  let selected = $derived(organizations.find(item => item.id === organization.selected()));
  let eligible = $derived(selected?.kind === 'association' && ['owner', 'admin'].includes(selected.role));
</script>
<svelte:head><title>Forenio – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Forenio</h1>
  <p>{language === 'nb' ? 'Selvstendig tjeneste for stiftelse og administrasjon av foreninger. Integrasjon med Ploos er valgfri.' : 'Independent association formation and administration service. Integration with Ploos is optional.'}</p>
  <article>
    <h2>{language === 'nb' ? 'Organisasjonstilknytning (demo)' : 'Organization linking (demo)'}</h2>
    <p>{selected?.display_name}</p>
    {#if selected?.kind !== 'association'}
      <p>{language === 'nb' ? 'Tilknytning er beregnet på foreninger.' : 'Linking is intended for associations.'}</p>
    {:else if eligible}
      <p>{language === 'nb' ? 'Kan be om tilknytning når integrasjonen er tilgjengelig.' : 'Can request linking when integration becomes available.'}</p>
    {:else}
      <p>{language === 'nb' ? 'Eier eller administrator må be om tilknytning.' : 'An owner or administrator must request linking.'}</p>
    {/if}
    <button disabled>{language === 'nb' ? 'Koble til Forenio (ikke aktivert)' : 'Connect Forenio (not enabled)'}</button>
    <p>{language === 'nb' ? 'Ingen faktisk tilknytning eller dataoverføring utføres.' : 'No actual linking or data transfer is performed.'}</p>
  </article>
  <h2>{language === 'nb' ? 'Valgfrie tilleggstjenester' : 'Optional additional services'}</h2>
  <ul>
    <li><a href="/preview/products/domains">Ploos Domains</a></li>
    <li><a href="/preview/products/dns">Ploos DNS</a></li>
    <li><a href="/preview/products/hosting">Ploos Hosting</a></li>
    <li><a href="/preview/products/mail">Ploos Mail</a></li>
    <li><a href="/preview/products/cloud">Ploos Cloud</a></li>
  </ul>
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; overflow-wrap: anywhere; }
  li { margin-block: .75rem; }
</style>
