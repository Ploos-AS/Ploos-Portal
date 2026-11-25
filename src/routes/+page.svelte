<script>
  const services = [
    { name: 'Ploos Domains', description: 'Domener og registrering', category: 'Domener' },
    { name: 'Ploos DNS', description: 'DNS og navnetjenester', category: 'Infrastruktur' },
    { name: 'Ploos Hosting', description: 'Nettsider og webhotell', category: 'Infrastruktur' },
    { name: 'Ploos Mail', description: 'E-post for virksomheter', category: 'Kommunikasjon' },
    { name: 'Ploos Cloud', description: 'Skyverktøy for samarbeid', category: 'Samarbeid' },
    { name: 'Forenio', description: 'Verktøy for foreninger', category: 'Foreninger' }
  ];
</script>

<svelte:head>
  <title>Ploos Portal – ett sted for tjenestene dine</title>
  <meta name="description" content="Ploos Portal samler oversikten over Ploos-tjenester. Pilot under utvikling." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="site">
  <header class="topbar">
    <a class="brand" href="/" aria-label="Ploos Portal – forsiden">
      <span class="brand-mark" aria-hidden="true">P</span>
      <span><strong>ploos</strong><small>PORTAL</small></span>
    </a>
    <span class="status"><span class="status-dot"></span> Under utvikling</span>
  </header>

  <main>
    <section class="hero">
      <span class="eyebrow">PLOOS AS / KUNDEPORTAL</span>
      <h1>Alle tjenestene dine.<br /><em>Ett sted.</em></h1>
      <p class="lead">Vi bygger én samlet inngang til domener, hosting, e-post, sky og foreningsverktøy. Her skal du etter hvert få oversikt og kontroll – uten å hoppe mellom systemer.</p>
      <p><a href="/preview" style="text-decoration: underline; font-weight: 700;">Se forhåndsvisning av kundeportalen →</a></p>
      <div class="notice" role="status">
        <span class="notice-icon" aria-hidden="true">i</span>
        <div><strong>Dette er en tidlig pilot.</strong><br />Innlogging og kundeoversikt er ikke aktivert ennå. Ingen kundedata vises på denne siden.</div>
      </div>
    </section>

    <section class="catalog" aria-labelledby="services-heading">
      <div class="section-heading"><div><span class="eyebrow">ØKOSYSTEMET</span><h2 id="services-heading">Tjenester som hører sammen</h2></div><p>Én plattform. Flere selvstendige produkter.</p></div>
      <div class="service-grid">
        {#each services as service}
          <article class="service">
            <span class="category">{service.category}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <span class="coming">Kommer i portalen</span>
          </article>
        {/each}
      </div>
    </section>

    <section class="bottom-panel">
      <div><span class="eyebrow">NESTE STEG</span><h2>Din konto. Din organisasjon. Dine tjenester.</h2><p>Før kundeinnlogging åpnes, skal identitet, tilgangsstyring og koblingen til Ploos Core være på plass.</p></div>
      <span class="planned">Planlagt funksjon</span>
    </section>
  </main>
  <footer><span>© {new Date().getFullYear()} Ploos AS</span><span>En felles inngang. Tjenester på dine premisser.</span></footer>
</div>
