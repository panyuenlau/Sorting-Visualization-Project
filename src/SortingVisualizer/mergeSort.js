export const MergeSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice(); // shallow copy of original array
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(originalArray, start, end, auxiliaryArray, animations) {

    if(start === end) return;
    const middle = Math.floor((start + end) / 2);

    // sort first and second halves
    mergeSortHelper(auxiliaryArray, start, middle, originalArray, animations);
    mergeSortHelper(auxiliaryArray, middle+1, end, originalArray, animations);
    
    // merge the sorted halves
    merge(originalArray, start, middle, end, auxiliaryArray, animations);
}

function merge(originalArray, start, middle, end, auxiliaryArray, animations) {
    let k = start;
    let i = start;
    let j = middle + 1;

    // console.log("initial: ", start, middle, end);

    while(i <= middle && j <= end) {
        // these are the values that are being compared, push them once to change their color
        animations.push([i, j]);
        // push them second time to revert their color
        animations.push([i, j]);

        console.log(i, j);

        if(auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i], j, auxiliaryArray[j]]);
            originalArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j], j, auxiliaryArray[i]])
            originalArray[k++] = auxiliaryArray[j++];
        }
    }

    // add the remaining elements in the first interval
    while (i <= middle) {
        animations.push([i, i]);
        animations.push([i, i]);

        animations.push([k, auxiliaryArray[i], k, auxiliaryArray[i]]);
        originalArray[k++] = auxiliaryArray[i++];
    }

    // add the remaining elements in the second interval
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxiliaryArray[j], k, auxiliaryArray[j]]);
        originalArray[k++] = auxiliaryArray[j++];
    }
}

