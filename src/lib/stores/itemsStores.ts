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

const mealTypes = [
    { type: MealType.HUHN, image: 'images/Huhn.webp', description: 'Bio-Hühnerfleisch mit Karotten' },
    { type: MealType.RIND, image: 'images/Rind.webp', description: 'Bio-Rindfleisch mit Broccoli' },
    { type: MealType.PUTE, image: 'images/Pute.webp', description: 'Bio-Putenfleisch mit Kürbis' },
    { type: MealType.SCHWEIN, image: 'images/Schwein.webp', description: 'Bio-Schweinefleisch mit Zucchini' }
  ]

export const updateCatColor = (index: number, color: string) => {
	catStore.update((cats) => {
		if (index >= 0 && index < cats.length) {
			cats[index].color = color;
		}
		return cats;
	});
};

export const updateCatRace = (index: number, race: string) => {
	catStore.update((cats) => {
		if (index >= 0 && index < cats.length) {
			cats[index].race = race;
		}
		return cats;
	});
};


function createCatStore(init: CatI[] | undefined): CatStore {
    const { subscribe, set, update } = writable<CatI[]>(init);


   
    
    return {
        subscribe,
        set,
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
                console.log("store in add cat", store)
                return [...store].concat({
                    id: uuidv4(),
                    name: '',
                    age: 0,
                    weight: 0,
                    genderMale: true,
                    likes: ['pute', 'huhn', 'rind', 'schwein'],
                    portionSize: 0,
                    mealsTest: createMealStore(undefined),
                    mealsTestTotalPrice: 0,
                    mealsPromonat: createMealStore(undefined),
                    mealsPromonatTotalPrice: 0
                })
            })
        },
        updateCatname:  (catIndex: number, name: string) => {
            update((store) => {
                store[catIndex].name = name
                return store 
            })
        },
        updateCatWeight:  (catIndex: number, weight: number) => {
            update((store) => {
                store[catIndex].weight = weight
                return store 
            })
        },
        updateCatGender:  (catIndex: number, genderMale: boolean) => {
            update((store) => {
                store[catIndex].genderMale = genderMale
                return store 
            })
        },
        updateCatAge:  (catIndex: number, age: number) => {
            update((store) => {
                store[catIndex].age = age
                return store 
            })
        },
        updateCatLikes:  (catIndex: number, likes: string[]) => {
            update((store) => {
                store[catIndex].likes = likes
                
                return store 
            })
        },
        updateTotalMealPriceForCat: (catIndex: number, proMonat: boolean) => {
            update((store) => {
                let mealsPrice = 0
                const thisCatStore = store[catIndex]
                    // console.log("store[catIndex].mealsPromonat", store[catIndex].mealsPromonat)
                    thisCatStore.mealsPromonat.subscribe((meals) => {
                        meals.forEach((meal, index) => {
                            mealsPrice += meal.totalMealPrice
                        })
                    })


                  
                    thisCatStore.mealsPromonatTotalPrice = mealsPrice
                    mealsPrice = 0
                    // console.log("thisCatStore.mealsTest", thisCatStore.mealsTest)
                    thisCatStore.mealsTest.subscribe((meals) => {
                        // console.log("meals SGAEWHWE", meals)
                        meals.forEach((meal, index) => {
                            mealsPrice += meal.totalMealPrice
                        })
                    })
                    thisCatStore.mealsTestTotalPrice = mealsPrice
                
                return store
            })
        },
        updatePortionSize: (catIndex: number, newPortionSize: number) => {
            update((store) => {
                store[catIndex].portionSize = newPortionSize
                return store
            })
        },
        getTotalMeals: (catIndex: number, proMonat: boolean) => {
            let mealsNumber = 0
            subscribe((store) => {
                if (proMonat) {
                    // console.log("store[catIndex].mealsPromonat", store[catIndex].mealsPromonat)
                    store[catIndex].mealsPromonat.subscribe((meals) => {
                        meals.forEach((meal, index) => {
                            mealsNumber = mealsNumber + meal.servings
                        })
                    })
                } else {
                    // console.log("store[catIndex].mealsTest", store[catIndex].mealsTest)
                    store[catIndex].mealsTest.subscribe((meals) => {
                        meals.forEach((meal, index) => {
                            mealsNumber = mealsNumber + meal.servings
                        })
                    })
                }
            })
            return mealsNumber
        },
    };
}

export interface CatStore extends Writable<CatI[]> {
    addCat: () => void
    removeLastCat: () => void
    updateCatname:  (catIndex: number, name: string) => void
    updateCatWeight:  (catIndex: number, weight: number) => void
    updateCatGender:  (catIndex: number, genderMale: boolean) => void
    updateCatAge:  (catIndex: number, age: number) => void
    updateCatLikes:  (catIndex: number, likes: string[]) => void
    updateTotalMealPriceForCat: (newPrice: number, proMonat: boolean) => void
    updatePortionSize: (catIndex: number, newPortionSize: number) => void
    getTotalMeals: (catIndex: number, proMonat: boolean) => number
}
export interface CatMealStore extends Writable<CatMealI[]> {
    decrementServingsForMeal: (i: number) => void
    incrementServingsForMeal: (i: number) => void
    setNewMenuFromCalculation: (calculatedMenu: { [key: string]: number }, recommendedPotionSize: number) => string
    updateMealPrice: (newPrice: number) => void
}

function createMealStore(init: CatMealI[] | undefined):CatMealStore {
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
                    description: mealTypes.find((meal) => meal.type === key as MealType)!.description,
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
        likes: ['pute'],
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
        likes: ['huhn', 'rind'],
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
        likes: ['schwein'],
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
        likes: ['pute', 'huhn', 'rind', 'schwein'],
        portionSize: 0,
        mealsTest: createMealStore(undefined),
        mealsPromonat: createMealStore(undefined),
        mealsTestTotalPrice: 0,
        mealsPromonatTotalPrice: 0
    },

];

export const catStore = createCatStore(catINITSet);
