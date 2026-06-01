```typescript
import { Graph } from '../../src/data-structures/Graph';
import { detectCycleInDirectedGraphDFS } from '../../src/algorithms/detect-cycle-dfs';

describe('detectCycleInDirectedGraphDFS', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>(true); // Cycle detection is for directed graphs
    });

    // Test Case 1: Empty Graph
    it('should return false for an empty graph', () => {
        const emptyGraph = new Graph<string>(true);
        expect(detectCycleInDirectedGraphDFS(emptyGraph)).toBe(false);
    });

    // Test Case 2: Graph with a single node (no edges)
    it('should return false for a single node graph with no edges', () => {
        graph.addNode('A');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
    });

    // Test Case 3: Graph with a single node (self-loop)
    it('should return true for a single node with a self-loop', () => {
        graph.addDirectedEdge('A', 'A');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 4: Simple Acyclic Graph (linear)
    it('should return false for a simple linear acyclic graph', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'D');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
    });

    // Test Case 5: Simple Cyclic Graph
    it('should return true for a simple cyclic graph (3 nodes)', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'A'); // Cycle A -> B -> C -> A
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 6: Cyclic Graph with a longer cycle
    it('should return true for a graph with a longer cycle', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('D', 'E');
        graph.addDirectedEdge('E', 'B'); // Cycle B -> C -> D -> E -> B
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 7: Complex Acyclic Graph (DAG)
    it('should return false for a complex DAG', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('A', 'C');
        graph.addDirectedEdge('B', 'D');
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('D', 'E');
        graph.addDirectedEdge('F', 'G'); // Disconnected component
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
    });

    // Test Case 8: Complex Cyclic Graph (with disconnected acyclic part)
    it('should return true for a complex graph with a cycle and disconnected acyclic parts', () => {
        // Cycle: 1 -> 2 -> 3 -> 1
        graph.addDirectedEdge('1', '2');
        graph.addDirectedEdge('2', '3');
        graph.addDirectedEdge('3', '1');
        // Acyclic component: A -> B -> C
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        // Another node: D
        graph.addNode('D');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 9: Graph where a cycle is not at the start node of DFS
    it('should detect a cycle even if it is not reachable from the first DFS start node', () => {
        // Acyclic component: X -> Y
        graph.addDirectedEdge('X', 'Y');
        // Cyclic component: A -> B -> A
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'A');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 10: Graph with multiple cycles
    it('should detect a cycle in a graph with multiple cycles', () => {
        // Cycle 1: 0 -> 1 -> 2 -> 0
        graph.addDirectedEdge('0', '1');
        graph.addDirectedEdge('1', '2');
        graph.addDirectedEdge('2', '0');
        // Cycle 2: 3 -> 4 -> 3
        graph.addDirectedEdge('3', '4');
        graph.addDirectedEdge('4', '3');
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });

    // Test Case 11: Graph with a "figure-eight" type cycle
    it('should detect cycle in figure-eight graph', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'A'); // Cycle 1 (A->B->C->A)
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('D', 'E');
        graph.addDirectedEdge('E', 'C'); // Cycle 2 (C->D->E->C)
        expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
    });
});
```