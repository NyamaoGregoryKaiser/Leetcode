```markdown
# 📊 Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the data structures and algorithms discussed in this project.

---

## 1. Two Sum (Hash Map)

**Concept:** Store numbers and their indices in a hash map. For each number, calculate the complement and check if it's already in the map.

```
nums = [2, 7, 11, 15], target = 9

Iteration 1: num = 2, index = 0
  Complement = 9 - 2 = 7
  Is 7 in map? No.
  Add (2: 0) to map.
  Map: { 2: 0 }

Iteration 2: num = 7, index = 1
  Complement = 9 - 7 = 2
  Is 2 in map? Yes! Value is 0.
  Found pair: indices [ map.get(2), 1 ] = [0, 1]
  Return [0, 1]

Flow:
[2, 7, 11, 15]
  ^
  |
  +-- complement = 7
      Map: { (2,0) }
      Check 7 -> NOT FOUND

[2, 7, 11, 15]
     ^
     |
     +-- complement = 2
         Map: { (2,0), (7,1) }  (Note: 7 added after prev iteration, not before)
         Check 2 -> FOUND at index 0!
         Result: [0, 1]
```

**Corrected Iterative Map State:**

```
nums = [2, 7, 11, 15], target = 9

Initial: numMap = {}

1. i=0, currentNum=2
   complement = 9 - 2 = 7
   numMap.has(7)? No.
   numMap.set(2, 0)
   numMap: { 2: 0 }

2. i=1, currentNum=7
   complement = 9 - 7 = 2
   numMap.has(2)? Yes! (value 0)
   Return [numMap.get(2), 1] = [0, 1]
```

---

## 2. Longest Consecutive Sequence (Hash Set)

**Concept:** Use a hash set for O(1) lookups. Iterate, and only start extending a sequence if `num - 1` is NOT in the set (meaning `num` is a potential start).

```
nums = [100, 4, 200, 1, 3, 2]

1. Create numSet: {1, 2, 3, 4, 100, 200}
   longestStreak = 0

2. Iterate through numSet:

   - num = 1
     numSet.has(0)? No. (1 is a sequence start)
       currentNum = 1, currentStreak = 1
       numSet.has(2)? Yes. currentNum=2, currentStreak=2
       numSet.has(3)? Yes. currentNum=3, currentStreak=3
       numSet.has(4)? Yes. currentNum=4, currentStreak=4
       numSet.has(5)? No. Sequence ends.
       longestStreak = max(0, 4) = 4

   - num = 2
     numSet.has(1)? Yes. (2 is not a sequence start, skip)

   - num = 3
     numSet.has(2)? Yes. (3 is not a sequence start, skip)

   - num = 4
     numSet.has(3)? Yes. (4 is not a sequence start, skip)

   - num = 100
     numSet.has(99)? No. (100 is a sequence start)
       currentNum = 100, currentStreak = 1
       numSet.has(101)? No. Sequence ends.
       longestStreak = max(4, 1) = 4

   - num = 200
     numSet.has(199)? No. (200 is a sequence start)
       currentNum = 200, currentStreak = 1
       numSet.has(201)? No. Sequence ends.
       longestStreak = max(4, 1) = 4

Final result: 4
```

---

## 3. LRU Cache (Hash Map + Doubly Linked List)

**Concept:** Hash Map for O(1) access to nodes. Doubly Linked List for O(1) ordering (MRU at head, LRU at tail).

```
Capacity = 2

Data structures:
  cacheMap: Map<Key, DLNode>
  lruList: DoublyLinkedList (Head = MRU, Tail = LRU)

Initial State:
  cacheMap = {}
  lruList = Head(null) <-> Tail(null)

1. put(1, 1)
   - Key 1 not in map.
   - List not full.
   - Add new node (1:1) to head.
   - Map: { 1: Node(1:1) }
   - List: Head(1:1) <-> Tail(1:1)

2. put(2, 2)
   - Key 2 not in map.
   - List not full.
   - Add new node (2:2) to head.
   - Map: { 1: Node(1:1), 2: Node(2:2) }
   - List: Head(2:2) <-> (1:1) <-> Tail(1:1)

3. get(1)
   - Key 1 is in map.
   - Get Node(1:1).
   - Move Node(1:1) to head.
     - Remove (1:1) from its current spot.
     - Insert (1:1) at head.
   - Map: { 1: Node(1:1), 2: Node(2:2) } (references unchanged)
   - List: Head(1:1) <-> (2:2) <-> Tail(2:2)
   - Return 1

4. put(3, 3)
   - Key 3 not in map.
   - List IS full (size 2 == capacity 2).
   - Evict LRU: remove tail Node(2:2).
     - Remove Node(2:2) from list.
     - Delete 2 from map.
   - Map: { 1: Node(1:1) }
   - List: Head(1:1) <-> Tail(1:1)
   - Add new node (3:3) to head.
   - Map: { 1: Node(1:1), 3: Node(3:3) }
   - List: Head(3:3) <-> (1:1) <-> Tail(1:1)

Simplified Diagram of List with Map Pointers:

  cacheMap
  +-----+     +-----------------+
  | Key | --> | DLNode (Key,Val)|
  |     |     | prev | next     |
  +-----+     +-----------------+

put(1,1), put(2,2)
  cacheMap         lruList
  {                Head <-> ... <-> Tail
    1: Node(1,1)     (2,2) <-> (1,1)
    2: Node(2,2)     ^         ^
  }                  |         |
                     +---------+ (Pointers from Map to List Nodes)

get(1)
  cacheMap         lruList
  {                Head <-> ... <-> Tail
    1: Node(1,1)     (1,1) <-> (2,2)  (Node(1,1) moved to head)
    2: Node(2,2)     ^         ^
  }                  |         |
                     +---------+

put(3,3) (Capacity 2, so (2,2) is evicted)
  cacheMap         lruList
  {                Head <-> ... <-> Tail
    1: Node(1,1)     (3,3) <-> (1,1)
    3: Node(3,3)     ^         ^
  }                  |         |
                     +---------+
```

---

## 4. Group Anagrams (Hash Map with Sorted String Key)

**Concept:** Anagrams have the same characters, so sorting their characters results in an identical "canonical" string. This canonical string can be used as a key in a hash map to group them.

```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

Initial: anagramGroups = Map<string, string[]>{}

1. str = "eat"
   Sorted key = "aet"
   anagramGroups.has("aet")? No.
   anagramGroups.set("aet", ["eat"])
   Map: { "aet": ["eat"] }

2. str = "tea"
   Sorted key = "aet"
   anagramGroups.has("aet")? Yes.
   anagramGroups.get("aet")!.push("tea")
   Map: { "aet": ["eat", "tea"] }

3. str = "tan"
   Sorted key = "ant"
   anagramGroups.has("ant")? No.
   anagramGroups.set("ant", ["tan"])
   Map: { "aet": ["eat", "tea"], "ant": ["tan"] }

4. str = "ate"
   Sorted key = "aet"
   anagramGroups.has("aet")? Yes.
   anagramGroups.get("aet")!.push("ate")
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan"] }

5. str = "nat"
   Sorted key = "ant"
   anagramGroups.has("ant")? Yes.
   anagramGroups.get("ant")!.push("nat")
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"] }

6. str = "bat"
   Sorted key = "abt"
   anagramGroups.has("abt")? No.
   anagramGroups.set("abt", ["bat"])
   Map: { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"] }

Final result: Array.from(anagramGroups.values())
  = [ ["eat", "tea", "ate"], ["tan", "nat"], ["bat"] ]
  (Order within groups and of groups may vary)
```
```