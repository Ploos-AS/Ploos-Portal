<script lang="ts">
  type Organization = { id: string; display_name: string; kind: string; role: string };
  let { organizations, selected = '', onchange, language = 'nb' }: {
    organizations: Organization[];
    selected?: string;
    onchange: (id: string) => void;
    language?: 'nb' | 'en';
  } = $props();
  let validSelection = $derived(organizations.some((org) => org.id === selected) ? selected : '');
</script>

<label>
  <span>{language === 'nb' ? 'Organisasjon' : 'Organization'}</span>
  <select value={validSelection} disabled={organizations.length === 0}
    onchange={(event) => {
      const id = event.currentTarget.value;
      if (id === '' || organizations.some((org) => org.id === id)) onchange(id);
    }}>
    <option value="">{language === 'nb' ? 'Velg organisasjon' : 'Select organization'}</option>
    {#each organizations as org (org.id)}
      <option value={org.id}>{org.display_name}</option>
    {/each}
  </select>
</label>
{#if organizations.length === 0}
  <p role="status">{language === 'nb' ? 'Ingen tilgjengelige organisasjoner' : 'No available organizations'}</p>
{/if}

<style>
  label { display: grid; gap: .4rem; }
  select { font: inherit; color: inherit; background: transparent; border: 1px solid currentColor; border-radius: .4rem; padding: .65rem; max-width: 100%; }
</style>
