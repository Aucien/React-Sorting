//Translated Insertionsort from https://algs4.cs.princeton.edu/25applications/Insertion.java.html
export function InsertionSort(array){
  const animations = [];
  InsertHelper(array, animations, array.length)
  return animations;
}

function InsertHelper(arr, animations, high){
  for (let i = 1; i < high; ++i) {
    for (let j = i - 1; j >= 0; --j) {
      animations.push([[j, j + 1], false]);
      if (arr[j + 1] < arr[j]) {
        animations.push([[j, arr[j + 1]], true]);
        animations.push([[j + 1, arr[j]], true]);
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      } else{
        break;
      }
    }
  }
}

//Translated MergeSort from https://algs4.cs.princeton.edu/22mergesort/Merge.java.html
export function MergeSort(array){
  const animations = [];
  const aux = Array(array.length);
  MergeHelper(array, aux, animations, 0, array.length - 1)
  return animations;
}
function MergeHelper(arr, aux, animations, low, high){
  if (high <= low){
    return;
  }
  const mid = low + Math.floor((high - low) /2);
  MergeHelper(arr, aux, animations, low, mid);
  MergeHelper(arr, aux, animations, mid+1, high);
  merge(arr, aux, animations, low, mid, high)
}

function merge(arr, aux, animations, low, mid, high){
  let i = low;
  let j = mid + 1;
  for (let k = low; k <= high; k++){
    aux[k] = arr[k];
  }
  for (let k = low; k <= high; k++) {
    if (i > mid) {
      animations.push([[j, j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else if (j > high) {
      animations.push([[i, i], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push([[i, j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else {
      animations.push([[i, j], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    }
  }
}