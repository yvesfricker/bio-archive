<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { appStore } from '$lib/stores/simpleStore';
	// import '../normalize.css';
	// import '../webflow.css';
	let { children } = $props()
	let innerWidth = $state(0);
	let innerHeight = $state(0);

$effect(() => {
	$appStore.appWebsiteHeight = innerHeight
})
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="page-wrapper ">
	<Header />
	{@render children()}
	<Footer />
</div>
