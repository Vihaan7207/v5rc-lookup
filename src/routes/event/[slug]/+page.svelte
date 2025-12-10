<script>
    export let data;

    const event_data = data.event_data;
    const event_teams = data.event_teams_list;

    const formatDate = (isoString)  =>  {
    if (typeof isoString !== "string") return "";

    // Extract YYYY-MM-DD
    const [year, month, day] = isoString.split("T")[0].split("-");

    return `${month}/${day}/${year}`;
    
}
    // for (const team of event_teams) {
    //     console.log(team.number);
    // }
</script>

{#if data.errors}
<h1>There was an error. Does this event exist?</h1>

{:else}
<div class="reg-card">
    <div class="card-body">
        <h2 class="card-title">Event Data</h2>
        <h4>Name: {event_data.name}</h4>
        <h4>Venue: {event_data.location.venue}</h4>
        <h4>Address: {event_data.location.address_1}, {event_data.location.city}, {event_data.location.region}</h4>
        <h4>Date: {formatDate(event_data.start)}-{formatDate(event_data.end)}</h4>
        <h4>Type: {event_data.level}</h4>

    </div>
</div>

<div class="reg-card">
    <div class="card-body">
        <h2 class="card-title">Teams:</h2>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] max-w-[900px] mx-auto gap-1 place-items-center ">

            {#each event_teams as team (team.id)}
            <a class="link" href={`/team/${team.number}`}><button class="btn btn-soft btn-primary mt-4">{team.number}</button></a>
            {/each}
        </div>
    </div>
</div>
{/if}