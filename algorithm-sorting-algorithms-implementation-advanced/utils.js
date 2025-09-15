// utils.js (Helper functions)
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function generateRandomArray(n, max) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * max));
}

module.exports = { swap, generateRandomArray };