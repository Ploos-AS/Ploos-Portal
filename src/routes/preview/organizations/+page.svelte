<script lang="ts">
  import OrganizationSelector from '$lib/components/OrganizationSelector.svelte';
  let selected = $state('');
  let language = $state<'nb' | 'en'>('nb');
  const organizations = [
    { id: 'demo-business', display_name: 'Demo AS', kind: 'business', role: 'owner' },
    { id: 'demo-association', display_name: 'Demo forening', kind: 'association', role: 'member' }
  ];
  let current = $derived(organizations.find((org) => org.id === selected));
</script>

<svelte:head><title>Organization preview | Ploos</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview">{language === 'nb' ? 'Tilbake' : 'Back'}</a>
  <h1>{language === 'nb' ? 'Organisasjoner' : 'Organizations'}</h1>
  <button onclick={() => language = language === 'nb' ? 'en' : 'nb'}>{language === 'nb' ? 'English' : 'Norsk'}</button>
  <p>{language === 'nb' ? 'Demodata – ingen ekte tilgang eller innlogging.' : 'Demo data – no real access or sign-in.'}</p>
  <OrganizationSelector {organizations} {selected} {language} onchange={(id) => selected = id} />
  {#if current}
    <p>{language === 'nb' ? 'Valgt' : 'Selected'}: {current.display_name}</p>
    <p>{language === 'nb' ? 'Demorolle' : 'Demo role'}: {current.role}</p>
  {/if}
</main>
<style>main { max-width: 42rem; margin: 2rem auto; padding: 1rem; }</style>
