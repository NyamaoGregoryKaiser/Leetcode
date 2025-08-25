#include <iostream>
#include <vector>
#include "hash_table.h"

using namespace std;

// Implement Two Sum, Valid Anagram, etc. here using the HashTable class.  Each problem should have multiple solutions if possible (e.g., brute force and optimized hash table solution).

int main() {
    // Example usage:
    HashTable<int, int> ht(10);
    ht.insert(1, 10);
    ht.insert(2, 20);
    cout << ht.get(1) << endl; // Output: 10

    return 0;
}