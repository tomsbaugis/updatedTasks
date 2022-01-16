class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree extends Node {
    constructTree(array) {
        let node = new Node();
        array.forEach(element => {
            this.addNode(node, element);
        });
        return node;
    }
    addNode(node, value) {
        if (node.data === undefined) {
            node.data = value;
        } else if (node.data > value) {
            node.left = (node.left === null) ? new Node(value) : this.addNode(node.left, value);
        } else if (node.data < value) {
            node.right = (node.right === null) ? new Node(value) : this.addNode(node.right, value);
        }
        return node;
    }
}

const array = [9, 5, 1, 7, 20, 50];
const tree = new BinaryTree();
const root = tree.constructTree(array);
console.log(root);