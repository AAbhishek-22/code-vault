import { PracticeQuestion } from '../types';

export const sampleQuestions: PracticeQuestion[] = [
  {
    id: '1',
    title: 'Two Sum',
    emoji: '🔢',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    solutions: [
      {
        id: '1-1',
        approach: 'Brute Force',
        language: 'javascript',
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: '1-2',
        approach: 'Hash Map',
        language: 'javascript',
        code: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      {
        id: '1-3',
        approach: 'Brute Force',
        language: 'go',
        code: `func twoSum(nums []int, target int) []int {
  for i := 0; i < len(nums); i++ {
    for j := i + 1; j < len(nums); j++ {
      if nums[i] + nums[j] == target {
        return []int{i, j}
      }
    }
  }
  return nil
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      },
      {
        id: '1-4',
        approach: 'Hash Map',
        language: 'go',
        code: `func twoSum(nums []int, target int) []int {
  m := make(map[int]int)
  
  for i, num := range nums {
    complement := target - num
    
    if idx, found := m[complement]; found {
      return []int{idx, i}
    }
    
    m[num] = i
  }
  
  return nil
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    emoji: '🔄',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    solutions: [
      {
        id: '2-1',
        approach: 'Using Stack',
        language: 'javascript',
        code: `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (map[char]) {
      // If it's an opening bracket, push to stack
      stack.push(char);
    } else {
      // If it's a closing bracket
      const lastBracket = stack.pop();
      
      if (map[lastBracket] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      {
        id: '2-2',
        approach: 'Using Stack',
        language: 'go',
        code: `func isValid(s string) bool {
  stack := []rune{}
  brackets := map[rune]rune{
    '(': ')',
    '{': '}',
    '[': ']',
  }
  
  for _, char := range s {
    if _, ok := brackets[char]; ok {
      // If it's an opening bracket, push to stack
      stack = append(stack, char)
    } else {
      // If it's a closing bracket
      if len(stack) == 0 {
        return false
      }
      
      lastBracket := stack[len(stack)-1]
      stack = stack[:len(stack)-1]
      
      if brackets[lastBracket] != char {
        return false
      }
    }
  }
  
  return len(stack) == 0
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      }
    ]
  },
  {
    id: '3',
    title: 'Reverse Linked List',
    emoji: '↩️',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    solutions: [
      {
        id: '3-1',
        approach: 'Iterative',
        language: 'javascript',
        code: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
      },
      {
        id: '3-2',
        approach: 'Recursive',
        language: 'javascript',
        code: `function reverseList(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const reversed = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  
  return reversed;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      {
        id: '3-3',
        approach: 'Iterative',
        language: 'go',
        code: `func reverseList(head *ListNode) *ListNode {
  var prev *ListNode
  current := head
  
  for current != nil {
    next := current.Next
    current.Next = prev
    prev = current
    current = next
  }
  
  return prev
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
      },
      {
        id: '3-4',
        approach: 'Recursive',
        language: 'go',
        code: `func reverseList(head *ListNode) *ListNode {
  if head == nil || head.Next == nil {
    return head
  }
  
  reversed := reverseList(head.Next)
  head.Next.Next = head
  head.Next = nil
  
  return reversed
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      }
    ]
  }
];