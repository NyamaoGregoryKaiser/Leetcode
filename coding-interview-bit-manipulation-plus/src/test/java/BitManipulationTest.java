```java
import com.example.BitManipulation;
import org.junit.Test;
import static org.junit.Assert.*;

public class BitManipulationTest {

    @Test
    public void testCountSetBits() {
        BitManipulation bm = new BitManipulation();
        assertEquals(3, bm.countSetBits(7));  // 0111
        assertEquals(1, bm.countSetBits(2));  // 0010
        assertEquals(0, bm.countSetBits(0));
        assertEquals(8, bm.countSetBits(255)); //11111111
    }

    @Test
    public void testReverseBits() {
        BitManipulation bm = new BitManipulation();
        assertEquals(Integer.reverse(7), bm.reverseBits(7));
        assertEquals(Integer.reverse(2), bm.reverseBits(2));
        assertEquals(Integer.reverse(0), bm.reverseBits(0));
        assertEquals(Integer.reverse(255), bm.reverseBits(255));

    }

    @Test
    public void testSingleNumber() {
        BitManipulation bm = new BitManipulation();
        assertEquals(1, bm.singleNumber(new int[]{1, 2, 2, 3, 3}));
        assertEquals(4, bm.singleNumber(new int[]{4, 1, 2, 1, 2}));
        assertEquals(1, bm.singleNumber(new int[]{1}));
    }


    @Test
    public void testSwapOddEvenBits() {
        BitManipulation bm = new BitManipulation();
        assertEquals(10, bm.swapOddEvenBits(5)); // 0101 -> 1010
        assertEquals(1, bm.swapOddEvenBits(2)); // 0010 -> 0100
        assertEquals(0, bm.swapOddEvenBits(0));
    }
}
```