// a helper function to swap arr[i] and arr[j]
export const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}