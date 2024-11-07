import { writable, type Writable } from 'svelte/store';
import type { CatI, CatMealI, CatMealStore } from '$lib/types.d';
import { MealType } from '$lib/types.d';
import { v4 as uuidv4 } from 'uuid';



const miaMeals: CatMealI[] = [
    {
        id: uuidv4(),
        type: MealType.RIND,
        description: 'Bio-Rindfleisch mit Broccoli',
        servings: 4,
        selectedServingPrice: 3,
        totalMealPrice: 12
    },
    {
        id: uuidv4(),
        type: MealType.SCHWEIN,
        description: 'Bio-Sweinfleisch',
        servings: 3,
        selectedServingPrice: 3,
        totalMealPrice: 12
    },
    {
        id: uuidv4(),
        type: MealType.PUTE,
        description: 'Bio-Pute mit Carotten und Vitamine',
        servings: 2,
        selectedServingPrice: 3,
        totalMealPrice: 12
    },

]


const leoMeals: CatMealI[] = [
    {
        id: uuidv4(),
        type: MealType.RIND,
        description: 'Bio-Rindfleisch mit Broccoli',
        servings: 14,
        selectedServingPrice: 3,
        totalMealPrice: 12
    }

]


function createCatStore(init: CatI[] | undefined) {
    const { subscribe, set, update } = writable<CatI[]>(init);

    return {
        subscribe,
        // increment: () => update((n) => n + 1),
        // decrement: () => update((n) => n - 1),
        // reset: () => set(0)
        removeLastCat: () => {
            update((store) => {
                return [...store.slice(0, -1)];
            })

        },
        addCat: () => {
            update((store) => {
                return store.concat({
                    id: uuidv4(),
                    name: '',
                    age: 0,
                    weight: 0,
                    genderMale: true,
                    dislikes: [],
                    portionSize: 0,
                    mealsTest: miaMeals,
                    mealsTestTotalPrice: 0,
                    mealsPromonat: leoMeals,
                    mealsPromonatTotalPrice: 0
                })
            })
        },
        updateTotalMealPriceForCat: (catIndex: number, proMonat: boolean) => {
            update((store) => {
                let mealsPrice = 0
                if (proMonat) {
                    // console.log("store[catIndex].mealsPromonat", store[catIndex].mealsPromonat)
                    store[catIndex].mealsPromonat.subscribe((meals) => {
                        meals.forEach((meal, index) => {
                            mealsPrice += meal.totalMealPrice
                        })
                    })

                    store[catIndex].mealsPromonatTotalPrice = mealsPrice
                } else {
                    // console.log("store[catIndex].mealsTest", store[catIndex].mealsTest)
                    store[catIndex].mealsTest.subscribe((meals) => {
                        // console.log("meals SGAEWHWE", meals)
                        meals.forEach((meal, index) => {
                            mealsPrice += meal.totalMealPrice
                        })
                    })
                    store[catIndex].mealsTestTotalPrice = mealsPrice
                }
                return store
            })
        },
        updatePortionSize: (catIndex: number, newPortionSize: number) => {
            update((store) => {
                store[catIndex].portionSize = newPortionSize
                return store
            })
        },
    };
}

export interface CatStore extends Writable<CatI[]> {
    updateTotalMealPriceForCat: (i: number, newPrice: number, proMonat: boolean) => void
    updatePortionSize: (catIndex: number, newPortionSize: number) => void
}
export interface CatMealStore extends Writable<CatMealI[]> {
    decrementServingsForMeal: (i: number) => void
    incrementServingsForMeal: (i: number) => void
    setNewMenuFromCalculation: (calculatedMenu: { [key: string]: number }, recommendedPotionSize: number) => string
    updateMealPrice: (newPrice: number) => void
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
                newMeal.totalMealPrice = newMeal.selectedServingPrice * newMeal.servings
                console.log("store", store)
                return store
            })

            // console.log("newMeal", newMeal)

            // console.log("splice", store.splice(i, 0, newMeal))
            // return store.splice(i, 0, newMeal)})
        },
        decrementServingsForMeal: (i: number) => {

            update((store) => {
                const newMeal = store[i]
                newMeal.servings = newMeal.servings - 1 > -1 ? newMeal.servings - 1 : 0
                newMeal.totalMealPrice = newMeal.selectedServingPrice * newMeal.servings
                return store
            })
        },
        setNewMenuFromCalculation: (calculatedMenu: { [key: string]: number }, recommendedPotionSize: number, mealPrice: number) => {
            //{ rind: 4, pute: 5, huhn: 5 }
            // {
            //     id: uuidv4(),
            //     type: MealType.RIND,
            //     description: 'Bio-Rindfleisch mit Broccoli',
            //     portionSize: 200,
            //     servings: 14
            // }
            const menuArray = Object.entries(calculatedMenu)
            // console.log("menuArray", menuArray)
            const newMealStore = menuArray.map(([key, value]) => {
                return {
                    id: uuidv4(),
                    type: key as MealType,
                    description: '',
                    portionSize: recommendedPotionSize,
                    servings: value,
                    selectedServingPrice: mealPrice,
                    totalMealPrice: value * mealPrice
                }
            })
            // console.log("newMealStore", newMealStore)
            update((store) => {
                store = newMealStore
                return store
            })
        },
        updateMealPrice: (newPrice: number) => {
            update((store) => {
                store.forEach((meal, index) => {
                    meal.selectedServingPrice = newPrice
                    meal.totalMealPrice = newPrice * meal.servings
                })

                return store
            })
        }

    };
}

const miaMealsTestStore = createMealStore(miaMeals);
const miaMealsPromonatStore = createMealStore(miaMeals);

const leoMealsTestStore = createMealStore(leoMeals);
const leoMealsPromonatStore = createMealStore(leoMeals);

const catTestSet: CatI[] = [
    {
        id: uuidv4(),
        name: 'Mia',
        age: 3,
        weight: 4,
        genderMale: false,
        dislikes: ['pute'],
        portionSize: 200,
        mealsTest: miaMealsTestStore,
        mealsPromonat: miaMealsPromonatStore,
        mealsTestTotalPrice: 0,
        mealsPromonatTotalPrice: 0
    },
    {
        id: uuidv4(),
        name: 'Leo',
        age: 5,
        weight: 9,
        portionSize: 200,
        genderMale: true,
        dislikes: ['huhn', 'rind'],
        mealsTest: leoMealsTestStore,
        mealsPromonat: leoMealsPromonatStore,
        mealsTestTotalPrice: 0,
        mealsPromonatTotalPrice: 0
    },
    {
        id: uuidv4(),
        name: 'Luna',
        age: 2,
        weight: 3,
        portionSize: 200,
        genderMale: false,
        dislikes: ['schwein'],
        mealsTest: createMealStore(undefined),
        mealsPromonat: createMealStore(undefined),
        mealsTestTotalPrice: 0,
        mealsPromonatTotalPrice: 0
    }
];


const catINITSet: CatI[] = [
    {
        id: uuidv4(),
        name: '',
        age: 0,
        weight: 0,
        genderMale: true,
        dislikes: [],
        portionSize: 0,
        mealsTest: createMealStore(undefined),
        mealsPromonat: createMealStore(undefined),
        mealsTestTotalPrice: 0,
        mealsPromonatTotalPrice: 0
    },

];

export const catStore = createCatStore(catTestSet);
