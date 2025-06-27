```java
import org.junit.Test;
import static org.junit.Assert.*;

public class TestAlgorithms {
    @Test
    public void testDijkstra() {
        Graph graph = new Graph(5);
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 2, 0);
        graph.addEdge(1, 3, 1);
        // ... Add more edges

        Map<Integer, Integer> distances = Algorithms.dijkstra(graph, 0);
        assertEquals(0, (int)distances.get(0));
        assertEquals(4, (int)distances.get(1));
        // ... Add more assertions

    }
    // ... (Add tests for other algorithms)
}

```