<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const tracks = [
    { name: 'kSuite', provider: 'Infomaniak', region: { nb: 'Leverandørstyrt', en: 'Provider managed' } },
    { name: 'Proton', provider: 'Proton', region: { nb: 'Leverandørstyrt', en: 'Provider managed' } },
    { name: 'Cloud Drive Europe', provider: 'Nextcloud', region: { nb: 'Europa (planlagt)', en: 'Europe (planned)' } },
    { name: 'Cloud Drive Norway', provider: 'Nextcloud', region: { nb: 'Norge (planlagt premium)', en: 'Norway (planned premium)' } }
  ];
  const instances = [
    { organization: 'business', name: 'Cloud Drive Norway', domain: 'cloud.demo-business.example', users: 3, seats: 5 },
    { organization: 'association', name: 'Cloud Drive Europe', domain: 'cloud.sirdal.seniornett.example', users: 2, seats: 5 }
  ];
  let visible = $derived(instances.filter(item => item.organization === organization.selected()));
</script>
<svelte:head><title>Ploos Cloud – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Ploos Cloud</h1>
  <p>{language === 'nb' ? 'Fiktive skytjenester. Ingen bestilling eller klargjøring er aktivert.' : 'Fictional cloud services. Ordering and provisioning are not enabled.'}</p>
  <h2>{language === 'nb' ? 'Valgt organisasjon' : 'Selected organization'}</h2>
  {#each visible as item (item.domain)}
    <article><h3>{item.name}</h3><p>{item.domain}</p><p>Starter · {item.users} / {item.seats} {language === 'nb' ? 'brukere' : 'users'}</p></article>
  {:else}
    <p>{language === 'nb' ? 'Ingen skytjenester i valgt demoorganisasjon.' : 'No cloud services in the selected demo organization.'}</p>
  {/each}
  <h2>{language === 'nb' ? 'Planlagte tjenestealternativer' : 'Planned service options'}</h2>
  <div class="grid">
    {#each tracks as track (track.name)}
      <article><h3>{track.name}</h3><p>{track.provider}</p><p>{track.region[language]}</p><small>{language === 'nb' ? 'Ikke tilgjengelig for bestilling' : 'Not available to order'}</small></article>
    {/each}
  </div>
  <h2>{language === 'nb' ? 'Mulige Cloud Drive-utvidelser' : 'Potential Cloud Drive extensions'}</h2>
  <p>{language === 'nb' ? 'Filer, kalender, kontakter, dokumentredigering og samarbeid. Funksjoner og kapasitet er ikke fastsatt.' : 'Files, calendar, contacts, document editing and collaboration. Features and capacity are not finalized.'}</p>
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; overflow-wrap: anywhere; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }
</style>
