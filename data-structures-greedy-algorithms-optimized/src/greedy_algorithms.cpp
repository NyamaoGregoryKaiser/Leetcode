```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::sort
#include <numeric>   // For std::accumulate
#include <queue>     // For std::priority_queue
#include <map>       // For Huffman frequency map
#include <string>    // For Huffman codes

/**
 * @file greedy_algorithms.cpp
 * @brief Implementations of various Greedy Algorithms with detailed comments and complexity analysis.
 */

// --- Problem 1: Activity Selection Problem ---

/**
 * @brief Represents an activity with a start and finish time.
 */
struct Activity {
    int start;
    int finish;
    int id; // Optional: to identify the original activity

    // Constructor for easy initialization
    Activity(int s = 0, int f = 0, int i = 0) : start(s), finish(f), id(i) {}

    // Comparison operator for sorting based on finish time
    bool operator<(const Activity& other) const {
        return finish < other.finish;
    }
};

/**
 * @brief Solves the Activity Selection Problem using a greedy approach.
 *
 * Given a set of activities, each with a start and finish time, select the
 * maximum number of non-overlapping activities that can be performed.
 *
 * @param activities A vector of `Activity` objects.
 * @return A vector of `Activity` objects representing the selected non-overlapping activities.
 *
 * @complexity
 *   - Time: O(N log N) due to sorting the activities by finish time.
 *           The iteration through sorted activities is O(N).
 *   - Space: O(N) if a copy of activities is made for sorting, or O(1) if sorting in-place
 *            and storing selected activities in a new vector. Here, we modify the input vector copy.
 *
 * @approach
 *   1. **Sort by Finish Time**: The core greedy strategy is to always pick the activity
 *      that finishes earliest among the available (compatible) activities. To facilitate
 *      this, sort all activities in ascending order of their finish times.
 *   2. **Select First Activity**: Pick the first activity from the sorted list (it has
 *      the earliest finish time). Add it to the result set.
 *   3. **Iterate and Select**: Iterate through the remaining activities. For each activity,
 *      check if its start time is greater than or equal to the finish time of the
 *      last selected activity. If it is, this activity is compatible; select it and
 *      update the finish time of the last selected activity.
 *   4. **Proof of Optimality (Sketch)**:
 *      Let `A` be an optimal solution and `G` be the greedy solution.
 *      Assume `G` is not optimal. Let `a1` be the first activity chosen by greedy (earliest finish time).
 *      Let `o1` be the first activity chosen by `A` (sorted by finish time).
 *      Since `a1` has the earliest finish time among all activities, `finish(a1) <= finish(o1)`.
 *      If `a1 != o1`, we can replace `o1` with `a1` in `A` to form a new optimal solution `A'`.
 *      `A'` is also valid because `a1` finishes no later than `o1`, meaning `a1` is compatible
 *      with any activity that `o1` was compatible with.
 *      By repeatedly applying this exchange argument, we can show that the greedy choice
 *      can always be part of an optimal solution. The property that makes greedy work here
 *      is the "optimal substructure" and "greedy choice property".
 */
std::vector<Activity> selectActivities(std::vector<Activity> activities) {
    // Edge case: No activities
    if (activities.empty()) {
        return {};
    }

    // Step 1: Sort activities by their finish times
    // O(N log N)
    std::sort(activities.begin(), activities.end());

    std::vector<Activity> selected;

    // Step 2: Select the first activity (which has the earliest finish time)
    // O(1)
    selected.push_back(activities[0]);
    int last_finish_time = activities[0].finish;

    // Step 3: Iterate through the remaining activities and select compatible ones
    // O(N)
    for (size_t i = 1; i < activities.size(); ++i) {
        // If the current activity's start time is greater than or equal to
        // the finish time of the last selected activity, it's non-overlapping.
        if (activities[i].start >= last_finish_time) {
            selected.push_back(activities[i]);
            last_finish_time = activities[i].finish;
        }
    }

    return selected;
}


// --- Problem 2: Fractional Knapsack Problem ---

/**
 * @brief Represents an item with a weight, value, and calculated value-to-weight ratio.
 */
struct Item {
    int weight;
    int value;
    double ratio; // value / weight

