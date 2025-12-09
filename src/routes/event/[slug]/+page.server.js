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
        
        let event_teams_list = [];
        
        let event_teams_response = await fetch(`https://www.robotevents.com/api/v2/events/${id}/teams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if (!event_teams_response.ok) {
            throw new error();
        }

        let event_teams_data = await event_teams_response.json();

        for (const team of event_teams_data.data) {
            event_teams_list.push(team);
        }

        // console.log(event_teams_list);
        
        console.log(event_teams_data.meta.next_page_url !== null);
        
        
        while(event_teams_data.meta.next_page_url !== null) {
            console.log('hi');
            
            const new_url = event_teams_data.meta.next_page_url;
            
            event_teams_response = await fetch(`${new_url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (!event_teams_response.ok) {
                throw new error();
            }

            event_teams_data = await event_teams_response.json();

            // console.log(event_teams_data.data);
            

            for (const team of event_teams_data.data) {
                event_teams_list.push(team);
            }
        }
        // console.log(event_teams_list);

        return {
            errors: false,
            event_data,
            event_teams_list
        }

    }
    catch {
        return {
            errors: true
        }
    }
}