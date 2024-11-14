<script lang="ts">
    import { onMount } from 'svelte';
  
    export let cat: CatI;
  
    $: localCat = {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      weight: cat.weight,
      genderMale: cat.genderMale,
      dislikes: cat.dislikes,
      mealsTest: cat.mealsTest,
      mealsPromonat: cat.mealsPromonat,
      portionSize: cat.portionSize
    } as CatI;
  
    let isEditMode = false;
  
    const toggleEditMode = () => {
      isEditMode = !isEditMode;
    };
  
    const mealTypes = [
      { name: 'Huhn', image: 'images/Huhn.webp', description: 'Bio-Hühnerfleisch mit Karotten' },
      { name: 'Rind', image: 'images/Rind.webp', description: 'Bio-Rindfleisch mit Broccoli' },
      { name: 'Pute', image: 'images/Pute.webp', description: 'Bio-Putenfleisch mit Kürbis' },
      { name: 'Schwein', image: 'images/Schwein.webp', description: 'Bio-Schweinefleisch mit Zucchini' }
    ];
  
    onMount(() => {
      // Any initialization logic can go here
    });
  </script>
  
  <div class="signup-hero_leo-block">
    <div class="signup-hero_tab-top is-wrap">
      <div class="signup-hero_tab-top-text-block">
        <div class="signup-hero_tab-heading">{localCat.name}'s Speiseplan</div>
      </div>
      <div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
      <a href="#" class="link w-inline-block" on:click|preventDefault={toggleEditMode}>
        <div class="text-size-medium">Plan anpassen</div>
      </a>
    </div>
    <div class="signup-hero_tab-top is-wrap is-second-from-top">
      <div class="text-size-medium">{localCat.mealsPromonat} Katzenfutter / Zwei Wochen</div>
      <div class="signup-hero_tab-title-tiny is-popup-trigger">Edit recipes</div>
      <div class="signup-hero_tab-heading">0.-</div>
    </div>
    <div class="signup-hero_tab-bot">
      {#each mealTypes as meal, index}
        <div class="signup-hero_tab-plan-item">
          <img sizes="(max-width: 767px) 80px, 108px" srcset="{meal.image}-p-500.png 500w, {meal.image} 700w" src={meal.image} loading="lazy" alt={meal.name} class="signup-hero_tab-plan-image">
          <div class="signup-hero_tab-plan-text-block">
            <div class="font-weight-bold">
              <div class="signup-hero_tab-title-tiny">
                {#if isEditMode}
                  <input type="number" bind:value={localCat.mealsTest[index]} min="0" max="7" /> x
                {:else}
                  {localCat.mealsTest[index]} x
                {/if}
                <span>{localCat.portionSize}</span>g {meal.name}
              </div>
            </div>
            <div class="signup-hero_tab-text-sm">{meal.description}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .signup-hero_leo-block {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
  
    .signup-hero_tab-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  
    .signup-hero_tab-heading {
      font-size: 24px;
      font-weight: bold;
    }
  
    .signup-hero_tab-title-tiny {
      font-size: 12px;
      color: #666;
    }
  
    .link {
      text-decoration: none;
      color: #007bff;
    }
  
    .signup-hero_tab-bot {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  
    .signup-hero_tab-plan-item {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      padding: 10px;
    }
  
    .signup-hero_tab-plan-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 10px;
    }
  
    .signup-hero_tab-plan-text-block {
      flex-grow: 1;
    }
  
    .font-weight-bold {
      font-weight: bold;
    }
  
    .signup-hero_tab-text-sm {
      font-size: 14px;
      color: #666;
    }
  
    input[type="number"] {
      width: 40px;
      padding: 2px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  </style>