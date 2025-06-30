```java
import com.example.BinarySearch;
import org.junit.Test;
import static org.junit.Assert.*;

public class BinarySearchTest {

    @Test
    public void testBinarySearch() {
        int[] nums = {2, 5, 7, 8, 11, 12};
        assertEquals(4, BinarySearch.binarySearch(nums, 11));
        assertEquals(-1, BinarySearch.binarySearch(nums, 15));
        assertEquals(0, BinarySearch.binarySearch(nums, 2));
    }

    // Add more test cases for other functions here (TODO)

}
```