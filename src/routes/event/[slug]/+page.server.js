import { API_TOKEN } from '$env/static/private';

export const load = async ({ params }) => {
    try {
        const id = params.slug;
        const event_data_response = await fetch(`https://www.robotevents.com/api/v2/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        if (!event_data_response.ok) {
            throw new error();
        }
        const event_data = await event_data_response.json();
        console.log(event_data);
        return {
            errors: false,
            event_data
        }
    }
    catch {
        return {
            errors: true
        }
    }
}