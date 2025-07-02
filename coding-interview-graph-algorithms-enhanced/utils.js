```javascript
//Helper functions for creating graphs from different representations (adjacency matrix, edge list, etc.)
function createGraphFromAdjacencyList(adjList) {
    const graph = new Graph();
    for(const node in adjList){
        graph.addVertex(node);
        for(const edge of adjList[node]){
            graph.addEdge(node, edge.vertex, edge.weight);
        }
    }
    return graph;
}


module.exports = {createGraphFromAdjacencyList};
```