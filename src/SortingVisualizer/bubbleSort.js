export const BubbleSortAnimations = (array) => {
    const animations = [];


    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            
            animations.push([j, j+1]);
            animations.push([j, j+1]);
        
            if(array[j] > array[j+1]) {
                animations.push([j, array[j+1], j+1, array[j]]);
                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            } else {
                animations.push([j, array[j], j+1, array[j+1]]);
            }
        }
    }

    return animations;
}
