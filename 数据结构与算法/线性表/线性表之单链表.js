/*
    无头结点的版本
*/
//定义node
function Node(value) {
    this.value = value
    this.next = null
}
//定义单链表
function LinkedList() {
    //头指针
    this.head = null
    this.length = 0
}
//从尾部插入节点
LinkedList.prototype.push = function (value) {
    let node = new Node(value)
    if (this.head == null) {
        this.head = node
    } else {
        //p为首节点
        let p = this.head
        //直到p.next = null,即到最后一个节点
        while (p.next != null) {
            p = p.next
        }
        p.next = node
    }
    // 长度加1
    this.length++
}
//从头部插入节点
LinkedList.prototype.insert = function (value) {
    let node = new Node(value)
    if (this.head == null) {
        this.head = node
    } else {
        node.next = this.head.next
        this.head.next = node
    }
    this.length++
}
//移除节点
LinkedList.prototype.remove = function (value) {

}