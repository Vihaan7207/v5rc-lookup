import { API_TOKEN } from '$env/static/private';

export const load = async ({ params }) => {
    try {
        const slug = params.slug;
        const rounds = ["Practice", "Qualifiers", "Quarterfinals", "Semifinals", "Finals", "R16"];
    
        const div_response = await fetch(`https://www.robotevents.com/api/v2/events/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if(!div_response.ok) {
            console.log("Error 1");
            throw new Error(div_response.status);
        }

        let div_data = await div_response.json();
        div_data = div_data.divisions;
        // console.log(div_data);
        
        let matches = [];

        for (const div of div_data) {
            let matches_response = await fetch(`https://www.robotevents.com/api/v2/events/${slug}/divisions/${div.id}/matches`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (!matches_response.ok) {
                console.log("Error 2");
                throw new Error(matches_response.status);
            }

            let matches_data = await matches_response.json();
            let div_matches = [];

            for (const match of matches_data.data) {
                div_matches.push({
                   num: match.matchnum,
                   round: rounds[match.round - 1],
                   blue: {
                    score: match.alliances[0].score,
                    team1: match.alliances[0].teams[0].team.name,
                    team2: match.alliances[0].teams[1].team.name,
                    teams: [match.alliances[0].teams[0].team.name, match.alliances[0].teams[1].team.name]
                   },
                   red: {
                    score: match.alliances[1].score,
                    team1: match.alliances[1].teams[0].team.name,
                    team2: match.alliances[1].teams[1].team.name,
                    teams: [match.alliances[1].teams[0].team.name, match.alliances[1].teams[1].team.name]
                   },
                   allteams: [match.alliances[0].teams[0].team.name, match.alliances[0].teams[1].team.name, match.alliances[1].teams[0].team.name, match.alliances[1].teams[1].team.name],
                   winner: match.alliances[1].score > match.alliances[0].score ? 'red' : 'blue'
                });
            }

            while (matches_data.meta.next_page_url !== null) {
                let new_url = matches_data.meta.next_page_url;
                matches_response = await fetch(`${new_url}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });

                if (!matches_response.ok) {
                    console.log("Error 2.5");
                    throw new Error(matches_response.status);
                }

                matches_data = await matches_response.json();

                for (const match of matches_data.data) {
                    div_matches.push({
                        num: match.matchnum,
                        round: rounds[match.round - 1],
                        blue: {
                            score: match.alliances[0].score,
                            team1: match.alliances[0].teams[0].team.name,
                            team2: match.alliances[0].teams[1].team.name,
                            teams: [match.alliances[0].teams[0].team.name, match.alliances[0].teams[1].team.name]
                        },
                        red: {
                            score: match.alliances[1].score,
                            team1: match.alliances[1].teams[0].team.name,
                            team2: match.alliances[1].teams[1].team.name,
                            teams: [match.alliances[1].teams[0].team.name, match.alliances[1].teams[1].team.name]
                        },
                        allteams: [match.alliances[0].teams[0].team.name, match.alliances[0].teams[1].team.name, match.alliances[1].teams[0].team.name, match.alliances[1].teams[1].team.name],
                        winner: match.alliances[1].score > match.alliances[0].score ? 'red' : 'blue'
                    });
                }
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
            
            matches.push(sortByRoundAndMatch(div_matches));
        }
        // console.log(matches); 
        

        return {
            errors: false,
            slug,
            matches
        }
    }
    catch (error) {
        console.log(error);
        
        return {
            errors: true
        }
    }
}