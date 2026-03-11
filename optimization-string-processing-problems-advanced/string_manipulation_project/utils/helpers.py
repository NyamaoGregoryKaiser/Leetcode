import random
import string

class TestHelpers:
    """
    Utility functions for generating various types of test data.
    """

    @staticmethod
    def generate_random_string(length: int, chars: str = string.ascii_lowercase + string.digits) -> str:
        """
        Generates a random string of specified length using a given set of characters.
        Default characters include lowercase letters and digits.
        """
        if length < 0:
            raise ValueError("Length cannot be negative.")
        return ''.join(random.choice(chars) for _ in range(length))

    @staticmethod
    def generate_random_palindromic_string(length: int, chars: str = string.ascii_lowercase) -> str:
        """
        Generates a random palindromic string of specified length.
        """
        if length < 0:
            raise ValueError("Length cannot be negative.")
        if length == 0:
            return ""
        
        half_len = length // 2
        first_half = TestHelpers.generate_random_string(half_len, chars)
        
        if length % 2 == 1:
            middle_char = random.choice(chars)
            return first_half + middle_char + first_half[::-1]
        else:
            return first_half + first_half[::-1]

    @staticmethod
    def generate_random_parentheses_string(length: int, valid_only: bool = False) -> str:
        """
        Generates a random string of parentheses.
        If `valid_only` is True, it attempts to generate a valid sequence.
        Note: Generating truly random *valid* sequences of arbitrary length is complex
              and usually involves Catalan numbers or specific algorithms.
              For simplicity, `valid_only=True` here means a balanced sequence,
              not necessarily a permutation of any valid sequence.
        """
        if length < 0:
            raise ValueError("Length cannot be negative.")
        if length == 0:
            return ""

        open_brackets = ['(', '[', '{']
        close_brackets = [')', ']', '}']
        all_brackets = open_brackets + close_brackets

        if valid_only:
            # Simple approach for valid_only: ensure balance by construction
            # This will generate strings like "((()))" or "()()()",
            # not complex valid ones like "({[]})" easily.
            if length % 2 != 0:
                # A valid string must have an even length
                length += 1 # Or raise error
            
            s = []
            open_count = 0
            close_count = 0
            
            for _ in range(length):
                if open_count < length / 2 and (close_count == open_count or random.choice([True, False])): # Try to open
                    s.append(random.choice(open_brackets))
                    open_count += 1
                elif close_count < open_count: # Must close
                    last_open = s[-1] if s else None # This doesn't ensure correct type matching for random choice
                    
                    if last_open == '(': s.append(')')
                    elif last_open == '[': s.append(']')
                    elif last_open == '{': s.append('}')
                    else: s.append(random.choice(close_brackets)) # Fallback, not strictly valid if stack empty
                    
                    close_count += 1
                else: # Must open if possible
                    s.append(random.choice(open_brackets))
                    open_count += 1

            # Simple retry/rebalance for valid strings, or just ensure equal counts
            final_s = "".join(s)
            if final_s.count('(') != final_s.count(')') or \
               final_s.count('[') != final_s.count(']') or \
               final_s.count('{') != final_s.count('}'):
                # This simple method doesn't guarantee structural validity, only count.
                # For robust random *valid* parentheses, more advanced algorithms are needed.
                # For tests, often valid sequences are manually crafted or a simpler constructor is used.
                return TestHelpers.generate_balanced_parentheses_string(length) # Use the more reliable balanced generator
            
            return "".join(s)
        else:
            return ''.join(random.choice(all_brackets) for _ in range(length))

    @staticmethod
    def generate_balanced_parentheses_string(length: int) -> str:
        """
        Generates a random structurally balanced parentheses string of given length.
        The length must be even.
        """
        if length % 2 != 0 or length < 0:
            raise ValueError("Length must be a non-negative even number for balanced parentheses.")
        if length == 0:
            return ""
        
        brackets_map = {'(': ')', '[': ']', '{': '}'}
        open_brackets = list(brackets_map.keys())
        
        result = []
        open_stack = []
        
        for _ in range(length):
            # If we need to append an opening bracket or we're at the end and must close
            if len(open_stack) < length / 2 and (len(result) < length - len(open_stack) - 1 or not open_stack):
                chosen_open = random.choice(open_brackets)
                result.append(chosen_open)
                open_stack.append(chosen_open)
            elif open_stack: # If stack is not empty, we can close
                last_open = open_stack.pop()
                result.append(brackets_map[last_open])
            else: # Should not happen if length is even and logic is perfect
                # Fallback, add a random open if no other choice, might lead to invalid
                chosen_open = random.choice(open_brackets)
                result.append(chosen_open)
                open_stack.append(chosen_open)
        
        # Ensure remaining open brackets are closed
        while open_stack:
            last_open = open_stack.pop()
            result.append(brackets_map[last_open])
            
        return "".join(result[:length]) # Trim if somehow longer

    @staticmethod
    def generate_random_anagram_list(num_words: int, word_length: int, chars: str = string.ascii_lowercase) -> list[str]:
        """
        Generates a list of random words, some of which are anagrams.
        """
        if num_words <= 0 or word_length <= 0:
            return []

        words = []
        potential_anagram_bases = []

        # Create some base words that will be shuffled to form anagrams
        num_bases = random.randint(1, min(num_words, 5)) # Up to 5 base words for anagrams
        for _ in range(num_bases):
            base = TestHelpers.generate_random_string(word_length, chars)
            potential_anagram_bases.append(base)

        for _ in range(num_words):
            if random.random() < 0.7 and potential_anagram_bases: # 70% chance to pick an anagram base
                base_word = random.choice(potential_anagram_bases)
                word_chars = list(base_word)
                random.shuffle(word_chars)
                words.append("".join(word_chars))
            else: # 30% chance for a completely new random word
                words.append(TestHelpers.generate_random_string(word_length, chars))
        
        random.shuffle(words) # Shuffle the final list to mix anagrams

        return words

    @staticmethod
    def generate_atoi_test_string(length: int, include_whitespace: bool = True, include_sign: bool = True, include_words: bool = True) -> str:
        """
        Generates a random string suitable for atoi testing, including edge cases.
        """
        if length <= 0:
            return ""

        parts = []

        # Add leading whitespace
        if include_whitespace and random.choice([True, False]):
            parts.append(' ' * random.randint(0, length // 4))

        # Add sign
        if include_sign and random.choice([True, False]):
            parts.append(random.choice(['-', '+']))

        # Add digits
        num_digits = random.randint(1, max(1, length - len("".join(parts)) - (length // 4 if include_words else 0)))
        parts.append(TestHelpers.generate_random_string(num_digits, string.digits))

        # Add trailing words/chars
        if include_words and random.choice([True, False]):
            trailing_len = length - len("".join(parts))
            if trailing_len > 0:
                parts.append(' ' + TestHelpers.generate_random_string(trailing_len, string.ascii_lowercase))
        
        return "".join(parts).strip()[:length] # Trim to exact length and remove excessive trailing/leading spaces from 'join'
                                               # but keep intended leading/trailing spaces for atoi test