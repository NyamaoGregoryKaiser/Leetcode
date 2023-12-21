**custom comparator function.c++**

The provided code does determine the minimum number of swaps required to sort an array using a custom comparator function.
explanation to the code.
1. **Array Pairing and Sorting**: Creates a vector of pairs (`arrPos`) from the input array `arr`, pairing each element with its index, and then sorts this vector.

2. **Visited Tracking**: Initializes a boolean vector `visited` to keep track of elements already processed in swap cycles.

3. **Cycle Detection**: Iterates through `arrPos`, identifying cycles where elements are out of place and marking them as visited.

4. **Swap Counting**: For each detected cycle, calculates the required swaps as one less than the cycle size and adds to the total swap count.

5. **Result**: Returns the total number of swaps needed to sort the original array.

**3.Reverse Triangle Pyramid**
Explanation:

Data segment:

nl stores the newline character (10, 13, and $).
Code segment:

main procedure:
mov cx, 5: Sets the row counter to 5.
outer_loop: Iterates for each row.
mov bx, cx: Saves the row counter temporarily.
inner_loop1: Prints leading spaces.
mov dx, ' ': Sets the character to print to a space.
int 21h: Prints the character using DOS interrupt 21h.
dec bx: Decrements the temporary counter.
jnz inner_loop1: Repeats until all leading spaces are printed.
mov dx, '*': Sets the character to print to an asterisk.
mov cx, 2 * (5 - cx) + 1: Calculates the number of asterisks needed for the current row.
inner_loop2: Prints the asterisks.
int 21h: Prints the asterisk.
loop inner_loop2: Repeats until all asterisks are printed.
lea dx, nl: Loads the newline string.
int 21h: Prints the newline.
loop outer_loop: Continues the outer loop for the next row.
mov ah, 4ch: Sets the function code to exit the program.
int 21h: Executes the exit function.
Output:

    *
   ***
  *****
 *******
*********
