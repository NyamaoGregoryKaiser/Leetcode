```javascript
/**
 * tests/graph-problems.test.js
 *
 * This file contains extensive test cases for all graph algorithms implemented
 * in `src/graph-problems.js` using Jest.
 */

const {
    shortestPathUnweighted,
    hasCycleDirected,
    dijkstra,
    reconstructPathDijkstra,
    kruskal,
    numIslandsBFS,
    numIslandsDFS,
} = require('../src/graph-problems');
const { Graph } = require('../src/utils/dataStructures');

// --- Helper for deep copying grid for Number of Islands tests ---
const deepCopyGrid = (grid) => grid.map(row => [...row]);

// --- Test Suite for Shortest Path in Unweighted Graph (BFS) ---
describe('shortestPathUnweighted', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph(false); // Undirected
        graph.addNode('A'); graph.addNode('B'); graph.addNode('C'); graph.addNode('D');
        graph.addNode('E'); graph.addNode('F'); graph.addNode('G');
    });

    test('should find the shortest path in a simple graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('A', 'D');
        graph.addEdge('D', 'C');
        expect(shortestPathUnweighted(graph, 'A', 'C')).toEqual(['A', 'B', 'C']);
    });

    test('should find the shortest path with multiple paths', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('C', 'E');
        graph.addEdge('A', 'D');
        graph.addEdge('D', 'E');
        expect(shortestPathUnweighted(graph, 'A', 'E')).toEqual(['A', 'D', 'E']);
    });

    test('should return path to self', () => {
        expect(shortestPathUnweighted(graph, 'A', 'A')).toEqual(['A']);
    });

    test('should return null if no path exists in a disconnected graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('C', 'D');
        expect(shortestPathUnweighted(graph, 'A', 'C')).toBeNull();
    });

    test('should return null if start or end node does not exist', () => {
        graph.addEdge('A', 'B');
        expect(shortestPathUnweighted(graph, 'A', 'Z')).toBeNull();
        expect(shortestPathUnweighted(graph, 'X', 'B')).toBeNull();
        expect(shortestPathUnweighted(graph, 'X', 'Z')).toBeNull();
    });

    test('should handle a linear graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('C', 'D');
        expect(shortestPathUnweighted(graph, 'A', 'D')).toEqual(['A', 'B', 'C', 'D']);
    });

    test('should handle a star graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('A', 'D');
        expect(shortestPathUnweighted(graph, 'B', 'D')).toEqual(['B', 'A', 'D']);
    });

    test('should handle a larger, more complex graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'E');
        graph.addEdge('D', 'F');
        graph.addEdge('E', 'F');
        graph.addEdge('F', 'G');
        graph.addEdge('C', 'G'); // A-C-G (2 edges), A-B-D-F-G (4 edges), A-C-E-F-G (4 edges)
        expect(shortestPathUnweighted(graph, 'A', 'G')).toEqual(['A', 'C', 'G']);
    });

    test('should work with single node graph (path to self)', () => {
        const singleNodeGraph = new Graph(false);
        singleNodeGraph.addNode('X');
        expect(shortestPathUnweighted(singleNodeGraph, 'X', 'X')).toEqual(['X']);
    });
});

// --- Test Suite for Cycle Detection in Directed Graph (DFS) ---
describe('hasCycleDirected', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph(true); // Directed
        graph.addNode('A'); graph.addNode('B'); graph.addNode('C');
        graph.addNode('D'); graph.addNode('E'); graph.addNode('F');
    });

    test('should detect a simple cycle', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('C', 'A');
        expect(hasCycleDirected(graph)).toBe(true);
    });

    test('should detect a cycle in a larger graph', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('C', 'D');
        graph.addEdge('D', 'E');
        graph.addEdge('E', 'B'); // Cycle: B -> C -> D -> E -> B
        graph.addEdge('A', 'F'); // Disconnected part, not part of cycle
        expect(hasCycleDirected(graph)).toBe(true);
    });

    test('should return false for a DAG (Directed Acyclic Graph)', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('D', 'E');
        expect(hasCycleDirected(graph)).toBe(false);
    });

    test('should return false for an empty graph', () => {
        const emptyGraph = new Graph(true);
        expect(hasCycleDirected(emptyGraph)).toBe(false);
    });

    test('should return false for a graph with single nodes', () => {
        expect(hasCycleDirected(graph)).toBe(false); // Nodes added but no edges
        const singleNodeGraph = new Graph(true);
        singleNodeGraph.addNode('X');
        expect(hasCycleDirected(singleNodeGraph)).toBe(false);
    });

    test('should handle disconnected components, one with a cycle', () => {
        // Component 1 (cyclic)
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'A');
        // Component 2 (acyclic)
        graph.addEdge('C', 'D');
        graph.addEdge('D', 'E');
        expect(hasCycleDirected(graph)).toBe(true);
    });

    test('should handle disconnected components, all acyclic', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('C', 'D');
        graph.addEdge('E', 'F');
        expect(hasCycleDirected(graph)).toBe(false);
    });

    test('should detect self-loop as a cycle', () => {
        graph.addEdge('A', 'A');
        expect(hasCycleDirected(graph)).toBe(true);
    });

    test('should detect cycle with multiple paths leading to it', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('D', 'E');
        graph.addEdge('E', 'B'); // Cycle: B-D-E-B
        expect(hasCycleDirected(graph)).toBe(true);
    });
});

// --- Test Suite for Dijkstra's Algorithm ---
describe('dijkstra and reconstructPathDijkstra', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph(true); // Directed
        graph.addNode('A'); graph.addNode('B'); graph.addNode('C'); graph.addNode('D');
        graph.addNode('E'); graph.addNode('F'); graph.addNode('G');
    });

    test('should find shortest paths in a simple graph', () => {
        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 2);
        graph.addEdge('B', 'E', 3);
        graph.addEdge('C', 'D', 2);
        graph.addEdge('C', 'F', 4);
        graph.addEdge('D', 'E', 3);
        graph.addEdge('D', 'F', 1);
        graph.addEdge('E', 'G', 1);
        graph.addEdge('F', 'G', 2);

        const { distances, previousNodes } = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(4);
        expect(distances.get('C')).toBe(2);
        expect(distances.get('D')).toBe(4); // A -> C -> D (2+2=4)
        expect(distances.get('E')).toBe(7); // A -> C -> D -> E (2+2+3=7) OR A -> B -> E (4+3=7)
        expect(distances.get('F')).toBe(5); // A -> C -> D -> F (2+2+1=5)
        expect(distances.get('G')).toBe(8); // A -> C -> D -> F -> G (2+2+1+2=7)

        expect(reconstructPathDijkstra('A', 'G', previousNodes)).toEqual(['A', 'C', 'D', 'F', 'G']);
        expect(reconstructPathDijkstra('A', 'E', previousNodes)).toEqual(['A', 'C', 'D', 'E']);
        expect(reconstructPathDijkstra('A', 'B', previousNodes)).toEqual(['A', 'B']);
        expect(reconstructPathDijkstra('A', 'A', previousNodes)).toEqual(['A']);
    });

    test('should handle unreachable nodes', () => {
        graph.addEdge('A', 'B', 1);
        graph.addEdge('X', 'Y', 1); // Disconnected component

        const { distances, previousNodes } = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(Infinity);
        expect(distances.get('X')).toBe(Infinity);
        expect(reconstructPathDijkstra('A', 'C', previousNodes)).toBeNull();
        expect(reconstructPathDijkstra('A', 'X', previousNodes)).toBeNull();
    });

    test('should throw error if start node does not exist', () => {
        graph.addEdge('A', 'B', 1);
        expect(() => dijkstra(graph, 'Z')).toThrow("Start node 'Z' not found in the graph.");
    });

    test('should work with a single node graph', () => {
        const singleNodeGraph = new Graph(true);
        singleNodeGraph.addNode('X');
        const { distances, previousNodes } = dijkstra(singleNodeGraph, 'X');
        expect(distances.get('X')).toBe(0);
        expect(previousNodes.get('X')).toBeNull();
        expect(reconstructPathDijkstra('X', 'X', previousNodes)).toEqual(['X']);
    });

    test('should handle more complex graph with various paths', () => {
        graph.addEdge('A', 'B', 1);
        graph.addEdge('A', 'C', 5);
        graph.addEdge('B', 'D', 8);
        graph.addEdge('B', 'E', 4);
        graph.addEdge('C', 'E', 2);
        graph.addEdge('D', 'F', 2);
        graph.addEdge('E', 'D', 1); // Cycle, but positive weights OK for Dijkstra
        graph.addEdge('E', 'F', 6);

        const { distances, previousNodes } = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(5);
        expect(distances.get('E')).toBe(1 + 4); // A->B->E = 5
        expect(distances.get('D')).toBe(1 + 4 + 1); // A->B->E->D = 6 (vs A->B->D = 9)
        expect(distances.get('F')).toBe(1 + 4 + 1 + 2); // A->B->E->D->F = 8 (vs A->B->E->F = 11)

        expect(reconstructPathDijkstra('A', 'F', previousNodes)).toEqual(['A', 'B', 'E', 'D', 'F']);
    });

    test('should handle graph with parallel edges (Dijkstra picks minimum weight)', () => {
        graph.addNode('A'); graph.addNode('B'); graph.addNode('C');
        graph.addEdge('A', 'B', 10);
        graph.addEdge('A', 'B', 1); // A->B (weight 1)
        graph.addEdge('B', 'C', 5);
        const { distances } = dijkstra(graph, 'A');
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(6);
    });

    test('should handle undirected graph conceptually (add two directed edges)', () => {
        const undirectedGraph = new Graph(false); // Undirected graph
        undirectedGraph.addNode('X'); undirectedGraph.addNode('Y'); undirectedGraph.addNode('Z');
        undirectedGraph.addEdge('X', 'Y', 5);
        undirectedGraph.addEdge('Y', 'Z', 3);
        undirectedGraph.addEdge('X', 'Z', 10);

        const { distances, previousNodes } = dijkstra(undirectedGraph, 'X');
        expect(distances.get('X')).toBe(0);
        expect(distances.get('Y')).toBe(5);
        expect(distances.get('Z')).toBe(8); // X -> Y -> Z (5+3=8) vs X -> Z (10)

        expect(reconstructPathDijkstra('X', 'Z', previousNodes)).toEqual(['X', 'Y', 'Z']);
    });
});

// --- Test Suite for Kruskal's Algorithm (MST) ---
describe('kruskal', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph(false); // Undirected
        graph.addNode('A'); graph.addNode('B'); graph.addNode('C'); graph.addNode('D');
        graph.addNode('E'); graph.addNode('F');
    });

    test('should find MST for a simple graph', () => {
        graph.addEdge('A', 'B', 7);
        graph.addEdge('A', 'D', 5);
        graph.addEdge('B', 'C', 8);
        graph.addEdge('B', 'D', 9);
        graph.addEdge('B', 'E', 7);
        graph.addEdge('C', 'E', 5);
        graph.addEdge('D', 'E', 15);
        graph.addEdge('D', 'F', 6);
        graph.addEdge('E', 'F', 8);
        graph.addEdge('G', 'H', 1); // Disconnected, should still find forest

        const mst = kruskal(graph);
        const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);

        // Expected edges in MST (order might vary)
        const expectedEdges = [
            { u: 'A', v: 'D', weight: 5 },
            { u: 'C', v: 'E', weight: 5 },
            { u: 'D', v: 'F', weight: 6 },
            { u: 'A', v: 'B', weight: 7 }, // or B-E, total 7
            { u: 'B', v: 'E', weight: 7 }, // The other one of A-B or B-E
        ];
        // After A-D (5), C-E (5), D-F (6), A-B (7), B-E (7)
        // A(0)-B(1)-C(2)-D(0)-E(2)-F(0)
        // Sets: {A,D,F}, {C,E}, {B}
        // DSU initially: A B C D E F
        // Add AD(5): {A,D} B C E F
        // Add CE(5): {A,D} B {C,E} F
        // Add DF(6): {A,D,F} B {C,E}
        // Add AB(7): {A,D,F,B} {C,E}
        // Add BE(7): B and E are currently in different sets, {A,D,F,B} and {C,E}. So add.
        // {A,D,F,B,C,E}
        // Total 5 edges for 6 nodes.
        expect(mst.length).toBe(5);
        expect(totalWeight).toBe(5 + 5 + 6 + 7 + 7); // 30

        // Example: Sort edges in a consistent way for comparison, or check individual edges
        const sortedMst = mst.map(e => ({ u: Math.min(e.u, e.v), v: Math.max(e.u, e.v), weight: e.weight }))
            .sort((a, b) => a.weight - b.weight || a.u.localeCompare(b.u) || a.v.localeCompare(b.v));

        const expectedSortedMst = [
            { u: 'A', v: 'D', weight: 5 },
            { u: 'C', v: 'E', weight: 5 },
            { u: 'D', v: 'F', weight: 6 },
            { u: 'A', v: 'B', weight: 7 }, // Can be A-B or B-E, both valid, let's assume this one for path.
            { u: 'B', v: 'E', weight: 7 } // If A-B was picked, then B-E would be picked next.
        ].sort((a, b) => a.weight - b.weight || a.u.localeCompare(b.u) || a.v.localeCompare(b.v));

        // Note: There might be multiple valid MSTs with the same total weight.
        // The specific edges can differ if there are edges with the same weight.
        // So, we primarily check the count and total weight, and for specific edges, ensure they are present.
        expect(sortedMst).toEqual(expect.arrayContaining(expectedSortedMst));
    });

    test('should return empty array for an empty graph', () => {
        const emptyGraph = new Graph(false);
        expect(kruskal(emptyGraph)).toEqual([]);
    });

    test('should return empty array for a single node graph', () => {
        const singleNodeGraph = new Graph(false);
        singleNodeGraph.addNode('X');
        expect(kruskal(singleNodeGraph)).toEqual([]);
    });

    test('should handle a graph with disconnected components (forest)', () => {
        graph.addEdge('A', 'B', 1);
        graph.addEdge('C', 'D', 2);
        graph.addNode('E'); // Isolated node

        const mst = kruskal(graph);
        expect(mst.length).toBe(2); // (V1-1) + (V2-1) = (2-1) + (2-1) = 1 + 1 = 2
        // If E was connected to C, it would be 3-1 = 2. But E is separate.
        // Kruskal naturally finds a minimum spanning forest if the graph is disconnected.
        const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
        expect(totalWeight).toBe(1 + 2);
    });

    test('should handle a linear graph', () => {
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 1);
        graph.addEdge('C', 'D', 1);
        const mst = kruskal(graph);
        expect(mst.length).toBe(3);
        expect(mst.reduce((sum, edge) => sum + edge.weight, 0)).toBe(3);
    });

    test('should handle a star graph', () => {
        graph.addEdge('A', 'B', 10);
        graph.addEdge('A', 'C', 1);
        graph.addEdge('A', 'D', 5);
        const mst = kruskal(graph);
        expect(mst.length).toBe(3);
        expect(mst.reduce((sum, edge) => sum + edge.weight, 0)).toBe(1 + 5 + 10);
    });

    test('should prefer lower weight edges when cycles possible', () => {
        graph.addEdge('A', 'B', 1);
        graph.addEdge('B', 'C', 2);
        graph.addEdge('C', 'A', 3); // Cycle A-B-C
        graph.addEdge('A', 'D', 4); // A-D

        const mst = kruskal(graph);
        // Expected: A-B (1), B-C (2), A-D (4). Total = 7.
        // C-A (3) would form a cycle after A-B and B-C.
        expect(mst.length).toBe(3); // 4 nodes -> 3 edges
        expect(mst.reduce((sum, edge) => sum + edge.weight, 0)).toBe(1 + 2 + 4);
    });
});

// --- Test Suite for Number of Islands (BFS & DFS) ---
describe('numIslands', () => {
    // Standard grid for testing
    const grid1 = [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
    ]; // Expected: 1 island

    const grid2 = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
    ]; // Expected: 3 islands

    const grid3 = [
        ['1', '1', '1'],
        ['0', '1', '0'],
        ['1', '1', '1']
    ]; // Expected: 1 island (connected through middle '1')

    const grid4_empty = []; // Expected: 0 islands
    const grid5_empty_row = [['']]; // Expected: 0 islands
    const grid6_all_water = [
        ['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0']
    ]; // Expected: 0 islands

    const grid7_single_island = [['1']]; // Expected: 1 island
    const grid8_disconnected_1x1 = [
        ['1', '0', '1'],
        ['0', '0', '0'],
        ['1', '0', '1']
    ]; // Expected: 4 islands

    // Test for BFS approach
    describe('numIslandsBFS', () => {
        test('should count 1 island for grid1', () => {
            expect(numIslandsBFS(deepCopyGrid(grid1))).toBe(1);
        });

        test('should count 3 islands for grid2', () => {
            expect(numIslandsBFS(deepCopyGrid(grid2))).toBe(3);
        });

        test('should count 1 island for grid3', () => {
            expect(numIslandsBFS(deepCopyGrid(grid3))).toBe(1);
        });

        test('should return 0 for empty grid', () => {
            expect(numIslandsBFS(deepCopyGrid(grid4_empty))).toBe(0);
        });

        test('should return 0 for grid with empty row', () => {
            expect(numIslandsBFS(deepCopyGrid(grid5_empty_row))).toBe(0);
        });

        test('should return 0 for all water grid', () => {
            expect(numIslandsBFS(deepCopyGrid(grid6_all_water))).toBe(0);
        });

        test('should count 1 island for single cell land', () => {
            expect(numIslandsBFS(deepCopyGrid(grid7_single_island))).toBe(1);
        });

        test('should count 4 islands for disconnected 1x1 lands', () => {
            expect(numIslandsBFS(deepCopyGrid(grid8_disconnected_1x1))).toBe(4);
        });

        test('should handle a large grid', () => {
            const largeGrid = Array(50).fill(0).map(() => Array(50).fill('0'));
            // Create a single large island
            for (let i = 10; i < 40; i++) {
                for (let j = 10; j < 40; j++) {
                    largeGrid[i][j] = '1';
                }
            }
            expect(numIslandsBFS(deepCopyGrid(largeGrid))).toBe(1);

            // Create multiple islands (e.g., 5x5 islands with water in between)
            let multiIslandGrid = Array(20).fill(0).map(() => Array(20).fill('0'));
            let expectedIslands = 0;
            for (let r = 0; r < 20; r += 4) {
                for (let c = 0; c < 20; c += 4) {
                    multiIslandGrid[r][c] = '1';
                    expectedIslands++;
                }
            }
            expect(numIslandsBFS(deepCopyGrid(multiIslandGrid))).toBe(expectedIslands);
        });
    });

    // Test for DFS approach
    describe('numIslandsDFS', () => {
        test('should count 1 island for grid1', () => {
            expect(numIslandsDFS(deepCopyGrid(grid1))).toBe(1);
        });

        test('should count 3 islands for grid2', () => {
            expect(numIslandsDFS(deepCopyGrid(grid2))).toBe(3);
        });

        test('should count 1 island for grid3', () => {
            expect(numIslandsDFS(deepCopyGrid(grid3))).toBe(1);
        });

        test('should return 0 for empty grid', () => {
            expect(numIslandsDFS(deepCopyGrid(grid4_empty))).toBe(0);
        });

        test('should return 0 for grid with empty row', () => {
            expect(numIslandsDFS(deepCopyGrid(grid5_empty_row))).toBe(0);
        });

        test('should return 0 for all water grid', () => {
            expect(numIslandsDFS(deepCopyGrid(grid6_all_water))).toBe(0);
        });

        test('should count 1 island for single cell land', () => {
            expect(numIslandsDFS(deepCopyGrid(grid7_single_island))).toBe(1);
        });

        test('should count 4 islands for disconnected 1x1 lands', () => {
            expect(numIslandsDFS(deepCopyGrid(grid8_disconnected_1x1))).toBe(4);
        });

        test('should handle a large grid', () => {
            const largeGrid = Array(50).fill(0).map(() => Array(50).fill('0'));
            // Create a single large island
            for (let i = 10; i < 40; i++) {
                for (let j = 10; j < 40; j++) {
                    largeGrid[i][j] = '1';
                }
            }
            expect(numIslandsDFS(deepCopyGrid(largeGrid))).toBe(1);

            // Create multiple islands (e.g., 5x5 islands with water in between)
            let multiIslandGrid = Array(20).fill(0).map(() => Array(20).fill('0'));
            let expectedIslands = 0;
            for (let r = 0; r < 20; r += 4) {
                for (let c = 0; c < 20; c += 4) {
                    multiIslandGrid[r][c] = '1';
                    expectedIslands++;
                }
            }
            expect(numIslandsDFS(deepCopyGrid(multiIslandGrid))).toBe(expectedIslands);
        });
    });
});
```