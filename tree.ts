export { Tree };

function assert(expr: unknown, msg: string): asserts expr {
    if (!expr) throw Error(msg);
}

class TreeNode<T> {
    constructor(
        public data: T,
        public left?: TreeNode<T>,
        public right?: TreeNode<T>,
    ) {}
}

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
