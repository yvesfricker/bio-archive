<script lang="ts">
	import { catStore } from '$lib/stores/itemsStores';
	import type { CatDb, CatI } from '$lib/types';

	export let cat: CatI;
	export let i: number;
	export let validationError;

	let likeArray = ['rind', 'huhn', 'pute', 'schwein'];

	$: localCat = {
		id: cat.id,
		name: cat.name,
		age: cat.age,
		weight: cat.weight,
		genderMale: cat.genderMale,
		likes: cat.likes
	} as CatI;

	$: console.log('localcat', localCat);

	let errorMessages = [] as string[];

	function handleUpdate(likeName: string) {
		console.log('in handle update before', likeName, localCat.likes);
		if (localCat.likes?.includes(likeName)) {
			localCat.likes = localCat.likes.filter((item) => item !== likeName);
		} else {
			console.log('sdg');
			localCat.likes = [...localCat.likes, likeName];
		}
		catStore.updateCatLikes(i, localCat.likes);
		console.log('in handleupdate after', likeName, localCat.likes);
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
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('rind');
				}}
				><img
					src="images/red.svg"
					loading="eager"
					style={localCat.likes?.includes('rind') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-rind {localCat.likes?.includes(
						'rind'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="09031793-104c-6af3-16f2-b73fc49a2935"
				></div>
				<input
				
					name="catOneBeef"
					data-name="catOneBeef"
					type="checkbox"
					id="catOneBeef"
					style="opacity:0;position:absolute;z-index:-1"
				/><span  class="signup-hero_dislike-text w-form-label !font-Nunito" for="catOneBeef"
					>Rind</span
				>
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('huhn');
				}}
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-huhn {localCat.likes?.includes(
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
					style={localCat.likes?.includes('huhn') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label !font-Nunito" for="catOneChicken">Huhn</span>
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('pute');
				}}
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-pute {localCat.likes?.includes(
						'pute'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="7663beac-dd2f-b1c8-c960-574cdb53a4ca"
				></div>
				<input
					
					name="catOneTurkey"
					data-name="catOneTurkey"
					type="checkbox"
					id="catOneTurkey"
					style="opacity:0;position:absolute;z-index:-1"
				/><img
					src="images/green.svg"
					loading="eager"
					style={localCat.likes?.includes('pute') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label !font-Nunito" for="catOneTurkey">Pute</span>
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-checkbox signup-hero_dislike-button"
				on:click={() => {
					handleUpdate('schwein');
				}}
				aria-roledescription="checkbox dislike"
			>
				<div
					class="w-checkbox-input w-checkbox-input--inputType-custom signup-hero_dislike-img is-schwein {localCat.likes?.includes(
						'schwein'
					)
						? 'w--redirected-checked'
						: ''}"
					data-w-id="1d08678a-5d4b-a284-9821-64addb3c8ca0"
				></div>
				<input
					name="catOnePork"
					data-name="catOnePork"
					type="checkbox"
					id="catOnePork"
					style="opacity:0;position:absolute;z-index:-1"
				/><img
					src="images/pink.svg"
					loading="eager"
					style={localCat.likes?.includes('schwein') ? 'display:block' : 'display:none'}
					alt=""
					class="signup-hero_checkmark"
				/><span class="signup-hero_dislike-text w-form-label !font-Nunito" for="catOnePork">Schwein</span>
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
