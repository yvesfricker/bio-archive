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
		errorMessages = [];

		if (localCat.genderMale === undefined) {
			errorMessages.push('Please select gender');
		}
		if (localCat.name === undefined) {
			errorMessages.push('Please name your cat');
		}

		if (!localCat.name?.match(/^([A-Za-z])+$/)) {
			errorMessages.push(`Name von Katze ${i + 1} darf nur Buchstaben enthalten `);
		}

		// console.log('local name', localCat.name, value);
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
						onclick={() => (localCat.genderMale = true)}
						aria-label="gender male"
						onchange={() => handleUpdate()}
					></button>
					<input
						id="male"
						type="radio"
						name="catOneGenderGroup"
						data-name="catOneGenderGroup"
						fy-element="catOneMaleRadio"
						style="opacity:0;positionabsolute;z-index:-1"
						value="male"
					/><span class="signup-hero_radio-label w-form-label" for="male">Männlich</span>
				</label><label class="signup-hero_radio-button is-white w-radio">
					<button
						class="w-form-formradioinput w-form-formradioinput--inputType-custom signup-hero_radio-block is-white w-radio-input {!localCat.genderMale
							? 'w--redirected-checked'
							: ''}"
						onclick={() => localCat.setFemale()}
						aria-label="gender female"
						onchange={() => handleUpdate()}
					></button>
					<input
						id="female"
						type="radio"
						name="catOneGenderGroup"
						data-name="catOneGenderGroup"
						fy-element="catOneFemaleRadio"
						style="opacity:0;positionabsolute;z-index:-1"
						value="female"
					/><span class="signup-hero_radio-label w-form-label" for="female">Weiblich</span>
				</label>
			</div>
		</div>
	</div>
</div>
