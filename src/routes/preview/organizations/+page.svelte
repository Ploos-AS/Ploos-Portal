<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
  const organization = getContext<{ organizations: { id: string; display_name: string; kind: string; role: string }[]; selected: () => string }>('preview-organization');
  let selected = $derived(organization.selected());
  const organizations = organization.organizations;
  let current = $derived(organizations.find((org) => org.id === selected));
</script>

<svelte:head><title>Organization preview | Ploos</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview">{language === 'nb' ? 'Tilbake' : 'Back'}</a>
  <h1>{language === 'nb' ? 'Organisasjoner' : 'Organizations'}</h1>
  <p>{language === 'nb' ? 'Demodata – ingen ekte tilgang eller innlogging.' : 'Demo data – no real access or sign-in.'}</p>
  {#if current}
    <p>{language === 'nb' ? 'Valgt' : 'Selected'}: {current.display_name}</p>
    <p>{language === 'nb' ? 'Demorolle' : 'Demo role'}: {current.role}</p>
  {:else}
    <p>{language === 'nb' ? 'Velg organisasjon øverst.' : 'Select an organization above.'}</p>
  {/if}
</main>
<style>main { max-width: 42rem; margin: 2rem auto; padding: 1rem; }</style>
