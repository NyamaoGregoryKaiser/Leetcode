```typescript
import { Graph } from '../../src/data-structures/Graph';

describe('Graph', () => {
    describe('Undirected Graph', () => {
        let graph: Graph<string>;

        beforeEach(() => {
            graph = new Graph<string>(false); // Undirected
        });

        it('should add nodes correctly', () => {
            graph.addNode('A');
            graph.addNode('B');
            expect(graph.hasNode('A')).toBe(true);
            expect(graph.hasNode('B')).toBe(true);
            expect(graph.hasNode('C')).toBe(false);
            expect(graph.nodeCount()).toBe(2);
        });

        it('should add undirected edges correctly', () => {
            graph.addUndirectedEdge('A', 'B');
            expect(graph.getNeighbors('A')).toEqual([{ neighbor: 'B', weight: 1 }]);
            expect(graph.getNeighbors('B')).toEqual([{ neighbor: 'A', weight: 1 }]);
            expect(graph.nodeCount()).toBe(2);
        });

        it('should add undirected edges with weight correctly', () => {
            graph.addUndirectedEdge('A', 'B', 5);
            expect(graph.getNeighbors('A')).toEqual([{ neighbor: 'B', weight: 5 }]);
            expect(graph.getNeighbors('B')).toEqual([{ neighbor: 'A', weight: 5 }]);
        });

        it('should handle multiple edges from a node', () => {
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('A', 'C');
            expect(graph.getNeighbors('A')).toEqual(expect.arrayContaining([
                { neighbor: 'B', weight: 1 },
                { neighbor: 'C', weight: 1 }
            ]));
            expect(graph.getNeighbors('A').length).toBe(2);
            expect(graph.getNeighbors('B').length).toBe(1);
        });

        it('should not add duplicate nodes', () => {
            graph.addNode('A');
            graph.addNode('A');
            expect(graph.nodeCount()).toBe(1);
        });

        it('should return empty array for non-existent node neighbors', () => {
            expect(graph.getNeighbors('Z')).toEqual([]);
        });

        it('should return correct node count', () => {
            graph.addNode('X');
            graph.addUndirectedEdge('Y', 'Z');
            expect(graph.nodeCount()).toBe(3);
        });

        it('should handle complex undirected graph structure', () => {
            graph.addUndirectedEdge('A', 'B');
            graph.addUndirectedEdge('A', 'C');
            graph.addUndirectedEdge('B', 'D');
            graph.addUndirectedEdge('C', 'D');
            graph.addUndirectedEdge('D', 'E');

            expect(graph.getNeighbors('A').map(n => n.neighbor)).toEqual(expect.arrayContaining(['B', 'C']));
            expect(graph.getNeighbors('B').map(n => n.neighbor)).toEqual(expect.arrayContaining(['A', 'D']));
            expect(graph.getNeighbors('C').map(n => n.neighbor)).toEqual(expect.arrayContaining(['A', 'D']));
            expect(graph.getNeighbors('D').map(n => n.neighbor)).toEqual(expect.arrayContaining(['B', 'C', 'E']));
            expect(graph.getNeighbors('E').map(n => n.neighbor)).toEqual(expect.arrayContaining(['D']));
        });

        it('should throw error when adding undirected edge to a directed graph', () => {
            const directedGraph = new Graph<string>(true);
            expect(() => directedGraph.addUndirectedEdge('A', 'B')).toThrow("Cannot add undirected edge to a directed graph. Use addDirectedEdge.");
        });
    });

    describe('Directed Graph', () => {
        let graph: Graph<string>;

        beforeEach(() => {
            graph = new Graph<string>(true); // Directed
        });

        it('should add directed edges correctly', () => {
            graph.addDirectedEdge('A', 'B');
            expect(graph.getNeighbors('A')).toEqual([{ neighbor: 'B', weight: 1 }]);
            expect(graph.getNeighbors('B')).toEqual([]);
            expect(graph.nodeCount()).toBe(2);
        });

        it('should add directed edges with weight correctly', () => {
            graph.addDirectedEdge('A', 'B', 10);
            expect(graph.getNeighbors('A')).toEqual([{ neighbor: 'B', weight: 10 }]);
            expect(graph.getNeighbors('B')).toEqual([]);
        });

        it('should handle self-loops in directed graph', () => {
            graph.addDirectedEdge('A', 'A');
            expect(graph.getNeighbors('A')).toEqual([{ neighbor: 'A', weight: 1 }]);
        });

        it('should get in-degree correctly for directed graph', () => {
            graph.addDirectedEdge('A', 'C');
            graph.addDirectedEdge('B', 'C');
            graph.addDirectedEdge('C', 'D');
            graph.addDirectedEdge('E', 'D');
            graph.addDirectedEdge('F', 'C');

            expect(graph.getInDegree('A')).toBe(0);
            expect(graph.getInDegree('B')).toBe(0);
            expect(graph.getInDegree('C')).toBe(3); // A->C, B->C, F->C
            expect(graph.getInDegree('D')).toBe(2); // C->D, E->D
            expect(graph.getInDegree('E')).toBe(0);
            expect(graph.getInDegree('F')).toBe(0);
            expect(graph.getInDegree('X')).toBe(0); // Non-existent node
        });

        it('should get in-degree with self-loop correctly', () => {
            graph.addDirectedEdge('A', 'A');
            graph.addDirectedEdge('B', 'A');
            expect(graph.getInDegree('A')).toBe(2); // B->A, A->A
        });

        it('should return correct string representation', () => {
            graph.addDirectedEdge('A', 'B', 10);
            graph.addDirectedEdge('A', 'C', 5);
            graph.addNode('D'); // Disconnected node
            const expectedOutput = `Graph (directed: true):\n` +
                                   `A -> B(10), C(5)\n` +
                                   `B -> \n` +
                                   `C -> \n` +
                                   `D -> \n`;
            expect(graph.toString()).toBe(expectedOutput);
        });
    });

    describe('General Graph Functionality', () => {
        let graph: Graph<number>;

        beforeEach(() => {
            graph = new Graph<number>(false); // Undirected by default
        });

        it('should add edge as undirected by default constructor', () => {
            graph.addEdge(1, 2);
            expect(graph.getNeighbors(1)).toEqual([{ neighbor: 2, weight: 1 }]);
            expect(graph.getNeighbors(2)).toEqual([{ neighbor: 1, weight: 1 }]);
        });

        it('should add edge as directed when specified in constructor', () => {
            const directedGraph = new Graph<number>(true);
            directedGraph.addEdge(1, 2);
            expect(directedGraph.getNeighbors(1)).toEqual([{ neighbor: 2, weight: 1 }]);
            expect(directedGraph.getNeighbors(2)).toEqual([]);
        });
    });
});
```