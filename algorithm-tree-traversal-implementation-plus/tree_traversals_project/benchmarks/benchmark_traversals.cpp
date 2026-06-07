```cpp
#include "benchmark/benchmark.h"
#include "../src/problems.hpp"
#include "../src/utils.hpp"
#include <vector>
#include <optional>
#include <random> // For random tree generation

// Helper to create a random tree for benchmarking
TreeNode* createRandomTree(int num_nodes) {
    if (num_nodes <= 0) return nullptr;

    std::vector<std::optional<int>> values;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(1, 1000);

    for (int i = 0; i < num_nodes; ++i) {
        values.push_back(distrib(gen));
    }
    // Introduce some nulls to make it a more general binary tree, not necessarily complete
    std::uniform_real_distribution<> null_dist(0.0, 1.0);
    for (int i = 1; i < num_nodes / 2; ++i) { // Avoid making root null
        if (null_dist(gen) < 0.2) { // 20% chance to be null
            if (values[i].has_value()) { // Only replace if not already null
                values[i] = std::nullopt;
            }
        }
    }

    return TreeUtils::createTree(values);
}

TreeTraversalProblems solver;

// --- Benchmark Problem 1: Standard DFS Traversals ---

// Inorder Traversal - Recursive
static void BM_InorderRecursive(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.inorderTraversal(root, false));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_InorderRecursive)->Range(10, 100000); // 10 to 100,000 nodes

// Inorder Traversal - Iterative
static void BM_InorderIterative(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.inorderTraversal(root, true));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_InorderIterative)->Range(10, 100000);

// Preorder Traversal - Recursive
static void BM_PreorderRecursive(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.preorderTraversal(root, false));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_PreorderRecursive)->Range(10, 100000);

// Preorder Traversal - Iterative
static void BM_PreorderIterative(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.preorderTraversal(root, true));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_PreorderIterative)->Range(10, 100000);

// Postorder Traversal - Recursive
static void BM_PostorderRecursive(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.postorderTraversal(root, false));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_PostorderRecursive)->Range(10, 100000);

// Postorder Traversal - Iterative (Two Stacks)
static void BM_PostorderIterativeTwoStacks(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.postorderTraversal(root, true));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_PostorderIterativeTwoStacks)->Range(10, 100000);

// --- Benchmark Problem 2: Level Order Traversal ---

static void BM_LevelOrder(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.levelOrderTraversal(root));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_LevelOrder)->Range(10, 100000);

static void BM_LevelOrder_LevelsSeparated(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.levelOrderTraversal_LevelsSeparated(root));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_LevelOrder_LevelsSeparated)->Range(10, 100000);

// --- Benchmark Problem 3: Zigzag Level Order Traversal ---

static void BM_ZigzagLevelOrder(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.zigzagLevelOrder(root));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_ZigzagLevelOrder)->Range(10, 100000);

// --- Benchmark Problem 4: Boundary Traversal ---

static void BM_BoundaryTraversal(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomTree(num_nodes);
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.boundaryTraversal(root));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_BoundaryTraversal)->Range(10, 100000);

// --- Benchmark Problem 5: Kth Smallest Element in BST ---
// For this, we need a BST, not a random tree.
TreeNode* createRandomBST(int num_nodes) {
    if (num_nodes <= 0) return nullptr;

    std::vector<int> values;
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(1, num_nodes * 10); // Wider range for values
    std::set<int> unique_values; // Use set to ensure unique values for BST

    while (unique_values.size() < num_nodes) {
        unique_values.insert(distrib(gen));
    }
    for(int val : unique_values) {
        values.push_back(val);
    }
    // Sort to maintain BST property when inserting in "level order"
    // However, createTree uses level-order input to build a general binary tree.
    // For a BST, it's better to insert nodes one by one.
    // Let's create a "relatively balanced" BST by inserting sorted values.
    std::sort(values.begin(), values.end());

    std::function<TreeNode*(int, int)> buildBST =
        [&](int start, int end) -> TreeNode* {
        if (start > end) return nullptr;
        int mid = start + (end - start) / 2;
        TreeNode* node = new TreeNode(values[mid]);
        node->left = buildBST(start, mid - 1);
        node->right = buildBST(mid + 1, end);
        return node;
    };

    return buildBST(0, values.size() - 1);
}


static void BM_KthSmallestRecursive(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomBST(num_nodes);
    int k_to_find = num_nodes / 2; // Find the median element
    if (k_to_find == 0) k_to_find = 1;
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.kthSmallest(root, k_to_find, false));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_KthSmallestRecursive)->Range(10, 100000);

static void BM_KthSmallestIterative(benchmark::State& state) {
    int num_nodes = state.range(0);
    TreeNode* root = createRandomBST(num_nodes);
    int k_to_find = num_nodes / 2; // Find the median element
    if (k_to_find == 0) k_to_find = 1;
    for (auto _ : state) {
        benchmark::DoNotOptimize(solver.kthSmallest(root, k_to_find, true));
    }
    TreeUtils::deleteTree(root);
}
BENCHMARK(BM_KthSmallestIterative)->Range(10, 100000);


BENCHMARK_MAIN();
```