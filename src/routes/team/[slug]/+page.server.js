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

        const team_events_response = await fetch(`https://www.robotevents.com/api/v2/teams/${team_data.data[0].id}/events?season=${get(seasonId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        const team_events = await team_events_response.json();
        // console.log(get(seasonId));
        

        return {
            errors: false,
            team_data: team_data.data[0],
            team_events: team_events
        };
    }
    catch {
        return {
            errors: true
        }
    }
}