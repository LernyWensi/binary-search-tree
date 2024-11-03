import { Tree } from './tree';

// The tree is balanced when initialized with an array.
// Duplicates are ignored.
console.log('# Initial Tree:');
const tree = new Tree((a, b) => a - b, [5, 3, 8, 1, 4, 7, 9, 5]);

console.log(`Is the Initial Tree Balanced?: ${tree.isBalanced() ? 'Yes' : 'No'}`);
console.log(`Height of the Initial Tree: ${tree.height()}`);
tree.prettyPrint();

// Output:
//
// # Initial Tree:
// Is the Initial Tree Balanced? Yes
// Height of the Initial Tree: 3
// │       ┌── 9
// │   ┌── 8
// │   │   └── 7
// └── 5
//     │   ┌── 4
//     └── 3
//         └── 1

// Inserting new nodes does not guarantee that the tree will remain balanced afterwards.
// Duplicates are ignored.
console.log('# Tree After Insertions:');
tree.insert(12).insert(15).insert(89).insert(75);
tree.insert(12).insert(15);

console.log(`Is the Tree Balanced?: ${tree.isBalanced() ? 'Yes' : 'No'}`);
console.log(`Height of the Tree: ${tree.height()}`);
tree.prettyPrint();

// Output:
//
// # Tree After Insertions:
// Is the Tree Balanced? No
// Height of the Tree: 7
// │                   ┌── 89
// │                   │   └── 75
// │               ┌── 15
// │           ┌── 12
// │       ┌── 9
// │   ┌── 8
// │   │   └── 7
// └── 5
//     │   ┌── 4
//     └── 3
//         └── 1

// Removing nodes does not guarantee that the tree will remain balanced afterwards.
// Duplicates are ignored.
console.log('# Tree After Removals:');
const removed1 = tree.remove(7);
const removed2 = tree.remove(15);
const removed3 = tree.remove(0);

console.log(`Removed Node with Value: ${removed1?.data}`);
console.log(`Removed Node with Value: ${removed2?.data}`);
console.log(`Attempted to Remove Non-Existent Node: ${removed3?.data}`);
console.log(`Is the Tree Balanced?: ${tree.isBalanced() ? 'Yes' : 'No'}`);
console.log(`Height of the Tree: ${tree.height()}`);
tree.prettyPrint();

// Output:
//
// # Tree After Removals:
// Removed Node with Value: 7
// Removed Node with Value: 15
// Attempted to Remove Non-Existent Node: undefined
// Is the Tree Balanced?: No
// Height of the Tree: 6
// │               ┌── 89
// │               │   └── 75
// │           ┌── 12
// │       ┌── 9
// │   ┌── 8
// └── 5
//     │   ┌── 4
//     └── 3
//         └── 1

// Rebuilding the tree to restore balance.
console.log('# Tree After Rebuilding:');
tree.rebuild();

console.log(`Is the Tree Balanced?: ${tree.isBalanced() ? 'Yes' : 'No'}`);
console.log(`Height of the Tree: ${tree.height()}`);
tree.prettyPrint();

// Output:
//
// # Tree After Rebuilding:
// Is the Tree Balanced? Yes
// Height of the Tree: 4
// │           ┌── 89
// │       ┌── 75
// │   ┌── 12
// │   │   └── 9
// └── 8
//     │       ┌── 5
//     │   ┌── 4
//     └── 3
//         └── 1

// The find method should return the node when it exists
// and undefined when it does not.
console.log('# Find Node in the Tree:');
const found = tree.find(75);
const notFound = tree.find(150);

console.log(`Node Not Found in the Tree: ${notFound}`);
console.log('Node Found in the Tree:', found);

// Output:
//
// # Find Node in the Tree:
// Node Not Found in the Tree: undefined
// Node Found in the Tree: TreeNode {
//   data: 75,
//   left: undefined,
//   right: TreeNode {
//     data: 89,
//     left: undefined,
//     right: undefined,
//   },
// }

// Pre-Order Traversal
console.log('# Pre-Order Traversal:');
tree.traverse('pre', (node) => console.log(node.data));

// Output:
//
// # Pre-Order Traversal:
// | 8 3 1 4 5 12 9 75 89

// In-Order Traversal
console.log('# In-Order Traversal:');
tree.traverse('in', (node) => console.log(node.data));

// Output:
//
// # In-Order Traversal:
// | 1 3 4 5 8 9 12 75 89

// Post-Order Traversal
console.log('# Post-Order Traversal:');
tree.traverse('post', (node) => console.log(node.data));

// Output:
//
// # Post-Order Traversal:
// | 1 5 4 3 9 89 75 12 8

// Breadth-First Level Order Traversal
console.log('# Breadth-First Level Order Traversal:');
tree.levelOrder((node) => console.log(node.data));

// Output:
//
// # Breadth-First Level Order Traversal:
// | 8 3 12 1 4 9 75 5 89
