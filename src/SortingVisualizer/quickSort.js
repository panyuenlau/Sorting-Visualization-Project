// Runtime: O(NlogN)

import {swap} from './swapHelper.js';

// Driver code
export const QuickSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;

    quickSort(array, animations, 0, array.length - 1);

    console.log(animations);
    return animations;
}


function quickSort(array, animations, low, high) {
    if (low < high) {
        // select pivot position and pull all elements < pivot on left and > pivot on right

        let pivot_pos = partition(array, animations, low, high);

        // sort elemest on the left of pivot
        quickSort(array, animations, low, pivot_pos - 1);

        // sort elements on the right of pivot
        quickSort(array, animations, pivot_pos + 1, high);
    }
}

function partition(array, animations, low, high) {
    // always pick the last element as the pivot
    let pivot = array[high];
    let i = low - 1;

    // store the pivot position into animations array
    // animations.push([high, high]);
    // animations.push([high, high]);

    for(let j = low; j < high; j++) {
        // we are comparing index j with pivot
        animations.push([j, high]);
        animations.push([j, high]);

        if(array[j] < pivot) {
            i++;
            animations.push([j, array[i]]);
            animations.push([i, array[j]]);

            // swap arr[i] and arr[j]
            swap(array, i, j);
        } else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
        animations.push([-1, -1]);
        animations.push([-1, -1]);
    }

    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);

    animations.push([i+1, array[high]]);
    animations.push([high, array[i + 1]]);

    // swap arr[i+1] and pivot so that pivot is placed in the currect position
    swap(array, i + 1, high)
    
    //return pivot's position
    return i + 1;
}
