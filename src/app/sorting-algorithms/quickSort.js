// Runtime: O(NlogN)

import {swap} from '../helper-functions/swap';

// Driver code
export const QuickSortAnimations = (values) => {
    const animations = [];
    const array = [...values]

    if (array.length <= 1) return animations;

    quickSort(array, animations, 0, array.length - 1);

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

    for(let j = low; j < high; j++) {
        // we are comparing index j with pivot
        animations.push(['compare1', j, high]);
        animations.push(['compare2', j, high]);

        if(array[j] < pivot) {
            i++;
            animations.push(['swap', j, array[i]]);
            animations.push(['swap', i, array[j]]);

            // swap arr[i] and arr[j]
            swap(array, i, j);
        }
    }

    animations.push(['swap', i+1, array[high]]);
    animations.push(['swap', high, array[i + 1]]);

    // swap arr[i+1] and pivot so that pivot is placed in the currect position
    swap(array, i + 1, high)
    
    //return pivot's position
    return i + 1;
}
