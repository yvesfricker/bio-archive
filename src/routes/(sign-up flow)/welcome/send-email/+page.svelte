<script lang="ts">
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';

	let errorMessages = {};

	let email = '';

	function handleUpdate() {
		errorMessages = [];

		if (!email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			errorMessages.push(`E-Mail-Adresse ist nicht g\xFCltig`);
			validationError();
		}

		// console.log('local name', localCat.name, value);
		// console.log('errorMessages', errorMessages);
	}

	function validationCheck() {
		if (errorMessages?.length > 0) {
			//no submit email but show error message
		} else {
			// submit email and show check email message
		}
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
							data-wf-page-id="64199f0ac9609e609b29f171"
							data-wf-element-id="c1422fba-0b7c-80c6-f780-8cdfcb31a001"
						>
							<div class="signup-hero_component">
								<div class="margin-bottom-medium">
									<div class="text-align-center">
										<div class="signup-hero_subheading">Schritt 4</div>
									</div>
								</div>
								<div class="margin-bottom-xxmedium">
									<div class="text-align-center">
										<h2 class="signup-hero_heading">
											Mal sehen, was auf dem <br />Speiseplan steht...
										</h2>
									</div>
								</div>
								<div class="signup-hero_item">
									<div class="text-align-center">
										<div class="margin-bottom-xmedium">
											<div class="text-size-large">
												Wir schicken dir deinen empfohlenen Speiseplan per Email.
											</div>
										</div>
									</div>
								</div>
								<div class="margin-bottom-medium">
									<div class="signup-hero_form-item">
										<input
											fy-element="emailAddressInput"
											class="signup-hero_form-field w-input"
											maxlength="256"
											name="email"
											data-name="Email"
											placeholder="Email-Adresse"
											type="email"
											id="email"
										/><input
											type="submit"
											data-wait="Please wait..."
											class="button is-get-plans w-button"
											value="Plan erhalten"
										/>
									</div>
								</div>
								<div class="text-align-center">
									<a href="/welcome/dislikes" class="link w-inline-block">
										<div class="text-size-medium">Zurück</div>
									</a>
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

<style>
	@import '../../../../bella-natura.webflow.css';
</style>
