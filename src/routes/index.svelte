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

<h1 class="text-center">
	<div>
		<img src="/favicon-32x32.png" alt="">
	</div>
	<strong>CSS<span style="color: #5555FF">Finder</span></strong>
</h1>
<div class="text-center">
	<a href="https://github.com/sotoplatero/cssfinder">github</a>
	<a href="https://twitter.com/intent/tweet?text=I%20use%20CSSFinder%20to%20search%20for%20css%20classes&url=cssfinder.xyz&via=sotoplatero" target="_blank">tweet</a>
</div>
<br>
<form on:submit|preventDefault={handleSearch}>
	<input type="text" bind:value={q} placeholder="Type class name" >
</form>
<br>
<div>
{#each names as name, index}
	<label >
		<input type="radio" bind:group={framework} value={name} name="framework">
		{@html framework===name ? `<strong>${name}</strong>` : name }
	</label>
{/each}
</div>
{#await promiseSearch}
	<p>Searching...</p>
{:then classes}

	{#each classes as {name,attributes}, index}
		<div>
		<pre><code><a href ><b>{name}</b></a> {@html attributes}</code></pre>
		</div>
	{/each}
<!-- 	{#if !classes.length && q}
		<p>No results found for <mark>{q}</mark> in <strong>{framework}</strong></p>
	{/if} -->

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<br><br>
<footer class="text-center">
	<small>
		<p>Use <a href="https://kit.svelte.dev">SvelteKit</a> and <a href="https://jenil.github.io/chota">chota</a> and deployed in <a href="https://vercel.com">vercel</a></p>
		<p>
			if you 💓 CSSFinder follow me <a href="https://twitter.com/sotoplatero" rel="me">@sotoplatero</a> to see more projects 🚀
		</p>
	</small>
</footer>

<style>
	input{padding-top: 3px; padding-bottom: 3px;}
</style>