# Binary Search Trees

This project is a part of [The Odin Project's JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript).

## Overview

This project is a TypeScript implementation of a binary tree data structure. It provides a set of methods to manipulate the binary tree, allowing users to perform operations such as inserting, removing, and searching for elements, as well as traversing the tree in various orders.

The Binary Trees project includes two main classes: `Tree` and `TreeNode`. The `TreeNode` class represents a single node in the tree, while the `Tree` class manages the overall structure and operations of the binary tree.

## Features

-   **Insert**: add an element to the tree while maintaining the binary search tree property.
-   **Remove**: remove an element from the tree and restructure it to maintain the binary search tree property.
-   **Find**: search for an element in the tree and retrieve the corresponding node.
-   **Traverse**: traverse the tree in pre-order, in-order, or post-order and execute a callback function on each node.
-   **Breadth-First Traversal**: traverse the tree in breadth-first manner and execute a callback function on each node.
-   **Height**: calculate the height of the tree.
-   **Depth**: determine the depth of a specific node in the tree.
-   **Is Balanced**: check if the tree is balanced, meaning the heights of the two child subtrees of any node differ by no more than one.
-   **Rebuild**: rebuild the tree from an array of values, ensuring it remains balanced.

## Examples

-   **Usage**

```typescript
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
```

-   **TreeNode Class**

```typescript
class TreeNode<T> {
    constructor(
        public data: T,
        public left?: TreeNode<T>,
        public right?: TreeNode<T>,
    ) {}
}
```

-   **Tree Class**

```typescript
class Tree<T> {
    public root?: TreeNode<T>;

    constructor(
        private _compareFn: (a: T, b: T) => number,
        array?: Array<T>,
    ) {
        if (array) this.root = this.fromArray(array);
    }

    public prettyPrint(): void {
        const _prettyPrint = (
            node: TreeNode<T> | undefined,
            prefix: string,
            isLeft: boolean,
        ): void => {
            if (!node) return;
            _prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            _prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        };

        if (!this.root) console.log('Tree is empty');
        else _prettyPrint(this.root, '', true);
    }

    public fromArray(array: Array<T>): TreeNode<T> | undefined {
        const _fromArray = (start: number, end: number): ReturnType<typeof this.fromArray> => {
            if (start > end) return undefined;

            const pivot = Math.floor((start + end) / 2);

            return new TreeNode(
                sorted[pivot],
                _fromArray(start, pivot - 1),
                _fromArray(pivot + 1, end),
            );
        };

        const sorted = Array.from(new Set(array)).toSorted(this._compareFn);

        return _fromArray(0, sorted.length - 1);
    }

    public rebuild(): Tree<T> {
        const items: T[] = [];
        this.traverse('in', (node) => void items.push(node.data));
        this.root = this.fromArray(items);
        return this;
    }

    public insert(value: T): Tree<T> {
        const _insert = (node: TreeNode<T> | undefined): TreeNode<T> => {
            if (!node) return new TreeNode(value);

            const compared = this._compareFn(node.data, value);

            if (compared < 0) node.right = _insert(node.right);
            else if (compared > 0) node.left = _insert(node.left);

            return node;
        };

        this.root = _insert(this.root);

        return this;
    }

    public remove(value: T): TreeNode<T> | undefined {
        let removed: TreeNode<T> | undefined = undefined;
        const _remove = (
            node: TreeNode<T> | undefined,
            value: T,
        ): ReturnType<typeof this.remove> => {
            if (!node) return undefined;

            const compared = this._compareFn(node.data, value);

            if (compared < 0) node.right = _remove(node.right, value);
            else if (compared > 0) node.left = _remove(node.left, value);
            else {
                removed = node;

                if (!node.left) return node.right;
                if (!node.right) return node.left;

                const successor = this._findSuccessor(node);
                assert(successor, 'Successor should already be defined at this point');

                node.data = successor.data;
                node.right = _remove(node.right, successor.data);
            }

            return node;
        };

        _remove(this.root, value);

        return removed;
    }

    public find(value: T): TreeNode<T> | undefined {
        const _find = (node: TreeNode<T> | undefined): ReturnType<typeof this.find> => {
            if (!node) return undefined;

            const compared = this._compareFn(node.data, value);

            return (
                compared < 0 ? _find(node.right)
                : compared > 0 ? _find(node.left)
                : node
            );
        };

        return _find(this.root);
    }

    public traverse(order: 'pre' | 'in' | 'post', cb: (node: TreeNode<T>) => void): void {
        const _traverse = (node: TreeNode<T> | undefined): void => {
            if (!node) return;

            if (order === 'pre') cb(node);
            _traverse(node.left);
            if (order === 'in') cb(node);
            _traverse(node.right);
            if (order === 'post') cb(node);
        };

        _traverse(this.root);
    }

    public levelOrder(cb: (node: TreeNode<T>) => void): void {
        const queue = [this.root];

        for (let item = queue.shift(); item; item = queue.shift()) {
            cb(item);
            if (item?.left) queue.push(item.left);
            if (item?.right) queue.push(item.right);
        }
    }

    public height(): number {
        const _height = (node: TreeNode<T> | undefined): number => {
            return node ? Math.max(_height(node.left), _height(node.right)) + 1 : 0;
        };

        return _height(this.root);
    }

    public depth(target: TreeNode<T>): number {
        const _depth = (
            node: TreeNode<T> | undefined,
            level: number,
        ): ReturnType<typeof this.depth> => {
            if (!node) return level;

            const compared = this._compareFn(node.data, target.data);

            return (
                compared < 0 ? _depth(node.right, level + 1)
                : compared > 0 ? _depth(node.left, level + 1)
                : level
            );
        };

        return _depth(this.root, 0);
    }

    public isBalanced(): boolean {
        const _isBalanced = (node: TreeNode<T> | undefined): [boolean, number] => {
            if (!node) return [true, 0];

            const [isLeftBalanced, leftHeight] = _isBalanced(node.left);
            const [isRightBalanced, rightHeight] = _isBalanced(node.right);

            return [
                isLeftBalanced && isRightBalanced && Math.abs(leftHeight - rightHeight) <= 1,
                Math.max(leftHeight, rightHeight) + 1,
            ];
        };

        return _isBalanced(this.root)[0];
    }

    private _findSuccessor(node: TreeNode<T>): TreeNode<T> | undefined {
        let successor = node.right;

        while (successor?.right && successor?.left) {
            successor = successor.left;
        }

        return successor;
    }
}
```
