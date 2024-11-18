<script lang="ts">
	import { capitalizeFirstLetter, getPortionSizeFromCatWeight } from '$lib/appLogic/functions';
	import type { CatI } from '$lib/types';
	import { catStore, type CatMealStore } from '$lib/stores/itemsStores';

	import AnpassenMealServingSelector from './AnpassenMealServingSelector.svelte';
	export let localCat: CatI;
	export let catIndex: number;
	export let callBackCloseAnpassenDisplay: () => void;
	export let callBackSaveMenuToCat: (localCatsMealStore: CatMealStore) => void;
	export let proMonatDisplay: boolean;
	export let callBackUpdateErrorMessage: (catIndex: number) => void;

	let catMealStore = proMonatDisplay ? localCat.mealsPromonat : localCat.mealsTest;

	const recommendedPotionSize = getPortionSizeFromCatWeight(localCat?.weight!);

	console.log('recommendedPotionSize', recommendedPotionSize);

	const potionSizesAndPrices = [
		{ size: 100, price: 4.0, checked: false },
		{ size: 150, price: 4.4, checked: false },
		{ size: 200, price: 4.8, checked: false },
		{ size: 250, price: 5.2, checked: false },
		{ size: 300, price: 5.6, checked: false },
		{ size: 350, price: 6.0, checked: false },
		{ size: 400, price: 6.4, checked: false }
	];

	potionSizesAndPrices.find((potionSizeAndPrice) => {
		if (potionSizeAndPrice.size === recommendedPotionSize) {
			potionSizeAndPrice.checked = true;
		}
	});

	function handleClick(i: number) {
		console.log('handleClick');
		potionSizesAndPrices.forEach((potionSizeAndPrice) => {
			potionSizeAndPrice.checked = false;
		});
		potionSizesAndPrices[i].checked = true;

		catMealStore.updateMealPrice(potionSizesAndPrices[i].price);
		catStore.updatePortionSize(catIndex, potionSizesAndPrices[i].size);
		catStore.updateTotalMealPriceForCat(catIndex, proMonatDisplay);
	}

	function handleChangeServings() {
		console.log('handleChangeServings');
		catStore.updateTotalMealPriceForCat(catIndex, proMonatDisplay);
	}

	$: totalTins = $catMealStore
		.map((meal: { servings: any }) => meal.servings)
		.reduce((a: any, b: any) => a + b, 0);
</script>

<div style="" class="popup_wrapper !flex !flex-col !flex-justify-center z-30">
	<div style="" class="!grow-1 popup_block is-first is-visible z-50 ">
			<!-- svelte-ignore a11y_unknown_aria_attribute -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="z-[50000] w-full min-w-[20px] "
				on:click={() => {
					callBackCloseAnpassenDisplay();
				}}
				aria-label="close"
				on:keypress={() => {
					callBackCloseAnpassenDisplay();
				}}
				
			>
				<img
				sizes="100vw"
					data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e1a2"
					alt=""
					src="images/close-dark.svg"
					class="popup_close-btn"
				/>
			</div>
		<div class="popup-header">
			<div class="signup-hero_tab-heading">Edit {capitalizeFirstLetter(localCat?.name)}’s plan</div>
			<div class="signup-hero_tab-title-tiny">{totalTins} tins</div>
		</div>
		<div class="popup_content-block">
			{#each $catMealStore as meal, i}
				<AnpassenMealServingSelector
					{i}
					{catIndex}
					{catMealStore}
					{meal}
					{handleChangeServings}
					{callBackUpdateErrorMessage}
				/>
			{/each}

			<div
				id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e0c4-78e5fb0b"
				class="text-align-center text-size-large"
			>
				<div class="text-weight-bold">Futtermenge auswählen</div>
			</div>
			{#each potionSizesAndPrices as potionSizeAndPrice, i}
				<div
					id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e0d2-78e5fb0b"
					class="popup_checkbox-wrapper"
				>
					<label
						id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e0d3-78e5fb0b"
						class="w-checkbox popup_checkbox-field"
					>
						<div class="popup_checkbox-text-block">
							<div class="popup_checkbox-title">{potionSizeAndPrice.size} kcal / Portion</div>
							<div class="popup_checkbox-title">CHF {potionSizeAndPrice.price.toFixed(2)}</div>
						</div>
						<div
							class="w-checkbox-input w-checkbox-input--inputType-custom popup_checkbox {potionSizeAndPrice.checked
								? 'w--redirected-checked'
								: ''}"
						></div>
						<input
							id="checkbox-2"
							type="checkbox"
							name="checkbox-2"
							data-name="Checkbox 2"
							style="opacity:0;position:absolute;z-index:-1"
							checked={potionSizeAndPrice.checked}
							on:click={() => {
								handleClick(i);
							}}
						/><span class="popup_checkbox-title hide w-form-label" for="checkbox-2">Checkbox 2</span
						>
					</label>
					<div class="popup_checkbox-white-field">
						<div>
							{recommendedPotionSize === potionSizeAndPrice.size
								? `Empfohlen für ${capitalizeFirstLetter(localCat.name)}`
								: ''}
						</div>
					</div>
				</div>
			{/each}
			<button
				id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e10b-78e5fb0b"
				data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e10b"
				class="button w-button"
				on:click={() => {
					callBackSaveMenuToCat(catMealStore);

					callBackCloseAnpassenDisplay();
				}}>Fertig</button
			>
		</div>
		
	</div>
</div>
<div class="succes w-form-done"></div>

<style lang="css" module>
	@import '../../bella-natura.webflow.css';

	@media screen and (max-width: 479px) {
		.stop-mobile-scrolling {
			.nav-component {
				display: none !important;
			}

			html,
			body {
				overflow: hidden;
			}
		}
	}
</style>
