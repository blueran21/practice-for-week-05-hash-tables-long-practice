class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    if (this.count > this.capacity * 0.7) {
      this.resize();
    }

    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.data[index] = newPair;
      this.count += 1;
    } else {
      let curr = this.data[index];
      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        curr = curr.next;
      }
      let head = this.data[index];
      newPair.next = head;
      this.data[index] = newPair;
      this.count += 1;
    }
  }


  read(key) {
    // Your code here
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      return
    }
    let curr = this.data[index];
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return
  }


  resize() {
    // Your code here
    let dataCopy = this.data.slice();
    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < dataCopy.length; i += 1) {
      let pair = dataCopy[i];
      while (pair) {
        this.insert(pair.key, pair.value);
        pair = pair.next;
      }
    }
  }



  delete(key) {
    // Your code here
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      return "Key not found"
    }
    let curr = this.data[index];
    if (curr.key === key) {
      this.data[index] = curr.next;
      this.count -= 1;
      return
    }
    while (curr.next) {
      if (key === curr.next.key) {
        curr.next = curr.next.next;
        this.count -= 1;
        return
      }
      curr = curr.next;
    }

    return "Key not found";
  }
}


module.exports = HashTable;


// let hashTable = new HashTable(2);


// hashTable.insert("key1", "value1");
// hashTable.insert("key2", "value2");

// hashTable.resize();
// console.log(hashTable.data);
// console.log(hashTable.read("key1"));

// expect(hashTable.count).to.equal(3);
// expect(hashTable.capacity).to.equal(capacity * 2);
// expect(hashTable.data.length).to.equal(capacity * 2);

// expect(hashTable.read("key1")).to.equal("value1");
// expect(hashTable.read("key2")).to.equal("value2");
// expect(hashTable.read("key3")).to.equal("value3");
