<script>
    export let data;

    const event_data = data.event_data;
</script>

{#if data.errors}
<h1>There was an error. Does this event exist?</h1>
{:else}
<h1>Name: {event_data.name}</h1>
<h1>Location: {event_data.location.venue}, {event_data.location.address_1}, {event_data.location.city}</h1>
{/if}