```python
import heapq
from graph import Graph

def bfs(graph, start_node):
    visited = set()
    queue = [(start_node, 0)]  # (node, distance)
    distances = {}
    distances[start_node] = 0

    while queue:
        node, dist = queue.pop(0)
        if node in visited:
            continue
        visited.add(node)
        for neighbor, weight in graph.get_neighbors(node):
            if neighbor not in visited:
                distances[neighbor] = dist + weight
                queue.append((neighbor, dist + weight))
    return distances

def dfs(graph, node, visited=None, path=None):
    if visited is None:
        visited = set()
    if path is None:
        path = []

    visited.add(node)
    path.append(node)

    for neighbor, _ in graph.get_neighbors(node):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, path)

    return path


def dijkstra(graph, start_node):
    distances = {node: float('inf') for node in graph.graph}
    distances[start_node] = 0
    priority_queue = [(0, start_node)]

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph.get_neighbors(current_node):
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
    return distances


#Add topological sort and Prim's algorithm here (Expanding on the foundation)

```