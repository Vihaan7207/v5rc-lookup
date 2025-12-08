<script>
    export let data;
    
    let team_data = data.team_data;
    console.log(team_data);
    let team_events = data.team_events;
</script>

{#if data.errors}
<h1>An error occurred. Does the team you entered exist?</h1>
{:else if team_data}
<h1>Team Number: {team_data.number}</h1>
<h1>Team Name: {team_data.team_name}</h1>
<br/>
<h1>Team Events:</h1>
<ul>
    {#each team_events.data as event (event.id)}
    <li><a href={`/event/${event.id}`}>{event.name}</a></li>
    {/each}
</ul>
{:else if team_data && team_data.error}
<h1>team_data.error</h1>
{:else}
<h1>Loading...</h1>
{/if}