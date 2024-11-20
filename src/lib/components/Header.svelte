<script lang="ts">
	let displayMobileMenu = $state(false);
	import { appStore } from '$lib/stores/simpleStore';
	function toggleMobileMenu() {
		displayMobileMenu = !displayMobileMenu;
		console.log('toggleMobileMenu', displayMobileMenu);
	}

	let innerWidth = $state(0);
	let innerHeight = $state(0);

	let showHeaderLayout = $derived($appStore.showHeader);
	let desktopLayout = $derived(innerWidth > 991);
	let showEditMenu = $derived($appStore.showEditMenu);

	$effect(() => {
		console.log('displayMobileMenu', displayMobileMenu);
		console.log('showHeaderLayout', showHeaderLayout);
		console.log('desktopLayout', desktopLayout);
		console.log('showEditMenu', showEditMenu);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<header class="nav_component bg-linen">
	
	<!-- 
	data-animation="default"
	data-collapse="medium"
	data-duration="400"
	data-easing="ease"
	data-easing2="ease"
	role="banner" -->
	<div class="nav w-nav  ">
		
		<div class="container-medium">
			<div class="padding-vertical">
				{#if desktopLayout && showHeaderLayout}
					<div class="nav_container ">
						<div class="nav_container-block">
							<a href="/our-food" class="nav_link w-inline-block">
								<div>Unser Futter</div>
							</a>
							<a href="/how-it-works" class="nav_link w-inline-block">
								<div>So funktioniert&#x27;s</div>
							</a>
						</div>
						<div class="nav_container-block is-center">
							<button
								data-w-id="6d84d8a3-4913-88b8-f2e3-35998dbb1173"
								class="nav_button-block"
								onclick={() => toggleMobileMenu()}
							>
								<div id="line-top" class="nav_line-top"></div>
								<div id="line-middle" class="nav_line-middle"></div>
								<div id="line-bot" class="nav_line-bottom"></div>
							</button>
							<a href="https://bellanatura.bio" class="nav_logo-link w-inline-block"
								><img
									src="/images/Logo.svg"
									loading="lazy"
									data-w-id="23e22faf-32b2-287e-ef64-6c7afa17dee5"
									alt=""
									class="nav_logo-image is-blue"
								/><img
									src="/images/logo-main.svg"
									loading="eager"
									data-w-id="93bc5c4a-f7c6-f37a-44d0-3c1cad037e0b"
									alt=""
									id="is-white"
									class="nav_logo-image is-white"
								/></a
							>
						</div>
						<div class="nav_container-block">
							<a href="/our-story" class="nav_link w-inline-block">
								<div>Über uns</div>
							</a>
							<a href="/log-in" class="nav_link w-inline-block">
								<div>Login</div>
							</a>
						</div>
					</div>
				{:else if showHeaderLayout}
			
					<div class="nav_content-mobile">
					
						<div class="nav_container-mobile">
						
							<div class="nav_container-block">

								<a href="#" class="nav_link w-inline-block">
									<div>Unser Futter</div>
								</a>
								<a href="#" class="nav_link w-inline-block">
									<div>So funktioniert&#x27;s</div>
								</a>
							</div>
							<div class="nav_container-block is-center">
								<button
									data-w-id="a5a14400-49e4-b528-d0d4-6ea601717a5e"
									class="nav_button-block"
									onclick={() => toggleMobileMenu()}
								>
									<div class="nav_line-top"></div>
									<div class="nav_line-middle"></div>
									<div class="nav_line-bottom"></div>
								</button>
								<a href="/" class="nav_logo-link w-inline-block"
									><img
										src="/images/Logo.svg"
										loading="eager"
										alt=""
										id="is-white-mob"
										class="nav_logo-image-mob"
									/></a
								>
							</div>
						</div>
						{#if displayMobileMenu}
						
							<div class="  nav_link-block-mobile !w-[220px] !bg-linen p-8 rounded-md">
								<a href="/our-food" class="nav_link-mobile w-inline-block"
								onclick={() => toggleMobileMenu()}>
									<div>Unser Futter</div>
								</a>
								<a href="/how-it-works" class="nav_link-mobile w-inline-block" onclick={() => toggleMobileMenu()}>
									<div>So funktioniert&#x27;s</div>
								</a>
								<a href="/our-story" class="nav_link-mobile w-inline-block" onclick={() => toggleMobileMenu()}>
									<div>Über uns</div>
								</a>
								<a href="/sign-up" class="nav_link-mobile w-inline-block" onclick={() => toggleMobileMenu()}>
									<div>Login</div>
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>

<style module>
	@import '../../bella-natura.webflow.css';
</style>
