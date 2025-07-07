```python
class Graph:
    def __init__(self, directed=False):
        self.graph = {}
        self.directed = directed

    def add_edge(self, u, v, weight=1):
        if u not in self.graph:
            self.graph[u] = []
        self.graph[u].append((v, weight))
        if not self.directed:
            if v not in self.graph:
                self.graph[v] = []
            self.graph[v].append((u, weight))

    def get_neighbors(self, node):
        return self.graph.get(node, [])

    def __str__(self):
        return str(self.graph)
```