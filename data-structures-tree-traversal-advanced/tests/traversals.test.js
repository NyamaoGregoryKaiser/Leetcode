```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { inorderTraversal, preorderTraversal, postorderTraversal } = require('../src/traversals/recursiveTraversals');
const { inorderTraversalIterative, preorderTraversalIterative, postorderTraversalIterative } = require('../src/traversals/iterativeTraversals');
const { levelOrderTraversal } = require('../src/traversals/bfsLevelOrder');

describe('Recursive Traversals', () => {
    // Tree: [1,2,3,4,5,null,6]
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    const root = buildTree([1,2,3,4,5,null,6]);

    it('should perform inorder traversal correctly', () => {
        expect(inorderTraversal(root)).toEqual([4,2,5,1,3,6]);
    });

    it('should perform preorder traversal correctly', () => {
        expect(preorderTraversal(root)).toEqual([1,2,4,5,3,6]);
    });

    it('should perform postorder traversal correctly', () => {
        expect(postorderTraversal(root)).toEqual([4,5,2,6,3,1]);
    });

    it('should handle an empty tree', () => {
        expect(inorderTraversal(null)).toEqual([]);
        expect(preorderTraversal(null)).toEqual([]);
        expect(postorderTraversal(null)).toEqual([]);
    });

    it('should handle a single node tree', () => {
        const singleNode = buildTree([10]);
        expect(inorderTraversal(singleNode)).toEqual([10]);
        expect(preorderTraversal(singleNode)).toEqual([10]);
        expect(postorderTraversal(singleNode)).toEqual([10]);
    });

    it('should handle a skewed tree (left skewed)', () => {
        const skewedLeft = buildTree([1,2,null,3,null,4]);
        //       1
        //      /
        //     2
        //    /
        //   3
        //  /
        // 4
        expect(inorderTraversal(skewedLeft)).toEqual([4,3,2,1]);
        expect(preorderTraversal(skewedLeft)).toEqual([1,2,3,4]);
        expect(postorderTraversal(skewedLeft)).toEqual([4,3,2,1]);
    });

    it('should handle a skewed tree (right skewed)', () => {
        const skewedRight = buildTree([1,null,2,null,3,null,4]);
        // 1
        //  \
        //   2
        //    \
        //     3
        //      \
        //       4
        expect(inorderTraversal(skewedRight)).toEqual([1,2,3,4]);
        expect(preorderTraversal(skewedRight)).toEqual([1,2,3,4]);
        expect(postorderTraversal(skewedRight)).toEqual([4,3,2,1]);
    });
});

describe('Iterative Traversals', () => {
    // Tree: [1,2,3,4,5,null,6]
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    const root = buildTree([1,2,3,4,5,null,6]);

    it('should perform iterative inorder traversal correctly', () => {
        expect(inorderTraversalIterative(root)).toEqual([4,2,5,1,3,6]);
    });

    it('should perform iterative preorder traversal correctly', () => {
        expect(preorderTraversalIterative(root)).toEqual([1,2,4,5,3,6]);
    });

    it('should perform iterative postorder traversal correctly', () => {
        expect(postorderTraversalIterative(root)).toEqual([4,5,2,6,3,1]);
    });

    it('should handle an empty tree', () => {
        expect(inorderTraversalIterative(null)).toEqual([]);
        expect(preorderTraversalIterative(null)).toEqual([]);
        expect(postorderTraversalIterative(null)).toEqual([]);
    });

    it('should handle a single node tree', () => {
        const singleNode = buildTree([10]);
        expect(inorderTraversalIterative(singleNode)).toEqual([10]);
        expect(preorderTraversalIterative(singleNode)).toEqual([10]);
        expect(postorderTraversalIterative(singleNode)).toEqual([10]);
    });

    it('should handle a skewed tree (left skewed)', () => {
        const skewedLeft = buildTree([1,2,null,3,null,4]);
        expect(inorderTraversalIterative(skewedLeft)).toEqual([4,3,2,1]);
        expect(preorderTraversalIterative(skewedLeft)).toEqual([1,2,3,4]);
        expect(postorderTraversalIterative(skewedLeft)).toEqual([4,3,2,1]);
    });

    it('should handle a skewed tree (right skewed)', () => {
        const skewedRight = buildTree([1,null,2,null,3,null,4]);
        expect(inorderTraversalIterative(skewedRight)).toEqual([1,2,3,4]);
        expect(preorderTraversalIterative(skewedRight)).toEqual([1,2,3,4]);
        expect(postorderTraversalIterative(skewedRight)).toEqual([4,3,2,1]);
    });
});

describe('BFS Level Order Traversal', () => {
    // Tree: [3,9,20,null,null,15,7]
    //     3
    //    / \
    //   9  20
    //     /  \
    //    15   7
    const root1 = buildTree([3,9,20,null,null,15,7]);

    // Tree: [1,null,2,3]
    //   1
    //    \
    //     2
    //    /
    //   3
    const root2 = buildTree([1,null,2,3]);

    it('should perform level order traversal correctly for a balanced tree', () => {
        expect(levelOrderTraversal(root1)).toEqual([[3], [9,20], [15,7]]);
    });

    it('should perform level order traversal correctly for a skewed tree', () => {
        expect(levelOrderTraversal(root2)).toEqual([[1], [2], [3]]);
    });

    it('should handle an empty tree', () => {
        expect(levelOrderTraversal(null)).toEqual([]);
    });

    it('should handle a single node tree', () => {
        const singleNode = buildTree([10]);
        expect(levelOrderTraversal(singleNode)).toEqual([[10]]);
    });

    it('should handle a complete tree', () => {
        const completeTree = buildTree([1,2,3,4,5,6,7]);
        //       1
        //      / \
        //     2   3
        //    / \ / \
        //   4  5 6  7
        expect(levelOrderTraversal(completeTree)).toEqual([[1],[2,3],[4,5,6,7]]);
    });
});
```