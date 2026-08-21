# System of Numeration

**Board:** ISC  
**Class:** XI  
**Subject:** Computer Science  
**Section:** A — Hardware  
**Official syllabus unit:** System of Numeration  
**Source:** CISCE ISC Examination Year 2028 Computer Science (868)

## Learning Objectives

By the end of this chapter, a student should be able to:

- explain positional notation and the meaning of a base/radix;
- convert integers between binary, octal, decimal and hexadecimal;
- perform addition, subtraction and multiplication in different bases;
- use 1's complement and 2's complement for binary subtraction;
- show the working clearly enough to reproduce the algorithm in an examination.

## 1. Positional Number Systems

A positional number system represents a number using a base. The value of a digit depends on both the digit itself and its position.

For a number `d3 d2 d1 d0` in base `b`:

`d3 × b³ + d2 × b² + d1 × b¹ + d0 × b⁰`

Common bases used in Computer Science are:

| System | Base | Digits |
|---|---:|---|
| Binary | 2 | 0, 1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hexadecimal | 16 | 0–9, A–F |

Hexadecimal uses A=10, B=11, C=12, D=13, E=14 and F=15.

## 2. Decimal to Binary

Repeatedly divide the decimal number by 2 and record the remainders. Read the remainders from bottom to top.

Example: convert 25 to binary.

```text
25 ÷ 2 = 12 remainder 1
12 ÷ 2 =  6 remainder 0
 6 ÷ 2 =  3 remainder 0
 3 ÷ 2 =  1 remainder 1
 1 ÷ 2 =  0 remainder 1
```

Therefore:

`25₁₀ = 11001₂`

## 3. Binary to Decimal

Multiply each bit by the corresponding power of 2.

Example:

`11001₂ = 1×2⁴ + 1×2³ + 0×2² + 0×2¹ + 1×2⁰`

`= 16 + 8 + 0 + 0 + 1 = 25₁₀`

## 4. Binary and Octal

Because `8 = 2³`, group binary digits in groups of three from the right.

Example:

`101101₂ → 101 101 → 5 5`

So:

`101101₂ = 55₈`

For the reverse conversion, replace each octal digit with its three-bit binary equivalent.

## 5. Binary and Hexadecimal

Because `16 = 2⁴`, group binary digits in groups of four.

Example:

`10101111₂ → 1010 1111 → A F`

So:

`10101111₂ = AF₁₆`

For the reverse conversion, replace each hexadecimal digit with four bits.

## 6. Arithmetic in Different Bases

### Addition

Add digits from right to left. The carry is generated according to the base.

For binary:

```text
  1011
+ 0110
------
 10001
```

The key binary rules are:

- `0 + 0 = 0`
- `0 + 1 = 1`
- `1 + 0 = 1`
- `1 + 1 = 10`

### Subtraction

Subtract from right to left while borrowing according to the base. In binary, a borrowed `1` represents `2` in the current column.

### Multiplication

Multiply using the same positional principle as decimal arithmetic, but every intermediate result must remain valid in the selected base.

## 7. 1's Complement

The 1's complement of a binary number is obtained by changing every `0` to `1` and every `1` to `0`.

Example:

`10110010 → 01001101`

It can be used as a method for representing negative values and for binary subtraction exercises.

## 8. 2's Complement

The 2's complement is obtained by:

1. finding the 1's complement;
2. adding 1 to the result.

Example:

```text
Number:       10110010
1's comp.:    01001101
Add 1:        00000001
              --------
2's comp.:    01001110
```

## 9. Common Mistakes

- Using an invalid digit for a base. For example, `8` is not a valid octal digit.
- Reading repeated-division remainders in the wrong direction.
- Forgetting that hexadecimal A–F represent values 10–15.
- Grouping binary digits incorrectly for octal or hexadecimal conversion.
- Forgetting the final `+1` when calculating 2's complement.
- Treating binary `1 + 1` as decimal `2` instead of `10₂`.

## Exam Tips

- Always write the base as a subscript when the representation could be ambiguous.
- Show conversion steps instead of writing only the final answer.
- For hexadecimal conversion, write the binary groups before converting them to A–F.
- In complement questions, keep the bit-width unchanged.
- Reconvert your answer when time permits; it catches many conversion errors.

## Quick Revision

- Base 2 → Binary
- Base 8 → Octal
- Base 10 → Decimal
- Base 16 → Hexadecimal
- Octal digit ↔ 3 binary bits
- Hexadecimal digit ↔ 4 binary bits
- 1's complement → invert every bit
- 2's complement → 1's complement + 1
- Positional value → digit × base^position

## Practice Questions

1. Convert `45₁₀` to binary.
2. Convert `101101₂` to decimal.
3. Convert `753₈` to binary.
4. Convert `3AF₁₆` to binary.
5. Convert `11101011₂` to hexadecimal.
6. Add `101101₂` and `11011₂`.
7. Subtract `10110₂` from `110101₂`.
8. Multiply `1011₂` by `101₂`.
9. Find the 1's complement of `11001010`.
10. Find the 2's complement of `11001010` using 8 bits.
11. Explain why positional notation depends on the base.
12. Explain the relationship between binary, octal and hexadecimal grouping.

## Learning Outcome

A student who completes this chapter should be able to perform base conversions and binary arithmetic systematically, explain complements, and present working suitable for an ISC Class XI theory examination.