    // Constructor
    Item(int w = 0, int v = 0) : weight(w), value(v) {
        if (w > 0) {
            ratio = static_cast<double>(v) / w;
        } else {
            ratio = 0.0; // Handle zero weight items, though problem usually implies positive weight
        }
    }

    // Comparison operator for sorting based on ratio (descending)
    bool operator<(const Item& other) const {
        return ratio > other.ratio; // Sort in descending order of ratio
    }
};

/**
 * @brief Solves the Fractional Knapsack Problem using a greedy approach.
 *
 * Given a set of items, each with a weight and a value, and a knapsack with a
 * maximum capacity, determine the maximum total value that can be obtained
 * by taking fractions of items.
 *
 * @param items A vector of `Item` objects.
 * @param capacity The maximum capacity of the knapsack.
 * @return The maximum total value that can be obtained.
 *
 * @complexity
 *   - Time: O(N log N) due to sorting the items by value-to-weight ratio.
 *           The iteration through sorted items is O(N).
 *   - Space: O(N) if a copy of items is made for sorting, or O(1) if sorting in-place.
 *
 * @approach
 *   1. **Calculate Ratios**: For each item, calculate its value-to-weight ratio (`value / weight`).
 *   2. **Sort by Ratio**: Sort all items in descending order of their value-to-weight ratios.
 *      This is the greedy choice: always pick the item that yields the most value per unit of weight.
 *   3. **Fill Knapsack**: Iterate through the sorted items:
 *      a. If the current item's weight is less than or equal to the remaining knapsack capacity,
 *         take the whole item. Add its value to the total and decrease capacity by its weight.
 *      b. If the current item's weight is greater than the remaining capacity, take a fraction
 *         of the item. The fraction taken is `remaining_capacity / item_weight`. Add the
 *         corresponding fractional value to the total and set remaining capacity to 0.
 *         Then, break, as the knapsack is full.
 *   4. **Proof of Optimality (Sketch)**:
 *      Suppose there is an optimal solution that does not follow the greedy strategy.
 *      This means there must be two items, `A` and `B`, in the optimal solution such that
 *      `ratio(A) < ratio(B)`, but `A` is taken (partially or fully) and `B` is not (or taken less than it could be).
 *      We can improve this solution by replacing a small amount of `A` with an equal weight of `B`.
 *      Since `ratio(B) > ratio(A)`, replacing `A` with `B` for the same weight will increase the total value.
 *      This contradicts the assumption that the original solution was optimal.
 *      This exchange argument shows that the greedy choice (prioritizing higher ratio items)
 *      always leads to an optimal solution for the Fractional Knapsack problem.
 */
double fractionalKnapsack(std::vector<Item> items, int capacity) {
    // Edge case: No items or zero capacity
    if (items.empty() || capacity <= 0) {
        return 0.0;
    }

    // Step 1 & 2: Calculate ratios (done in Item constructor) and sort by ratio (descending)
    // O(N log N)
    std::sort(items.begin(), items.end());

    double total_value = 0.0;
    int current_capacity = capacity;

    // Step 3: Iterate through sorted items and fill knapsack
    // O(N)
    for (const auto& item : items) {
        if (current_capacity <= 0) {
            break; // Knapsack is full
        }

        if (item.weight <= current_capacity) {
            // Take the whole item
            total_value += item.value;
            current_capacity -= item.weight;
        } else {
            // Take a fraction of the item
            double fraction = static_cast<double>(current_capacity) / item.weight;
            total_value += item.value * fraction;
            current_capacity = 0; // Knapsack is now full
        }
    }

    return total_value;
}


// --- Problem 3: Coin Change Problem (Greedy for specific coin sets) ---

