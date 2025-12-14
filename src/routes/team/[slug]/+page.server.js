import { API_TOKEN } from '$env/static/private';
import { seasonId } from '$lib/stores.js';
import { get } from 'svelte/store';

export const load = async ({ params }) =>  {
    try {

        const team = params.slug;
        const team_data_response = await fetch(`https://www.robotevents.com/api/v2/teams?number=${team}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        
        if (!team_data_response.ok) {
            throw new Error (team_data_response.status);
        }
        
        
        const team_data = await team_data_response.json();
        // console.log(team_data);
        // console.log(get(seasonId));
        
        // teamId = team_data.data[0].id;

        const team_events_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/events?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if(!team_events_response.ok) {
            throw new Error (team_events_response.status);
        }

        const team_events = await team_events_response.json();
        // console.log(team_events);
                
        let wins = 0;
        let losses = 0;
        let ties = 0;
        let rankingsList = [];

         const team_matches_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/rankings?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        
        if(!team_matches_response.ok) {
            throw new Error (team_matches_response.status);
        }

        const team_matches_data = await team_matches_response.json();

        // let index = 0;
        for (const event of team_matches_data.data) {
            // index++;
            wins += event.wins;
            losses += event.losses;
            ties += event.ties;
            rankingsList.push({name: event.event.name, wins: event.wins, losses: event.losses, ties: event.ties, rank: event.rank});
        }
        rankingsList = rankingsList.reverse();
        // console.log(rankingsList);
        

        // console.log(wins, losses, ties);

        let team_skills_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/skills?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        
       let team_skills_data = await team_skills_response.json();
       let skillsRuns = [];
        for(let i = 0; i < team_skills_data.data.length; i++) {
            let current_run = team_skills_data.data[i];
            let next_run = team_skills_data.data[i+1];
            let run = {
                eventName: '',
                driver: null,
                programming: null
            }

            if (next_run){
                if (current_run.event.id === next_run.event.id) {
                    // console.log(current_run.event.id);
                    run.eventName = current_run.event.name;
                    if (current_run.type === "driver") {
                        run.driver = current_run.score;
                    }
                    else if (current_run.type === "programming") {
                        run.programming === current_run.score;
                    }
                    if (next_run.type === "driver") {
                        run.driver = next_run.score;
                    }
                    else if (next_run.type === "programming") {
                        run.programming = next_run.score;
                    }
                    i++;
                }
            }

            run.eventName = current_run.event.name;
            if (current_run.type === "driver") {
                run.driver = current_run.score;
            }
            else if (current_run.type === "programming") {
                run.programming === current_run.score;
            }
            // console.log(run);
            skillsRuns.push(run);
        }
        // console.log(skillsRuns);
        

        return {
            errors: false,
            team_data: team_data.data[0],
            team_events,
            wins,
            losses,
            ties,
            rankingsList,
            skillsRuns
        };

    }
    catch (error) {
        console.log(error);
        return {
            errors: true,
            error
        }
        
    }
}