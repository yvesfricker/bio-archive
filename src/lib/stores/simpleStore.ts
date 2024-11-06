import { MealType } from "$lib/types.d";
import { writable } from 'svelte/store';

const init =[
    MealType.RIND,
    MealType.SCHWEIN,
    MealType.PUTE,
    MealType.HUHN
]


export const typesStore = writable<MealType[]>(init);    