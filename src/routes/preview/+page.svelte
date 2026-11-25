<script>
  let language = $state('no');
  let dark = $state(false);
  let selected = $state('overview');
  const sections = [
    { id: 'overview', no: 'Oversikt', en: 'Overview' },
    { id: 'organizations', no: 'Organisasjoner', en: 'Organizations' },
    ...['Domains', 'DNS', 'Hosting', 'Mail', 'Cloud', 'Forenio'].map(name => ({ id: name.toLowerCase(), no: name, en: name })),
    { id: 'subscriptions', no: 'Abonnementer', en: 'Subscriptions' },
    { id: 'settings', no: 'Innstillinger', en: 'Settings' }
  ];
  const active = $derived(sections.find(item => item.id === selected));
</script>

<svelte:head>
  <title>Ploos Portal – Preview</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="preview" class:dark lang={language === 'no' ? 'nb' : 'en'}>
  <aside>
    <a href="/">Ploos Portal</a>
    <nav aria-label={language === 'no' ? 'Portalmeny' : 'Portal navigation'}>
      {#each sections as item}
        <button class:active={selected === item.id} aria-pressed={selected === item.id} onclick={() => selected = item.id}>
          {language === 'no' ? item.no : item.en}
        </button>
      {/each}
    </nav>
  </aside>
  <section class="workspace">
    <header>
      <span>{language === 'no' ? 'Demomodus' : 'Demo mode'}</span>
      <div class="controls">
        <button onclick={() => language = language === 'no' ? 'en' : 'no'}>{language === 'no' ? 'English' : 'Norsk'}</button>
        <button aria-pressed={dark} onclick={() => dark = !dark}>{language === 'no' ? 'Mørk modus' : 'Dark mode'}</button>
      </div>
    </header>
    <h1>{language === 'no' ? active?.no : active?.en}</h1>
    <div class="panel">
      <h2>{language === 'no' ? 'Under utvikling' : 'Under development'}</h2>
      <p>{language === 'no' ? 'Dette er en forhåndsvisning. Ingen kundedata, innlogging eller bestilling er tilgjengelig.' : 'This is a preview. Customer data, sign-in and ordering are unavailable.'}</p>
    </div>
  </section>
</div>

<style>
  .preview { --bg: #f6f7f2; --panel: #fff; --ink: #19372f; --border: #cbd8d0; --accent: #235d50; display: grid; grid-template-columns: 240px minmax(0, 1fr); min-height: 100vh; background: var(--bg); color: var(--ink); }
  .dark { --bg: #14231f; --panel: #20352e; --ink: #edf5ef; --border: #526b60; --accent: #a5e1c7; }
  aside { padding: 24px; background: var(--panel); border-right: 1px solid var(--border); }
  aside a { font-size: 23px; font-weight: 750; }
  nav { display: grid; gap: 5px; margin-top: 30px; }
  button { font: inherit; color: inherit; background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; cursor: pointer; }
  nav button { text-align: left; border-color: transparent; }
  button.active { border-color: var(--accent); font-weight: 700; }
  button:focus-visible, a:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
  .workspace { padding: clamp(20px, 4vw, 60px); }
  header, .controls { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  header { justify-content: space-between; }
  h1 { font-size: clamp(32px, 5vw, 52px); }
  .panel { background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
  @media (max-width: 700px) { .preview { grid-template-columns: 1fr; } aside { border-right: 0; border-bottom: 1px solid var(--border); } nav { grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); } }
</style>
