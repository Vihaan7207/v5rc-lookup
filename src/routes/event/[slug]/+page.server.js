import { API_TOKEN } from '$env/static/private';

export const load = async ({ params }) => {
    try {
        const id = params.slug;
        let divs = [];
        let ranksByDiv = [];
        const event_data_response = await fetch(`https://www.robotevents.com/api/v2/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        
        if (!event_data_response.ok) {
            throw new Error('1: '+event_data_response.status);
        }

        
        const event_data = await event_data_response.json();

        for (const div of event_data.divisions) {
            divs.push(div);    
        };
        
        let event_teams_list = [];
        
        let event_teams_response = await fetch(`https://www.robotevents.com/api/v2/events/${id}/teams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if (!event_teams_response.ok) {
            throw new Error('2: ' + event_teams_response.status);
        }

        let event_teams_data = await event_teams_response.json();

        for (const team of event_teams_data.data) {
            event_teams_list.push(team);
        }

        // console.log(event_teams_list);
        
        // console.log(event_teams_data.meta.next_page_url !== null);
        
        
        while(event_teams_data.meta.next_page_url !== null) {
            // console.log('hi');
            
            const new_url = event_teams_data.meta.next_page_url;
            
            event_teams_response = await fetch(`${new_url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (!event_teams_response.ok) {
                throw new Error('3: ' + event_data_response.status);
            }

            event_teams_data = await event_teams_response.json();
            // console.log(event_teams_data);
            
            // console.log(event_teams_data.data);
            

            for (const team of event_teams_data.data) {
                event_teams_list.push(team);
            }
        }
        // console.log(event_teams_list);
        for(const div of divs) {
            let ranks = [];
            let response = await fetch(`https://www.robotevents.com/api/v2/events/${id}/divisions/${div.id}/rankings`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            let response_data = await response.json();
            for (const team of response_data.data) {
                // console.log(team);
                ranks.push({
                    name: team.team.name,
                    wins: team.wins,
                    losses: team.losses,
                    ties: team.ties,
                    rank: team.rank
                });
            }
            while(response_data.meta.next_page_url !== null) {
                let new_url = response_data.meta.next_page_url;
                response = await fetch(`${new_url}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });
                response_data = await response.json();
                for (const team of response_data.data) {
                    console.log(team);
                    ranks.push({
                        name: team.team.name,
                        wins: team.wins,
                        losses: team.losses,
                        ties: team.ties,
                        rank: team.rank,
                        wp: team.wp,
                        ap: team.sp,
                        sp: team.sp
                    });
                }
            }
            // console.log(ranks);
            ranks = ranks.reverse();
            // console.log(JSON.stringify(ranks));
            ranksByDiv.push(JSON.parse(JSON.stringify(ranks)));
        }

        console.log(ranksByDiv);
        try {
            structuredClone(ranksByDiv);
            console.log("List is valid");
        } catch (e) {
            console.error("List failed serialization:", e);
        }
        
        return {
            errors: false,
            event_data,
            event_teams_list,
            ranks_by_div: ranksByDiv,
            id
        }

    }
    catch (error) {
        console.log(error);
        return {
            errors: true
        }
        
    }
}