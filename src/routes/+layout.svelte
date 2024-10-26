<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	// import '../normalize.css';
	// import '../webflow.css';
</script>

<div class="page-wrapper">
	
	<Header />
	<slot />
	<Footer />
	
</div>
