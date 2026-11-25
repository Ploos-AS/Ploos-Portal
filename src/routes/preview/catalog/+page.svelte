<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
  const products = [
    { name: 'Ploos Domains', nb: 'Domeneregistrering og forvaltning', en: 'Domain registration and management' },
    { name: 'Ploos DNS', nb: 'DNS-soner og poster', en: 'DNS zones and records' },
    { name: 'Ploos Hosting', nb: 'Webhotell og administrerte nettsider', en: 'Web hosting and managed websites' },
    { name: 'Ploos Mail', nb: 'E-postkontoer og aliaser', en: 'Mail accounts and aliases' },
    { name: 'Ploos Cloud', nb: 'Planlagte tilbud: Infomaniak, Proton og Nextcloud', en: 'Planned offerings: Infomaniak, Proton and Nextcloud' },
    { name: 'Forenio', nb: 'Stiftelse og administrasjon av foreninger', en: 'Association formation and administration' }
  ];
  const bands = [
    { name: 'Solo', seats: 1 }, { name: 'Starter', seats: 5 },
    { name: 'Standard', seats: 10 }, { name: 'Plus', seats: 25 },
    { name: 'Pro', seats: 50 }, { name: 'Business', seats: 100 },
    { name: 'Enterprise', seats: null }
  ];
</script>
<svelte:head><title>Catalog preview | Ploos</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview">{language === 'nb' ? 'Tilbake' : 'Back'}</a>
  <h1>{language === 'nb' ? 'Produktkatalog' : 'Product catalog'}</h1>
  <p>{language === 'nb' ? 'Forhåndsvisning av planlagte produkter. Ingen bestilling eller priser.' : 'Preview of planned products. No ordering or pricing.'}</p>
  <div class="grid">
    {#each products as product (product.name)}
      <article><h2>{product.name}</h2><p>{product[language]}</p></article>
    {/each}
  </div>
  <h2>{language === 'nb' ? 'Veiledende brukerstørrelser' : 'Indicative seat bands'}</h2>
  <p>{language === 'nb' ? 'Gjelder der brukerbasert lisensiering er relevant. Leverandørvilkår kan variere.' : 'Applicable where seat-based licensing is relevant. Provider terms may vary.'}</p>
  <ul>{#each bands as band (band.name)}<li>{band.name}: {band.seats ?? (language === 'nb' ? 'Etter avtale' : 'Custom')}</li>{/each}</ul>
</main>
<style>
  main { max-width: 70rem; margin: 2rem auto; padding: 1rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }
  article { border: 1px solid currentColor; border-radius: .6rem; padding: 1rem; }
  article h2 { font-size: 1.2rem; }
</style>
