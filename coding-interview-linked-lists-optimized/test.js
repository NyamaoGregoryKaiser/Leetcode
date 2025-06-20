const LinkedList = require('./linkedList');

// Test cases for each function (example for reverseList)
test('Reverse Linked List', () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);
  list.reverseList();
  expect(list.printList()).toBe("4 3 2 1 ");

});

// Add more test cases for other functions here...