```typescript
import { Graph } from './data-structures/Graph';
import { bfsShortestPath } from './algorithms/bfs-shortest-path';
import { dijkstra, reconstructPathDijkstra } from './algorithms/dijkstra';
import { kahnTopologicalSort } from './algorithms/topological-sort-kahn';
import { detectCycleInDirectedGraphDFS } from './algorithms/detect-cycle-dfs';

function runDemo() {
    console.log("--- Graph Algorithms Demonstration ---");
    console.log("\n1. BFS Shortest Path (Unweighted Graph)");
    const unweightedGraph = new Graph<string>(false); // Undirected
    unweightedGraph.addUndirectedEdge('A', 'B');
    unweightedGraph.addUndirectedEdge('A', 'C');
    unweightedGraph.addUndirectedEdge('B', 'D');
    unweightedGraph.addUndirectedEdge('C', 'D');
    unweightedGraph.addUndirectedEdge('D', 'E');
    unweightedGraph.addUndirectedEdge('E', 'F');
    unweightedGraph.addUndirectedEdge('C', 'F'); // A-C-F, A-B-D-E-F

    console.log(unweightedGraph.toString());

    let bfsResult = bfsShortestPath(unweightedGraph, 'A', 'F');
    console.log(`Shortest path from A to F: ${bfsResult.path.join(' -> ')} (Distance: ${bfsResult.distance})`); // Expected: A -> C -> F (Distance: 2)

    bfsResult = bfsShortestPath(unweightedGraph, 'A', 'E');
    console.log(`Shortest path from A to E: ${bfsResult.path.join(' -> ')} (Distance: ${bfsResult.distance})`); // Expected: A -> B -> D -> E (Distance: 3) or A -> C -> D -> E (Distance: 3)

    bfsResult = bfsShortestPath(unweightedGraph, 'X', 'Y');
    console.log(`Shortest path from X to Y: ${bfsResult.path.join(' -> ')} (Distance: ${bfsResult.distance})`); // Expected: (not found)


    console.log("\n2. Dijkstra's Algorithm (Weighted Graph)");
    const weightedGraph = new Graph<string>(true); // Directed
    weightedGraph.addDirectedEdge('A', 'B', 4);
    weightedGraph.addDirectedEdge('A', 'C', 2);
    weightedGraph.addDirectedEdge('B', 'E', 3);
    weightedGraph.addDirectedEdge('C', 'D', 2);
    weightedGraph.addDirectedEdge('C', 'F', 4);
    weightedGraph.addDirectedEdge('D', 'E', 3);
    weightedGraph.addDirectedEdge('D', 'F', 1);
    weightedGraph.addDirectedEdge('E', 'Z', 1);
    weightedGraph.addDirectedEdge('F', 'Z', 3);

    console.log(weightedGraph.toString());

    const dijkstraResultA = dijkstra(weightedGraph, 'A');
    console.log("Shortest distances from A:");
    for (const [node, distance] of dijkstraResultA.distances.entries()) {
        if (distance !== Infinity) {
            const path = reconstructPathDijkstra('A', node, dijkstraResultA.parentMap);
            console.log(`  To ${node}: ${distance} (Path: ${path.join(' -> ')})`);
        } else {
            console.log(`  To ${node}: Unreachable`);
        }
    }
    // Expected path A to Z: A -> C -> D -> E -> Z (Distance: 2+2+3+1 = 8)
    // Or A -> C -> D -> F -> Z (Distance: 2+2+1+3 = 8)


    console.log("\n3. Topological Sort (Kahn's Algorithm)");
    const dagGraph = new Graph<string>(true); // Directed
    dagGraph.addDirectedEdge('A', 'C');
    dagGraph.addDirectedEdge('B', 'C');
    dagGraph.addDirectedEdge('C', 'D');
    dagGraph.addDirectedEdge('D', 'E');
    dagGraph.addDirectedEdge('B', 'F');
    dagGraph.addDirectedEdge('E', 'G');
    dagGraph.addNode('H'); // Disconnected node

    console.log(dagGraph.toString());

    let topoSortResult = kahnTopologicalSort(dagGraph);
    if (topoSortResult) {
        console.log(`Topological order: ${topoSortResult.join(' -> ')}`);
    } else {
        console.log("Graph contains a cycle, cannot perform topological sort.");
    }
    // Expected (one possible): B -> A -> F -> C -> D -> E -> G -> H

    console.log("\n4. Detect Cycle in Directed Graph (DFS)");
    const acyclicGraph = new Graph<string>(true);
    acyclicGraph.addDirectedEdge('0', '1');
    acyclicGraph.addDirectedEdge('0', '2');
    acyclicGraph.addDirectedEdge('1', '2');
    acyclicGraph.addDirectedEdge('2', '3');
    console.log("Acyclic Graph:\n" + acyclicGraph.toString());
    console.log(`Contains cycle: ${detectCycleInDirectedGraphDFS(acyclicGraph)}`); // Expected: false

    const cyclicGraph = new Graph<string>(true);
    cyclicGraph.addDirectedEdge('0', '1');
    cyclicGraph.addDirectedEdge('1', '2');
    cyclicGraph.addDirectedEdge('2', '0'); // Cycle: 0 -> 1 -> 2 -> 0
    cyclicGraph.addDirectedEdge('2', '3');
    console.log("\nCyclic Graph:\n" + cyclicGraph.toString());
    console.log(`Contains cycle: ${detectCycleInDirectedGraphDFS(cyclicGraph)}`); // Expected: true

    const selfLoopGraph = new Graph<string>(true);
    selfLoopGraph.addDirectedEdge('A', 'A'); // Self-loop is a cycle
    console.log("\nSelf-loop Graph:\n" + selfLoopGraph.toString());
    console.log(`Contains cycle: ${detectCycleInDirectedGraphDFS(selfLoopGraph)}`); // Expected: true

    const disconnectedCyclicGraph = new Graph<string>(true);
    disconnectedCyclicGraph.addDirectedEdge('A', 'B');
    disconnectedCyclicGraph.addDirectedEdge('B', 'A'); // Cycle A-B
    disconnectedCyclicGraph.addDirectedEdge('C', 'D');
    console.log("\nDisconnected Cyclic Graph:\n" + disconnectedCyclicGraph.toString());
    console.log(`Contains cycle: ${detectCycleInDirectedGraphDFS(disconnectedCyclicGraph)}`); // Expected: true
}

runDemo();

```