/**
 * @brief Solves the Coin Change Problem using a greedy approach.
 *
 * Given a set of coin denominations and an amount, find the minimum number
 * of coins to make up that amount.
 *
 * IMPORTANT NOTE: This greedy strategy (always picking the largest denomination)
 * ONLY WORKS OPTIMALLY for specific coin systems (e.g., standard US currency:
 * 1, 5, 10, 25, 50, 100 cents). It does NOT work for arbitrary coin sets.
 * For arbitrary coin sets, Dynamic Programming (DP) is required.
 *
 * Example where greedy fails: coins = {1, 3, 4}, amount = 6
 * Greedy: {4, 1, 1} -> 3 coins
 * Optimal (DP): {3, 3} -> 2 coins
 *
 * @param coins A vector of available coin denominations (assumed to be sorted descending).
 * @param amount The target amount.
 * @return The minimum number of coins, or -1 if the amount cannot be made.
 *
 * @complexity
 *   - Time: O(M) where M is the number of coin denominations.
 *           If coins are not sorted, an initial sort takes O(M log M).
 *   - Space: O(1)
 *
 * @approach
 *   1. **Sort Denominations**: Ensure the coin denominations are sorted in descending order.
 *      This allows us to prioritize larger coins.
 *   2. **Iterate and Select**: Iterate through the sorted coin denominations. For each coin:
 *      a. While the remaining `amount` is greater than or equal to the current coin's value,
 *         take that coin. Increment the coin count and subtract the coin's value from the `amount`.
 *   3. **Check Result**: After iterating through all coins, if the `amount` is 0,
 *      the total coin count is the minimum. Otherwise, the amount cannot be made with the given coins.
 *
 * @when_greedy_works
 *   A common condition for greedy coin change to be optimal is if, for any two denominations
 *   `c_i` and `c_j` with `c_i < c_j`, and for any amount `x >= c_j`, the optimal way to
 *   make change for `x` does not involve `c_i` if `x - c_j` can be made optimally without `c_i`.
 *   More formally, for canonical coin systems, a common property is that if we replace the largest
 *   coin `C` with `k` coins of value `c_i`, then `k * c_i = C`.
 */
int coinChangeGreedy(std::vector<int> coins, int amount) {
    // Edge cases
    if (amount < 0) return -1;
    if (amount == 0) return 0;
    if (coins.empty()) return -1;

    // Step 1: Sort coins in descending order.
    // If input is guaranteed sorted, this step can be skipped.
    // O(M log M) where M is number of denominations.
    std::sort(coins.rbegin(), coins.rend()); // Reverse iterators for descending sort

    int num_coins = 0;

    // Step 2: Iterate through coins and take as many as possible
    // O(M) in worst case, as inner loop runs at most (amount / smallest_coin) times total.
    for (int coin : coins) {
        while (amount >= coin) {
            amount -= coin;
            num_coins++;
        }
    }

    // Step 3: Check if the exact amount was made
    if (amount == 0) {
        return num_coins;
    } else {
        return -1; // Cannot make the exact amount
    }
}


// --- Problem 4: Huffman Coding ---

/**
 * @brief Node structure for the Huffman Tree.
 */
struct HuffmanNode {
    char data;          // Character for leaf nodes, '\0' for internal nodes
    int frequency;      // Frequency of the character/subtree
    HuffmanNode *left, *right; // Pointers to left and right children

    // Constructor for leaf nodes
    HuffmanNode(char data_char, int freq) : data(data_char), frequency(freq), left(nullptr), right(nullptr) {}

    // Constructor for internal nodes
    HuffmanNode(int freq, HuffmanNode* l, HuffmanNode* r) : data('\0'), frequency(freq), left(l), right(r) {}

    // Destructor to free memory (important for tree structures)
    ~HuffmanNode() {
        delete left;
        delete right;
    }
};

/**
 * @brief Comparison struct for priority queue (min-heap based on frequency).
 */
struct CompareNodes {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->frequency > b->frequency; // Min-heap: smallest frequency has highest priority
    }
};

