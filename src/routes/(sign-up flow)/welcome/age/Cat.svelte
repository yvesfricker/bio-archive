<script lang="ts">
	import type { CatDb, CatI } from '$lib/types';

	export let cat: CatI;
	export let i: number;
	export let validationError;

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale
	} as CatI;

	$: console.log('localcat', localCat);

	let errorMessages = [] as string[];

	function handleUpdate() {
		errorMessages = [];

		if (localCat.weight > 10) {
			localCat.weight = 10;
			errorMessages.push(`Katze ${i} Gewicht muss gr\xF6\xDFer als 0 und kleiner als 10 sein`);
		} else if (localCat.weight <= 0) {
			localCat.weight = 1;
		}

		// console.log('local name', localCat.name, value);
		// console.log('errorMessages', errorMessages);

		validationError(localCat.id, errorMessages, i);
	}
</script>

<div class="margin-bottom-medium">
	<div class="signup-hero_item">
		<div class="font-weight-bold">
			<div fy-element="catOneNameLabel" class="signup-hero_field-text">Leo</div>
		</div>
	</div>
</div>
<div class="margin-bottom-xxmedium">
	<div class="signup-hero_item is-second-step">
		<div class="signup-hero_field-block is-age">
			<div class="signup-hero_field-text">Alter:</div>
			<div class="signup-hero_item is-years">
				<div class="signup-hero_age-button">
					<button
						fy-element="catOneDecrementAgeButton"
						class="button is-white w-button"
						on:click={() => {
							localCat.age = localCat.age - 1;
						}}>-</button
					>
					<div fy-element="catOneAgeLabel" class="signup-hero_age-text">{localCat.age}</div>
					<button
						fy-element="catOneIncrementAgeButton"
						class="button is-white w-button"
						on:click={() => {
							localCat.age = localCat.age + 1;
						}}>+</button
					>
				</div>
				<div class="signup-hero_field-text">Jahr/e</div>
			</div>
		</div>
		<div class="signup-hero_field-block is-weight">
			<div class="signup-hero_field-text">Gewicht:</div>
			<div class="signup-hero_item is-kg ~tw-w-full">
				<button
					class="button is-white w-button"
					on:click={() => {
						localCat.weight = localCat.weight - 1;
						handleUpdate()
					}}>-</button
				>
				<input
					class=" signup-hero_form-field is-weight w-input !tw-px-[18px] !tw-w-[60px] hide-arrows "
					maxlength="256"
					name="catOneWeight"
					data-name="catOneWeight"
					placeholder=""
					id="catOneWeight"
					step="1"
					type="number"
					min="1"
					max="10"
					bind:value={localCat.weight}
					on:input={() => handleUpdate()}
				/>
				<button
					fy-element="catOneIncrementAgeButton"
					class="button is-white w-button"
					on:click={() => {
						localCat.weight = localCat.weight + 1;
						handleUpdate()
					}}>+</button
				>

				<div class="signup-hero_field-text">kg</div>
			</div>
		</div>
	</div>
</div>


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
