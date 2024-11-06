<script lang="ts">
	import { getPortionSizeFromCatWeight } from '$lib/appLogic/functions';
	import type { CatI, CatMealStore } from '$lib/types';
	import AnpassenMealServingSelector from './AnpassenMealServingSelector.svelte';
	export let cat: CatI;
	export let callBackCloseAnpassenDisplay: () => void;

	let catMealStore = cat.meals;

	const recommendedPotionSize = getPortionSizeFromCatWeight(cat?.weight!);

	console.log('recommendedPotionSize', recommendedPotionSize);

	const potionSizesAndPrices = [
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
    })

    function handleClick (i) {
        console.log('handleClick')
        potionSizesAndPrices.forEach((potionSizeAndPrice) => {
            potionSizeAndPrice.checked = false
        })
        potionSizesAndPrices[i].checked = true

        catMealStore.updatePortionSize(i, potionSizesAndPrices[i].size)
    }

    $: totalTins = $catMealStore.map((meal) => meal.servings).reduce((a, b) => a + b, 0);
</script>

<div>Test</div>
<div style="display:absolute" class="popup_wrapper !tw-flex !tw-flex-col !tw-flex-justify-center">
	<div>Test1</div>

	<div style="" class="popup_block is-first is-visible">
		<div class="popup-header">
			<div class="signup-hero_tab-heading">Edit Leo’s plan</div>
			<div class="signup-hero_tab-title-tiny">{totalTins} tins</div>
		</div>
		<div class="popup_content-block">
			{#each $catMealStore as meal, i}
				<AnpassenMealServingSelector {i} {catMealStore} {meal} />
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
						<div class="w-checkbox-input w-checkbox-input--inputType-custom popup_checkbox {potionSizeAndPrice.checked ? 'w--redirected-checked' : ''}"></div>
						<input
							id="checkbox-2"
							type="checkbox"
							name="checkbox-2"
							data-name="Checkbox 2"
							style="opacity:0;position:absolute;z-index:-1"
                            checked={potionSizeAndPrice.checked}
                            on:click={() => {
                                handleClick(i)
                            }}
						/><span class="popup_checkbox-title hide w-form-label " for="checkbox-2">Checkbox 2</span
						>
					</label>
					<div class="popup_checkbox-white-field">
						<div>{recommendedPotionSize === potionSizeAndPrice.size ? 'Empfohlen für Leo' : ''}</div>
					</div>
				</div>
			{/each}
			<button
				id="w-node-a492c5a3-de19-2aa1-548f-c3ca1fc7e10b-78e5fb0b"
				data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e10b"
				href="#"
				class="button w-button"
                on:click={() => {
                    callBackCloseAnpassenDisplay()}}>Fertig</button>
		</div>
		<button
			on:click={() => {
				callBackCloseAnpassenDisplay();
			}}
		>
			<img
				data-w-id="a492c5a3-de19-2aa1-548f-c3ca1fc7e1a2"
				alt=""
				src="images/close.svg"
				loading="lazy"
				class="popup_close-btn"
			/>
		</button>
	</div>
</div>
