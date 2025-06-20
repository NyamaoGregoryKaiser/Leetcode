class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // ... (add methods to add nodes etc. - see below) ...
}


// Problem 1: Reverse Linked List
LinkedList.prototype.reverseList = function() {
    //Iterative Approach
    let prev = null;
    let curr = this.head;
    while(curr){
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    this.head = prev;
};



// Problem 2: Detect Cycle (Floyd's Tortoise and Hare)
LinkedList.prototype.hasCycle = function() {
  let slow = this.head;
  let fast = this.head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

// Problem 3: Merge Two Sorted Lists
LinkedList.prototype.mergeSortedLists = function(list2) {
  // ... Implementation (left as an exercise) ...
};

// Problem 4: Remove Nth Node From End
LinkedList.prototype.removeNthFromEnd = function(n) {
  // ... Implementation (left as an exercise) ...
};

// Problem 5: Palindrome Linked List
LinkedList.prototype.isPalindrome = function() {
  // ... Implementation (left as an exercise) ...
};


//Helper functions for linked list creation and printing (add these to linkedList.js)
LinkedList.prototype.append = function(data){
    let newNode = new Node(data);
    if(!this.head){
        this.head = newNode;
        return;
    }
    let current = this.head;
    while(current.next){
        current = current.next;
    }
    current.next = newNode;
}

LinkedList.prototype.printList = function(){
    let current = this.head;
    let str = "";
    while(current){
        str += current.data + " ";
        current = current.next;
    }
    console.log(str);
}


module.exports = LinkedList;