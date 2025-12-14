<script>
    export let data;

    const event_data = data.event_data;
    const event_teams = data.event_teams_list;
    // const ranksbyDiv = data.ranksbyDiv;

    const formatDate = (isoString)  =>  {
        if (typeof isoString !== "string") return "";

        // Extract YYYY-MM-DD
        const [year, month, day] = isoString.split("T")[0].split("-");

        return `${month}/${day}/${year}`;
    
    }
    // for (const team of event_teams) {
    //     console.log(team.number);
    // }
    let rankIndex = 1;
    // console.log(data.ranks_by_div);
        
    
</script>

{#if data.errors}
<h1>There was an error. Does this event exist?</h1>

{:else}
<div class="flex gap-4">
<div class="flex flex-col gap-4 w-1/2">
<div class="reg-card min-w-[52vw] max-w-[52vw] m-10">
    <div class="card-body">
        <h2 class="card-title">Event Data</h2>
        <h4>Name: {event_data.name}</h4>
        <h4>Venue: {event_data.location.venue}</h4>
        <h4>Address: {event_data.location.address_1}, {event_data.location.city}, {event_data.location.region}</h4>
        <h4>Date: {formatDate(event_data.start)}-{formatDate(event_data.end)}</h4>
        <h4>Type: {event_data.level}</h4>

    </div>
</div>

<div class="reg-card min-w-[50vw] max-w-[52vw] ml-10">
    <div class="card-body">
        <h2 class="card-title">All Teams:</h2>
        <div class="overflow-auto h-[40vh]">

            <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] max-w-[50vw] mx-auto gap-1 place-items-center ">
                
                {#each event_teams as team (team.id)}
                <a class="link" href={`/team/${team.number}`}><button class="btn btn-soft btn-primary mt-4">{team.number}</button></a>
                {/each}
            </div>
        </div>
    </div>
</div>
</div>
<div class="w-1/2">

<div class="reg-card min-w-[40vw] ml-20 mt-10">
    <div class="card-body">
        <h2 class="card-title">Division Rankings</h2>
        <div class="overflow-auto h-[70vh]">
            {#each data.ranks_by_div as div (rankIndex)}
            <h2 class="bold">Division {rankIndex}</h2>
            <table class="table table-zebra table-pin-rows">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Record</th>
                        <th>WP</th>
                        <th>AP</th>
                        <th>SP</th>
                    </tr>
                </thead>
                <tbody>
                    {#each div as team}
                    <tr>
                        <th>{team.rank}</th>
                        <th><a href={`/team/${team.name}`}` class="link">{team.name}</a></th>
                        <th>{team.wins}-{team.losses}-{team.ties}</th>
                        <th>{team.wp}</th>
                        <th>{team.ap}</th>
                        <th>{team.sp}</th>
                    </tr>
                    {/each}
                </tbody>
            </table>
            {/each}
        </div>
    </div>
</div>
</div>
</div>
{/if}