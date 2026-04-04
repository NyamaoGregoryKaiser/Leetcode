```javascript
/**
 * tests/graphAlgorithms.test.js
 *
 * This file contains comprehensive test cases for all implemented graph algorithms
 * using the Jest testing framework.
 *
 * It covers various scenarios including empty graphs, single-node graphs,
 * disconnected graphs, directed/undirected, weighted/unweighted, and edge cases.
 */

const { Graph, PathFinding, Dijkstra, Prim, TopologicalSort } = require('../src/graphAlgorithms');
const { BruteForcePath } = require('../src/alternativeSolutions/bruteForcePath');
const { MemoryEfficientDFSPath } = require('../src/alternativeSolutions/memoryEfficientDFSPath');

// Helper function to create a basic graph
const createTestGraph = () => {
    const graph = new Graph();
    graph.addNode('A').addNode('B').addNode('C').addNode('D').addNode('E').addNode('F');
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'E', 3);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('E', 'F', 1);
    return graph;
};

// Helper for Directed Graph
const createDirectedTestGraph = () => {
    const graph = new Graph();
    graph.addNode('A').addNode('B').addNode('C').addNode('D');
    graph.addEdge('A', 'B', 1, true);
    graph.addEdge('B', 'C', 1, true);
    graph.addEdge('C', 'D', 1, true);
    graph.addEdge('A', 'D', 5, true); // Longer path
    return graph;
};

describe('Graph Data Structure', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph();
    });

    test('should add nodes correctly', () => {
        graph.addNode('A').addNode('B');
        expect(graph.hasNode('A')).toBe(true);
        expect(graph.hasNode('B')).toBe(true);
        expect(graph.NodeCount).toBeUndefined(); // Checking if not defined
        expect(graph.adjList.has('A')).toBe(true);
        expect(graph.getAllNodes().size).toBe(2);
    });

    test('should add undirected edges with default weight 1', () => {
        graph.addEdge('A', 'B');
        expect(graph.adjList.get('A').get('B')).toBe(1);
        expect(graph.adjList.get('B').get('A')).toBe(1);
    });

    test('should add weighted undirected edges', () => {
        graph.addEdge('A', 'B', 5);
        expect(graph.adjList.get('A').get('B')).toBe(5);
        expect(graph.adjList.get('B').get('A')).toBe(5);
    });

    test('should add directed edges', () => {
        graph.addEdge('A', 'B', 10, true);
        expect(graph.adjList.get('A').get('B')).toBe(10);
        expect(graph.adjList.get('B').has('A')).toBe(false); // Not directed back
    });

    test('should remove edges correctly', () => {
        graph.addEdge('A', 'B').addEdge('B', 'C');
        expect(graph.removeEdge('A', 'B')).toBe(true);
        expect(graph.adjList.get('A').has('B')).toBe(false);
        expect(graph.adjList.get('B').has('A')).toBe(false);
        expect(graph.removeEdge('A', 'C')).toBe(false); // Non-existent edge
    });

    test('should remove directed edges correctly', () => {
        graph.addEdge('A', 'B', 1, true);
        expect(graph.removeEdge('A', 'B', true)).toBe(true);
        expect(graph.adjList.get('A').has('B')).toBe(false);
        expect(graph.adjList.get('B').has('A')).toBe(false); // Still no B->A edge
    });

    test('should remove nodes and all incident edges', () => {
        graph.addEdge('A', 'B').addEdge('A', 'C').addEdge('B', 'D');
        expect(graph.removeNode('A')).toBe(true);
        expect(graph.hasNode('A')).toBe(false);
        expect(graph.adjList.get('B').has('A')).toBe(false);
        expect(graph.adjList.get('C').has('A')).toBe(false);
        expect(graph.removeNode('X')).toBe(false); // Non-existent node
    });

    test('should return correct number of nodes and edges', () => {
        graph.addNode('A').addNode('B').addNode('C');
        expect(graph.numNodes()).toBe(3);
        graph.addEdge('A', 'B').addEdge('B', 'C');
        expect(graph.numEdges()).toBe(2); // (A,B) and (B,C)
        graph.addEdge('A', 'C', 5, true); // Directed
        expect(graph.numEdges()).toBe(3); // (A,B), (B,C), (A,C)
    });

    test('getNeighbors returns correct map', () => {
        graph.addEdge('A', 'B', 5).addEdge('A', 'C', 2);
        const neighbors = graph.getNeighbors('A');
        expect(neighbors.get('B')).toBe(5);
        expect(neighbors.get('C')).toBe(2);
        expect(graph.getNeighbors('D')).toBeUndefined();
    });
});

describe('PriorityQueue', () => {
    let pq;

    beforeEach(() => {
        pq = new PriorityQueue();
    });

    test('should enqueue elements and maintain min-heap property', () => {
        pq.enqueue('A', 5);
        pq.enqueue('B', 2);
        pq.enqueue('C', 7);
        pq.enqueue('D', 1);
        expect(pq.peek().value).toBe('D');
        expect(pq.dequeue().value).toBe('D');
        expect(pq.peek().value).toBe('B');
        expect(pq.dequeue().value).toBe('B');
        expect(pq.dequeue().value).toBe('A');
        expect(pq.dequeue().value).toBe('C');
        expect(pq.isEmpty()).toBe(true);
    });

    test('should handle duplicate priorities correctly', () => {
        pq.enqueue('A', 5);
        pq.enqueue('B', 2);
        pq.enqueue('C', 5);
        pq.enqueue('D', 1);
        expect(pq.dequeue().value).toBe('D');
        expect(pq.dequeue().value).toBe('B');
        // Order of A and C with same priority is not guaranteed, but both should be dequeued
        const first = pq.dequeue().value;
        const second = pq.dequeue().value;
        expect([first, second]).toContain('A');
        expect([first, second]).toContain('C');
        expect(pq.isEmpty()).toBe(true);
    });

    test('should return null when dequeuing from an empty queue', () => {
        expect(pq.dequeue()).toBeNull();
    });

    test('should return null when peeking an empty queue', () => {
        expect(pq.peek()).toBeNull();
    });

    test('size and isEmpty methods should work correctly', () => {
        expect(pq.isEmpty()).toBe(true);
        expect(pq.size()).toBe(0);
        pq.enqueue('A', 1);
        expect(pq.isEmpty()).toBe(false);
        expect(pq.size()).toBe(1);
        pq.dequeue();
        expect(pq.isEmpty()).toBe(true);
        expect(pq.size()).toBe(0);
    });
});

describe('PathFinding (BFS/DFS)', () => {
    let graph;

    beforeEach(() => {
        graph = createTestGraph();
    });

    describe('findPath (BFS)', () => {
        test('should find the shortest path in an unweighted graph', () => {
            expect(PathFinding.findPath(graph, 'A', 'E', 'bfs')).toEqual(['A', 'C', 'D', 'E']);
            expect(PathFinding.findPath(graph, 'A', 'F', 'bfs')).toEqual(['A', 'C', 'D', 'F']);
        });

        test('should return [startNode] if startNode === endNode', () => {
            expect(PathFinding.findPath(graph, 'A', 'A', 'bfs')).toEqual(['A']);
        });

        test('should return null if no path exists', () => {
            graph.addNode('G'); // Disconnected node
            expect(PathFinding.findPath(graph, 'A', 'G', 'bfs')).toBeNull();
        });

        test('should handle empty graph', () => {
            const emptyGraph = new Graph();
            expect(PathFinding.findPath(emptyGraph, 'A', 'B', 'bfs')).toBeNull();
        });

        test('should handle single node graph', () => {
            const singleNodeGraph = new Graph().addNode('A');
            expect(PathFinding.findPath(singleNodeGraph, 'A', 'A', 'bfs')).toEqual(['A']);
            expect(PathFinding.findPath(singleNodeGraph, 'A', 'B', 'bfs')).toBeNull();
        });

        test('should return null if start or end node does not exist', () => {
            expect(PathFinding.findPath(graph, 'A', 'Z', 'bfs')).toBeNull();
            expect(PathFinding.findPath(graph, 'Z', 'E', 'bfs')).toBeNull();
        });
    });

    describe('findPath (DFS)', () => {
        test('should find *a* path in an unweighted graph', () => {
            // The exact path depends on the order of neighbors. This test assumes a consistent order.
            // For the provided graph, A -> B -> E is a valid DFS path.
            expect(PathFinding.findPath(graph, 'A', 'E', 'dfs')).toEqual(['A', 'B', 'E']);
            expect(PathFinding.findPath(graph, 'A', 'F', 'dfs')).toEqual(['A', 'B', 'E', 'F']); // A-B-E-F is one possible DFS path
        });

        test('should return [startNode] if startNode === endNode', () => {
            expect(PathFinding.findPath(graph, 'A', 'A', 'dfs')).toEqual(['A']);
        });

        test('should return null if no path exists', () => {
            graph.addNode('G'); // Disconnected node
            expect(PathFinding.findPath(graph, 'A', 'G', 'dfs')).toBeNull();
        });
    });

    describe('findPathRecursiveDFS', () => {
        test('should find *a* path recursively', () => {
            expect(PathFinding.findPathRecursiveDFS(graph, 'A', 'E')).toEqual(['A', 'B', 'E']);
            expect(PathFinding.findPathRecursiveDFS(graph, 'A', 'F')).toEqual(['A', 'B', 'E', 'F']);
        });

        test('should return [startNode] if startNode === endNode', () => {
            expect(PathFinding.findPathRecursiveDFS(graph, 'A', 'A')).toEqual(['A']);
        });

        test('should return null if no path exists recursively', () => {
            graph.addNode('G');
            expect(PathFinding.findPathRecursiveDFS(graph, 'A', 'G')).toBeNull();
        });
    });
});

describe('Dijkstra Algorithm', () => {
    let graph;

    beforeEach(() => {
        graph = createTestGraph();
    });

    test('should calculate shortest paths correctly from a source node', () => {
        const { distances, previous } = Dijkstra.dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(4); // A->B (4)
        expect(distances.get('C')).toBe(2); // A->C (2)
        expect(distances.get('D')).toBe(4); // A->C->D (2+2=4)
        expect(distances.get('E')).toBe(7); // A->C->D->E (2+2+3=7) or A->B->E (4+3=7)
        expect(distances.get('F')).toBe(5); // A->C->D->F (2+2+1=5)

        expect(Dijkstra.reconstructPath('A', 'A', previous)).toEqual(['A']);
        expect(Dijkstra.reconstructPath('A', 'B', previous)).toEqual(['A', 'B']);
        expect(Dijkstra.reconstructPath('A', 'C', previous)).toEqual(['A', 'C']);
        expect(Dijkstra.reconstructPath('A', 'D', previous)).toEqual(['A', 'C', 'D']);
        expect(Dijkstra.reconstructPath('A', 'E', previous)).toEqual(['A', 'C', 'D', 'E']);
        expect(Dijkstra.reconstructPath('A', 'F', previous)).toEqual(['A', 'C', 'D', 'F']);
    });

    test('should handle directed graphs correctly', () => {
        const directedGraph = createDirectedTestGraph();
        const { distances, previous } = Dijkstra.dijkstra(directedGraph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(2);
        expect(distances.get('D')).toBe(3); // A -> B -> C -> D is 1+1+1 = 3, which is shorter than A -> D (5)

        expect(Dijkstra.reconstructPath('A', 'D', previous)).toEqual(['A', 'B', 'C', 'D']);
    });

    test('should handle disconnected nodes', () => {
        graph.addNode('G'); // Disconnected node
        const { distances, previous } = Dijkstra.dijkstra(graph, 'A');

        expect(distances.get('G')).toBe(Infinity);
        expect(previous.get('G')).toBeNull();
        expect(Dijkstra.reconstructPath('A', 'G', previous)).toBeNull();
    });

    test('should handle graph with a single node', () => {
        const singleNodeGraph = new Graph().addNode('X');
        const { distances, previous } = Dijkstra.dijkstra(singleNodeGraph, 'X');
        expect(distances.get('X')).toBe(0);
        expect(previous.get('X')).toBeNull();
        expect(Dijkstra.reconstructPath('X', 'X', previous)).toEqual(['X']);
    });

    test('should throw error if start node does not exist', () => {
        expect(() => Dijkstra.dijkstra(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
    });

    test('should throw error for negative edge weights', () => {
        const negativeWeightGraph = new Graph().addNode('A').addNode('B').addEdge('A', 'B', -1);
        expect(() => Dijkstra.dijkstra(negativeWeightGraph, 'A')).toThrow("Dijkstra's algorithm does not support negative edge weights.");
    });
});

describe('Prim Algorithm (MST)', () => {
    let graph;

    beforeEach(() => {
        graph = createTestGraph(); // Undirected, weighted graph
    });

    test('should compute the correct MST and total weight for a connected graph', () => {
        const { mstEdges, totalWeight } = Prim.prim(graph, 'A');

        // Total weight should be sum of weights of edges:
        // A-C (2), C-D (2), D-F (1), F-E (1), B-A (4) - no, B is connected through E (F-E, D-E, B-E, C-B, A-B)
        // Let's re-evaluate based on Prim's logic:
        // A (0)
        // C (2, from A)
        // D (2, from C)
        // F (1, from D)
        // E (1, from F)
        // B (3, from E)
        // Total = 2 + 2 + 1 + 1 + 3 = 9
        expect(totalWeight).toBe(9);

        // Edges should include the correct connections. Order may vary.
        const expectedEdges = [
            { from: 'A', to: 'C', weight: 2 },
            { from: 'C', to: 'D', weight: 2 },
            { from: 'D', to: 'F', weight: 1 },
            { from: 'F', to: 'E', weight: 1 },
            { from: 'E', to: 'B', weight: 3 }, // Or from A to B (4) if B wasn't connected via E
        ];

        // Sort both for comparison consistency
        const sortedMstEdges = mstEdges.map(e => ({ ...e, from: Math.min(e.from, e.to), to: Math.max(e.from, e.to) }))
            .sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to) || a.weight - b.weight);
        const sortedExpectedEdges = expectedEdges.map(e => ({ ...e, from: Math.min(e.from, e.to), to: Math.max(e.from, e.to) }))
            .sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to) || a.weight - b.weight);

        // Jest's toContainEqual should be fine without full sorting, just check all required edges
        expect(mstEdges.length).toBe(graph.numNodes() - 1); // For a connected graph, MST has V-1 edges

        // Check for specific edges (adjusted for potential (from, to) swapping due to sorting and consistency)
        // Actual edges derived from the specific graph and Prim's execution:
        const mstEdgeSet = new Set(mstEdges.map(e => [e.from, e.to].sort().join('-') + `:${e.weight}`));
        expect(mstEdgeSet.has(['A','C'].sort().join('-') + ':2')).toBe(true);
        expect(mstEdgeSet.has(['C','D'].sort().join('-') + ':2')).toBe(true);
        expect(mstEdgeSet.has(['D','F'].sort().join('-') + ':1')).toBe(true);
        expect(mstEdgeSet.has(['E','F'].sort().join('-') + ':1')).toBe(true);
        expect(mstEdgeSet.has(['B','E'].sort().join('-') + ':3')).toBe(true);
    });

    test('should handle a graph with a single node', () => {
        const singleNodeGraph = new Graph().addNode('X');
        const { mstEdges, totalWeight } = Prim.prim(singleNodeGraph, 'X');
        expect(mstEdges).toEqual([]);
        expect(totalWeight).toBe(0);
    });

    test('should return empty for an empty graph', () => {
        const emptyGraph = new Graph();
        const { mstEdges, totalWeight } = Prim.prim(emptyGraph, 'A'); // will throw error if start node 'A' is not handled
        expect(mstEdges).toEqual([]);
        expect(totalWeight).toBe(0);
    });

    test('should handle disconnected components (MST for connected component of startNode)', () => {
        const disconnectedGraph = new Graph();
        disconnectedGraph.addNode('A').addNode('B').addNode('C').addNode('D');
        disconnectedGraph.addEdge('A', 'B', 1);
        disconnectedGraph.addEdge('C', 'D', 10);

        const { mstEdges, totalWeight } = Prim.prim(disconnectedGraph, 'A');
        expect(totalWeight).toBe(1);
        expect(mstEdges.length).toBe(1);
        expect(mstEdges[0]).toEqual({ from: 'A', to: 'B', weight: 1 }); // Or B to A

        // Warning message would be logged by the algorithm, but test verifies result.
    });

    test('should throw error if start node does not exist', () => {
        expect(() => Prim.prim(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
    });
});

describe('Topological Sort (Kahn\'s Algorithm)', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph();
    });

    test('should perform topological sort on a simple DAG', () => {
        graph.addNode('A').addNode('B').addNode('C').addNode('D').addNode('E').addNode('F');
        graph.addEdge('A', 'D', 1, true);
        graph.addEdge('B', 'D', 1, true);
        graph.addEdge('B', 'E', 1, true);
        graph.addEdge('C', 'F', 1, true);
        graph.addEdge('D', 'C', 1, true);
        graph.addEdge('D', 'E', 1, true);
        graph.addEdge('E', 'F', 1, true);

        const result = TopologicalSort.topologicalSort(graph);
        // A valid topological sort order. Multiple orders are possible.
        // [ 'A', 'B', 'D', 'E', 'C', 'F' ] is one.
        // [ 'B', 'A', 'D', 'E', 'C', 'F' ] is another.
        // We only check if it's a valid order, not a specific one if multiple exist.
        expect(result).not.toBeNull();
        expect(result.length).toBe(6);

        // Validate the order: For every edge u -> v, u must appear before v.
        const orderMap = new Map();
        result.forEach((node, index) => orderMap.set(node, index));

        for (const [node, neighbors] of graph.adjList.entries()) {
            for (const neighbor of neighbors.keys()) {
                if (graph.getEdgeWeight(node, neighbor)) { // If it's a directed edge
                    expect(orderMap.get(node)).toBeLessThan(orderMap.get(neighbor));
                }
            }
        }
    });

    test('should handle a graph with a single node', () => {
        graph.addNode('X');
        expect(TopologicalSort.topologicalSort(graph)).toEqual(['X']);
    });

    test('should return null for a graph with a cycle', () => {
        graph.addNode('A').addNode('B').addNode('C');
        graph.addEdge('A', 'B', 1, true);
        graph.addEdge('B', 'C', 1, true);
        graph.addEdge('C', 'A', 1, true); // Cycle A -> B -> C -> A
        expect(TopologicalSort.topologicalSort(graph)).toBeNull();
    });

    test('should handle disconnected components in a DAG', () => {
        graph.addNode('A').addNode('B').addNode('X').addNode('Y');
        graph.addEdge('A', 'B', 1, true);
        graph.addEdge('X', 'Y', 1, true);

        const result = TopologicalSort.topologicalSort(graph);
        expect(result).not.toBeNull();
        expect(result.length).toBe(4);
        // Valid orders include ['A', 'X', 'B', 'Y'], ['X', 'A', 'Y', 'B'], etc.
        const orderMap = new Map();
        result.forEach((node, index) => orderMap.set(node, index));
        expect(orderMap.get('A')).toBeLessThan(orderMap.get('B'));
        expect(orderMap.get('X')).toBeLessThan(orderMap.get('Y'));
    });

    test('should return nodes in a linear fashion for a straight line graph', () => {
        graph.addNode('1').addNode('2').addNode('3').addNode('4');
        graph.addEdge('1', '2', 1, true);
        graph.addEdge('2', '3', 1, true);
        graph.addEdge('3', '4', 1, true);
        expect(TopologicalSort.topologicalSort(graph)).toEqual(['1', '2', '3', '4']);
    });

    test('should return empty array for an empty graph', () => {
        const emptyGraph = new Graph();
        expect(TopologicalSort.topologicalSort(emptyGraph)).toEqual([]);
    });
});

describe('Alternative Solutions', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph();
        graph.addNode('A').addNode('B').addNode('C').addNode('D');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'D');
    });

    describe('BruteForcePath.findAllSimplePaths', () => {
        test('should find all simple paths between two nodes', () => {
            const paths = BruteForcePath.findAllSimplePaths(graph, 'A', 'D');
            // Sort paths and inner arrays for consistent comparison
            const sortedPaths = paths.map(p => p.sort()).sort((a, b) => a.join('').localeCompare(b.join('')));

            expect(paths).toHaveLength(2);
            expect(paths).toContainEqual(['A', 'B', 'D']);
            expect(paths).toContainEqual(['A', 'C', 'D']);
        });

        test('should return [startNode] for path to self', () => {
            const paths = BruteForcePath.findAllSimplePaths(graph, 'A', 'A');
            expect(paths).toEqual([['A']]);
        });

        test('should handle no path found', () => {
            graph.addNode('E');
            const paths = BruteForcePath.findAllSimplePaths(graph, 'A', 'E');
            expect(paths).toEqual([]);
        });

        test('should return empty for non-existent nodes', () => {
            expect(BruteForcePath.findAllSimplePaths(graph, 'A', 'Z')).toEqual([]);
            expect(BruteForcePath.findAllSimplePaths(graph, 'Z', 'D')).toEqual([]);
        });

        test('should handle a more complex graph with multiple paths', () => {
            const complexGraph = new Graph();
            complexGraph.addNode('S').addNode('A').addNode('B').addNode('C').addNode('D').addNode('E');
            complexGraph.addEdge('S', 'A').addEdge('S', 'B');
            complexGraph.addEdge('A', 'C').addEdge('B', 'C');
            complexGraph.addEdge('C', 'D').addEdge('C', 'E');
            complexGraph.addEdge('D', 'E'); // Cycle D-E-C-D not simple

            const paths = BruteForcePath.findAllSimplePaths(complexGraph, 'S', 'E');
            expect(paths).toHaveLength(4); // S-A-C-E, S-A-C-D-E, S-B-C-E, S-B-C-D-E
            expect(paths).toContainEqual(['S', 'A', 'C', 'E']);
            expect(paths).toContainEqual(['S', 'A', 'C', 'D', 'E']);
            expect(paths).toContainEqual(['S', 'B', 'C', 'E']);
            expect(paths).toContainEqual(['S', 'B', 'C', 'D', 'E']);
        });
    });

    describe('MemoryEfficientDFSPath.findPath', () => {
        test('should find *a* path using memory-efficient recursive DFS', () => {
            const path = MemoryEfficientDFSPath.findPath(graph, 'A', 'D');
            expect(path).not.toBeNull();
            // DFS path can be A->B->D or A->C->D depending on adjacency list iteration order
            // With current graph implementation, 'B' comes before 'C' for 'A'
            expect(path).toEqual(['A', 'B', 'D']);
        });

        test('should return [startNode] for path to self', () => {
            const path = MemoryEfficientDFSPath.findPath(graph, 'A', 'A');
            expect(path).toEqual(['A']);
        });

        test('should return null if no path exists', () => {
            graph.addNode('E');
            const path = MemoryEfficientDFSPath.findPath(graph, 'A', 'E');
            expect(path).toBeNull();
        });

        test('should return null for non-existent nodes', () => {
            expect(MemoryEfficientDFSPath.findPath(graph, 'A', 'Z')).toBeNull();
            expect(MemoryEfficientDFSPath.findPath(graph, 'Z', 'D')).toBeNull();
        });
    });
});
```
---