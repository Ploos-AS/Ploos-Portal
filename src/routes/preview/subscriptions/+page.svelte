<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  let language = $derived(getLanguage());
  const organization = getContext<{ organizations: { id: string; display_name: string; kind: string; role: string }[]; selected: () => string }>('preview-organization');
  let selected = $derived(organization.selected());
  const labels = {
    pending: { nb: 'Venter', en: 'Pending' },
    active: { nb: 'Aktiv', en: 'Active' },
    suspended: { nb: 'Suspendert', en: 'Suspended' },
    cancelled: { nb: 'Avsluttet', en: 'Cancelled' }
  };
  const subscriptions = [
    { id: 'demo-1', organization: 'business', product: 'Ploos Hosting', provider: 'Ploos', plan: 'Demo Web', status: 'active' },
    { id: 'demo-2', organization: 'business', product: 'Ploos Mail', provider: 'Ploos', plan: 'Starter (5)', status: 'pending' },
    { id: 'demo-3', organization: 'association', product: 'Ploos Cloud', provider: 'Ploos', plan: 'Demo Drive (5)', status: 'suspended' },
    { id: 'demo-4', organization: 'association', product: 'Ploos Hosting', provider: 'Ploos', plan: 'Demo Web', status: 'cancelled' }
  ] as const;
  let visible = $derived(subscriptions.filter((item) => item.organization === selected));
</script>
<svelte:head><title>Subscription preview | Ploos</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview">{language === 'nb' ? 'Tilbake' : 'Back'}</a>
  <h1>{language === 'nb' ? 'Abonnementer' : 'Subscriptions'}</h1>
  <p>{language === 'nb' ? 'Kun fiktive demodata. Ingen faktiske abonnementer eller driftsstatus.' : 'Fictional demo data only. No real subscriptions or service health.'}</p>
  {#if visible.length === 0}
    <p role="status">{language === 'nb' ? 'Ingen abonnementer' : 'No subscriptions'}</p>
  {:else}
    <div class="grid">
      {#each visible as item (item.id)}
        <article>
          <h2>{item.product}</h2>
          <p>{language === 'nb' ? 'Leverandør' : 'Provider'}: {item.provider}</p>
          <p>{language === 'nb' ? 'Pakke' : 'Plan'}: {item.plan}</p>
          <p>Status: <strong>{labels[item.status][language]}</strong></p>
        </article>
      {/each}
    </div>
  {/if}
</main>
<style>
  main { max-width: 70rem; margin: 2rem auto; padding: 1rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; margin-top: 1rem; }
  article { border: 1px solid currentColor; border-radius: .6rem; padding: 1rem; }
</style>
