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
	import {toClipboard} from 'copee'
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

	let selected= []
	function toggleSelect(name) {
		name = name.replace(/^\./,'')
		const index = selected.indexOf(name)
		if ( index > -1 ) {
			selected.splice(index,1)
			selected = selected
		} else {
			selected = [...selected, name]
		}
		toClipboard( selected.join(' ') )
	}

</script>

<h1 class="text-center">
	<div>
		<img src="/favicon-32x32.png" alt="">
	</div>
	<strong>CSS<span style="color: #5555FF">Finder</span></strong>
</h1>
<div class="text-center">
	<a href="https://github.com/sotoplatero/cssfinder" target="_blank" rel="nofollower noopenner">github</a>
	<a href="https://twitter.com/intent/tweet?text=I%20use%20CSSFinder%20to%20search%20for%20css%20classes&url=cssfinder.xyz&via=sotoplatero" target="_blank" rel="nofollower noopenner">tweet</a>
</div>

<!-- INPUT -->
<br>
<form on:submit|preventDefault={handleSearch}>
	<input type="text" bind:value={q} placeholder="Type class name" >
</form>
<br>

<!-- RADIO BUTTONS -->
<div>
	{#each names as name, index}
		<label style="white-space: nowrap;">
			<input type="radio" bind:group={framework} value={name} name="framework">
			{@html framework===name ? `<strong>${name}</strong>` : name }
		</label>&ThinSpace;
	{/each}
</div>
<br>

<!-- SELECTED CLASS -->
{#if selected.length}
<div>
	{#each selected as name, index}
		<code><a href on:click={toggleSelect(name)}>{name}</a></code>&ThinSpace;
	{/each}
</div>
{/if}

<!-- RESULTS -->
{#await promiseSearch}
	<p>Searching...</p>
{:then classes}
	{#if classes.length}
		<p><i>Click on the class to copy it to clipboard</i></p>
	{/if}
	{#each classes as {name,attributes}, index}
		<pre><code><a href on:click={()=>toggleSelect(name)}>{name}</a> {@html attributes}</code></pre>
	{/each}

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<br><br>

<footer class="text-center">
	<small>
		<p>Using <a href="https://kit.svelte.dev">SvelteKit</a> and <a href="https://jenil.github.io/chota">chota</a> and deployed in <a href="https://vercel.com">vercel</a></p>
		<p>
			if you 💓 CSSFinder follow me <a href="https://twitter.com/sotoplatero" rel="me">@sotoplatero</a> to see more projects 🚀
		</p>
	</small>
</footer>

<style>
	input[type="text"] {
		padding-top: 3px; 
		padding-bottom: 3px;
	}
</style>