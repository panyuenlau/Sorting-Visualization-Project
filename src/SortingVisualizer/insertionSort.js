//Runtime: O(N^2)

import {swap} from './swapHelper.js';

export const InsertionSortAnimations = (array) => {
    const animations = [];

    for(let i = 0; i < array.length - 1; i++) {
        // Find the minimum element in the unsorted portion
        let mind_inx = i;
        for(let j = i + 1; j < array.length; j++) {
            animations.push(['compare1', i, j]);
            animations.push(['compare2', i, j]);
            
            if(array[j] < array[mind_inx]) {
                mind_inx = j;
            }
        }
        
        // do the swap
        animations.push(['swap', i, array[mind_inx]]);
        animations.push(['swap', mind_inx, array[i]]);

        swap(array, mind_inx, i);
    }

    return animations;
}