
export function getPortionSizeFromCatWeight(weight: number) {
    if (weight <= 2) {
        return 100;
    }
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
    return 350;
}


//Accepts dictionary of meals - this dictionary will have 1,2,3,4 meals in it. Returns dictionary of meals populated for 14 days. function divideMeals IntoDays (meals: { [key: string]: number }, days: number) {
export function divideMealsIntoDays(meals: { [key: string]: number }, days: number) {
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