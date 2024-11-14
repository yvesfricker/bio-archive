<script lang="ts">
	import Cat from './Cat.svelte';
	import { Cat as CatClass } from './CatClass';
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import { v4 as uuidv4 } from 'uuid';

	let errorMessages = $catStore.map( cat => cat.name === "" ? ['Bitte geben Sie den Namen Ihrer Katze ein'] : [""])

	let validationFail = errorMessages.flat().some((item) => item !== '' );
	let submitted = false

	function validationError(index: number, componentErrorMessages: string[]) {
		if (componentErrorMessages?.length > 0) {
			errorMessages[index] = componentErrorMessages;
		} else {
			errorMessages[index] = [""];
		}
		console.log('parent ErrorMessages', errorMessages);
		// console.log('index', i);
		// console.log('id', index);

		validationFail = errorMessages.flat().some((item) => item !== '');
		submitted = false
		console.log('validationFail', validationFail);
	}

	function handleAddCat() {
		console.log('in handeAddCat', $catStore);
		if ($catStore.length < 3) {
		catStore.addCat();
		submitted = false
		errorMessages = [...errorMessages, ['Bitte geben Sie den Namen Ihrer Katze ein']];
		validationFail = true
		console.log('parent ErrorMessages', errorMessages);
		} else {
			submitted = true
			errorMessages = [...errorMessages, ['Sie k\xF6nnen nur drei Katzen eintragen']];
		}
	}

	function handleRemoveCatById(id) {
		$catStore = [...$catStore.filter((cat) => cat.id !== id)];
		console.log('in handeRemoveCat', $catStore);
		errorMessages.pop()
		submitted = false
	}

	function handleRemoveLastCat() {
		console.log('in handeRemoveLastCat', $catStore);
		catStore.removeLastCat();
		errorMessages.pop()
		submitted = false
	}

	$: console.log('errorMessages', errorMessages);
	$: console.log('validationFail', validationFail);
	$: console.log('catStore',$catStore);
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
									<!-- {#key $catStore.length} -->
										{#each $catStore as cat, i}
											<Cat {cat} {validationError} {i} />
										{/each}
									<!-- {/key} -->

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
											class="button is-white w-button !block"
											on:click={() => handleAddCat()}
										>
											+
										</button>

										{#if $catStore.length > 1}

										<button
											fy-element="decrementCatsButton"
											href="#"
											class="button is-white w-button"
											on:click={() => handleRemoveLastCat()}
										>
											-
										</button>
										{/if}
									</div>
								</div>

								<div class="margin-bottom-xsm">
									<div class="text-align-center">
										<a href={validationFail ? null : '/welcome/age'}>
											<button class=" button is-submit w-button pt-3" on:click={() => validationFail ? submitted = true : false}>Weiter</button></a
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
								<div class="margin-bottom-xxxhuge">
									<div class="text-align-center">
										{#if submitted}
										{#key errorMessages }
											{#each errorMessages as errorMessagesSub}
												{#each errorMessagesSub as errorMessage}
													<div class="signup-hero_error-message text-size-medium">
														{errorMessage}
													</div>
												{/each}
											{/each}
										{/key}
										{:else}
										<div class="signup-hero_error-message text-size-medium">
											{" "}
										</div>
										{/if}
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
						<!-- <div class="w-form-fail">
							<div>Oops! Something went wrong while submitting the form.</div>
						</div> -->
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
