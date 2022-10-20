function anagrams(str1, str2) {
  // Your code here
  const hashtable = {};
  for (let i = 0; i < str1.length; i += 1) {
    if (str1[i] in hashtable) {
      hashtable[str1[i]] += 1;
    } else {
      hashtable[str1[i]] = 1;
    }
  }

  for (let j = 0; j < str2.length; j += 1) {
    if (!(str2[j] in hashtable)) {
      return false;
    }
    hashtable[str2[j]] -= 1;
    if (hashtable[str2[j]] === 0) {
      delete hashtable[str2[j]]
    }
  }

  return Object.keys(hashtable).length === 0;


}


function commonElements(arr1, arr2) {
  // Your code here
  const newSet = new Set();
  arr1.forEach(el => newSet.add(el));
  arr2.forEach(el => {
    if (!newSet.has(el)) {
      newSet.delete(el);
    }
  });
  return [...newSet];

}


function duplicate(arr) {
  // Your code here
  const newSet = new Set()

  for (let i = 0; i < arr.length; i += 1) {
    if (newSet.has(arr[i])) {
      return arr[i];
    }
    newSet.add(arr[i]);
  }

}


function twoSum(nums, target) {
  // Your code here
  const newSet = new Set()
  for (let i = 0; i < nums.length; i += 1) {
    let newNum = target - nums[i];
    if (newSet.has(newNum)) {
      return true
    }
    newSet.add(nums[i]);
  }

  return false;

}


function wordPattern(pattern, strings) {
  // Your code here
  const hashtable = {};
  const hashtableV = {};

  for (let i = 0; i < pattern.length; i += 1) {
    let patternChar = pattern[i];
    let stringsChar = strings[i];
    if (patternChar in hashtable) {
      if (hashtable[patternChar] != stringsChar) {
        return false;
      }
    } else {
      hashtable[patternChar] = stringsChar;
    }

    if (stringsChar in hashtableV) {
      if (hashtableV[stringsChar] != patternChar) {
        return false;
      }
    } else {
      hashtableV[stringsChar] = patternChar;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
