```typescript
import { Graph } from '../../src/data-structures/Graph';
import { kahnTopologicalSort } from '../../src/algorithms/topological-sort-kahn';

describe('kahnTopologicalSort', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>(true); // Topological sort requires a directed graph
    });

    // Helper to check if a given order is valid for a graph
    const isValidTopologicalOrder = (
        g: Graph<string>,
        order: string[] | null
    ): boolean => {
        if (order === null) {
            // A null order means a cycle was detected, which is valid if there actually is a cycle.
            // For now, we assume if order is not null, it should be valid.
            return false; // Should not happen if a cycle truly exists.
        }

        const positionMap: Map<string, number> = new Map();
        order.forEach((node, index) => positionMap.set(node, index));

        // All nodes in the graph must be in the order.
        if (order.length !== g.nodeCount()) {
            return false;
        }

        for (const node of g.getNodes()) {
            for (const { neighbor } of g.getNeighbors(node)) {
                // If an edge u -> v exists, u must appear before v in the topological order.
                const nodePos = positionMap.get(node);
                const neighborPos = positionMap.get(neighbor);

                if (nodePos === undefined || neighborPos === undefined || nodePos >= neighborPos) {
                    return false;
                }
            }
        }
        return true;
    };

    // Test Case 1: Simple DAG
    it('should return a valid topological order for a simple DAG', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('A', 'D');
        graph.addDirectedEdge('D', 'E');

        const order = kahnTopologicalSort(graph);
        expect(order).not.toBeNull();
        expect(isValidTopologicalOrder(graph, order!)).toBe(true);
        // A, D, B, E, C or A, B, D, C, E etc. (many valid orders)
        // One possible order: [A, D, B, E, C] or [A, B, D, C, E]
        // This specific order depends on iteration order of Map.keys() and neighbors.
        // For 'string' keys, it's usually insertion order for Map.
        expect(order).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E']));
        expect(order?.length).toBe(5);
    });

    // Test Case 2: Graph with multiple sources and sinks
    it('should handle multiple sources and sinks correctly', () => {
        graph.addDirectedEdge('A', 'C');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('D', 'E');
        graph.addDirectedEdge('B', 'F');
        graph.addDirectedEdge('E', 'G');
        graph.addNode('H'); // Disconnected node

        const order = kahnTopologicalSort(graph);
        expect(order).not.toBeNull();
        expect(isValidTopologicalOrder(graph, order!)).toBe(true);
        expect(order?.length).toBe(8); // A, B, C, D, E, F, G, H
        expect(order).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']));
        expect(order!.indexOf('A')).toBeLessThan(order!.indexOf('C'));
        expect(order!.indexOf('B')).toBeLessThan(order!.indexOf('C'));
        expect(order!.indexOf('C')).toBeLessThan(order!.indexOf('D'));
    });

    // Test Case 3: Graph with a cycle
    it('should return null for a graph containing a cycle', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('B', 'C');
        graph.addDirectedEdge('C', 'A'); // Cycle: A -> B -> C -> A

        const order = kahnTopologicalSort(graph);
        expect(order).toBeNull();
    });

    // Test Case 4: Graph with a self-loop
    it('should return null for a graph containing a self-loop', () => {
        graph.addDirectedEdge('A', 'A'); // Self-loop is a cycle
        const order = kahnTopologicalSort(graph);
        expect(order).toBeNull();
    });

    // Test Case 5: Empty Graph
    it('should return an empty array for an empty graph', () => {
        const emptyGraph = new Graph<string>(true);
        const order = kahnTopologicalSort(emptyGraph);
        expect(order).toEqual([]);
    });

    // Test Case 6: Graph with a single node
    it('should return the single node for a single-node graph', () => {
        graph.addNode('X');
        const order = kahnTopologicalSort(graph);
        expect(order).toEqual(['X']);
    });

    // Test Case 7: Disconnected Components with no cycles
    it('should correctly sort a graph with disconnected components', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('X', 'Y');
        graph.addNode('Z');

        const order = kahnTopologicalSort(graph);
        expect(order).not.toBeNull();
        expect(isValidTopologicalOrder(graph, order!)).toBe(true);
        expect(order?.length).toBe(7);
        expect(order).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'X', 'Y', 'Z']));
    });

    // Test Case 8: Complex DAG
    it('should handle a more complex DAG', () => {
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('A', 'C');
        graph.addDirectedEdge('B', 'D');
        graph.addDirectedEdge('C', 'D');
        graph.addDirectedEdge('C', 'E');
        graph.addDirectedEdge('D', 'F');
        graph.addDirectedEdge('E', 'F');
        graph.addDirectedEdge('E', 'G');
        graph.addDirectedEdge('F', 'H');
        graph.addDirectedEdge('G', 'H');

        const order = kahnTopologicalSort(graph);
        expect(order).not.toBeNull();
        expect(isValidTopologicalOrder(graph, order!)).toBe(true);
        expect(order?.length).toBe(8);
        expect(order).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']));
    });

    // Test Case 9: Graph with only one edge
    it('should sort a graph with only one edge', () => {
        graph.addDirectedEdge('X', 'Y');
        const order = kahnTopologicalSort(graph);
        expect(order).toEqual(['X', 'Y']);
    });
});
```