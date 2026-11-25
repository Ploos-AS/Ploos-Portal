<script lang="ts">
  import { getContext } from 'svelte';
  const getLanguage = getContext<() => 'nb' | 'en'>('preview-language');
  const organization = getContext<{ selected: () => string }>('preview-organization');
  let language = $derived(getLanguage());
  const accounts = [
    { organization: 'business', domain: 'demo-business.example', arrangement: { nb: 'Ekstern DNS', en: 'External DNS' }, users: ['anna', 'ola'], shared: ['post'], aliases: [{ name: 'kontakt', target: 'post' }], mx: true, spf: true, dkim: true, dmarc: false },
    { organization: 'association', domain: 'sirdal.seniornett.example', arrangement: { nb: 'Delegert subdomene', en: 'Delegated subdomain' }, users: ['leder', 'kasserer', 'sekretar'], shared: ['styret', 'post'], aliases: [{ name: 'kontakt', target: 'post' }], mx: false, spf: false, dkim: false, dmarc: false }
  ];
  let visible = $derived(accounts.filter(account => account.organization === organization.selected()));
</script>
<svelte:head><title>Ploos Mail – Preview</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview/products">{language === 'nb' ? 'Tilbake til tjenester' : 'Back to services'}</a>
  <h1>Ploos Mail</h1>
  <p>{language === 'nb' ? 'Fiktive e-posttjenester. Ingen postkasser opprettes eller endres.' : 'Fictional email services. No mailboxes are created or modified.'}</p>
  {#each visible as account (account.domain)}
    <article>
      <h2>{account.domain}</h2>
      <p>{account.arrangement[language]}</p>
      <p>Starter · {account.users.length} / 5 {language === 'nb' ? 'brukere' : 'users'}</p>
      <h3>{language === 'nb' ? 'Personlige postkasser' : 'Personal mailboxes'}</h3>
      <ul>{#each account.users as user}<li>{user}@{account.domain}</li>{/each}</ul>
      <h3>{language === 'nb' ? 'Delte postkasser' : 'Shared mailboxes'}</h3>
      <ul>{#each account.shared as mailbox}<li>{mailbox}@{account.domain}</li>{/each}</ul>
      <h3>{language === 'nb' ? 'Aliaser' : 'Aliases'}</h3>
      <ul>{#each account.aliases as alias}<li>{alias.name}@{account.domain} → {alias.target}@{account.domain}</li>{/each}</ul>
      <h3>{language === 'nb' ? 'DNS-oppsett (demo)' : 'DNS setup (demo)'}</h3>
      <dl>{#each [['MX', account.mx], ['SPF', account.spf], ['DKIM', account.dkim], ['DMARC', account.dmarc]] as [label, ready]}<dt>{label}</dt><dd>{ready ? (language === 'nb' ? 'Konfigurert' : 'Configured') : (language === 'nb' ? 'Venter' : 'Pending')}</dd>{/each}</dl>
    </article>
  {:else}
    <p>{language === 'nb' ? 'Ingen e-posttjenester i valgt demoorganisasjon.' : 'No email services in the selected demo organization.'}</p>
  {/each}
</main>
<style>
  main { margin: 2rem auto; padding: 1rem; }
  article { background: var(--control); border: 1px solid var(--border); border-radius: .75rem; padding: 1rem; margin-block: 1rem; overflow-wrap: anywhere; }
  h2 { font-size: 1.2rem; }
  dt { font-weight: bold; }
  dd { margin: 0 0 .75rem; }
</style>
