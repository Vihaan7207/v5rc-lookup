<script>
    export let data;
    
    let team_data = data.team_data;
    // console.log(team_data);
    let team_events = data.team_events;
    let rankings = data.rankingsList;
    let skillsRuns = data.skillsRuns;
    // console.log(skillsRuns); 
    let eventIndex = 0;
    const incrementIndex = () => {
        eventIndex++;
        return "";
    }
    console.log(rankings);
    
    const formatDate = (isoString)  =>  {
        if (typeof isoString !== "string") return "";

        // Extract YYYY-MM-DD
        const [year, month, day] = isoString.split("T")[0].split("-");

        return `${month}/${day}/${year}`;
    }
</script>

{#if data.errors}
<!-- <h1>An error occurred. Does the team you entered exist?</h1> -->
 <h1>{data.error}</h1>

{:else if team_data}
<div class="flex gap-4">
<div class="flex flex-col w-1/2 gap-4">
<div class="reg-card m-8 min-w-[50vw] max-w-[50vw]">
    <div class="card-body">
        <h2 class="card-title">Team Data</h2>
        <h4>Number: {team_data.number}</h4>
        <h4>Name: {team_data.team_name}</h4>
        <h4>Org: {team_data.organization}</h4>
        <h4>Grade: {team_data.grade}</h4>
        <h4>Season Record: {data.wins}-{data.losses}-{data.ties}</h4>
    </div>
</div>

<div class="reg-card ml-8 min-w-[50vw] max-w-[50vw]">
    <div class="card-body">
        <h2 class="card-title">{team_data.number}'s Season Events:</h2>
        <div class="overflow-auto h-[45vh]">    
            <!-- <ul> -->
             <table class="table  table-pin-rows">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {#each team_events.data as event, i}
                    <tr>
                        <th>{i + 1}</th>
                        <th><a class="link" href={`/event/${event.id}`}>{event.name}</a></th>
                        <th>{formatDate(event.start)}</th>
                    </tr>
                    <!-- {incrementIndex()} -->
                    {/each}
                </tbody>
             </table>
            <!-- </ul> -->
        </div>
    </div>
</div>
</div>
<div class="flex flex-col w-1/2">
<div class="reg-card m-8 max-w-[44vw] min-w-[44vw]">
    <div class="card-body">
        <h2 class="card-title">Event Rankings</h2>
        <div class="overflow-auto h-[30vh]">
            <table class="table table-pin-rows">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Record</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {#each rankings as event, i}
                    <tr>
                        <th>{i + 1}</th>
                        <th>{event.name}</th>
                        <th>{event.wins}-{event.losses}-{event.ties}</th>
                        <th>{event.rank}</th>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>



<div class="reg-card ml-8 min-w-[44vw] max-w-[44vw]">
    <div class="card-body">
        <h2 class="card-title">{team_data.number}'s Skill Runs:</h2>
        <div class="overflow-auto h-[31.5vh]">

            <table class="table table-pin-rows">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Driver</th>
                        <th>Autonomous</th>
                    </tr>
                </thead>
                <tbody>
                    {#each skillsRuns as run}
                    <tr>
                        <th>{run.eventName}</th>
                        <th>{run.driver}</th>
                        <th>{run.programming}</th>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
</div>
<!-- {:else if team_data && team_data.error}
<h1>team_data.error</h1> -->

{:else}
<h1>Loading...</h1>

{/if}