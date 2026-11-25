<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
</script>
<svelte:head>
  <title>Ploos Portal – Preview</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>
<main>
  <h1>{language === 'nb' ? 'Oversikt' : 'Overview'}</h1>
  <p>{language === 'nb' ? 'Demomodus' : 'Demo mode'}</p>
  <p>{language === 'nb' ? 'Ingen kundedata, innlogging eller bestilling er tilgjengelig.' : 'Customer data, sign-in and ordering are unavailable.'}</p>
  <a href="/preview/catalog">{language === 'nb' ? 'Produktkatalog' : 'Catalog'}</a>
</main>
<style>
  main { padding: clamp(20px, 4vw, 60px); }
</style>
