<script lang='ts'>
	import type { CatI, CatDb } from '$lib/types';
	import { catStore } from '$lib/stores/itemsStores';
  import Cat from './Cat.svelte';


	let errorMessages: string[] = [];

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
errorMessages
);

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
								data-wf-page-id="64199eeea8c4af5a740251b5"
								data-wf-element-id="c1422fba-0b7c-80c6-f780-8cdfcb31a001"
							>
								<div class="signup-hero_component">
									<div class="margin-bottom-medium">
										<div class="text-align-center">
											<div class="signup-hero_subheading">Schritt 2</div>
										</div>
									</div>
									<div class="margin-bottom-xxmedium">
										<div class="margin-bottom-xxmedium">
											<div class="text-align-center">
												<h2 class="signup-hero_heading">Wie alt ist deine Katze?</h2>
											</div>
										</div>
										<div class="signup-hero_item-wrapper">
                      {#each $catStore as cat, i}
                      <Cat {cat} {validationError} {i} />
                    {/each}
  
                    <div class="margin-b">

                    </div>
										<div class="margin-bottom-xsm">
                      <div class="text-align-center">
                        {#each errorMessages as errorMessage}
                          <div class="signup-hero_error-message text-size-medium">
                            {errorMessage}
                          </div>
                        {/each}
                      </div>
                    </div>
										<div class="margin-bottom-xxsm">
											<div class="text-align-center">
												<a href="/welcome/dislikes">
													<div class=" button is-submit w-button !tw-pt-[11px]">Weiter</div></a
												>
											</div>
										</div>
										<div class="text-align-center">
											<a href="/welcome/name" class="link w-inline-block">
												<div class="text-size-medium">Zurück</div>
											</a>
										</div>
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
