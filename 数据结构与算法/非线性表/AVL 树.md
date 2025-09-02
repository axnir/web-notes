# AVL 树

> 它是一颗空树或者它的左右子树的高度差的绝对值不超过1，并且左右两颗子树都是平衡二叉树。Windows对进程地址空间的管理用到了AVL树。

##### 实现

```javascript
/**
 * AVL树（平衡二叉树）
 * 是一颗空树
 * 或者它的左右子树的高度差的绝对值不超过1，并且左右两颗子树都是平衡二叉树
 * 平衡因子，左子树和右子树的高度差
 */
class Node {
  constructor(key) {
    this.key = key;        // 节点的键值
    this.left = null;      // 指向左节点的指针
    this.right = null;     // 指向右节点的指针
    this.height = 1;       // 树的高度，新节点初始高度为1
  }
}

class AVLTree {
  constructor() {
    this.root = null;      // 根节点初始为空
  }

  /**
   * 获取节点的高度
   * @param {Node} node - 要获取高度的节点
   * @returns {number} 节点的高度，如果节点为空则返回0
   */
  getHeight(node) {
    return node ? node.height : 0;
  }

  /**
   * 计算节点的平衡因子（左子树高度 - 右子树高度）
   * @param {Node} node - 要计算平衡因子的节点
   * @returns {number} 节点的平衡因子
   */
  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  /**
   * 更新节点的高度
   * @param {Node} node - 要更新高度的节点
   */
  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(
        this.getHeight(node.left),
        this.getHeight(node.right)
      );
    }
  }

  /**
   * 右旋转操作
   * @param {Node} y - 要旋转的节点
   * @returns {Node} 旋转后新的根节点
   */
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // 执行旋转
    x.right = y;
    y.left = T2;

    // 更新高度
    this.updateHeight(y);
    this.updateHeight(x);

    // 返回新的根节点
    return x;
  }

  /**
   * 左旋转操作
   * @param {Node} x - 要旋转的节点
   * @returns {Node} 旋转后新的根节点
   */
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // 执行旋转
    y.left = x;
    x.right = T2;

    // 更新高度
    this.updateHeight(x);
    this.updateHeight(y);

    // 返回新的根节点
    return y;
  }

  /**
   * 插入节点的递归辅助函数
   * @param {Node} node - 当前节点
   * @param {number} key - 要插入的键值
   * @returns {Node} 插入后平衡的子树的根节点
   */
  insertNode(node, key) {
    // 1. 执行标准的BST插入
    if (!node) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key);
    } else {
      // AVL树中不允许重复键值
      return node;
    }

    // 2. 更新当前节点的高度
    this.updateHeight(node);

    // 3. 计算平衡因子，检查是否失衡
    const balanceFactor = this.getBalanceFactor(node);

    // 4. 如果失衡，进行旋转处理

    // 左左情况：左子树的左子树插入导致失衡
    if (balanceFactor > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }

    // 右右情况：右子树的右子树插入导致失衡
    if (balanceFactor < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }

    // 左右情况：左子树的右子树插入导致失衡
    if (balanceFactor > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // 右左情况：右子树的左子树插入导致失衡
    if (balanceFactor < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // 如果没有失衡，返回当前节点
    return node;
  }

  /**
   * 插入键值到AVL树
   * @param {number} key - 要插入的键值
   */
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  /**
   * 找到以node为根的树中的最小值节点
   * @param {Node} node - 子树的根节点
   * @returns {Node} 最小值节点
   */
  findMinNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  /**
   * 删除节点的递归辅助函数
   * @param {Node} node - 当前节点
   * @param {number} key - 要删除的键值
   * @returns {Node} 删除后平衡的子树的根节点
   */
  deleteNode(node, key) {
    // 1. 执行标准的BST删除
    if (!node) {
      return node;
    }

    if (key < node.key) {
      node.left = this.deleteNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.deleteNode(node.right, key);
    } else {
      // 找到要删除的节点

      // 情况1：叶子节点或只有一个子节点
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      // 情况2：有两个子节点
      // 找到中序后继（右子树中的最小值）
      const successor = this.findMinNode(node.right);
      node.key = successor.key;

      // 删除后继节点
      node.right = this.deleteNode(node.right, successor.key);
    }

    // 如果树只有一个节点，删除后为空树
    if (!node) {
      return node;
    }

    // 2. 更新当前节点的高度
    this.updateHeight(node);

    // 3. 计算平衡因子，检查是否失衡
    const balanceFactor = this.getBalanceFactor(node);

    // 4. 如果失衡，进行旋转处理

    // 左左情况
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // 左右情况
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // 右右情况
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // 右左情况
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // 如果没有失衡，返回当前节点
    return node;
  }

  /**
   * 从AVL树中删除键值
   * @param {number} key - 要删除的键值
   */
  delete(key) {
    this.root = this.deleteNode(this.root, key);
  }

  /**
   * 查找键值是否存在于AVL树中
   * @param {number} key - 要查找的键值
   * @returns {boolean} 如果存在返回true，否则返回false
   */
  search(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return true;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  /**
   * 中序遍历的递归辅助函数
   * @param {Node} node - 当前节点
   * @param {Array} result - 存储遍历结果的数组
   */
  inOrderTraverseNode(node, result) {
    if (node) {
      this.inOrderTraverseNode(node.left, result);
      result.push(node.key);
      this.inOrderTraverseNode(node.right, result);
    }
  }

  /**
   * 中序遍历AVL树
   * @returns {Array} 遍历结果数组（升序排列）
   */
  inOrderTraverse() {
    const result = [];
    this.inOrderTraverseNode(this.root, result);
    return result;
  }

  /**
   * 前序遍历的递归辅助函数
   * @param {Node} node - 当前节点
   * @param {Array} result - 存储遍历结果的数组
   */
  preOrderTraverseNode(node, result) {
    if (node) {
      result.push(node.key);
      this.preOrderTraverseNode(node.left, result);
      this.preOrderTraverseNode(node.right, result);
    }
  }

  /**
   * 前序遍历AVL树
   * @returns {Array} 遍历结果数组
   */
  preOrderTraverse() {
    const result = [];
    this.preOrderTraverseNode(this.root, result);
    return result;
  }

  /**
   * 后序遍历的递归辅助函数
   * @param {Node} node - 当前节点
   * @param {Array} result - 存储遍历结果的数组
   */
  postOrderTraverseNode(node, result) {
    if (node) {
      this.postOrderTraverseNode(node.left, result);
      this.postOrderTraverseNode(node.right, result);
      result.push(node.key);
    }
  }

  /**
   * 后序遍历AVL树
   * @returns {Array} 遍历结果数组
   */
  postOrderTraverse() {
    const result = [];
    this.postOrderTraverseNode(this.root, result);
    return result;
  }

  /**
   * 获取树的高度
   * @returns {number} 树的高度
   */
  getTreeHeight() {
    return this.getHeight(this.root);
  }

  /**
   * 清空AVL树
   */
  clear() {
    this.root = null;
  }
}

// 使用示例
const avlTree = new AVLTree();

// 插入节点
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(40);
avlTree.insert(50);
avlTree.insert(25);

console.log("中序遍历:", avlTree.inOrderTraverse()); // 输出: [10, 20, 25, 30, 40, 50]
console.log("树的高度:", avlTree.getTreeHeight());   // 输出: 3

// 删除节点
avlTree.delete(30);
console.log("删除30后中序遍历:", avlTree.inOrderTraverse()); // 输出: [10, 20, 25, 40, 50]

// 查找节点
console.log("查找25:", avlTree.search(25)); // 输出: true
console.log("查找30:", avlTree.search(30)); // 输出: false

```


