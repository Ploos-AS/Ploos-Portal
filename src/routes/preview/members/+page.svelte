<script lang="ts">
  let language = $state<'nb' | 'en'>('nb');
  const roles = ['owner', 'admin', 'member', 'viewer'] as const;
  const members = [
    { name: 'Demo A', role: 'owner' },
    { name: 'Demo B', role: 'admin' },
    { name: 'Demo C', role: 'member' },
    { name: 'Demo D', role: 'viewer' }
  ];
  const permissions = [
    { nb: 'Se tjenester', en: 'View services', allowed: roles },
    { nb: 'Administrere tjenester', en: 'Manage services', allowed: ['owner', 'admin'] },
    { nb: 'Administrere vanlige medlemmer', en: 'Manage ordinary members', allowed: ['owner', 'admin'] },
    { nb: 'Administrere eiere og administratorer', en: 'Manage owners and admins', allowed: ['owner'] },
    { nb: 'Administrere fakturering', en: 'Manage billing', allowed: ['owner'] }
  ];
</script>
<svelte:head><title>Membership preview | Ploos</title><meta name="robots" content="noindex" /></svelte:head>
<main>
  <a href="/preview">{language === 'nb' ? 'Tilbake' : 'Back'}</a>
  <h1>{language === 'nb' ? 'Medlemmer og roller' : 'Members and roles'}</h1>
  <button onclick={() => language = language === 'nb' ? 'en' : 'nb'}>{language === 'nb' ? 'English' : 'Norsk'}</button>
  <p>{language === 'nb' ? 'Fiktive medlemmer. Ingen endringer kan utføres.' : 'Fictional members. Changes are disabled.'}</p>
  <ul>{#each members as member (member.name)}<li>{member.name}: {member.role}</li>{/each}</ul>
  <h2>{language === 'nb' ? 'Rettigheter' : 'Permissions'}</h2>
  <div class="scroll">
    <table>
      <caption>{language === 'nb' ? 'Veiledende rolleoversikt' : 'Indicative role matrix'}</caption>
      <thead><tr><th scope="col">{language === 'nb' ? 'Rettighet' : 'Permission'}</th>{#each roles as role}<th scope="col">{role}</th>{/each}</tr></thead>
      <tbody>{#each permissions as permission}<tr><th scope="row">{permission[language]}</th>{#each roles as role}<td>{permission.allowed.some((allowed) => allowed === role) ? (language === 'nb' ? 'Ja' : 'Yes') : (language === 'nb' ? 'Nei' : 'No')}</td>{/each}</tr>{/each}</tbody>
    </table>
  </div>
  <p>{language === 'nb' ? 'Den siste eieren kan ikke fjernes. Core kontrollerer alle medlemsendringer.' : 'The last owner cannot be removed. Core authorizes all membership changes.'}</p>
</main>
<style>
  main { max-width: 70rem; margin: 2rem auto; padding: 1rem; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid currentColor; padding: .6rem; text-align: left; }
  caption { text-align: left; padding: .5rem 0; }
</style>
