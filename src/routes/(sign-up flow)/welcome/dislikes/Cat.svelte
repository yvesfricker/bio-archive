<script lang="ts">
	import type { CatDb, CatI } from '$lib/types';

	export let cat: CatI;
	export let i: number;
	export let validationError;

	let dislikeArray = ['rind', 'huhn', 'pute', 'schwein'];

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale,
		dislikes: cat.dislikes
	} as CatI;

	$: console.log('localcat', localCat);

	let errorMessages = [] as string[];

	function handleUpdate(dislikeName) {
		console.log('in handle update before', dislikeName, localCat.dislikes);
		if (localCat.dislikes?.includes(dislikeName)) {
			localCat.dislikes = localCat.dislikes.filter((item) => item !== dislikeName);
		} else {
			console.log('sdg');
			localCat.dislikes = [...localCat.dislikes, dislikeName];
		}
		console.log('in handleupdate after', dislikeName, localCat.dislikes);
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
			<button
				fy-element=""
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('rind');
				}}
				><img
					src="images/red.svg"
					loading="eager"
					style={localCat.dislikes?.includes('rind') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-rind {localCat.dislikes?.includes(
						'rind'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="09031793-104c-6af3-16f2-b73fc49a2935"
				></div>
				<input
					fy-element="catOneBeefCheckbox"
					name="catOneBeef"
					data-name="catOneBeef"
					type="checkbox"
					id="catOneBeef"
					style="opacity:0;position:absolute;z-index:-1"
				/><span fy-element="" class="signup-hero_dislike-text w-form-label" for="catOneBeef"
					>Rind</span
				>
			</button>

			<button
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('huhn');
				}}
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-huhn {localCat.dislikes?.includes(
						'huhn'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="0e8e5413-18a7-4e95-ac70-e909a6b70468"
				></div>
				<input
					fy-element="catOneChickenCheckbox"
					name="catOneChicken"
					data-name="catOneChicken"
					type="checkbox"
					id="catOneChicken"
					style="opacity:0;position:absolute;z-index:-1"
				/><img
					src="images/orange.svg"
					loading="eager"
					style={localCat.dislikes?.includes('huhn') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label" for="catOneChicken">Huhn</span>
			</button>

			<button
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('pute');
				}}
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-pute {localCat.dislikes?.includes(
						'pute'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="7663beac-dd2f-b1c8-c960-574cdb53a4ca"
				></div>
				<input
					fy-element="catOneTurkeyCheckbox"
					name="catOneTurkey"
					data-name="catOneTurkey"
					type="checkbox"
					id="catOneTurkey"
					style="opacity:0;position:absolute;z-index:-1"
				/><img
					src="images/green.svg"
					loading="eager"
					style={localCat.dislikes?.includes('pute') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label" for="catOneTurkey">Pute</span>
			</button>

			<button
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('schwein');
				}}
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-schwein {localCat.dislikes?.includes(
						'schwein'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="1d08678a-5d4b-a284-9821-64addb3c8ca0"
				></div>
				<input
					fy-element="catOnePorkCheckbox"
					name="catOnePork"
					data-name="catOnePork"
					type="checkbox"
					id="catOnePork"
					style="opacity:0;position:absolute;z-index:-1"
				/><img
					src="images/pink.svg"
					loading="eager"
					style={localCat.dislikes?.includes('schwein') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label" for="catOnePork">Schwein</span>
			</button>
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
