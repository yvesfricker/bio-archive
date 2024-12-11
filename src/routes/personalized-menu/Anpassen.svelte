<script lang="ts">
	import { capitalizeFirstLetter, getPortionSizeFromCatWeight } from '$lib/appLogic/functions';
	import type { CatI } from '$lib/types';
	import { catStore, type CatMealStore } from '$lib/stores/itemsStores';

	import AnpassenMealServingSelector from './AnpassenMealServingSelector.svelte';
	import { appStore } from '$lib/stores/simpleStore';

	// // export let catIndex: number;
	// export let callBackSaveMenuToCat: (localCatsMealStore: CatMealStore) => void;
	// export let proMonatDisplay: boolean;
	// export let callBackUpdateErrorMessage: (catIndex: number) => void;

	let {
		catIndex,
		callBackSaveMenuToCat,
		proMonatDisplay = $bindable(),
		callBackUpdateErrorMessage
	}: {
		catIndex: number;
		callBackSaveMenuToCat: (localCatsMealStore: CatMealStore) => void;
		proMonatDisplay: boolean;
		callBackUpdateErrorMessage: (catIndex: number) => void;
	} = $props();

	let localCat = $catStore[catIndex];
	console.log('localCat in Anpassen display', localCat);
	let catPromonatMealStore = $state(localCat?.mealsPromonat);
	let catTestMealStore = $state(localCat?.mealsTest);
	let catMealStore = $derived(proMonatDisplay ? catPromonatMealStore : catTestMealStore);

	const recommendedPotionSize = getPortionSizeFromCatWeight(localCat?.weight!);

	console.log('recommendedPotionSize', recommendedPotionSize);

	$effect(() => {
		console.log('proMonatDisplay', proMonatDisplay);
		console.log('portionSizesAndPrices', potionSizesAndPrices);
	});

	let potionSizesAndPrices = $state([
		{ size: 100, price: 4.0, checked: false },
		{ size: 150, price: 4.4, checked: false },
		{ size: 200, price: 4.8, checked: false },
		{ size: 250, price: 5.2, checked: false },
		{ size: 300, price: 5.6, checked: false },
		{ size: 350, price: 6.0, checked: false },
		{ size: 400, price: 6.4, checked: false }
	]);

	potionSizesAndPrices.find((potionSizeAndPrice) => {
		if (potionSizeAndPrice.size === recommendedPotionSize) {
			potionSizeAndPrice.checked = true;
		}
	});

	function handleClick(i: number) {
		console.log('handleClick', i);
		potionSizesAndPrices.forEach((potionSizeAndPrice) => {
			potionSizeAndPrice.checked = false;
		});
		potionSizesAndPrices[i].checked = true;

		console.log('potionSizesAndPrices', potionSizesAndPrices);

		catPromonatMealStore.updateMealPrice(potionSizesAndPrices[i].price);
		catTestMealStore.updateMealPrice(potionSizesAndPrices[i].price);
		catStore.updatePortionSize(catIndex, potionSizesAndPrices[i].size);
		catStore.updateTotalMealPriceForCat(catIndex, proMonatDisplay);

		// catStore.updateTotalMealPriceForCat(catIndex, true);
	}

	function handleChangeServings(catMealStore) {
		console.log('handleChangeServings');
		//  catMealStore.subscribe( (catMealStore) => {
		// 	console.log('catMealStore', catMealStore);
		// });
		catStore.updateTotalMealPriceForCat(catIndex, proMonatDisplay);
	}

	let totalTins = $derived(
		$catMealStore
			? $catMealStore
					.map((meal: { servings: any }) => meal.servings)
					.reduce((a: any, b: any) => a + b, 0)
			: 0
	);

	function handleCloseEditMenu() {
		$appStore.showEditMenu = false;
		$appStore.showHeader = true;
		document.getElementsByTagName('body')[0].style = 'overflow: auto; height: auto;';
		// $appStore.menuElement && $appStore.menuElement.scrollIntoView();
	}

	let h = $state(0);
	let element;
	//dymm

	// 	function handleScroll(e) {
	// 		e.stopPropagation()
	// console.log('handleScroll', e);    // [other logic]
	//   }

	document.getElementsByTagName('body')[0].style = 'overflow: hidden; height: 100%;';
</script>

<!-- <svelte:window  onscroll={handleScroll}/> -->

<!-- <div
	style="height: {h + 100}px !important; "
	class="popup_wrapper !flex !flex-col !flex-justify-center z-30 !overflow-y-auto"
>
	<div bind:clientHeight={h} class="!grow-1 popup_block is-first is-visible z-40 "> -->

<div
	style="height: 100% ; "
	class="popup_wrapper !flex !flex-col !flex-justify-center z-30 !overflow-y-scroll"
>
	<div bind:clientHeight={h} class=" !grow-1 popup_block is-first is-visible z-50">
		<!-- svelte-ignore a11y_unknown_aria_attribute -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="z-50 sm:block absolute">
			<button
				class="z-[50000] w-full min-w-[20px]"
				onclick={() => {
					handleCloseEditMenu();
					callBackSaveMenuToCat(catIndex, catMealStore);
				}}
				aria-label="close"
				onkeypress={() => handleCloseEditMenu()}
			>
				<img
					sizes="100vw"
					data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e1a2"
					alt=""
					src="images/close-dark.svg"
					class="popup_close-btn"
				/>
			</button>
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
							onclick={() => {
								handleClick(i);
							}}
						/><span class="popup_checkbox-title hide w-form-label" for="checkbox-2">Checkbox 2</span
						>
					</label>
					<div class="popup_checkbox-white-field">
						<div>
							{recommendedPotionSize === potionSizeAndPrice.size
								? `Empfohlen für ${capitalizeFirstLetter(localCat?.name)}`
								: ''}
						</div>
					</div>
				</div>
			{/each}
			<button
				id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e10b-78e5fb0b"
				data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e10b"
				class="button w-button"
				onclick={() => {
					handleCloseEditMenu();
					callBackSaveMenuToCat(catIndex, catMealStore);
				}}>Fertig</button
			>
		</div>
	</div>
</div>
<div class="succes w-form-done"></div>

<style lang="css" module>
	@import '../../bella-natura.webflow.css';

	/* Medium devices (md) */
	@media (max-width: 767px) {
		.popup_block {
			border-radius: 0;
		}
	}

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
