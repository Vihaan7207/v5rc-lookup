import { API_TOKEN } from "$env/static/private";
import {seasonId} from "$lib/stores.js";

export const load = async ({ params }) => {
    const season_response = await fetch('https://www.robotevents.com/api/v2/seasons', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });
    // console.log('hi');
    const seasons_data = await season_response.json();
    // console.log(seasons_data.data);
    const seasons = seasons_data.data;
    const currentSeason = seasons.find(season => season.program.code === "V5RC");
}