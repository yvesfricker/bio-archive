import type { Writable } from 'svelte/store';
import type { MealStore } from './stores/itemsStores';

export interface CatDb  {
    id: string
    name: string
    age: number
    weight: number
    genderMale: boolean 
    dislikes: string[] 
}

export interface CatI  {
    id: string | undefined
    name: string | undefined
    age: number | undefined
    weight: number | undefined
    genderMale: boolean | undefined
    dislikes: string[] | undefined
    portionSize: number
    mealsTest: CatMealStore
    mealsTestTotalPrice: number
    mealsPromonat: CatMealStore
    mealsPromonatTotalPrice: number
}


export interface CatMealI {
    id: string
    type: MealType
    description: string
    servings: number
    selectedServingPrice: number
    totalMealPrice: number
}

export enum MealType {
   RIND = "rind",
   SCHWEIN = "schwein",
   PUTE = "pute",
   HUHN = "huhn"
}