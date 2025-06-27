```java
import java.util.*;

public class Algorithms {

    // Dijkstra's Algorithm (Shortest Path)
    public static Map<Integer, Integer> dijkstra(Graph graph, int source) {
        Map<Integer, Integer> dist = new HashMap<>();
        PriorityQueue<Map.Entry<Integer, Integer>> pq = new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

        for (int i = 0; i < graph.getV(); i++) {
            dist.put(i, Integer.MAX_VALUE);
        }
        dist.put(source, 0);
        pq.add(new AbstractMap.SimpleEntry<>(source, 0));

        while (!pq.isEmpty()) {
            Map.Entry<Integer, Integer> current = pq.poll();
            int u = current.getKey();
            int weight = current.getValue();

            if (weight > dist.get(u)) continue; // Optimization: Skip if already processed with better weight

            for (Graph.Edge edge : graph.getAdj()[u]) {
                int v = edge.to;
                int newDist = weight + edge.weight;
                if (newDist < dist.get(v)) {
                    dist.put(v, newDist);
                    pq.add(new AbstractMap.SimpleEntry<>(v, newDist));
                }
            }
        }
        return dist;
    }


    // ... (Implement other algorithms: Prim's, Topological Sort, Kosaraju's, Cycle Detection)
}
```