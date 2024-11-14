import { MealType } from "$lib/types.d";
import { writable } from 'svelte/store';

const init =[
    MealType.RIND,
    MealType.SCHWEIN,
    MealType.PUTE,
    MealType.HUHN
]

const appStoreInit = {
    showHeader: true
}

export const typesStore = writable<MealType[]>(init);    

export const appStore = writable(appStoreInit)