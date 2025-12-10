<script>
    export let data;
    
    let team_data = data.team_data;
    // console.log(team_data);
    let team_events = data.team_events;
</script>

{#if data.errors}
<h1>An error occurred. Does the team you entered exist?</h1>

{:else if team_data}
<div class="reg-card">
    <div class="card-body">
        <h2 class="card-title">Team Data</h2>
        <h4>Number: {team_data.number}</h4>
        <h4>Name: {team_data.team_name}</h4>
        <h4>Org: {team_data.organization}</h4>
        <h4>Grade: {team_data.grade}</h4>
        <h4>Season Record: {data.wins}-{data.losses}-{data.ties}</h4>
    </div>
</div>

<div class="reg-card">
    <div class="card-body">
        <h2 class="card-title">{team_data.number}'s Events:</h2>
        <ul>
            {#each team_events.data as event (event.id)}
            <li><a class="link" href={`/event/${event.id}`}><button class="btn btn-soft btn-primary mt-4 text-left">{event.name}</button></a></li>
            {/each}
        </ul>
    </div>
</div>

{:else if team_data && team_data.error}
<h1>team_data.error</h1>

{:else}
<h1>Loading...</h1>

{/if}