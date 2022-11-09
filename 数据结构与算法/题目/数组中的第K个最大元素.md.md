# 215.数组中的第K个最大元素.md

> 题目难度`medium`，涉及到的算法知识有 最小堆

#### 题目描述

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

示例 1:

``` js
输入: [3,2,1,5,6,4], k = 2
输出: 5
```

示例 2:

``` js
输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
```

#### 思路分析



#### 代码实现

``` js
class minHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftIndex(i) {
    return 2 * i + 1;
  }

  getRightIndex(i) {
    return 2 * i + 2;
  }

  swap(l, r) {
    [this.heap[l], this.heap[r]] = [this.heap[r], this.heap[l]];
  }

  shiftUp(index) {
    if (index === 0) return;
    let parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    if (index === this.heap.length - 1) return;
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function findKthLargest(nums, k) {
  const heap = new minHeap();
  for (let i = 0; i < nums.length; i++) {
    heap.insert(nums[i]);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}
```

