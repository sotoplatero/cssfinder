<script context="module">
	import {frameworks} from '$lib/frameworks'

	export async function load({ page }) {

		const names = Object.keys(frameworks)
		return {
			props: {
				names
				// frameworks: Object.keys(frameworks)
			}
		};

	}
	
</script>
<script>
	export let names = []

	let framework = 'tailwind'
	let q = ''
	// let classes = []

	async function search(){
		if (!q) return []
		const res = await fetch(`${framework}.json?q=${q}`)
		if (res.ok) {
			return (await res.json())
		} else {
			throw new Error(text);
		}	
	}

	let promiseSearch = search()

	function handleSearch(){
		promiseSearch = search()
	}

	$:framework && handleSearch()

</script>
<h1>
	<div>
		<img src="/favicon-32x32.png" alt="">
	</div>
	<strong>CSS Finder</strong>
</h1>
<form on:submit|preventDefault={handleSearch}>
	<input type="text" bind:value={q} placeholder="Class name">
</form>
<p>
{#each names as name, index}
	<label >
		<input type="radio" bind:group={framework} value={name} name="framework">
		{@html framework===name ? `<strong>${name}</strong>` : name }
	</label>
{/each}
</p>
{#await promiseSearch}
	<p>Searching...</p>
{:then classes}

	{#each classes as {name,attributes}, index}
		<div>
			<h4><a href >{name}</a></h4>
			<dl>
				<code>{@html attributes}</code>
			</dl>
		</div>
	{/each}
	{#if !classes.length && q}
		<p>No results found for <mark>{q}</mark> in <strong>{framework}</strong></p>
	{/if}

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<footer>
	<small>
		if you 💓 CSSFinder follow me <a href="https://twitter.com/sotoplatero" rel="me">@sotoplatero</a> to see more projects 🚀
	</small>
</footer>