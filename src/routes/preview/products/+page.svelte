<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
  const products = [
    { name: 'Ploos Domains', nb: 'Domener og domeneforvaltning', en: 'Domains and domain management' },
    { name: 'Ploos DNS', nb: 'DNS-soner og navneservere', en: 'DNS zones and name servers' },
    { name: 'Ploos Hosting', nb: 'Webhotell og administrerte nettsider', en: 'Web hosting and managed websites' },
    { name: 'Ploos Mail', nb: 'E-post, aliaser og delte postkasser', en: 'Email, aliases and shared mailboxes' },
    { name: 'Ploos Cloud', nb: 'Planlagt: kSuite, Proton og administrert Nextcloud', en: 'Planned: kSuite, Proton and managed Nextcloud' },
    { name: 'Forenio', nb: 'Stiftelse og administrasjon av foreninger', en: 'Association formation and administration' }
  ];
</script>
<svelte:head><title>Ploos – Services preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <h1>{language === 'nb' ? 'Tjenester' : 'Services'}</h1>
  <p>{language === 'nb' ? 'Planlagte produktfamilier. Ingen live tjenestestatus eller administrasjon i denne demoen.' : 'Planned product families. No live service status or management in this demo.'}</p>
  <div class="grid">
    {#each products as product (product.name)}
      <article><h2>{product.name}</h2><p>{product[language]}</p>{#if product.name === 'Ploos Domains'}<a href="/preview/products/domains">{language === 'nb' ? 'Se domeneoversikt' : 'View domain portfolio'}</a>{:else if product.name === 'Ploos DNS'}<a href="/preview/products/dns">{language === 'nb' ? 'Se DNS-soner' : 'View DNS zones'}</a>{:else}<small>{language === 'nb' ? 'Administrasjon ikke aktivert' : 'Management not enabled'}</small>{/if}</article>
    {/each}
  </div>
  <p><a href="/preview/subscriptions">{language === 'nb' ? 'Se fiktive abonnementer for valgt organisasjon' : 'View fictional subscriptions for selected organization'}</a></p>
  <p><a href="/preview/catalog">{language === 'nb' ? 'Se produktkatalog og pakkestørrelser' : 'View catalog and seat bands'}</a></p>
</main>
<style>
  main { max-width: 70rem; margin: 2rem auto; padding: 1rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }
  article { border: 1px solid var(--border); background: var(--control); border-radius: .75rem; padding: 1rem; }
  h2 { font-size: 1.2rem; }
</style>
