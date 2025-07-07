```python
import unittest
from graph import Graph
from graph_algorithms import bfs, dfs, dijkstra

class TestGraphAlgorithms(unittest.TestCase):
    def setUp(self):
        self.graph = Graph()
        self.graph.add_edge('A', 'B')
        self.graph.add_edge('A', 'C')
        self.graph.add_edge('B', 'D')
        self.graph.add_edge('C', 'E')

    def test_bfs(self):
        distances = bfs(self.graph, 'A')
        self.assertEqual(distances['A'], 0)
        self.assertEqual(distances['B'], 1)
        self.assertEqual(distances['C'], 1)
        self.assertEqual(distances['D'], 2)
        self.assertEqual(distances['E'], 2)

    def test_dfs(self):
        path = dfs(self.graph, 'A')
        # Path order might vary depending on implementation
        self.assertIn('A', path)
        self.assertIn('B', path)
        self.assertIn('C', path)
        self.assertIn('D', path)
        self.assertIn('E', path)


    def test_dijkstra(self):
        # Add Dijkstra test cases (requires a weighted graph)
        pass


if __name__ == '__main__':
    unittest.main()
```