/**
 * @brief Builds the Huffman Tree using a greedy approach.
 *
 * @param frequencies A map where keys are characters and values are their frequencies.
 * @return The root node of the constructed Huffman Tree.
 *
 * @complexity
 *   - Time: O(N log N) where N is the number of unique characters.
 *           Building the priority queue takes O(N). Each of (N-1) merges involves
 *           extracting two min elements (O(log N)) and inserting one new element (O(log N)).
 *   - Space: O(N) for the priority queue and the tree nodes.
 *
 * @approach
 *   1. **Initialize Priority Queue**: Create a min-priority queue and add a `HuffmanNode`
 *      for each character with its frequency. Each node is initially a leaf.
 *   2. **Greedy Merge**: While there is more than one node in the priority queue:
 *      a. Extract the two nodes with the smallest frequencies (greedy choice).
 *      b. Create a new internal node. Its frequency is the sum of the two extracted nodes' frequencies.
 *         The extracted nodes become its left and right children.
 *      c. Insert the new internal node back into the priority queue.
 *   3. **Final Tree**: The last remaining node in the priority queue is the root of the Huffman Tree.
 *
 * @proof_of_optimality (High-level)
 *   Huffman coding's optimality relies on the "greedy choice property" and "optimal substructure."
 *   The greedy choice is to merge the two least frequent nodes. Intuitively, these are the ones
 *   that should have the longest codes, so putting them deepest in the tree (by merging them first)
 *   is optimal.
 *   Formally, it can be proven by showing that there exists an optimal prefix code in which the
 *   two least frequent characters have sibling leaves (are directly merged). Then, by combining
 *   them into a single "meta-character" whose frequency is their sum, the problem reduces to a
 *   smaller, similar problem, demonstrating optimal substructure.
 */
HuffmanNode* buildHuffmanTree(const std::map<char, int>& frequencies) {
    // Edge case: empty frequencies
    if (frequencies.empty()) {
        return nullptr;
    }
    // Edge case: single character. Tree will just be that node.
    if (frequencies.size() == 1) {
        return new HuffmanNode(frequencies.begin()->first, frequencies.begin()->second);
    }

    // Step 1: Initialize priority queue with leaf nodes for each character
    // O(N) to push N nodes
    std::priority_queue<HuffmanNode*, std::vector<HuffmanNode*>, CompareNodes> pq;
    for (auto const& [character, freq] : frequencies) {
        pq.push(new HuffmanNode(character, freq));
    }

    // Step 2: Greedy Merge
    // O(N log N) for N-1 merges, each with 2 pops and 1 push (log N per operation)
    while (pq.size() > 1) {
        // Extract the two nodes with the smallest frequencies
        HuffmanNode* left = pq.top(); pq.pop();
        HuffmanNode* right = pq.top(); pq.pop();

        // Create a new internal node
        HuffmanNode* newNode = new HuffmanNode(left->frequency + right->frequency, left, right);

        // Insert the new node back into the priority queue
        pq.push(newNode);
    }

    // Step 3: The last remaining node is the root of the Huffman Tree
    return pq.top();
}

/**
 * @brief Generates Huffman codes from a Huffman Tree.
 *
 * @param root The root node of the Huffman Tree.
 * @param current_code The current binary code accumulated during traversal.
 * @param huffman_codes A map to store the generated character-code pairs.
 *
 * @complexity
 *   - Time: O(N) where N is the number of nodes in the Huffman tree (roughly 2 * unique_chars - 1).
 *           Each node is visited once.
 *   - Space: O(H) for recursion stack, where H is the height of the tree. O(N) for the result map.
 */
void generateHuffmanCodes(HuffmanNode* root, std::string current_code, std::map<char, std::string>& huffman_codes) {
    if (!root) {
        return;
    }

    // If it's a leaf node, we've found a character and its code
    if (root->data != '\0') { // Check if it's a leaf node (has a character)
        huffman_codes[root->data] = current_code;
    }

    // Traverse left (add '0') and right (add '1')
    generateHuffmanCodes(root->left, current_code + "0", huffman_codes);
    generateHuffmanCodes(root->right, current_code + "1", huffman_codes);
}

// Public interface for Huffman Coding
std::map<char, std::string> huffmanCoding(const std::map<char, int>& frequencies) {
    HuffmanNode* root = buildHuffmanTree(frequencies);
    std::map<char, std::string> codes;

    if (!root) {
        return codes; // Empty map if no frequencies
    }

    // Special case: Single character input. Its code is "0" by convention, or "" if preferred.
    // My generateHuffmanCodes will return an empty string for a single node tree as it has no left/right children.
    // A single character needs a code. Let's make it "0".
    if (frequencies.size() == 1 && root->data != '\0') {
         codes[root->data] = "0";
    } else {
        generateHuffmanCodes(root, "", codes);
    }

    // Clean up memory
    delete root; // The destructor will recursively delete children

    return codes;
}

```