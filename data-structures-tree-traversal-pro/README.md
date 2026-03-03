tree-traversals-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── treetraversals/
│   │                   ├── TreeNode.java                   # Helper: Basic Tree Node definition
│   │                   ├── TreeTraversalsRecursive.java      # Problem 1 & 2: Recursive DFS, BFS
│   │                   ├── TreeTraversalsIterative.java      # Problem 1 & 2: Iterative DFS, BFS (using Stack/Queue)
│   │                   └── BSTIterator.java                  # Problem 3: BST Iterator (Iterative Inorder traversal)
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── treetraversals/
│   │                   ├── TreeTraversalsRecursiveTest.java  # JUnit tests for recursive solutions
│   │                   ├── TreeTraversalsIterativeTest.java  # JUnit tests for iterative solutions
│   │                   └── BSTIteratorTest.java            # JUnit tests for BSTIterator
├── docs/
│   ├── README.md                                     # Comprehensive project overview, problems, setup
│   ├── AlgorithmExplanation.md                       # Detailed explanation of algorithms, ASCII diagrams
│   └── InterviewTips.md                              # Interview tips, variations, edge cases
├── benchmarking/
│   └── PerformanceBenchmarking.java                  # Performance comparison of recursive vs. iterative
├── pom.xml                                           # Maven project file
└── .gitignore