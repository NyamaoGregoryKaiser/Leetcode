```java
import com.example.BitManipulation;
import org.junit.Test;
import static org.junit.Assert.*;

public class BitManipulationTest {
    BitManipulation bm = new BitManipulation();

    @Test
    public void testReverseBits() {
        assertEquals(964176192, bm.reverseBits(43261596));
        //Add more test cases
    }

    @Test
    public void testCountSetBits() {
        assertEquals(3, bm.countSetBits(11));
        assertEquals(1, bm.countSetBits(1));
        assertEquals(0, bm.countSetBits(0));
        assertEquals(3, bm.countSetBitsBuiltIn(11));
        //Add more test cases

    }

    @Test
    public void testFindTwoNonRepeating() {
        assertArrayEquals(new int[]{2, 3}, bm.findTwoNonRepeating(new int[]{1, 2, 3, 1, 4, 2, 4, 3}));
        //Add more test cases
    }


    @Test
    public void testSingleNumberIII() {
        assertEquals(10, bm.singleNumberIII(new int[]{10, 2, 2, 2, 1, 1, 1}));
        //Add more test cases
    }


    @Test
    public void testIsPowerOfTwo() {
        assertTrue(bm.isPowerOfTwo(16));
        assertFalse(bm.isPowerOfTwo(15));
        //Add more test cases

    }

}

```