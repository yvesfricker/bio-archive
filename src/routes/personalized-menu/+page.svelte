<script lang="ts">
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import CatPlan from './CatPlan.svelte';
	import { typesStore } from '$lib/stores/simpleStore';
	import { divideMealsIntoDays, getPortionSizeFromCatWeight } from '$lib/appLogic/functions';

	// function validationError(index: string, componentErrorMessages: string[], i) {
	// 		if (componentErrorMessages?.length > 0) {
	// 			errorMessages[index] = componentErrorMessages;
	// 		} else {
	// 			errorMessages[index] = null;
	// 		}
	// 		console.log('componentErrorMessages', componentErrorMessages);
	// 		console.log('index', i);
	// 		console.log('id', index);
	// 	}

	let proMonatDisplay = false;


	let catLikes = {}
	
	$catStore.forEach((cat) => {
	
	catLikes = {}
	
		$typesStore.forEach((like) => {
		if (!cat?.dislikes?.includes(like)) {
		catLikes[like] = 0
		}
	}) 


	console.log("catLikes", catLikes)

	const calculatedMenu = divideMealsIntoDays(catLikes, 14);
	const recommendedPotionSize = getPortionSizeFromCatWeight(cat?.weight!);

	cat.meals.setNewMenuFromCalculation(calculatedMenu, recommendedPotionSize);
	
	console.log("calculatedMenu", calculatedMenu)

	})
	

</script>

<div class="page-wrapper">
	<main id="Weiter" class="main-wrapper">
		<section class="section_signup-hero">
			<div class="page-padding">
				<div class="container-medium">
					<div class="padding-vertical padding-huge">
						<div class="signup-hero_form w-form">
							<form
								id="email-form"
								name="email-form"
								data-name="Email Form"
								method="get"
								class="signup-hero_form-block"
								data-wf-page-id="6419ac2503e13c2178e5fb0b"
								data-wf-element-id="c1422fba-0b7c-80c6-f780-8cdfcb31a001"
							>
								<div class="signup-hero_component fifth-step">
									<div class="margin-bottom-xxmedium">
										<div class="text-align-center">
											<h2 class="signup-hero_heading">Hier ist dein <br />personalisiertes Menü</h2>
										</div>
									</div>
									<div
										data-current="Tab 1"
										data-easing="ease"
										data-duration-in="0"
										data-duration-out="0"
										class="signup-hero_tabs w-tabs"
									>
										<div class="signup-hero_tabs-menu w-tab-menu">
											<button
												data-w-tab="Tab 1"
												class="signup-hero_tab-link w-inline-block w-tab-link {proMonatDisplay
													? ''
													: 'w--current'}"
												on:click={() => (proMonatDisplay = false)}
											>
												<div class="signup-hero_tab-heading">Testpreis</div>
												<div class="font-weight-bold">
													<div class="signup-hero_tab-title-large">0.-</div>
												</div>
											</button>
											<button
												data-w-tab="Tab 2"
												class="signup-hero_tab-link w-inline-block w-tab-link {proMonatDisplay
													? 'w--current'
													: ''}"
												on:click={() => (proMonatDisplay = true)}
											>
												<div class="signup-hero_tab-heading">Pro Monat</div>
												<div class="font-weight-bold">
													<div class="signup-hero_tab-title-large">0.-</div>
												</div>
											</button>
										</div>

										<div class="signup-hero_tab-content w-tab-content">
											{#if !proMonatDisplay}
												<div
													data-w-tab="Tab 1"
													class="signup-hero_tab-pane w-tab-pane w--tab-active"
												>
													<div class="signup-hero_tab-wrapper">
														<div class="signup-hero_text-info">
															Teste Bella Natura zwei Wochen lang und erhalte einen 25%
															Willkommensrabatt
														</div>
														{#each $catStore as cat, i}
															<CatPlan {cat} {i}  />
														{/each}
														<div class="text-size-large text-color-white text-align-center">
															Stimmt etwas nicht?
														</div>
														<a
															href="#"
															class="text-align-center text-color-white text-size-medium w-inline-block"
														>
															<div>Erneut berechnen</div>
														</a>
													</div>
												</div>
											
											{/if}
											{#if proMonatDisplay}
												<div
													data-w-tab="Tab 2"
													class="signup-hero_tab-pane w-tab-pane w--tab-active"
												>
													<div class="signup-hero_tab-wrapper">
														<div class="margin-bottom-medium">
															<div class="text-align-center text-color-white">
																<div class="signup-hero_tab-title-tiny">
																	Danach beginnt Ihr Abonnement für 320.- pro Monat
																</div>
															</div>
														</div>
														{#each $catStore as cat, i}
															<CatPlan {cat} {i} />
														{/each}
													</div>
												</div>
											{/if}
										</div>
										<div class="signup-hero_shipping-wrapper">
											<div class="signup-hero_shipping-block">
												<div class="signup-hero_shipping-line"></div>
												<div class="signup-hero_shipping-item is-margin">
													<div class="signup-hero_tab-heading">Total</div>
													<div class="signup-hero_shipping-text-block">
														<div class="signup-hero_tab-heading">CHF 0</div>
													</div>
												</div>
												<div class="signup-hero_shipping-item is-margin">
													<div class="signup-hero_tab-heading">Versand</div>
													<div class="text-size-large">Kostenlos</div>
												</div>
												<div class="signup-hero_shipping-item">
													<div class="signup-hero_tab-heading">Lieferdatum</div>
													<div class="signup-hero_shipping-text-block is-vertical">
														<div class="text-size-large">31/01/2023</div>
														<a href="#" class="link w-inline-block">
															<div class="text-size-xmedium">Datum ändern</div>
														</a>
													</div>
												</div>
												<div class="signup-hero_shipping-line"></div>
												<div class="signup-hero_shipping-item is-wrap">
													<div class="text-size-xmedium">
														<div class="signup-hero_shipping-text-end">
															Wenn deine Katze es liebt, bezahlst du in 12 Tagen 320 Chf/Monat. Du
															kannst dein Abo jederzeit anpassen, pausieren oder kündigen.
														</div>
													</div>
													<a
														href="#"
														class="signup-hero_checkout-button w-button !tw-no-underline !tw-text-white"
														>Zur Kasse</a
													>
												</div>
											</div>
										</div>

									</div>
								</div>
							</form>
							<div class="succes w-form-done"></div>
							<div class="w-form-fail">
								<div>Oops! Something went wrong while submitting the form.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img src="images/pink-left-svg.svg" loading="eager" alt="" class="bg-flower-left" /><img
				src="images/pink-right-svg.svg"
				loading="eager"
				alt=""
				class="bg-flower-right"
			/>
		</section>
	</main>
</div>
