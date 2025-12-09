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
            throw new error (response.status);
        }


        const team_data = await team_data_response.json();
        console.log(team_data);
        console.log(get(seasonId));
        

        const team_events_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/events?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        const team_events = await team_events_response.json();
        console.log(team_events);
                
        let wins = 0;
        let losses = 0;
        let ties = 0;

         const team_matches_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/rankings?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        const team_matches_data = await team_matches_response.json();

        for (const event of team_matches_data.data) {
            wins += event.wins;
            losses += event.losses;
            ties += event.ties;
        }

        console.log(wins, losses, ties);
        

        return {
            errors: false,
            team_data: team_data.data[0],
            team_events,
            wins,
            losses,
            ties
        };

    }
    catch {
        return {
            errors: true
        }
    }
}