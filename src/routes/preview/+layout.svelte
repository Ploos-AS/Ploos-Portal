<script lang="ts">
  import { page } from '$app/state';
  import { setContext } from 'svelte';
  import OrganizationSelector from '$lib/components/OrganizationSelector.svelte';
  const organizations = [
    { id: 'business', display_name: 'Demo AS', kind: 'business', role: 'owner' },
    { id: 'association', display_name: 'Demo forening', kind: 'association', role: 'member' },
    { id: 'empty', display_name: 'Demo 3', kind: 'association', role: 'owner' }
  ];
  let selected = $state('business');
  setContext('preview-organization', { organizations, selected: () => selected });
  let dark = $state(false);
  let language = $state<'nb' | 'en'>('nb');
  setContext('preview-language', () => language);
  let { children } = $props();
  const links = [
    { path: '/preview', nb: 'Oversikt', en: 'Overview' },
    { path: '/preview/organizations', nb: 'Organisasjoner', en: 'Organizations' },
    { path: '/preview/products', nb: 'Tjenester', en: 'Services' },
    { path: '/preview/catalog', nb: 'Produktkatalog', en: 'Catalog' },
    { path: '/preview/subscriptions', nb: 'Abonnementer', en: 'Subscriptions' },
    { path: '/preview/members', nb: 'Medlemmer', en: 'Members' }
  ];
</script>
<div class="shell" class:dark lang={language}>
  <aside>
    <a href="/">Ploos Portal</a>
    <p>Demo · Beta</p>
    <button onclick={() => language = language === 'nb' ? 'en' : 'nb'}>{language === 'nb' ? 'English' : 'Norsk'}</button>
    <button aria-pressed={dark} onclick={() => dark = !dark}>{language === 'nb' ? 'Mørkt tema' : 'Dark theme'}</button>
    <nav aria-label={language === 'nb' ? 'Portalmeny' : 'Portal navigation'}>
      {#each links as link}
        <a href={link.path} aria-current={page.url.pathname === link.path ? 'page' : undefined}>{link[language]}</a>
      {/each}
    </nav>
  </aside>
  <div class="workspace"><header><OrganizationSelector {organizations} {selected} {language} onchange={(id) => selected = id} /></header>{@render children()}</div>
</div>
<style>
  .shell { display: grid; grid-template-columns: 250px minmax(0, 1fr); min-height: 100vh; background: var(--surface); color: var(--ink); color-scheme: light; --surface: #f6f7f2; --ink: #19372f; --control: #fff; --border: #82968c; }
  .shell.dark { color-scheme: dark; --surface: #14231f; --ink: #edf5ef; --control: #20352e; --border: #82968c; }
  .shell :global(button), .shell :global(select), .shell :global(input) { font: inherit; background: var(--control); color: var(--ink); border: 1px solid var(--border); border-radius: 6px; padding: .5rem; }
  .workspace :global(a) { color: inherit; }
  .shell :global(button:focus-visible), .shell :global(select:focus-visible) { outline: 3px solid #b88725; outline-offset: 3px; }
  aside { padding: 24px; background: #19372f; color: white; }
  aside a { color: inherit; }
  nav { display: grid; gap: 8px; }
  nav a { padding: 12px; border-radius: 8px; text-decoration: none; }
  nav a[aria-current="page"] { background: #fff; color: #19372f; font-weight: bold; }
  a:focus-visible { outline: 3px solid #e4b95f; outline-offset: 3px; }
  .workspace { min-width: 0; }
  header { padding: 1rem; border-bottom: 1px solid var(--border); }
  header :global(label) { max-width: 24rem; }
  @media (max-width: 700px) { .shell { grid-template-columns: 1fr; } nav { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); } }
</style>
