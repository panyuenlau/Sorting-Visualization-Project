//Runtime: O(Nlog(N))

import {swap} from './swapHelper.js';

export const HeapSortAnimations = (array) => {
    const animations = [];
    let N = array.length;

    // build max heap
    for(let i = N / 2 - 1; i >= 0; i--)
        heapify(array, N, i);
    
    // one by one extract an element from heap
    for(let i = N - 1; i > 0; i--){
        animations.push(['swap', i, array[0]]);
        animations.push(['swap', 0, array[i]]);

        // swap current root to the end
        swap(array, 0, i);

        // Heapify the reduced heap
        heapifyWithAnimation(array, i, 0, animations);
    }

    console.log(array);
    return animations;
}


// to heapify a subtree rooted with node i which is an index in array[]
// n is size of the heap
function heapify(array, n, i) {
    // Find largest among root, left child and right child
    let largest = i;
    let l = 2 * i + 1;
    let r = 2* i + 2;

    // if left child > root
    if( l < n && array[l] > array[largest]) {

        largest = l;
    }
    
    // if left child > largest so far
    if(r < n && array[r] > array[largest])
        largest = r;
    
    // if the largest is not root
    if (largest != i) {

        swap(array, i, largest);

        // recursively heapify the subtree
        heapify(array, n, largest);
    }

}

// to heapify a subtree rooted with node i which is an index in array[]
// n is size of the heap
function heapifyWithAnimation(array, n, i, animations) {
    // Find largest among root, left child and right child
    let largest = i;
    let l = 2 * i + 1;
    let r = 2* i + 2;

    // if left child > root
    if( l < n && array[l] > array[largest]) {
        animations.push(['compare1', l, largest]);
        animations.push(['compare2', l, largest]);

        largest = l;
    }
    
    // if left child > largest so far
    if(r < n && array[r] > array[largest]) {
        animations.push(['compare1', r, largest]);
        animations.push(['compare2', r, largest]);
        largest = r;
    }

    // if the largest is not root
    if (largest != i) {
        animations.push(['swap', i, array[largest]]);
        animations.push(['swap', largest, array[i]]);

        swap(array, i, largest);

        // recursively heapify the subtree
        heapify(array, n, largest);
    }

}