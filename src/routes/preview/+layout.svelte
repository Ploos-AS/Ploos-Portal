<script lang="ts">
  import { page } from '$app/state';
  let { children } = $props();
  const links = [
    { path: '/preview', label: 'Oversikt / Overview' },
    { path: '/preview/organizations', label: 'Organisasjoner / Organizations' },
    { path: '/preview/catalog', label: 'Produktkatalog / Catalog' },
    { path: '/preview/subscriptions', label: 'Abonnementer / Subscriptions' },
    { path: '/preview/members', label: 'Medlemmer / Members' }
  ];
</script>
<div class="shell">
  <aside>
    <a href="/">Ploos Portal</a>
    <p>Demo · Beta</p>
    <nav aria-label="Portal navigation">
      {#each links as link}
        <a href={link.path} aria-current={page.url.pathname === link.path ? 'page' : undefined}>{link.label}</a>
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
