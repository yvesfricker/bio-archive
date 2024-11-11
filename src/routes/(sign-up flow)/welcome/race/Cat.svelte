<script lang="ts">
	import type { CatDb, CatI } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';

	export let cat: CatI;
	export let i: number;
	export let validationError;

	let dislikeArray = ['rind', 'huhn', 'pute', 'schwein'];
	let colorArray = ['black', 'white', 'gray', 'brown'];
	let raceArray = ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll'];

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale,
		dislikes: cat.dislikes,
		color: cat.color,
		race: cat.race
	} as CatI;

	$: console.log('localcat', localCat);

	let errorMessages = [] as string[];

	function handleUpdateGender() {
		catStore.updateCatGender(i, localCat.genderMale);
	}

	function handleUpdateAge() {
		catStore.updateCatAge(i, localCat.age);
	}

	function handleUpdateWeight() {
		errorMessages = [];
		if (localCat.weight > 10) {
			localCat.weight = 10;
			errorMessages.push(`Katze ${i} Gewicht muss größer als 0 und kleiner als 10 sein`);
		} else if (localCat.weight <= 0) {
			localCat.weight = 1;
		}
		if (errorMessages.length === 0) {
			catStore.updateCatWeight(i, localCat.weight);
		}
		validationError(i, errorMessages, i);
	}

	function handleUpdateColor(color) {
		localCat.color = color;
		catStore.updateCatColor(i, localCat.color);
	}

	function handleUpdateRace(race) {
		localCat.race = race;
		catStore.updateCatRace(i, localCat.race);
	}
</script>

<div class="signup-hero_item-wrapper">
	<div class="margin-bottom-medium">
		<div class="signup-hero_item">
			<div class="font-weight-bold">
				<div fy-element="catOneNameLabel" class="signup-hero_field-text">
					{localCat.name}
				</div>
			</div>
		</div>
	</div>
	<div class="margin-bottom-xxmedium">
		<div class="signup-hero_dislike-wrapper">
			
			<div class="signup-hero_field-block is-color">
				<div class="signup-hero_field-text">Farbe:</div>
				<select bind:value={localCat.color} onchange={() => handleUpdateColor(localCat.color)}>
					{#each colorArray as color}
						<option value={color}>{color}</option>
					{/each}
				</select>
			</div>
			<div class="signup-hero_field-block is-race">
				<div class="signup-hero_field-text">Rasse:</div>
				<select bind:value={localCat.race} onchange={() => handleUpdateRace(localCat.race)}>
					{#each raceArray as race}
						<option value={race}>{race}</option>
					{/each}
				</select>

				<div class="signup-hero_field-block is-gender">
					<div class="signup-hero_field-text">Geschlecht:</div>
					<div class="signup-hero_item">
						<label class="signup-hero_radio-button is-white w-radio">
							<button
								class="w-form-formradioinput w-form-formradioinput--inputType-custom signup-hero_radio-block is-white w-radio-input \
								{localCat.genderMale ? 'w--redirected-checked' : ''}"
								onclick={() => {
									localCat.genderMale = true;
									handleUpdateGender();
								}}
								aria-label="gender male"
							></button>
							<span class="signup-hero_radio-label w-form-label" for="male">Männlich</span>
						</label>
						<label class="signup-hero_radio-button is-white w-radio">
							<button
								class="w-form-formradioinput w-form-formradioinput--inputType-custom signup-hero_radio-block is-white w-radio-input \
								{!localCat.genderMale ? 'w--redirected-checked' : ''}"
								onclick={() => {
									localCat.genderMale = false;
									handleUpdateGender();
								}}
								aria-label="gender female"
							></button>
							<span class="signup-hero_radio-label w-form-label" for="female">Weiblich</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- // This code is a component for a cat registration form. It allows the user to input the cat's name, age, weight, color, race, and gender. The age and weight fields have increment and decrement buttons to adjust the values. The color and race fields are dropdown menus with predefined options. The gender field is a radio button group with two options: male and female. The component uses Svelte syntax for binding values and handling events. -->

<style>
	/* Add any necessary styles here */
</style>
