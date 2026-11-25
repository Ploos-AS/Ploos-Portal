<script lang="ts">
  import { page } from '$app/state';
  import { setContext } from 'svelte';
  let language = $state<'nb' | 'en'>('nb');
  setContext('preview-language', () => language);
  let { children } = $props();
  const links = [
    { path: '/preview', nb: 'Oversikt', en: 'Overview' },
    { path: '/preview/organizations', nb: 'Organisasjoner', en: 'Organizations' },
    { path: '/preview/catalog', nb: 'Produktkatalog', en: 'Catalog' },
    { path: '/preview/subscriptions', nb: 'Abonnementer', en: 'Subscriptions' },
    { path: '/preview/members', nb: 'Medlemmer', en: 'Members' }
  ];
</script>
<div class="shell" lang={language}>
  <aside>
    <a href="/">Ploos Portal</a>
    <p>Demo · Beta</p>
    <button onclick={() => language = language === 'nb' ? 'en' : 'nb'}>{language === 'nb' ? 'English' : 'Norsk'}</button>
    <nav aria-label={language === 'nb' ? 'Portalmeny' : 'Portal navigation'}>
      {#each links as link}
        <a href={link.path} aria-current={page.url.pathname === link.path ? 'page' : undefined}>{link[language]}</a>
      {/each}
    </nav>
  </aside>
  <div class="workspace">{@render children()}</div>
</div>
<style>
  .shell { display: grid; grid-template-columns: 250px minmax(0, 1fr); min-height: 100vh; }
  aside { padding: 24px; background: #19372f; color: white; }
  aside a { color: inherit; }
  nav { display: grid; gap: 8px; }
  nav a { padding: 12px; border-radius: 8px; text-decoration: none; }
  nav a[aria-current="page"] { background: #fff; color: #19372f; font-weight: bold; }
  a:focus-visible { outline: 3px solid #e4b95f; outline-offset: 3px; }
  .workspace { min-width: 0; }
  @media (max-width: 700px) { .shell { grid-template-columns: 1fr; } nav { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); } }
</style>
