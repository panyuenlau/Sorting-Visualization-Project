// Runtime: O(N^2)
import {swap} from './swapHelper.js';

export const BubbleSortAnimations = (array) => {
    const animations = [];

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Comparing j and j+1            
            animations.push(['compare1', j, j+1]);
            animations.push(['compare2', j, j+1]);
        
            if(array[j] > array[j+1]) {
                // [index1, newHeight1, index2, newHeight2]
                // animations.push([j, array[j+1], j+1, array[j]]);
                animations.push(['swap', j, array[j+1]]);
                animations.push(['swap', j + 1, array[j]]);
                
                swap(array, j, j+1);
            }
            // } else {
            //     // [index1, newHeight1, index2, newHeight2]
            //     // animations.push([j, array[j], j+1, array[j+1]]);
            //     animations.push(['swap'])
            // }
        }
    }
    console.log(animations);
    return animations;
}
