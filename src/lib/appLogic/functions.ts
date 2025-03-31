
export function getPortionSizeFromCatWeight(weight: number) {
    console.log("checking weight ! ", weight, weight <= 2);
    if (weight <= 3) {
        return 150;

    }
    if (weight <= 4) {
        return 200;

    }
    if (weight <= 5) {
        return 250;
    }
    if (weight <= 6) {
        return 300;
    }
    return 300;
}


//Accepts dictionary of meals - this dictionary will have 1,2,3,4 meals in it. Returns dictionary of meals populated for 14 days. function divideMeals IntoDays (meals: { [key: string]: number }, days: number) {
export function divideMealsIntoDays(meals: { [key: string]: number }, days: number) {

    console.log("meals", meals, days);
    
    const mealsArray = Object.values(meals);
    const numberOfRecipes = mealsArray.length;
    while (days > 0) {
        const index = days % numberOfRecipes;
        mealsArray[index] += 1;
        days--;
    }

    //Turn array back into dictionary
    mealsArray.forEach((meal, index) => {
        meals[Object.keys(meals)[index]] = meal;
    });

    return meals;

}


export function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
