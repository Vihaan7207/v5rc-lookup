<script>
	import './+layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {goto} from "$app/navigation";

	let { children } = $props();
    let teamName = '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        await goto(`/team/${teamName}`);
    }
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar bg-base-100 shadow-md">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">V5RC Lookup</a>
	</div>
	<!-- <div class="flex gap-2">
		<form on:submit={handleSubmit}>
			<input type="text" id="teamForm" placeholder="Input team name here" class="input input-lg" bind:value={teamName} />
			<button class="btn btn-neutral" type="submit">Go</button>
		</form>
	</div> -->
</div>

{@render children()}
