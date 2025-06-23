const { countSetBits, reverseBits, findSingleNonRepeating, isPowerOfTwo, swapNumbers } = require('./algorithms');

// Test cases for countSetBits
console.log("Count Set Bits Tests:");
console.log(countSetBits(5) === 2); // 101
console.log(countSetBits(10) === 2); // 1010
console.log(countSetBits(0) === 0);
console.log(countSetBits(15) === 4); // 1111

// Test cases for reverseBits
console.log("\nReverse Bits Tests:");
console.log(reverseBits(43261596) === 964176192); //Example
console.log(reverseBits(1) === 2147483648); // Edge case: reversing a single bit (assuming 32-bit)

// Test cases for findSingleNonRepeating
console.log("\nFind Single Non-Repeating Tests:");
console.log(findSingleNonRepeating([2,2,1]) === 1);
console.log(findSingleNonRepeating([4,1,2,1,2]) === 4);
console.log(findSingleNonRepeating([1]) === 1);

// Test cases for isPowerOfTwo
console.log("\nIs Power of Two Tests:");
console.log(isPowerOfTwo(16) === true);
console.log(isPowerOfTwo(10) === false);
console.log(isPowerOfTwo(0) === false);

//Test cases for swapNumbers
console.log("\nSwap Numbers Tests:");
console.log(swapNumbers(5,10)); //[10,5]