<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import CatPlan from './CatPlan.svelte';
	import { typesStore } from '$lib/stores/simpleStore';
	import { divideMealsIntoDays, getPortionSizeFromCatWeight } from '$lib/appLogic/functions';
	// import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { enhance } from './formValidation';
	import {
		getLocalTimeZone,
		today,
		DateFormatter,
		CalendarDate,
		type DateValue
	} from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { cn } from '$lib/utils.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button';

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

	let catLikes = {};
	let mealsPromonatTotalPrice = 0;
	let mealsTestTotalPrice = 0;
	let formElSubmitPlans: HTMLFormElement;
	let formButtonElSubmitPlans: HTMLElement | null | undefined;
	let formInputElSubmitPlans: HTMLElement | null | undefined;
	let submitError = false;
	let errorMessages = [] as string[];
	let submitTried = false;
	const df = new DateFormatter('de-DE', {
		dateStyle: 'long'
	});

	const now = new Date();
	const month = now.getUTCMonth() + 1; // months from 1-12
	const day = now.getUTCDate();
	const year = now.getUTCFullYear();
	let thisToday = new CalendarDate(year, month, day);
	let tomorrow = thisToday.add({ days: 1 });
	let value: DateValue | undefined = tomorrow;

	function isAfterToday(date: DateValue): boolean {
		return date.compare(today(getLocalTimeZone()).add({ days: 1 })) < 0;
	}

	function getStringedDate(dateObj: Date) {
		const month = dateObj.getUTCMonth() + 1; // months from 1-12
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear();
		// Using padded values, so that 2023/1/7 becomes 2023/01/07
		const pMonth = month.toString().padStart(2, '0');
		const pDay = day.toString().padStart(2, '0');
		const newPaddedDate = `${year}/${pMonth}/${pDay}`;
		return newPaddedDate;
	}

	function getYMDate(dateObj: Date) {
		const month = dateObj.getUTCMonth() + 1; // months from 1-12
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear();
		return { year: year, month: month, day: day };
	}

	calculateInitMenu();

	function calculateInitMenu() {
		$catStore.forEach((cat, index) => {
			console.log('cat', cat);
			catLikes = {};
			cat.likes.forEach((like) => {
				if (cat?.likes?.includes(like)) {
					catLikes[like] = 0;
				}
			});
			console.log('catLikes', catLikes);
			const calculatedMenuTest = divideMealsIntoDays(catLikes, 14);
			catLikes = {};
			cat.likes.forEach((like) => {
				if (cat?.likes?.includes(like)) {
					catLikes[like] = 0;
				}
			});
			const calculatedMenuPromonat = divideMealsIntoDays(catLikes, 28);

			console.log('calculatedMenuTest', calculatedMenuTest);
			console.log('calculatedMenuPromonat', calculatedMenuPromonat);
			const recommendedPotionSize = getPortionSizeFromCatWeight(cat?.weight!);

			console.log('recommendedPotionSize', recommendedPotionSize);
			catStore.updatePortionSize(index, recommendedPotionSize);

			const potionSizesAndPrices = [
				{ size: 100, price: 4.0 },
				{ size: 150, price: 4.4 },
				{ size: 200, price: 4.8 },
				{ size: 250, price: 5.2 },
				{ size: 300, price: 5.6 },
				{ size: 350, price: 6.0 },
				{ size: 400, price: 6.4 }
			];

			let mealPrice = 0;

			mealPrice = potionSizesAndPrices.find((potionSizeAndPrice) => {
				if (potionSizeAndPrice.size === recommendedPotionSize) {
					return true;
				}
			})?.price;

			if (!mealPrice) {
			}
			cat.mealsTest.setNewMenuFromCalculation(calculatedMenuTest, recommendedPotionSize, mealPrice);

			cat.mealsPromonat.setNewMenuFromCalculation(
				calculatedMenuPromonat,
				recommendedPotionSize,
				mealPrice
			);

			if (mealPrice) {
				// console.log('price to send to update total price', mealPrice);

				catStore.updateTotalMealPriceForCat(index, true);
				catStore.updateTotalMealPriceForCat(index, false);

				// cat.mealsTestTotalPrice;
			} else {
				console.log('Error: dev chore: size not found in table, update table manually');
			}
			//

			// console.log('calculatedMenuTest', calculatedMenuTest);
			// console.log('calculatedMenuPromonat', calculatedMenuPromonat);
		});

		// console.log('$catStore', $catStore);
		let thismealsTestTotalPrice = 0;
		let thismealsPromonatTotalPrice = 0;
		$catStore.forEach((cat) => {
			// console.log('cat.mealsPromonatTotalPrice', cat.mealsPromonatTotalPrice);
			// console.log('cat.mealsTestTotalPrice', cat.mealsTestTotalPrice);
			// mealsPromonatTotalPrice += cat.mealsPromonatTotalPrice;
			thismealsTestTotalPrice = thismealsTestTotalPrice + cat.mealsTestTotalPrice;
			thismealsPromonatTotalPrice = thismealsPromonatTotalPrice + cat.mealsPromonatTotalPrice;
		});

		// console.log('mealsTestTotalPrice', thismealsTestTotalPrice);
		// console.log('mealsPromonatTotalPrice', thismealsTestTotalPrice);

		mealsPromonatTotalPrice = thismealsPromonatTotalPrice;
		mealsTestTotalPrice = thismealsTestTotalPrice * 0.75;
	}

	$: mealsPromonatTotalPrice = updateTotalPromonatMealPriceForCat($catStore);
	$: mealsTestTotalPrice = updateTotalTestMealPriceForCat($catStore);

	function updateTotalTestMealPriceForCat($catStore) {
		let thismealsTestTotalPrice = 0;

		$catStore.forEach((cat) => {
			// console.log('cat.mealsPromonatTotalPrice', cat.mealsPromonatTotalPrice);
			// console.log('cat.mealsTestTotalPrice', cat.mealsTestTotalPrice);
			// mealsPromonatTotalPrice += cat.mealsPromonatTotalPrice;
			thismealsTestTotalPrice = thismealsTestTotalPrice + cat.mealsTestTotalPrice;
		});
		return thismealsTestTotalPrice * 0.75;
	}

	function updateTotalPromonatMealPriceForCat($catStore) {
		let thismealsPromonatTotalPrice = 0;
		$catStore.forEach((cat) => {
			// console.log('cat.mealsPromonatTotalPrice', cat.mealsPromonatTotalPrice);
			// console.log('cat.mealsTestTotalPrice', cat.mealsTestTotalPrice);
			// mealsPromonatTotalPrice += cat.mealsPromonatTotalPrice;
			thismealsPromonatTotalPrice = thismealsPromonatTotalPrice + cat.mealsPromonatTotalPrice;
		});
		return thismealsPromonatTotalPrice;
	}

	// const proMonat = $catStore[0].mealsPromonat;
	// const test = $catStore[0].mealsTest;
	// console.log('cat promonat', $proMonat);
	// console.log('cat test', $test);
	console.log('submitTried', submitTried);
	$: console.log('submitError', submitError);
	$: console.log('submitTried', submitTried);

	function submitPlans() {
		console.log(' submiting plans !');
		if (!formInputElSubmitPlans) {
			console.log('error, formInputElSubmitPlans is null !');
			return;
		}
		let dataJson;
		{
			dataJson = JSON.stringify($catStore);
			formInputElSubmitPlans.value = dataJson;

			// console.log('signalDataJson', signalDataJson);
			if (formElSubmitPlans) {
				if (formElSubmitPlans.requestSubmit) {
					if (formButtonElSubmitPlans) {
						formElSubmitPlans.requestSubmit(formButtonElSubmitPlans);
					} else {
						formElSubmitPlans.requestSubmit();
					}
				} else {
					formElSubmitPlans.submit();
				}
			} else {
				console.log(' insert tradeOn form submit error: form node is null !');
				// console.log(formElTradeOn);
			}
		}
	}

	$: checkInput($catStore);

	function checkInput($catStore) {
		// do validation, check input fields
		// if error display message and highlight fields
		// console.log("checking input")

		$catStore.forEach((cat, index) => {
			// console.log("check cat", index)
			const totalMeals = catStore.getTotalMeals(index, proMonatDisplay);
			// console.log("totalMeals", totalMeals)
			if (totalMeals < (proMonatDisplay ? 28 : 14)) {
				errorMessages[index] =
					'Bitte fügen Sie ingesamt ' + (proMonatDisplay ? '28' : '14') + ' Mahlzeiten hinzu';
				submitError = true;
			} else {
				errorMessages[index] = '';
			}
		});
		// console.log('in checkInput: submitError', submitError);
		if (submitError) return false;
		else return true;
	}

	function callBackUpdateErrorMessage(index: number) {
		const totalMeals = catStore.getTotalMeals(index, proMonatDisplay);
		console.log('totalMeals', totalMeals);
		if (totalMeals < (proMonatDisplay ? 28 : 14)) {
			errorMessages[index] =
				'Bitte fügen Sie ingesamt ' + (proMonatDisplay ? '28' : '14') + ' Mahlzeiten hinzu';
			submitError = true;
		} else if (totalMeals > (proMonatDisplay ? 28 : 14)) {
			errorMessages[index] =
				'Bitte fügen Sie ingesamt ' + (proMonatDisplay ? '28' : '14') + ' Mahlzeiten hinzu';
			submitError = true;
		} else {
			errorMessages[index] = '';
		}

		let errors = 0;

		errorMessages.forEach((errorMessage, index) => {
			if (errorMessage) {
				errors = errors + 1;
			}
		});
		if (errors > 0) {
			submitError = true;
		} else {
			submitError = false;
			submitTried = false;
		}
	}
