<script lang="ts">
	import type { CatDb, CatI } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';

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

		if (localCat?.weight > 10) {
			localCat.weight = 10;
			errorMessages.push(`Katze ${i} Gewicht muss gr\xF6\xDFer als 0 und kleiner als 10 sein`);
		} else if (localCat.weight <= 0) {
			localCat.weight = 1;
		}

		// console.log('local name', localCat.name, value);
		// console.log('errorMessages', errorMessages);

		if (errorMessages?.length === 0) {
			if (localCat.age) {
				catStore.updateCatAge(i, localCat.age);
			}

			if (localCat.weight) {
				catStore.updateCatWeight(i, localCat.weight);
			}
		}

		validationError(localCat.id, errorMessages, i);
	}
</script>

<div class="margin-bottom-medium">
	<div class="signup-hero_item">
		<div class="font-weight-medium">
			<div fy-element="catOneNameLabel" class="signup-hero_field-text"><b>{localCat.name}</b></div>
		</div>
	</div>
</div>
<div class="margin-bottom-xxmedium">
	<div class="signup-hero_item is-second-step">
		<div class="signup-hero_field-block is-age">
			<div class="signup-hero_item is-years">
				<div class="signup-hero_field-text age-label">Alter:</div>
				<div class="signup-hero_age-button">
					<button
						fy-element="catOneDecrementAgeButton"
						class="button is-white w-button"
						on:click={(event) => {
							event.preventDefault();
							localCat.age = localCat.age - 1;
							handleUpdate();
						}}>-</button
					>
					<div fy-element="catOneAgeLabel" class="signup-hero_age-text">{localCat.age}</div>
					<button
						fy-element="catOneIncrementAgeButton"
						class="button is-white w-button"
						on:click={(event) => {
							event.preventDefault();
							localCat.age = localCat.age + 1;
							handleUpdate();
						}}>+</button
					>
				</div>
				<div class="signup-hero_field-text age-unit">Jahr/e</div>
			</div>
		</div>
		<div class="signup-hero_field-block is-weight">
			<div class="signup-hero_item is-kg ~w-full">
				<!-- <button
					class="button is-white w-button"
					on:click={() => {
						localCat.weight = localCat.weight - 1;
						handleUpdate()
					}}>-</button
				>
				<input
					class=" signup-hero_form-field is-weight w-input !px-[18px] !w-[60px] hide-arrows "
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
					on:input={(event) => {
						event.pre		ventDefault();
						handleUpdate();
					}}
				/>
				<button
					fy-element="catOneIncrementAgeButton"
					class="button is-white w-button"
					on:click={(event) => {
						event.preventDefault();
						localCat.weight = localCat.weight + 0.5;
						handleUpdate();
					}}>+</button
				> -->
				<div class="signup-hero_field-text weight-label">Gewicht:</div>
				<div class="signup-hero_age-button">
					<button
						fy-element="catOneDecrementAgeButton"
						class="button is-white w-button"
						on:click={(event) => {
							event.preventDefault();
							localCat.weight = localCat.weight - 0.5;
							handleUpdate();
						}}>-</button
					>
					<div fy-element="catOneAgeLabel" class="signup-hero_age-text">{localCat.weight}</div>
					<button
						fy-element="catOneIncrementAgeButton"
						class="button is-white w-button"
						on:click={(event) => {
							event.preventDefault();
							localCat.weight = localCat.weight + 0.5;
							handleUpdate();
						}}>+</button
					>
				</div>

				<div class="signup-hero_field-text weight-unit">kg</div>
			</div>
		</div>
	</div>
</div>

<style lang="css">
	.signup-hero_item.is-kg {
		justify-content: space-between;
		max-width: 100%;
	}

	.signup-hero_field-text.weight-label {
		flex-grow: 1;
		flex-basis: 0;
		text-align: right;
	}

	.signup-hero_field-text.weight-unit {
		flex-grow: 1;
		flex-basis: 0;
	}

	.signup-hero_item.is-years {
		justify-content: space-between;
		max-width: 100%;
	}

	.signup-hero_field-text.age-label {
		flex-grow: 1;
		flex-basis: 0;
		text-align: right;
	}

	.signup-hero_field-text.age-unit {
		flex-grow: 1;
		flex-basis: 0;
	}
</style>
