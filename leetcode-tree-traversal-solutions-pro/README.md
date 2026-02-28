tree_traversals/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── interview/
│   │   │   │   │   ├── treetraversals/
│   │   │   │   │   │   ├── TreeNode.java                 # Helper: Basic Tree Node definition
│   │   │   │   │   │   ├── TreeBuilder.java              # Helper: Utility to build trees from array
│   │   │   │   │   │   ├── StandardTraversals.java       # Problem 1: Inorder, Preorder, Postorder (Recursive, Iterative, Morris)
│   │   │   │   │   │   ├── LevelOrderTraversals.java     # Problem 2: Level Order, Zigzag Level Order
│   │   │   │   │   │   ├── MaxDepth.java                 # Problem 3: Max Depth (DFS, BFS)
│   │   │   │   │   │   └── BinaryTreePaths.java          # Problem 4: All Root-to-Leaf Paths
│   ├── test/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── interview/
│   │   │   │   │   ├── treetraversals/
│   │   │   │   │   │   ├── StandardTraversalsTest.java
│   │   │   │   │   │   ├── LevelOrderTraversalsTest.java
│   │   │   │   │   │   ├── MaxDepthTest.java
│   │   │   │   │   │   └── BinaryTreePathsTest.java
├── docs/
│   ├── README.md                                   # Project overview, problem descriptions
│   ├── AlgorithmsExplanation.md                    # Detailed algorithm explanations, ASCII diagrams
│   └── InterviewTips.md                            # Interview strategies, edge cases, variations
├── benchmarking/
│   ├── TreeTraversalBenchmarker.java               # Performance benchmarking code
├── build.gradle                                    # Gradle build file
└── .gitignore                                      # Git ignore file