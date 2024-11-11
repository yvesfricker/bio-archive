<script lang="ts">
	import Cat from './Cat.svelte';
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import { v4 as uuidv4 } from 'uuid';

	let errorMessages = [];
	let validationFailed = false;

	function validationError(index: number, componentErrorMessages: string[], i) {
		if (componentErrorMessages?.length > 0) {
			errorMessages[index] = componentErrorMessages;
		} else {
			errorMessages[index] = [[]];
		}
		console.log('parent ErrorMessages', errorMessages);
		validationFailed = errorMessages.flat().some((item) => item !== '' && item.length > 0);
		console.log('validationFailed', validationFailed);
	}

	function handleAddCat() {
		console.log('in handeAddCat', $catStore);
		catStore.addCat();
	}

	function handleRemoveCatById(id) {
		$catStore = [...$catStore.filter((cat) => cat.id !== id)];
		console.log('in handeRemoveCat', $catStore);
	}

	function handleRemoveLastCat() {
		console.log('in handeRemoveLastCat', $catStore);
		catStore.removeLastCat();
	}

	$: console.log('validationFailed', validationFailed);
	$: console.log($catStore);
</script>

<div class="page-wrapper">
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
											<h2 class="signup-hero_heading">Wie alt ist deine Katze?</h2>
										</div>
									</div>
									{#each $catStore as cat, i}
										<Cat {cat} {validationError} {i} />
									{/each}

									<div class="margin-bottom-xsm">
										<div class="text-align-center">
											<a href={validationFailed ? null : '/welcome/age'}>
												<button class="button is-white w-button" type="submit">Weiter</button>
											</a>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
