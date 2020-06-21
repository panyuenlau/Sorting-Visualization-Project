// a helper function to swap array[i] and array[j]
export const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
