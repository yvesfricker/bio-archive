import { writable } from 'svelte/store';
import type { CatI, CatMealI, CatMealStore } from '$lib/types.d';
import { MealType } from '$lib/types.d';
import { v4 as uuidv4 } from 'uuid';



const miaMeals: CatMealI[] = [
    {
        id: uuidv4(),
        type: MealType.RIND,
        description: 'Bio-Rindfleisch mit Broccoli',
        portionSize: 150,
        servings: 4
    },
    {
        id: uuidv4(),
        type: MealType.SCHWEIN,
        description: 'Bio-Sweinfleisch',
        portionSize: 150,
        servings: 3
    },
    {
        id: uuidv4(),
        type: MealType.PUTE,
        description: 'Bio-Pute mit Carotten und Vitamine',
        portionSize: 150,
        servings: 2
    },

]


const leoMeals: CatMealI[] = [
    {
        id: uuidv4(),
        type: MealType.RIND,
        description: 'Bio-Rindfleisch mit Broccoli',
        portionSize: 200,
        servings: 14
    }

]


function createCatStore(init: CatI[] | undefined) {
    const { subscribe, set, update } = writable<CatI[]>(init);

    return {
        subscribe,
        // increment: () => update((n) => n + 1),
        // decrement: () => update((n) => n - 1),
        // reset: () => set(0)
    };
}

function createMealStore(init: CatMealI[] | undefined) {
    const { subscribe, set, update } = writable<CatMealI[]>(init);

    return {
        subscribe,
        // increment: () => update((n) => n + 1),
        // decrement: () => update((n) => n - 1),
        // reset: () => set(0)
        incrementServingsForMeal: (i: number) => {

            update((store) => {
                const newMeal = store[i]
                newMeal.servings = newMeal.servings + 1
                return store
            })

            // console.log("newMeal", newMeal)
            // console.log("store", store)
            // console.log("splice", store.splice(i, 0, newMeal))
            // return store.splice(i, 0, newMeal)})
        },
        decrementServingsForMeal: (i: number) => {

            update((store) => {
                const newMeal = store[i]
                newMeal.servings = newMeal.servings - 1 > -1 ? newMeal.servings - 1 : 0
                return store
            })
        },
        setNewMenuFromCalculation: (calculatedMenu: { [key: string]: number }, recommendedPotionSize: number) => {
            //{ rind: 4, pute: 5, huhn: 5 }
            // {
            //     id: uuidv4(),
            //     type: MealType.RIND,
            //     description: 'Bio-Rindfleisch mit Broccoli',
            //     portionSize: 200,
            //     servings: 14
            // }
            const menuArray = Object.entries(calculatedMenu)
            console.log("menuArray", menuArray)
            const newMealStore = menuArray.map(([key, value]) => {
                return {
                    id: uuidv4(),
                    type: key as MealType,
                    description: '',
                    portionSize: recommendedPotionSize,
                    servings: value
                }
            })
            console.log("newMealStore", newMealStore)
            update((store) => {
                return newMealStore
            })
        },
        updatePortionSize: (i: number, newPortionSize: number) => {
            update((store) => {
                store.forEach((meal, index) => {
                    meal.portionSize = newPortionSize
                })
             
                return store
            })
        }

    };
}

const miaMealsStore = createMealStore(miaMeals);

const leoMealsStore = createMealStore(leoMeals);

const catTestSet: CatI[] = [
    {
        id: uuidv4(),
        name: 'Mia',
        age: 3,
        weight: 4,
        genderMale: false,
        dislikes: ['pute'],
        meals: miaMealsStore
    },
    {
        id: uuidv4(),
        name: 'Leo',
        age: 5,
        weight: 9,
        genderMale: true,
        dislikes: ['huhn', 'rind'],
        meals: leoMealsStore

    },
    {
        id: uuidv4(),
        name: 'Luna',
        age: 2,
        weight: 3,
        genderMale: false,
        dislikes: ['schwein'],
        meals: createMealStore()

    }
];



export const catStore = createCatStore(catTestSet);
