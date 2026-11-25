<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
  const organization = getContext<{ organizations: { id: string; display_name: string; kind: string; role: string }[]; selected: () => string }>('preview-organization');
  let selected = $derived(organization.selected());
  let current = $derived(organization.organizations.find(org => org.id === selected));
  const summaries: Record<string, { subscriptions: number; active: number; members: number }> = {
    business: { subscriptions: 2, active: 1, members: 4 },
    association: { subscriptions: 2, active: 0, members: 2 },
    empty: { subscriptions: 0, active: 0, members: 0 }
  };
  let summary = $derived(current ? summaries[current.id] : undefined);
  const links = [
    { path: '/preview/products', nb: 'Tjenester', en: 'Services' },
    { path: '/preview/catalog', nb: 'Produktkatalog', en: 'Catalog' },
    { path: '/preview/subscriptions', nb: 'Abonnementer', en: 'Subscriptions' },
    { path: '/preview/members', nb: 'Medlemmer', en: 'Members' }
  ];
</script>
<svelte:head>
  <title>Ploos Portal – Preview</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>
<main>
  <h1>{language === 'nb' ? 'Oversikt' : 'Overview'}</h1>
  <p>{language === 'nb' ? 'Kun fiktive demodata. Ingen ekte kundedata, innlogging eller bestilling.' : 'Fictional demo data only. No real customer data, sign-in or ordering.'}</p>
  {#if current && summary}
    <h2>{current.display_name}</h2>
    <p>{language === 'nb' ? 'Demorolle' : 'Demo role'}: {current.role}</p>
    <div class="grid">
      <article><h3>{language === 'nb' ? 'Abonnementer totalt' : 'Total subscriptions'}</h3><strong>{summary.subscriptions}</strong></article>
      <article><h3>{language === 'nb' ? 'Aktive abonnementer' : 'Active subscriptions'}</h3><strong>{summary.active}</strong></article>
      <article><h3>{language === 'nb' ? 'Medlemmer' : 'Members'}</h3><strong>{summary.members}</strong></article>
    </div>
  {:else}
    <p role="status">{language === 'nb' ? 'Velg en organisasjon øverst.' : 'Select an organization above.'}</p>
  {/if}
  <h2>{language === 'nb' ? 'Snarveier' : 'Quick links'}</h2>
  <div class="grid">
    {#each links as link}
      <a class="shortcut" href={link.path}>{link[language]}</a>
    {/each}
  </div>
</main>
<style>
  main { max-width: 70rem; margin: auto; padding: clamp(20px, 4vw, 60px); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr)); gap: 1rem; }
  article, .shortcut { border: 1px solid var(--border); background: var(--control); border-radius: .75rem; padding: 1rem; }
  h3 { font-size: 1rem; margin-top: 0; }
  strong { font-size: 2rem; }
  .shortcut:focus-visible { outline: 3px solid #b88725; outline-offset: 3px; }
</style>
