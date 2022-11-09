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
  constructor (key) {
    this.key = key // 节点的键值
    this.left = null // 指向左节点的指针
    this.right = null // 指向右节点的指针
    this.height = 1 // 树的高度
  }
}
```

