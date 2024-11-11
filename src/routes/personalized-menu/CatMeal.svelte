<script lang="ts">
	import type { CatMealI } from '$lib/types';

export let portionSize: number
	export let meal: CatMealI;

	$: localMeal = {
		id: meal.id,
		type: meal.type,
		description: meal.description,
		servings: meal.servings,
		selectedServingPrice: meal.selectedServingPrice,
		totalMealPrice: meal.totalMealPrice
	} as CatMealI;

    function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

$: imageType = capitalizeFirstLetter(localMeal?.type);

// $: console.log("portionSize in CatMeal", portionSize)
// console.log('imageType', imageType);
// console.log("meal", meal)
// console.log("localMeal", localMeal)
</script>

<div
	fy-element="catOneChickenTrialResult"
	id="w-node-f4254392-342a-9add-cb7f-ee87be4a054d-78e5fb0b"
	class="signup-hero_tab-plan-item"
>
	<img
		sizes="(max-width: 767px) 80px, 108px"
		srcset={`images/${imageType}-p-500.png 500w, images/${imageType}.webp 700w`}
		src="images/${imageType}.webp"
		loading="lazy"
		alt=""
		class="signup-hero_tab-plan-image"
	/>
	<div class="signup-hero_tab-plan-text-block">
		<div class="font-weight-bold">
			<div class="signup-hero_tab-title-tiny">
				{localMeal.servings} x <span fy-element="catOnePortionSize">{portionSize}</span>g {imageType}
			</div>
		</div>
		<div class="signup-hero_tab-text-sm">Bio-Hühnerfleisch mit Karotten</div>
	</div>
</div>
