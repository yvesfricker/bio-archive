import type { Writable } from 'svelte/store';

export interface CatDb  {
    id: string
    name: string
    age: number
    weight: number
    genderMale: boolean 
    dislikes: string[] 
    meals: CatMealStore
}

export interface CatI  {
    id: string | undefined
    name: string | undefined
    age: number | undefined
    weight: number | undefined
    genderMale: boolean | undefined
    dislikes: string[] | undefined
    meals: CatMealStore

}

export type CatMealStore = Writable<CatMeal[]>

export interface CatMealI {
    id: string
    type: MealType
    description: string
    portionSize: number
    servings: number
}

export enum MealType {
   RIND = "rind",
   SCHWEIN = "schwein",
   PUTE = "pute",
   HUHN = "huhn"
}