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

	console.log('localcat', localCat);

	let errorMessages = [] as string[];

	function handleUpdate() {
		// console.log('localcat', localCat);
		// console.log('local name', localCat.name);
		// console.log('local name test', localCat.name?.match(/^([A-Za-z])+$/g));
		errorMessages = [];

		if (localCat.genderMale === undefined) {
			errorMessages.push('Please select gender');
		}
		if (localCat.name === undefined) {
			errorMessages.push('Please name your cat');
		}

		const charTest = localCat.name?.match(/^([A-Za-z])+$/g);
		if (!charTest?.length > 0) {
			errorMessages.push(`Name von Katze ${i + 1} darf nur Buchstaben enthalten `);
		}

		// console.log('errorMessages', errorMessages);

		validationError(localCat.id, errorMessages, i);
	}
</script>

<div class="margin-bottom-xxmedium">
	<div class="signup-hero_item is-vertical-on-tablet">
		<div class="signup-hero_field-block is-vertical-on-tablet">
			<div class="signup-hero_field-text">Name:</div>
			<input
				fy-element="catOneNameInput"
				class="signup-hero_form-field w-input"
				maxlength="256"
				name="catOneName-2"
				data-name="Cat One Name 2"
				placeholder=""
				type="text"
				id="catOneName-2"
				bind:value={localCat.name}
				oninput={() => handleUpdate()}
			/>
		</div>
		<div class="signup-hero_field-block is-second-step">
			<div class="signup-hero_field-text">Geschlecht:</div>
			<div class="signup-hero_item">
				<label class="signup-hero_radio-button is-white w-radio">
					<button
						class="w-form-formradioinput w-form-formradioinput--inputType-custom signup-hero_radio-block is-white w-radio-input {localCat.genderMale
							? 'w--redirected-checked'
							: ''}"
						onclick={() => {
							localCat.genderMale = true;
							handleUpdate();
						}}
						aria-label="gender male"
					></button>
					<span class="signup-hero_radio-label w-form-label" for="male">Männlich</span>
				</label><label class="signup-hero_radio-button is-white w-radio">
					<button
						class="w-form-formradioinput w-form-formradioinput--inputType-custom signup-hero_radio-block is-white w-radio-input {!localCat.genderMale
							? 'w--redirected-checked'
							: ''}"
						onclick={() => {
							localCat.genderMale = false;
							handleUpdate();
						}}
						aria-label="gender female"
					></button>
					<span class="signup-hero_radio-label w-form-label" for="female">Weiblich</span>
				</label>
			</div>
		</div>
	</div>
</div>
