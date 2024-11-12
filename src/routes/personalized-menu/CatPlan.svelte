<script lang="ts">
	import { error } from '@sveltejs/kit';
	import type { CatDb, CatI } from '$lib/types';
	import CatMeal from './CatMeal.svelte';
	import Anpassen from './Anpassen.svelte';
	import type { CatMealStore, CatStore } from '$lib/stores/itemsStores';

	// export let callBackSetAnpassenDisplay: (i: number) => void
	export let cat: CatI;

	export let i: number;
	export let proMonatDisplay: boolean;
	export let errorMessage;
	export let callBackUpdateErrorMessage: (catIndex: number) => void;

	// export let validationError;

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale,
		dislikes: cat.dislikes,
		mealsTest: cat.mealsTest,
		mealsPromonat: cat.mealsPromonat,
		portionSize: cat.portionSize
	} as CatI;

	// $: console.log('localcat', localCat);

	// $: console.log('proMonatDisplay', proMonatDisplay);
	$: console.log('errorMessage', errorMessage);

	// console.log("for cat named ", cat?.name, "dislikes", cat?.dislikes)

	//
	// let errorMessages = [] as string[];

	function handleUpdate() {
		// errorMessages = [];
		// if (localCat.weight > 10) {
		// 	localCat.weight = 10;
		// 	errorMessages.push(`Katze ${i} Gewicht muss gr\xF6\xDFer als 0 und kleiner als 10 sein`);
		// } else if (localCat.weight <= 0) {
		// 	localCat.weight = 1;
		// }
		// console.log('local name', localCat.name, value);
		// console.log('errorMessages', errorMessages);
		// validationError(localCat.id, errorMessages, i);
	}

	let planAnpassenDisplay = false;
	let anpassenDisplayIndex = 0;

	function callBackSetAnpassenDisplay(index: number) {
		console.log('set Anpassen display ', index);
		anpassenDisplayIndex = index;
		planAnpassenDisplay = !planAnpassenDisplay;
	}
	function callBackCloseAnpassenDisplay() {
		console.log('close modal');
		planAnpassenDisplay = false;
	}

	function callBackSaveMenuToCat(localCatsMealStore: CatMealStore) {
		if (proMonatDisplay) {
			cat.mealsPromonat = localCatsMealStore;
		} else {
			cat.mealsTest = localCatsMealStore;
		}
	}

	// $: console.log("planAnpassenDisplay", planAnpassenDisplay)

	// const promonat = cat.mealsPromonat
	// const test = cat.mealsTest

	// $: console.log("promonat", $promonat)
	// $: console.log("test", $test)

	$: mealStore = proMonatDisplay ? cat.mealsPromonat : cat.mealsTest;

	// $: console.log("mealStore", $mealStore)

	function calculateCatPlanPrice() {}
</script>

<div class="signup-hero_leo-block">
	<div class="signup-hero_tab-top is-wrap">
		<div class="signup-hero_tab-top-text-block">
			<div class="signup-hero_tab-heading">
				<span fy-element="catOneNameLabel">{cat.name}</span>&#x27;s Speiseplan
			</div>
		</div>
		<div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
		<button
			data-w-id="0c20e7e9-4f7b-9d1a-9c64-2c361ef3fe09"
			href="#"
			class="link w-inline-block"
			on:click={() => callBackSetAnpassenDisplay(i)}
		>
			<div class="text-size-medium !tw-underline">Plan anpassen</div>
		</button>
	</div>
	<div class="signup-hero_tab-top is-wrap is-second-from-top">
		<div class="text-size-medium">
			{proMonatDisplay ? '28' : '14'} Katzenfutter / {proMonatDisplay ? 'Vier' : 'Zwei'} Wochen
		</div>
		<div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
		<div class="signup-hero_tab-heading">
			<span fy-element="catOneNameLabel"
				>{proMonatDisplay
					? cat.mealsPromonatTotalPrice.toFixed(2)
					: cat.mealsTestTotalPrice.toFixed(2)}</span
			>
		</div>
	</div>
	<div class="signup-hero_tab-bot">
		{#each $mealStore as meal}
			<CatMeal bind:meal bind:portionSize={localCat.portionSize} />
		{/each}
	</div>
	{#if errorMessage}
		<div
			class=" w-form-fail !tw-bg-transparent !tw-text-red-600 !tw-flex !tw-flex-row !tw-justify-center !tw-grow-0 !tw-mt-12"
		>
			<div>{errorMessage}</div>
		</div>
	{/if}
</div>

{#if planAnpassenDisplay}
	<Anpassen
		{localCat}
		{callBackCloseAnpassenDisplay}
		{callBackSaveMenuToCat}
		{proMonatDisplay}
		catIndex={i}
		{callBackUpdateErrorMessage}
	/>
{/if}

<!-- <style lang="css">  moved this to bella-natura-webflow.css
	.hide-arrows {
		/* Chrome, Safari, Edge, Opera */
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		/* Firefox */
		input[type='number'] {
			-moz-appearance: textfield;
		}
	}
</style> -->
