```java
import java.util.*;

public class Graph {
    private int V; // No. of vertices
    private LinkedList<Edge>[] adj; // Adjacency Lists

    static class Edge {
        int to;
        int weight;

        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList<>();
    }

    void addEdge(int u, int v, int weight) {
        adj[u].add(new Edge(v, weight));
        //For undirected graphs, add the reverse edge as well. Comment this out for directed graphs.
        adj[v].add(new Edge(u, weight));
    }

    //Getter for adjacency list (Needed for algorithms)
    public LinkedList<Edge>[] getAdj(){
        return adj;
    }

    public int getV(){
        return V;
    }

    // ... (other graph methods as needed, e.g.,  isDirected(), etc.)
}
```