</script>

<div class="page-wrapper">
	<main id="Weiter" class="main-wrapper">
		<section class="section_signup-hero">
			<div class="page-padding">
				<div class="container-medium">
					<div class="padding-vertical padding-huge">
						<div class="signup-hero_form w-form">
							<form
								method="POST"
								action={`?/submitPlans`}
								use:enhance={{
									validation: checkInput, // <- ADDED
									result: async ({ data, form, response }) => {
										// after successful submit
									}
								}}
								id="email-form"
								name="email-form"
							>
								<input type="hidden" bind:this={formInputElSubmitPlans} name="rulesJson" />
								<input type="hidden" value={'wgwge'} name="test" />

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
													<div class="signup-hero_tab-title-large">
														{mealsTestTotalPrice.toFixed(2)}
													</div>
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
													<div class="signup-hero_tab-title-large">
														{mealsPromonatTotalPrice.toFixed(2)}
													</div>
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
															<CatPlan
																{cat}
																{i}
																{proMonatDisplay}
																errorMessage={submitError ? errorMessages[i] : null}
																{callBackUpdateErrorMessage}
															/>
														{/each}
														<div class="text-size-large text-color-white text-align-center">
															Stimmt etwas nicht?
														</div>
														<a
															href="/welcome/name"
															class="text-align-center text-color-white text-size-medium w-inline-block"
														>
															<div class="underline">Erneut berechnen</div>
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
																	Danach beginnt Ihr Abonnement für {mealsPromonatTotalPrice.toFixed(
																		2
																	)} pro Monat
																</div>
															</div>
														</div>
														{#each $catStore as cat, i}
															<CatPlan
																{cat}
																{i}
																{proMonatDisplay}
																errorMessage={errorMessages[i]}
																{callBackUpdateErrorMessage}
															/>
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
														<div class="signup-hero_tab-heading">
															CHF {proMonatDisplay
																? mealsPromonatTotalPrice.toFixed(2)
																: mealsTestTotalPrice.toFixed(2)}
														</div>
													</div>
												</div>
												<div class="signup-hero_shipping-item is-margin">
													<div class="signup-hero_tab-heading">Versand</div>
													<div class="text-size-large">Kostenlos</div>
												</div>
												<div class="signup-hero_shipping-item">
													<div class="signup-hero_tab-heading">Lieferdatum</div>
													<div class="signup-hero_shipping-text-block is-vertical w-full md:w-auto !flex !flex-row !justify-start">
														<!-- <div class="text-size-large">31/01/2023</div> -->
														<div>
															<Popover.Root portal={null}>
																<Popover.Trigger asChild let:builder>
																	<Button
																		variant="outline"
																		class={cn(
																			'bg-transparent w-[200px] justify-end text-right font-normal underline',
																			!value && 'text-muted-foreground'
																		)}
																		builders={[builder]}
																	>
																		<!-- <CalendarIcon class="mr-2 h-4 w-4" /> -->
																		<div class="text-size-xmedium !tw-underline text-right">
																			{value
																				? df.format(value.toDate(getLocalTimeZone()))
																				: 'Datum ändern'}
																		</div>
																	</Button>
																</Popover.Trigger>

																<Popover.Content class="w-80 z-[200]  bg-linen">
																	<Calendar
																		isDateDisabled={isAfterToday}
																		class="rounded-md border bg-linen"
																	/>
																</Popover.Content>
															</Popover.Root>
														</div>
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
													<button
														class="mt-2 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-red-500"
														id="#main-submit"
														aria-label="submit"
														type="submit"
														bind:this={formButtonElSubmitPlans}
														on:click={() => {
															submitTried = true;
															!submitError && submitPlans();
														}}
														><div
															class="signup-hero_checkout-button w-button !no-underline !text-white"
														>
															Zur Kasse
														</div>
													</button>
												</div>
												{#if submitTried === true}
													{#if submitError}
														{#each errorMessages as errorMessage}
															<div class="!w-full !flex !flex-row !justify-end !items-right">
																{#if errorMessage !== undefined}
																	<div class=" !bg-transparent !text-red-600 !grow-0">
																		<div>{errorMessage}</div>
																	</div>
																{/if}
															</div>
														{/each}
													{/if}
												{/if}
											</div>
										</div>
									</div>
								</div>
							</form>
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

<!-- <form method="POST" action={`?/updateRules`} use:enhance bind:this={formElSubmitPlans}>
	<input type="hidden" bind:this={formInputElSubmitPlans} name="rulesJson" />
	<input type="hidden" value={'wgwge'} name="test" />
	<button
		class="mt-2 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-red-500"
		id="#main-submit"
		bind:this={formButtonElSubmitPlans}><div class="text-md"></div></button
	>
</form> -->
