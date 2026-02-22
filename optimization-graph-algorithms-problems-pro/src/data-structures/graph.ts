```typescript
/**
 * @fileoverview Graph data structure implementation using an adjacency list.
 * Supports both directed and undirected graphs, and weighted edges.
 */

/**
 * Represents an edge in a graph.
 * @property {string | number} to - The destination node of the edge.
 * @property {number} [weight] - The weight of the edge (optional, defaults to 1 for unweighted).
 */
export interface Edge {
  to: string | number;
  weight?: number;
}

/**
 * Represents a node in the graph.
 * In this implementation, nodes are implicitly defined by their presence as keys in the adjacency list.
 */
export type NodeId = string | number;

/**
 * Interface for a graph, defining common operations.
 */
export interface IGraph {
  addNode(node: NodeId): void;
  addEdge(from: NodeId, to: NodeId, weight?: number): void;
  getNeighbors(node: NodeId): Edge[];
  hasNode(node: NodeId): boolean;
  hasEdge(from: NodeId, to: NodeId): boolean;
  getNodes(): NodeId[];
  getEdgeWeight(from: NodeId, to: NodeId): number | undefined;
  removeNode(node: NodeId): void;
  removeEdge(from: NodeId, to: NodeId): void;
  isDirected(): boolean;
  toString(): string;
  getAdjacencyList(): Map<NodeId, Edge[]>;
}

/**
 * Implements a Graph using an adjacency list.
 * Supports directed and undirected graphs, and weighted edges.
 */
export class Graph implements IGraph {
  // Adjacency list: maps a node to an array of its neighboring edges.
  private adjList: Map<NodeId, Edge[]>;
  private directed: boolean;

  /**
   * Creates an instance of Graph.
   * @param {boolean} [directed=false] - Whether the graph is directed or undirected.
   */
  constructor(directed: boolean = false) {
    this.adjList = new Map();
    this.directed = directed;
  }

  /**
   * Adds a node to the graph. If the node already exists, nothing happens.
   * @param {NodeId} node - The identifier for the node.
   */
  addNode(node: NodeId): void {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, []);
    }
  }

  /**
   * Adds an edge between two nodes.
   * If the nodes do not exist, they are added to the graph.
   * If the graph is undirected, an edge is added in both directions.
   * @param {NodeId} from - The source node.
   * @param {NodeId} to - The destination node.
   * @param {number} [weight=1] - The weight of the edge. Defaults to 1 for unweighted graphs.
   */
  addEdge(from: NodeId, to: NodeId, weight: number = 1): void {
    // Ensure both nodes exist in the graph
    this.addNode(from);
    this.addNode(to);

    // Add the edge from 'from' to 'to'
    const fromEdges = this.adjList.get(from)!;
    // Check if edge already exists to prevent duplicates for specific algorithms (e.g., Dijkstra)
    if (!fromEdges.some(edge => edge.to === to)) {
      fromEdges.push({ to, weight });
    }

    // If undirected, add an edge from 'to' to 'from' as well
    if (!this.directed) {
      const toEdges = this.adjList.get(to)!;
      if (!toEdges.some(edge => edge.to === from)) {
        toEdges.push({ to: from, weight });
      }
    }
  }

  /**
   * Retrieves all neighbors of a given node.
   * @param {NodeId} node - The node whose neighbors are to be retrieved.
   * @returns {Edge[]} An array of edges representing the neighbors. Returns an empty array if the node does not exist.
   */
  getNeighbors(node: NodeId): Edge[] {
    return this.adjList.get(node) || [];
  }

  /**
   * Checks if a node exists in the graph.
   * @param {NodeId} node - The node to check.
   * @returns {boolean} True if the node exists, false otherwise.
   */
  hasNode(node: NodeId): boolean {
    return this.adjList.has(node);
  }

  /**
   * Checks if an edge exists between two nodes.
   * @param {NodeId} from - The source node.
   * @param {NodeId} to - The destination node.
   * @returns {boolean} True if the edge exists, false otherwise.
   */
  hasEdge(from: NodeId, to: NodeId): boolean {
    const fromEdges = this.adjList.get(from);
    if (!fromEdges) {
      return false;
    }
    return fromEdges.some(edge => edge.to === to);
  }

  /**
   * Returns an array of all node IDs present in the graph.
   * @returns {NodeId[]} An array of node identifiers.
   */
  getNodes(): NodeId[] {
    return Array.from(this.adjList.keys());
  }

  /**
   * Returns the weight of an edge between two nodes.
   * @param {NodeId} from - The source node.
   * @param {NodeId} to - The destination node.
   * @returns {number | undefined} The weight of the edge, or undefined if the edge does not exist.
   */
  getEdgeWeight(from: NodeId, to: NodeId): number | undefined {
    const fromEdges = this.adjList.get(from);
    if (fromEdges) {
      const edge = fromEdges.find(e => e.to === to);
      return edge?.weight;
    }
    return undefined;
  }

  /**
   * Removes a node and all its incident edges from the graph.
   * @param {NodeId} nodeToRemove - The node to remove.
   */
  removeNode(nodeToRemove: NodeId): void {
    if (!this.adjList.has(nodeToRemove)) {
      return;
    }

    // Remove all edges pointing to the nodeToRemove
    for (const node of this.adjList.keys()) {
      const edges = this.adjList.get(node)!;
      this.adjList.set(node, edges.filter(edge => edge.to !== nodeToRemove));
    }

    // Remove the node itself from the adjacency list
    this.adjList.delete(nodeToRemove);
  }

  /**
   * Removes an edge between two nodes.
   * If the graph is undirected, the corresponding reverse edge is also removed.
   * @param {NodeId} from - The source node.
   * @param {NodeId} to - The destination node.
   */
  removeEdge(from: NodeId, to: NodeId): void {
    if (this.adjList.has(from)) {
      const fromEdges = this.adjList.get(from)!;
      this.adjList.set(from, fromEdges.filter(edge => edge.to !== to));
    }

    if (!this.directed && this.adjList.has(to)) {
      const toEdges = this.adjList.get(to)!;
      this.adjList.set(to, toEdges.filter(edge => edge.to !== from));
    }
  }

  /**
   * Checks if the graph is directed.
   * @returns {boolean} True if the graph is directed, false otherwise.
   */
  isDirected(): boolean {
    return this.directed;
  }

  /**
   * Returns the raw adjacency list map.
   * @returns {Map<NodeId, Edge[]>} The adjacency list.
   */
  getAdjacencyList(): Map<NodeId, Edge[]> {
    return this.adjList;
  }

  /**
   * Generates a string representation of the graph.
   * @returns {string} A string representing the graph's adjacency list.
   */
  toString(): string {
    let result = `Graph (Directed: ${this.directed})\n`;
    for (const [node, edges] of this.adjList.entries()) {
      result += `${node} -> ${edges.map(edge => `${edge.to}${edge.weight !== undefined ? `(${edge.weight})` : ''}`).join(', ')}\n`;
    }
    return result;
  }

  /**
   * Calculates the in-degree of a specified node.
   * The in-degree is the number of edges pointing *to* the node.
   * @param {NodeId} node - The node for which to calculate the in-degree.
   * @returns {number} The in-degree of the node. Returns 0 if the node does not exist.
   */
  getInDegree(node: NodeId): number {
    if (!this.hasNode(node)) {
      return 0;
    }

    let inDegree = 0;
    for (const [source, edges] of this.adjList.entries()) {
      // Don't count self-loops as incoming from another node, but usually, self-loops contribute to in-degree.
      // For general graph problems, we count any edge 'X -> node' as an in-degree.
      if (source !== node) { // Check this to exclude explicit self-loops from other nodes' perspectives
        inDegree += edges.filter(edge => edge.to === node).length;
      } else { // Count self-loops correctly if they exist from 'node' to 'node'
        inDegree += edges.filter(edge => edge.to === node).length;
      }
    }
    return inDegree;
  }

  /**
   * Calculates the in-degrees for all nodes in the graph.
   * This is particularly useful for algorithms like Kahn's (Topological Sort).
   * @returns {Map<NodeId, number>} A map where keys are NodeIds and values are their corresponding in-degrees.
   */
  getAllInDegrees(): Map<NodeId, number> {
    const inDegrees = new Map<NodeId, number>();

    // Initialize all nodes with an in-degree of 0
    for (const node of this.adjList.keys()) {
      inDegrees.set(node, 0);
    }

    // Iterate through all edges and increment the in-degree of the destination node
    for (const [_, edges] of this.adjList.entries()) {
      for (const edge of edges) {
        inDegrees.set(edge.to, (inDegrees.get(edge.to) || 0) + 1);
      }
    }

    return inDegrees;
  }
}
```