```python
import unittest
from graph_algorithms import Graph

class TestGraphAlgorithms(unittest.TestCase):
    def test_bfs(self):
        graph = Graph()
        graph.add_edge('A', 'B')
        graph.add_edge('A', 'C')
        graph.add_edge('B', 'D')
        graph.add_edge('C', 'E')
        distances = graph.bfs('A')
        self.assertEqual(distances['A'], 0)
        self.assertEqual(distances['B'], 1)
        self.assertEqual(distances['C'], 1)
        self.assertEqual(distances['D'], 2)
        self.assertEqual(distances['E'], 2)

    # Add more test cases for other algorithms...


if __name__ == '__main__':
    unittest.main()
```