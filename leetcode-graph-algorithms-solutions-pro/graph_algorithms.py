```python
import heapq

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

    # BFS
    def bfs(self, start_node):
        visited = set()
        queue = [(start_node, 0)] # (node, distance)
        distances = {}
        distances[start_node] = 0

        while queue:
            node, dist = queue.pop(0)
            if node in visited:
                continue
            visited.add(node)
            for neighbor, weight in self.graph.get(node, []):
                if neighbor not in visited:
                    distances[neighbor] = dist + weight
                    queue.append((neighbor, dist + weight))
        return distances


    # ... (Implement DFS, Dijkstra's, Prim's, Topological Sort here) ...

    def dijkstra(self, start_node):
        distances = {node: float('inf') for node in self.graph}
        distances[start_node] = 0
        priority_queue = [(0, start_node)]

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_distance > distances[current_node]:
                continue

            for neighbor, weight in self.graph.get(current_node, []):
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(priority_queue, (distance, neighbor))
        return distances


```