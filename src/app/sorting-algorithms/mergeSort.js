// Runtime: O（NlogN)

export const MergeSortAnimations = (values) => {
  const animations = [];
  const array = [...values];
  const auxiliaryArray = [...values]; // shallow copy of original arra

  if (values.length <= 1) return animations;

  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return [animations, array];
};

function mergeSortHelper(
  originalArray,
  start,
  end,
  auxiliaryArray,
  animations
) {
  if (start === end) return;
  const middle = Math.floor((start + end) / 2);

  // sort first and second halves
  mergeSortHelper(auxiliaryArray, start, middle, originalArray, animations);
  mergeSortHelper(auxiliaryArray, middle + 1, end, originalArray, animations);

  // merge the sorted halves
  merge(originalArray, start, middle, end, auxiliaryArray, animations);
}

function merge(originalArray, start, middle, end, auxiliaryArray, animations) {
  let k = start;
  let i = start;
  let j = middle + 1;

  while (i <= middle && j <= end) {
    // these are the values that are being compared, push them once to change their color
    animations.push(["compare1", i, j]);
    // push them second time to revert their color
    animations.push(["compare2", i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push(["swap", k, auxiliaryArray[i]]);
      originalArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push(["swap", k, auxiliaryArray[j]]);
      originalArray[k++] = auxiliaryArray[j++];
    }
  }

  // add the remaining elements in the first interval
  while (i <= middle) {
    animations.push(["compare1", i, i]);
    animations.push(["compare2", i, i]);
    animations.push(["swap", k, auxiliaryArray[i]]);

    // overwrite the value at index k with value at index i
    originalArray[k++] = auxiliaryArray[i++];
  }

  // add the remaining elements in the second interval
  while (j <= end) {
    animations.push(["compare1", j, j]);
    animations.push(["compare2", j, j]);

    animations.push(["swap", k, auxiliaryArray[j]]);

    originalArray[k++] = auxiliaryArray[j++];
  }
}
