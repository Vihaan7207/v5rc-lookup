<script>
    export let data;
    import { writable } from 'svelte/store';
    // console.log(data);
    let teamName = '';
    const chosenTeamMatches = writable(null);

    const matches = data.matches;    

    function formatIsoTime(isoString, { seconds = false } = {}) {
        const date = new Date(isoString);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            ...(seconds && { second: '2-digit' })
        };

        return date.toLocaleTimeString(undefined, options);
    }

    const roundOrder = [1, 2, 6, 3, 4, 5];

    // Precompute lookup for O(1) access
    const roundIndex = Object.fromEntries(
    roundOrder.map((r, i) => [r, i])
    );

    function sortByRoundAndMatch(arr) {
        return arr.sort((a, b) => {
            const roundDiff =
            roundIndex[a.roundnum] - roundIndex[b.roundnum];

            if (roundDiff !== 0) {
            return roundDiff;
            }

            // Same round → sort by match normally
            return a.matchnum - b.matchnum;
        });
    }

    function normalizeEndingLetter(str) {
        return str.replace(/(\d+)([a-zA-Z])$/, (_, numbers, letter) => {
            return numbers + letter.toUpperCase();
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        teamName = normalizeEndingLetter(teamName);
        // console.log(teamName);
        
        // console.log(getTeamMatches(teamName));
        
        chosenTeamMatches.set(getTeamMatches(teamName));
        // console.log(chosenTeamMatches);
        
    }
 
    const getTeamMatches = (team) => {
        let team_matches = [];
        for (const div of matches) {
            for (const match of div) {
                let teamColor = match.red.teams.includes(team) ? 'red' : 'blue';
                let matchWin = match.red.score > match.blue.score ? 'red' : 'blue';
                
                match.teamWin = teamColor === matchWin;
                if (match.allteams.includes(team)) team_matches.push(match);
                // console.log(match.allteams.includes(team));
            }
        }

        return sortByRoundAndMatch(team_matches);
    }

    // console.log(getTeamMatches("7405N"));
    $: console.log($chosenTeamMatches);
</script>

<div class="flex gap-4">

    <div class="reg-card min-w-[44vw] m-10">
        <div class="card-body">
            <div class="card-title">
                <h2>Event Matchups</h2>
            </div>
            <div class="overflow-auto h-[70vh]">
                {#each matches as div, i}
                <h1>Division {i + 1}</h1>
                <table class="table table-pin-rows">
                    <thead>
                        <tr>
                            <th>Match #</th>
                            <th>Round</th>
                            <th>Blue Teams</th>
                            <th>Red Teams</th>
                            <th>Blue Score</th>
                            <th>Red Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each div as match, i}
                        <tr>
                            <th
                            class:text-blue-400={match.winner === "blue"}
                            class:text-red-400={match.winner === "red"}
                            >{match.num}</th>
                            <th>{match.round}</th>
                            <th class="text-blue-400">
                                <a href={`/team/${match.blue.team1}`}>{match.blue.team1}</a>
                                <br/>
                                <a href={`/team/${match.blue.team2}`}>{match.blue.team2}</a>
                            </th>
                            <th class="text-red-400 text-underline">
                                <a href={`/team/${match.red.team1}`}>{match.red.team1}</a>
                                <br/>
                                <a href={`/team/${match.red.team2}`}>{match.red.team2}</a>
                            </th>
                            <th>{match.blue.score}</th>
                            <th>{match.red.score}</th>
                        </tr>
                        {/each}
                    </tbody>
                </table>
                {/each}
            </div>
        </div>
    </div>
    
    <div class="reg-card m-10 min-w-[44vw]">
        <div class="card-body">
            <h2 class="card-title">Find a team's matches</h2>
            <form on:submit={handleSubmit}>
                <input type="text" id="teamForm" placeholder="Input team name here" class="input input-lg" bind:value={teamName} />
                <div class="justify-end card-actions">
                    <button class="btn btn-neutral mt-3" type="submit">Go</button>
                </div>
            </form>
            <div class="overflow-auto table-pin-rows h-[60vh]">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Match #</th>
                            <th>Round</th>
                            <th>Blue Teams</th>
                            <th>Red Teams</th>
                            <th>Blue Score</th>
                            <th>Red Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $chosenTeamMatches as match, i}
                        <tr>
                            <th
                            class:text-red-600={!match.teamWin}
                            class:text-green-600={match.teamWin}
                            >{match.num}</th>
                            <th>{match.round}</th>
                            <th class="text-blue-400">
                                <a href={`/team/${match.blue.team1}`}>{match.blue.team1}</a>
                                <br/>
                                <a href={`/team/${match.blue.team2}`}>{match.blue.team2}</a>
                            </th>
                            <th class="text-red-400 text-underline">
                                <a href={`/team/${match.red.team1}`}>{match.red.team1}</a>
                                <br/>
                                <a href={`/team/${match.red.team2}`}>{match.red.team2}</a>
                            </th>
                            <th>{match.blue.score}</th>
                            <th>{match.red.score}</th>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>