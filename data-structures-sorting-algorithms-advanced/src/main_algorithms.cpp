```cpp
#include "helpers.h"
#include "sort_implementations.h" // For quickSelect, mergeSort etc.
#include <vector>
#include <algorithm> // For std::sort, std::nth_element, std::priority_queue
#include <queue>     // For std::priority_queue
#include <map>       // For Meeting Rooms II sweep line

namespace SortingAlgorithms {

// Forward declarations for helper structs if needed (e.g., Interval, Meeting)
struct Interval {
    int start;
    int end;

    // Constructor for convenience
    Interval(int s, int e) : start(s), end(e) {}

    // Comparison for sorting intervals
    bool operator<(const Interval& other) const {
        if (start != other.start) {
            return start < other.start;
        }
        return end < other.end; // If starts are same, sort by end
    }

    // Equality for testing
    bool operator==(const Interval& other) const {
        return start == other.start && end == other.end;
    }
};

// Helper to print vector of intervals
void print_intervals(const std::vector<Interval>& intervals, const std::string& msg = "") {
    if (!msg.empty()) {
        std::cout << msg;
    }
    std::cout << "[";
    for (size_t i = 0; i < intervals.size(); ++i) {
        std::cout << "[" << intervals[i].start << ", " << intervals[i].end << "]";
        if (i < intervals.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
}


// --- PROBLEM 1: Kth Largest Element in an Array (LeetCode 215) ---

/**
 * @brief Finds the k-th largest element in an unsorted array using QuickSelect.
 *        This is an in-place modification of QuickSort.
 * Time Complexity: O(N) on average, O(N^2) in worst case (rare with randomized pivot).
 * Space Complexity: O(log N) on average for recursion stack, O(N) worst case.
 * @param nums The input vector. It will be modified.
 * @param k The 1-based index of the largest element to find.
 * @return The k-th largest element.
 */
int findKthLargest_QuickSelect(std::vector<int>& nums, int k) {
    // QuickSelect is typically used for k-th smallest.
    // To find the k-th largest, we find the (N - k + 1)-th smallest.
    // Example: k=1 (largest) => find (N-1+1)=Nth smallest.
    // Example: k=N (smallest) => find (N-N+1)=1st smallest.
    return quickSelect(nums, nums.size() - k + 1);
}

/**
 * @brief Finds the k-th largest element in an unsorted array using a Min-Heap (priority queue).
 *        This method is more robust against worst-case O(N^2) behavior of QuickSelect.
 * Time Complexity: O(N log K) to build the heap, where K is the target k.
 *                  Each of N elements takes O(log K) to insert/extract.
 * Space Complexity: O(K) for the min-heap.
 * @param nums The input vector. It remains unchanged.
 * @param k The 1-based index of the largest element to find.
 * @return The k-th largest element.
 */
int findKthLargest_MinHeap(const std::vector<int>& nums, int k) {
    // A min-heap will store the K largest elements found so far.
    // The top of the min-heap will always be the Kth largest element.
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap; // Min-heap

    for (int num : nums) {
        min_heap.push(num);
        if (min_heap.size() > k) {
            min_heap.pop(); // Remove the smallest element if heap size exceeds k
        }
    }
    return min_heap.top();
}

/**
 * @brief Finds the k-th largest element by sorting the entire array.
 *        This is a straightforward but less optimal approach.
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) or O(N) depending on the sort implementation (in-place vs auxiliary space).
 * @param nums The input vector. It will be modified (sorted).
 * @param k The 1-based index of the largest element to find.
 * @return The k-th largest element.
 */
int findKthLargest_Sort(std::vector<int>& nums, int k) {
    std::sort(nums.begin(), nums.end()); // Use std::sort for simplicity (typically IntroSort)
    return nums[nums.size() - k];
}


// --- PROBLEM 2: Sort Colors (Dutch National Flag Problem) (LeetCode 75) ---

/**
 * @brief Sorts an array containing 0s, 1s, and 2s using a one-pass approach (Dutch National Flag).
 *        This is an in-place algorithm.
 * Time Complexity: O(N) because each element is visited at most twice.
 * Space Complexity: O(1).
 * @param nums The input vector of colors (0, 1, or 2). It will be sorted.
 */
void sortColors_DutchNationalFlag(std::vector<int>& nums) {
    int low = 0;           // Pointer for 0s. Everything to its left is 0.
    int mid = 0;           // Current element pointer.
    int high = nums.size() - 1; // Pointer for 2s. Everything to its right is 2.

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else { // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
            // Do not increment mid here, as the swapped element from high
            // could be 0, 1, or 2, and needs to be re-evaluated.
        }
    }
}

/**
 * @brief Sorts an array containing 0s, 1s, and 2s using a two-pass counting approach.
 *        This is an in-place algorithm (after counting).
 * Time Complexity: O(N) for two passes.
 * Space Complexity: O(1) for counts (fixed size 3 array).
 * @param nums The input vector of colors (0, 1, or 2). It will be sorted.
 */
void sortColors_CountingSort(std::vector<int>& nums) {
    int counts[3] = {0, 0, 0}; // counts[0] for 0s, counts[1] for 1s, counts[2] for 2s

    // First pass: count occurrences of each color
    for (int num : nums) {
        if (num >= 0 && num <= 2) {
            counts[num]++;
        }
    }

    // Second pass: overwrite the array based on counts
    int index = 0;
    for (int i = 0; i < 3; ++i) { // For each color (0, 1, 2)
        for (int j = 0; j < counts[i]; ++j) { // Write its count
            nums[index++] = i;
        }
    }
}


// --- PROBLEM 3: Merge Intervals (LeetCode 56) ---

/**
 * @brief Merges overlapping intervals.
 *        The intervals must be sorted by their start times first.
 * Time Complexity: O(N log N) dominated by the initial sorting.
 *                  The merging step itself is O(N).
 * Space Complexity: O(N) for the result vector (in worst case, no overlaps).
 * @param intervals The input vector of intervals. It will be sorted internally.
 * @return A new vector containing the merged intervals.
 */
std::vector<Interval> mergeIntervals(std::vector<Interval>& intervals) {
    if (intervals.empty()) {
        return {};
    }

    // 1. Sort the intervals by their start times.
    // The custom operator< in Interval struct handles this.
    std::sort(intervals.begin(), intervals.end());

    std::vector<Interval> merged_intervals;
    merged_intervals.push_back(intervals[0]); // Start with the first interval

    for (size_t i = 1; i < intervals.size(); ++i) {
        Interval& last_merged = merged_intervals.back();
        Interval& current = intervals[i];

        // If the current interval overlaps with the last merged interval
        // (i.e., current start is less than or equal to last merged end)
        if (current.start <= last_merged.end) {
            // Merge them: update the end of the last merged interval
            last_merged.end = std::max(last_merged.end, current.end);
        } else {
            // No overlap, add the current interval to the result
            merged_intervals.push_back(current);
        }
    }

    return merged_intervals;
}


// --- PROBLEM 4: Meeting Rooms II (LeetCode 253) ---

/**
 * @brief Finds the minimum number of conference rooms required for a set of meetings.
 *        Uses sorting and a min-heap to keep track of meeting end times.
 * Time Complexity: O(N log N) dominated by sorting meetings and heap operations (N insertions/deletions, each log N).
 * Space Complexity: O(N) for storing meeting end times in the min-heap.
 * @param meetings A vector of intervals representing meeting start and end times.
 * @return The minimum number of meeting rooms required.
 */
int minMeetingRooms_Heap(std::vector<Interval>& meetings) {
    if (meetings.empty()) {
        return 0;
    }

    // 1. Sort meetings by their start times.
    std::sort(meetings.begin(), meetings.end());

    // 2. Use a min-heap to store the end times of meetings currently occupying rooms.
    // The top of the heap is the earliest ending meeting.
    std::priority_queue<int, std::vector<int>, std::greater<int>> end_times_min_heap;

    // Add the first meeting's end time to the heap. It needs one room.
    end_times_min_heap.push(meetings[0].end);

    // 3. Iterate through the rest of the meetings.
    for (size_t i = 1; i < meetings.size(); ++i) {
        // If the current meeting's start time is GREATER THAN or EQUAL TO
        // the earliest end time in the heap (top of min-heap),
        // it means we can reuse that room.
        if (meetings[i].start >= end_times_min_heap.top()) {
            end_times_min_heap.pop(); // Remove the finished meeting's end time
        }
        // In either case (reused a room or needed a new one),
        // add the current meeting's end time to the heap.
        end_times_min_heap.push(meetings[i].end);
    }

    // The size of the heap at the end represents the maximum number of
    // concurrent meetings, which is the minimum rooms required.
    return end_times_min_heap.size();
}

/**
 * @brief Finds the minimum number of conference rooms required using a sweep line algorithm.
 *        This approach processes events (meeting starts and ends) in chronological order.
 * Time Complexity: O(N log N) for sorting events. Processing events is O(N).
 * Space Complexity: O(N) for storing events.
 * @param meetings A vector of intervals representing meeting start and end times.
 * @return The minimum number of meeting rooms required.
 */
int minMeetingRooms_SweepLine(std::vector<Interval>& meetings) {
    if (meetings.empty()) {
        return 0;
    }

    // Create a list of events: (time, type). type = +1 for start, -1 for end.
    // Use std::map to automatically sort events by time, and handle multiple events at same time.
    // If multiple events at the same time: process starts before ends.
    std::map<int, int> timeline; // time -> change_in_rooms

    for (const auto& meeting : meetings) {
        timeline[meeting.start]++;  // Meeting starts, room count increases
        timeline[meeting.end]--;    // Meeting ends, room count decreases
    }

    int max_rooms = 0;
    int current_rooms = 0;

    // Iterate through the sorted timeline
    for (const auto& entry : timeline) {
        current_rooms += entry.second;
        max_rooms = std::max(max_rooms, current_rooms);
    }

    return max_rooms;
}


// --- Main function to demonstrate algorithms (for standalone execution) ---
// This main function is primarily for local testing and demonstration.
// The actual testing should be done via `tests/test_main_algorithms.cpp`.
void run_main_algorithms_demo() {
    std::cout << "--- Main Algorithms Demo ---" << std::endl;

    // --- Problem 1: Kth Largest Element ---
    std::cout << "\nProblem 1: Kth Largest Element" << std::endl;
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    int k1 = 2;
    std::cout << "Input: "; print_vector(nums1);
    std::cout << "K: " << k1 << std::endl;
    std::vector<int> nums1_qs = nums1; // Copy for QuickSelect
    std::cout << "Kth Largest (QuickSelect): " << findKthLargest_QuickSelect(nums1_qs, k1) << std::endl;
    std::cout << "Kth Largest (MinHeap):     " << findKthLargest_MinHeap(nums1, k1) << std::endl;
    std::vector<int> nums1_sort = nums1; // Copy for Sort
    std::cout << "Kth Largest (Sort):        " << findKthLargest_Sort(nums1_sort, k1) << std::endl;

    std::vector<int> nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    int k2 = 4;
    std::cout << "Input: "; print_vector(nums2);
    std::cout << "K: " << k2 << std::endl;
    std::vector<int> nums2_qs = nums2;
    std::cout << "Kth Largest (QuickSelect): " << findKthLargest_QuickSelect(nums2_qs, k2) << std::endl;
    std::cout << "Kth Largest (MinHeap):     " << findKthLargest_MinHeap(nums2, k2) << std::endl;
    std::vector<int> nums2_sort = nums2;
    std::cout << "Kth Largest (Sort):        " << findKthLargest_Sort(nums2_sort, k2) << std::endl;


    // --- Problem 2: Sort Colors ---
    std::cout << "\nProblem 2: Sort Colors" << std::endl;
    std::vector<int> colors1 = {2, 0, 2, 1, 1, 0};
    std::cout << "Input: "; print_vector(colors1);
    std::vector<int> colors1_dutch = colors1;
    sortColors_DutchNationalFlag(colors1_dutch);
    std::cout << "Dutch National Flag: "; print_vector(colors1_dutch);

    std::vector<int> colors2 = {2, 0, 1};
    std::cout << "Input: "; print_vector(colors2);
    std::vector<int> colors2_counting = colors2;
    sortColors_CountingSort(colors2_counting);
    std::cout << "Counting Sort:       "; print_vector(colors2_counting);

    std::vector<int> colors3 = {0,0,1,1,2,2,0,1,2};
    std::cout << "Input: "; print_vector(colors3);
    std::vector<int> colors3_dutch = colors3;
    sortColors_DutchNationalFlag(colors3_dutch);
    std::cout << "Dutch National Flag: "; print_vector(colors3_dutch);


    // --- Problem 3: Merge Intervals ---
    std::cout << "\nProblem 3: Merge Intervals" << std::endl;
    std::vector<Interval> intervals1 = {{1,3}, {2,6}, {8,10}, {15,18}};
    print_intervals(intervals1, "Input: ");
    std::vector<Interval> merged1 = mergeIntervals(intervals1);
    print_intervals(merged1, "Merged: ");

    std::vector<Interval> intervals2 = {{1,4}, {4,5}};
    print_intervals(intervals2, "Input: ");
    std::vector<Interval> merged2 = mergeIntervals(intervals2);
    print_intervals(merged2, "Merged: ");

    std::vector<Interval> intervals3 = {{1,4}, {0,4}};
    print_intervals(intervals3, "Input: ");
    std::vector<Interval> merged3 = mergeIntervals(intervals3);
    print_intervals(merged3, "Merged: ");

    std::vector<Interval> intervals4 = {{0,0}};
    print_intervals(intervals4, "Input: ");
    std::vector<Interval> merged4 = mergeIntervals(intervals4);
    print_intervals(merged4, "Merged: ");


    // --- Problem 4: Meeting Rooms II ---
    std::cout << "\nProblem 4: Meeting Rooms II" << std::endl;
    std::vector<Interval> meetings1 = {{0,30}, {5,10}, {15,20}};
    print_intervals(meetings1, "Input: ");
    std::cout << "Min Rooms (Heap):       " << minMeetingRooms_Heap(meetings1) << std::endl;
    std::cout << "Min Rooms (Sweep Line): " << minMeetingRooms_SweepLine(meetings1) << std::endl;

    std::vector<Interval> meetings2 = {{7,10}, {2,4}};
    print_intervals(meetings2, "Input: ");
    std::cout << "Min Rooms (Heap):       " << minMeetingRooms_Heap(meetings2) << std::endl;
    std::cout << "Min Rooms (Sweep Line): " << minMeetingRooms_SweepLine(meetings2) << std::endl;

    std::vector<Interval> meetings3 = {{1,5}, {8,9}, {8,9}};
    print_intervals(meetings3, "Input: ");
    std::cout << "Min Rooms (Heap):       " << minMeetingRooms_Heap(meetings3) << std::endl;
    std::cout << "Min Rooms (Sweep Line): " << minMeetingRooms_SweepLine(meetings3) << std::endl;

    std::vector<Interval> meetings4 = {{1,4}, {2,3}, {4,5}, {6,7}};
    print_intervals(meetings4, "Input: ");
    std::cout << "Min Rooms (Heap):       " << minMeetingRooms_Heap(meetings4) << std::endl;
    std::cout << "Min Rooms (Sweep Line): " << minMeetingRooms_SweepLine(meetings4) << std::endl;
}

} // namespace SortingAlgorithms

// Main function to run the demo or tests based on build configuration
int main() {
    // This allows the main_algorithms executable to run the demo.
    // The test files will have their own main functions for running tests.
    SortingAlgorithms::run_main_algorithms_demo();
    return 0;
}
```