```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.RecentCounter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link RecentCounter}.
 */
public class RecentCounterTest {

    private RecentCounter recentCounter;

    @BeforeEach
    void setUp() {
        recentCounter = new RecentCounter();
    }

    @Test
    @DisplayName("Should correctly count recent requests for various pings")
    void testBasicPings() {
        // [1]
        assertEquals(1, recentCounter.ping(1));
        // [1, 100]
        assertEquals(2, recentCounter.ping(100));
        // [1, 100, 3001]
        assertEquals(3, recentCounter.ping(3001));
        // [100, 3001, 3002] (1 is removed as 1 < 3002 - 3000 = 2)
        assertEquals(3, recentCounter.ping(3002));
        // [3001, 3002, 3003] (100 is removed as 100 < 3003 - 3000 = 3)
        assertEquals(3, recentCounter.ping(3003));
        // [7000] (3001, 3002, 3003 all removed as they are < 7000 - 3000 = 4000)
        assertEquals(1, recentCounter.ping(7000));
        // [7000, 7001]
        assertEquals(2, recentCounter.ping(7001));
        // [7000, 7001, 9999]
        assertEquals(3, recentCounter.ping(9999));
        // [9999, 10000] (7000, 7001 are removed as they are < 10000 - 3000 = 7000)
        assertEquals(2, recentCounter.ping(10000));
    }

    @Test
    @DisplayName("Should handle edge case where t - 3000 is exactly an existing timestamp")
    void testEdgeCaseExactWindowBoundary() {
        assertEquals(1, recentCounter.ping(1000)); // [1000]
        assertEquals(2, recentCounter.ping(2000)); // [1000, 2000]
        // Ping at 4000. Window is [1000, 4000]. All existing requests are within.
        assertEquals(3, recentCounter.ping(4000)); // [1000, 2000, 4000]
        // Ping at 4001. Window is [1001, 4001]. 1000 should be removed.
        assertEquals(2, recentCounter.ping(4001)); // [2000, 4000, 4001]
        // Ping at 5000. Window is [2000, 5000]. All existing requests are within.
        assertEquals(3, recentCounter.ping(5000)); // [2000, 4000, 4001, 5000]
        // Ping at 5001. Window is [2001, 5001]. 2000 should be removed.
        assertEquals(3, recentCounter.ping(5001)); // [4000, 4001, 5000, 5001]
    }

    @Test
    @DisplayName("Should handle multiple pings in rapid succession (within 3000ms)")
    void testRapidPings() {
        assertEquals(1, recentCounter.ping(1));
        assertEquals(2, recentCounter.ping(2));
        assertEquals(3, recentCounter.ping(3));
        assertEquals(4, recentCounter.ping(4));
        assertEquals(5, recentCounter.ping(5));
        assertEquals(6, recentCounter.ping(6));
        assertEquals(7, recentCounter.ping(7));
        assertEquals(8, recentCounter.ping(8));
        assertEquals(9, recentCounter.ping(9));
        assertEquals(10, recentCounter.ping(10)); // All pings are within the window [t-3000, t]

        // Now, ping outside the window to see removals
        assertEquals(1, recentCounter.ping(3011)); // (1-10 are removed as they are < 3011-3000 = 11)
    }

    @Test
    @DisplayName("Should handle pings that are far apart (queue often becomes size 1)")
    void testSparsePings() {
        assertEquals(1, recentCounter.ping(1000)); // [1000]
        assertEquals(1, recentCounter.ping(5000)); // [5000] (1000 removed as < 2000)
        assertEquals(1, recentCounter.ping(9000)); // [9000] (5000 removed as < 6000)
        assertEquals(1, recentCounter.ping(13000)); // [13000] (9000 removed as < 10000)
    }

    @Test
    @DisplayName("Should handle large number of pings and window boundaries")
    void testLargePingsAndWindow() {
        int count = 0;
        // Ping 1000 requests, each separated by 10ms.
        // The window is 3000ms, so it can hold approximately 300 requests.
        for (int i = 1; i <= 1000; i++) {
            int t = i * 10;
            // The first `3000/10 + 1 = 301` pings will stay in the queue.
            // After that, the queue size should stabilize at around 300.
            if (i <= 301) {
                assertEquals(i, recentCounter.ping(t));
            } else {
                assertEquals(301, recentCounter.ping(t));
            }
        }

        // Test with a very late ping, all previous should be cleared.
        assertEquals(1, recentCounter.ping(20000));
    }
}
```