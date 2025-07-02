```javascript
class Graph {
  constructor(directed = false) {
    this.adjList = {};
    this.directed = directed;
  }

  addVertex(v) {
    this.adjList[v] = [];
  }

  addEdge(u, v, weight = 1) {
    this.adjList[u].push({ vertex: v, weight });
    if (!this.directed) {
      this.adjList[v].push({ vertex: u, weight });
    }
  }


  //BFS implementation
  bfs(startNode) {
      const queue = [startNode];
      const visited = new Set();
      const distances = {};
      distances[startNode] = 0;
      visited.add(startNode);

      while(queue.length > 0){
          const currentNode = queue.shift();
          for(const neighbor of this.adjList[currentNode]){
              if(!visited.has(neighbor.vertex)){
                  visited.add(neighbor.vertex);
                  queue.push(neighbor.vertex);
                  distances[neighbor.vertex] = distances[currentNode] + 1;
              }
          }
      }
      return distances;
  }

  //DFS implementation -  simplified for brevity.  Add topological sort and cycle detection later.
  dfs(startNode, visited = new Set()){
    visited.add(startNode);
    console.log(startNode); //Process node here.
    for(const neighbor of this.adjList[startNode]){
        if(!visited.has(neighbor.vertex)){
            this.dfs(neighbor.vertex, visited);
        }
    }
  }

  // Dijkstra's algorithm (simplified)
  dijkstra(startNode) {
    const distances = {};
    const visited = new Set();
    for (const node in this.adjList) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;

    //Implementation needs a priority queue for efficiency
    let minNode = this.findMinDistance(distances, visited);
    while (minNode !== null) {
      for (const neighbor of this.adjList[minNode]) {
        const newDist = distances[minNode] + neighbor.weight;
        if (newDist < distances[neighbor.vertex]) {
          distances[neighbor.vertex] = newDist;
        }
      }
      visited.add(minNode);
      minNode = this.findMinDistance(distances, visited);
    }
    return distances;
  }

  findMinDistance(distances, visited){
    let minDist = Infinity;
    let minNode = null;
    for(const node in distances){
        if(distances[node] < minDist && !visited.has(node)){
            minDist = distances[node];
            minNode = node;
        }
    }
    return minNode;
  }

}


module.exports = Graph;
```