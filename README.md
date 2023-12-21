custom comparator function.c++

The provided code does determine the minimum number of swaps required to sort an array using a custom comparator function.
explanation to the code.
1. **Array Pairing and Sorting**: Creates a vector of pairs (`arrPos`) from the input array `arr`, pairing each element with its index, and then sorts this vector.

2. **Visited Tracking**: Initializes a boolean vector `visited` to keep track of elements already processed in swap cycles.

3. **Cycle Detection**: Iterates through `arrPos`, identifying cycles where elements are out of place and marking them as visited.

4. **Swap Counting**: For each detected cycle, calculates the required swaps as one less than the cycle size and adds to the total swap count.

5. **Result**: Returns the total number of swaps needed to sort the original array.
