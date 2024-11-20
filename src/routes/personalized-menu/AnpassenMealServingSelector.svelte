<script lang="ts">
	import CatMealI from './CatMeal.svelte';
	import type { CatMealStore } from '$lib/types';
	import { capitalizeFirstLetter } from '$lib/appLogic/functions';

	export let meal: CatMealI;
	export let catMealStore: CatMealStore;
	export let i: number;
	export let handleChangeServings: () => void;
	export let catIndex: number;
	export let callBackUpdateErrorMessage: (catIndex: number) => void;
	// $: localMeal = {
	// 	id: $catMealStore[i].id,
	// 	type: $catMealStore[i].type,
	// 	description: $catMealStore[i].description,
	// 	portionSize: $catMealStore[i].portionSize,
	// 	servings: $catMealStore[i].servings
	// } as CatMealI;	

$: console.log('catMeal', $catMealStore[i])

$: mealType = capitalizeFirstLetter(meal?.type);
	
</script>

<div id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e080-78e5fb0b" class="signup-hero_tab-plan-item ">
	<img
		sizes="100vw"
		srcset={`images/${mealType}-p-500.png 500w, images/${mealType}.webp 700w`}
		src={`images/${mealType}.webp`}
		loading="lazy"
		alt=""
		class="signup-hero_tab-plan-image"
	/>
	<div class="signup-hero_tab-plan-text-block">
		<div class="font-weight-bold">
			<div class="signup-hero_tab-title-tiny">
				<span class="signup-hero_tab-text-number">{$catMealStore[i]?.servings}</span> x {mealType}
			</div>
		</div>
		<div class="signup-hero_tab-text-sm">{$catMealStore[i]?.description}</div>
	</div>	
	<div class="signup-hero_quantity-btn 	">
		<button
			class="button is-light-pink w-button"
			on:click|preventDefault={() => {
				catMealStore.decrementServingsForMeal(i);
				callBackUpdateErrorMessage(catIndex);
				handleChangeServings(catMealStore);
			}}>-</button
		>
		<div class="signup-hero_age-text">{$catMealStore[i]?.servings}</div>
		<button
			class="button is-light-pink w-button"
			on:click|preventDefault={() => {
				catMealStore.incrementServingsForMeal(i);
				callBackUpdateErrorMessage(catIndex);
				handleChangeServings(catMealStore);
			}}>+</button
		>
	</div>
</div>
