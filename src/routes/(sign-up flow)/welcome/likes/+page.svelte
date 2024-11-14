<script lang="ts">
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
	import Cat from './Cat.svelte';

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

	$: console.log(
		Object.values(errorMessages)
			.map((entries) => entries.flat())
			.flat()
	);

	$: console.log("catStore",$catStore);
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
								data-wf-page-id="64199ef9753feb3348421caa"
								data-wf-element-id="c1422fba-0b7c-80c6-f780-8cdfcb31a001"
							>
								<div class="signup-hero_component">
									<div class="margin-bottom-medium">
										<div class="text-align-center">
											<div class="signup-hero_subheading">Schritt 3</div>
										</div>
									</div>
									<div class="margin-bottom-xxmedium">
										<div class="text-align-center">
											<h2 class="signup-hero_heading">Was mag deine Katze <br />davon?</h2>
										</div>
									</div>
									{#each $catStore as cat, i}
										<Cat {cat} {validationError} {i} />
									{/each}

									<!-- <div class="margin-bottom-xsm">
										<div class="text-align-center">
											<div
												fy-element="stepThreeErrorLabel"
												class="signup-hero_error-message text-size-medium"
											>
												This is some text inside of a div block.
											</div>
										</div>
									</div> -->
									<div class="margin-bottom-xxsm">
										<div class="text-align-center">
											<a href="/welcome/send-email">
												<button class=" button is-submit w-button !pt-[11px]">Weiter</button></a
											>
										</div>
									</div>
									<div class="text-align-center">
										<a href="/welcome/age" class="link w-inline-block">
											<div class="text-size-medium">Zurück</div>
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
</div>

<style module>
	@import '../../../../bella-natura.webflow.css';
</style>
