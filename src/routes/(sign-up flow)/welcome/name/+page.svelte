<script lang="ts">
	import Cat from './Cat.svelte';
	import { Cat as CatClass } from './CatClass';
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import { v4 as uuidv4 } from 'uuid';

	let errorMessages = {};

	function validationError(index: string, componentErrorMessages: string[], i) {
		if (componentErrorMessages?.length > 0) {
			errorMessages[index] = componentErrorMessages;
		} else {
			errorMessages[index] = null;
		}
		console.log('componentErrorMessages', componentErrorMessages);
		console.log('index', i);
		console.log('id', index);
	}

	function handleAddCat() {
		$catStore = [...$catStore, new CatClass({ id: uuidv4() }) as CatI];
		console.log('in handeAddCat', $catStore);
	}

	function handleRemoveCatById(id) {
		$catStore = [...$catStore.filter((cat) => cat.id !== id)];
		console.log('in handeRemoveCat', $catStore);
	}

	function handleRemoveLastCat () {
		$catStore = [...$catStore.slice(0, -1)];
		console.log('in handeRemoveLastCat', $catStore);
	}

	$: console.log(
		Object.values(errorMessages)
			.map((entries) => entries.flat())
			.flat()
	);

	$: console.log($catStore);
</script>

<main id="Weiter" class="main-wrapper">
	<section class="section_signup-hero">
		<div class="page-padding">
			<div class="container-medium">
				<div class="padding-vertical padding-huge">
					<div class="signup-hero_form w-form">
						<form
							id="email-form"
							name="email-form"
							data-name="Email Form"
							method="get"
							class="signup-hero_form-block"
							data-wf-page-id="6419afb0a00f8c813c946ab0"
							data-wf-element-id="c1422fba-0b7c-80c6-f780-8cdfcb31a001"
						>
							<div class="signup-hero_component first-step">
								<div class="margin-bottom-medium">
									<div class="text-align-center">
										<div class="signup-hero_subheading">Schritt 1</div>
									</div>
								</div>
								<div class="margin-bottom-xxmedium">
									<div class="text-align-center">
										<h1 class="signup-hero_heading">Wie heißt deine Katze?</h1>
									</div>
								</div>
								<div class="margin-bottom-xxxmedium">
									{#each $catStore as cat, i}
										<Cat {cat} {validationError} {i} />
									{/each}

									<div class="margin-bottom-medium">
										<div class="signup-hero_item">
											<div class="signup-hero_field-block">
												<div fy-element="reefatte" class="signup-hero_field-text">
													Katze hinzufügen / entfernen
												</div>
											</div>
										</div>
									</div>
									<div class="signup-hero_item">
										<div
											id="numberOfCatsLabel"
											fy-element="numberOfCatsLabel"
											class="signup-hero_add-remove-text"
										>
											{$catStore.length}
										</div>

										<button
											class="button is-white w-button !tw-block"
											on:click={() => handleAddCat()}
										>
											+
										</button>

										<button fy-element="decrementCatsButton" href="#" class="button is-white w-button"
										on:click={() => handleRemoveLastCat()}>
											-
										</button>
									</div>
								</div>
								<div class="margin-bottom-xsm">
									<div class="text-align-center">
										{#each Object.values(errorMessages)
											.map((entries) => entries.flat())
											.flat() as errorMessage}
											<div class="signup-hero_error-message text-size-medium">
												{errorMessage}
											</div>
										{/each}
									</div>
								</div>
								<div class="margin-bottom-xxxhuge">
									<div class="text-align-center">
										<a href={Object.keys(errorMessages).length > 0 ? null : '/welcome/age'}>
											<div class=" button is-submit w-button">Weiter</div></a
										>

										<!-- <input
                      type="submit"
                      data-wait="Please wait..."
                      fy-element="stepFourNextButton"
                      class="button is-submit w-button"
                      value="Weiter"
                    /> -->
									</div>
								</div>
								<div class="text-align-center">
									<a href="#" class="link w-inline-block">
										<div class="text-size-medium signup-hero_back-button">Zurück zum Anfang</div>
									</a>
								</div>
							</div>
						</form>
						<div class="succes w-form-done"></div>
						<div class="w-form-fail">
							<div>Oops! Something went wrong while submitting the form.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<img src="images/pink-left-svg.svg" loading="eager" alt="" class="bg-flower-left" /><img
			src="images/pink-right-svg.svg"
			loading="eager"
			alt=""
			class="bg-flower-right"
		/>
	</section>
</main>

<style module>
	@import '../../../../bella-natura.webflow.css';
</style>
