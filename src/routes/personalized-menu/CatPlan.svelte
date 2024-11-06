<script lang="ts">
	import type { CatDb, CatI } from '$lib/types';
	import CatMeal from './CatMeal.svelte';
	import Anpassen from './Anpassen.svelte';

	// export let callBackSetAnpassenDisplay: (i: number) => void
	export let cat: CatI;
	export let i: number;
	// export let validationError;

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale,
		dislikes: cat.dislikes,
		meals: cat.meals
	} as CatI;

	$: console.log('localcat', localCat);

	
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
		console.log("set Anpassen display ", index)
		anpassenDisplayIndex = index;
		planAnpassenDisplay = !planAnpassenDisplay;
	}
	function callBackCloseAnpassenDisplay() {
		console.log("close modal")
		planAnpassenDisplay = false;
	}

	$: console.log("planAnpassenDisplay", planAnpassenDisplay)

let mealStore = cat.meals
</script>

<div class="signup-hero_leo-block">
	<div class="signup-hero_tab-top is-wrap">
		<div class="signup-hero_tab-top-text-block">
			<div class="signup-hero_tab-heading">
				<span fy-element="catOneNameLabel">{localCat.name}</span>&#x27;s Speiseplan
			</div>
		</div>
		<div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
		<button data-w-id="0c20e7e9-4f7b-9d1a-9c64-2c361ef3fe09" href="#" class="link w-inline-block"
		on:click={() => callBackSetAnpassenDisplay(i)}>
			<div class="text-size-medium">Plan anpassen</div>
		</button>
	</div>
	<div class="signup-hero_tab-top is-wrap is-second-from-top">
		<div class="text-size-medium">14 Katzenfutter / Zwei Wochen</div>
		<div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
		<div class="signup-hero_tab-heading">
			<span fy-element="catOneNameLabel">0.-</span>
		</div>
	</div>
	<div class="signup-hero_tab-bot">
		{#each $mealStore as meal}
			<CatMeal {meal}  />
		{/each}
	
	</div>
</div>

{#if planAnpassenDisplay}
<div>Test 0</div>
<Anpassen {cat} {callBackCloseAnpassenDisplay}  />
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
