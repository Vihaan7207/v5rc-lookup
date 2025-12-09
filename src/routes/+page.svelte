<script>
	import {goto} from "$app/navigation";
    let teamName = '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        await goto(`/team/${teamName}`);
    }
</script>
<div class="card bg-base-300 w-96 card-lg mt-10 ml-10">
    <div class="card-body">
        <h2 class="card-title">Enter a team name</h2>
        <form on:submit={handleSubmit}>
            <input type="text" id="teamForm" placeholder="Input team name here" class="input input-lg" bind:value={teamName} />
            <div class="justify-end card-actions">
                <button class="btn btn-neutral mt-3" type="submit">Go</button>
            </div>
        </form>
    </div>
</div>