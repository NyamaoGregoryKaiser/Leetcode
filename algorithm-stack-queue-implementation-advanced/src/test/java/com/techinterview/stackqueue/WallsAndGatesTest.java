```java
package com.techinterview.stackqueue;

import com.techinterview.stackqueue.problems.WallsAndGates;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

/**
 * Test class for {@link WallsAndGates}.
 */
public class WallsAndGatesTest {

    private WallsAndGates wallsAndGates;

    @BeforeEach
    void setUp() {
        wallsAndGates = new WallsAndGates();
    }

    @Test
    @DisplayName("Should correctly calculate distances in a typical grid")
    void testTypicalGrid() {
        int[][] rooms = {
                {WallsAndGates.INF, -1, 0, WallsAndGates.INF},
                {WallsAndGates.INF, WallsAndGates.INF, WallsAndGates.INF, -1},
                {WallsAndGates.INF, -1, WallsAndGates.INF, -1},
                {0, -1, WallsAndGates.INF, WallsAndGates.INF}
        };
        int[][] expected = {
                {3, -1, 0, 1},
                {2, 2, 1, -1},
                {1, -1, 2, -1},
                {0, -1, 3, 4}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a grid with no empty rooms")
    void testNoEmptyRooms() {
        int[][] rooms = {
                {-1, 0},
                {0, -1}
        };
        int[][] expected = {
                {-1, 0},
                {0, -1}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a grid with only walls and gates")
    void testOnlyWallsAndGates() {
        int[][] rooms = {
                {-1, 0, -1},
                {0, -1, 0},
                {-1, 0, -1}
        };
        int[][] expected = {
                {-1, 0, -1},
                {0, -1, 0},
                {-1, 0, -1}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a grid with only empty rooms (unreachable from gates)")
    void testOnlyEmptyRooms() {
        int[][] rooms = {
                {WallsAndGates.INF, WallsAndGates.INF},
                {WallsAndGates.INF, WallsAndGates.INF}
        };
        int[][] expected = {
                {WallsAndGates.INF, WallsAndGates.INF},
                {WallsAndGates.INF, WallsAndGates.INF}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a grid where some rooms are unreachable")
    void testUnreachableRooms() {
        int[][] rooms = {
                {WallsAndGates.INF, -1, WallsAndGates.INF},
                {WallsAndGates.INF, -1, 0}
        };
        int[][] expected = {
                {WallsAndGates.INF, -1, 1},
                {WallsAndGates.INF, -1, 0}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a single-cell grid (gate)")
    void testSingleCellGrid_Gate() {
        int[][] rooms = {{0}};
        int[][] expected = {{0}};
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a single-cell grid (wall)")
    void testSingleCellGrid_Wall() {
        int[][] rooms = {{-1}};
        int[][] expected = {{-1}};
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a single-cell grid (empty)")
    void testSingleCellGrid_Empty() {
        int[][] rooms = {{WallsAndGates.INF}};
        int[][] expected = {{WallsAndGates.INF}};
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle an empty grid")
    void testEmptyGrid() {
        int[][] rooms = {};
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(new int[][]{}, rooms); // Should remain empty
    }

    @Test
    @DisplayName("Should handle a grid with empty rows")
    void testEmptyRowGrid() {
        int[][] rooms = {{}};
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(new int[][]{{}}, rooms); // Should remain as is
    }

    @Test
    @DisplayName("Should handle a 2x2 grid with one gate")
    void test2x2GridOneGate() {
        int[][] rooms = {
                {0, WallsAndGates.INF},
                {WallsAndGates.INF, WallsAndGates.INF}
        };
        int[][] expected = {
                {0, 1},
                {1, 2}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a 2x2 grid with two gates")
    void test2x2GridTwoGates() {
        int[][] rooms = {
                {0, WallsAndGates.INF},
                {WallsAndGates.INF, 0}
        };
        int[][] expected = {
                {0, 1},
                {1, 0}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }

    @Test
    @DisplayName("Should handle a grid with a 'donut' shape of walls around an empty room")
    void testDonutShape() {
        int[][] rooms = {
                {0, WallsAndGates.INF, 0},
                {WallsAndGates.INF, -1, WallsAndGates.INF},
                {0, WallsAndGates.INF, 0}
        };
        int[][] expected = {
                {0, 1, 0},
                {1, -1, 1},
                {0, 1, 0}
        };
        wallsAndGates.wallsAndGates(rooms);
        assertArrayEquals(expected, rooms);
    }
}
```