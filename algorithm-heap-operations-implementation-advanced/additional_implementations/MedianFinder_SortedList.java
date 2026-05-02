```java
package additional_implementations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * MedianFinder_SortedList:
 * This class provides an alternative implementation for finding the median from a data stream
 * by maintaining a sorted list (ArrayList).
 *
 * This approach is less efficient for frequent `addNum` operations compared to the two-heap solution,
 * but it's simpler to implement if `addNum` is infrequent or `N` is small.
 */
public class MedianFinder_SortedList {

    private List<Integer> data;

    /**
     * Initializes the MedianFinder object.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public MedianFinder_SortedList() {
        data = new ArrayList<>();
    }

    /**
     * Adds an integer num from the data stream to the data structure.
     * To maintain the sorted property, a binary search (or `Collections.binarySearch`)
     * can be used to find the insertion point, then `add(index, element)` shifts elements.
     *
     * Time Complexity: O(N)
     *   - `Collections.binarySearch` takes O(log N) to find the insertion point.
     *   - `data.add(index, num)` takes O(N) in the worst case to shift elements.
     * Space Complexity: O(1) per operation (amortized O(1) for ArrayList resizing). Total O(N) for data.
     *
     * @param num The integer to add.
     */
    public void addNum(int num) {
        // Find the correct insertion point using binary search
        int index = Collections.binarySearch(data, num);
        if (index < 0) {
            // If not found, binarySearch returns `-(insertion point) - 1`.
            // So, insertion point is `(-index - 1)`.
            index = -index - 1;
        }
        data.add(index, num); // Insert at the correct sorted position
    }

    /**
     * Returns the median of all elements so far.
     *
     * Time Complexity: O(1)
     *   - Accessing elements by index in an ArrayList is O(1).
     * Space Complexity: O(1)
     *
     * @return The current median.
     * @throws IllegalStateException if no numbers have been added yet.
     */
    public double findMedian() {
        if (data.isEmpty()) {
            throw new IllegalStateException("No numbers added yet.");
        }

        int n = data.size();
        if (n % 2 == 1) {
            // Odd number of elements, median is the middle element
            return data.get(n / 2);
        } else {
            // Even number of elements, median is the average of the two middle elements
            return (data.get(n / 2 - 1) + data.get(n / 2)) / 2.0;
        }
    }

    public static void main(String[] args) {
        MedianFinder_SortedList mf = new MedianFinder_SortedList();

        mf.addNum(1);
        System.out.println("Numbers: " + mf.data + ", Median: " + mf.findMedian()); // Expected: 1.0

        mf.addNum(2);
        System.out.println("Numbers: " + mf.data + ", Median: " + mf.findMedian()); // Expected: 1.5

        mf.addNum(3);
        System.out.println("Numbers: " + mf.data + ", Median: " + mf.findMedian()); // Expected: 2.0

        mf.addNum(4);
        System.out.println("Numbers: " + mf.data + ", Median: " + mf.findMedian()); // Expected: 2.5

        mf.addNum(0);
        System.out.println("Numbers: " + mf.data + ", Median: " + mf.findMedian()); // Expected: 2.0

        mf = new MedianFinder_SortedList();
        try {
            mf.findMedian();
        } catch (IllegalStateException e) {
            System.out.println("Error for empty median finder: " + e.getMessage());
        }
    }
}
```