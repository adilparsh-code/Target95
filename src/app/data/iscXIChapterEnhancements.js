export const ISC_XI_CHAPTER_ENHANCEMENTS = {
  "xi-system-of-numeration": {
    overview: "Number systems represent values using different bases. For ISC XI, you should be able to convert between decimal, binary, octal and hexadecimal, perform binary arithmetic, and use 1's and 2's complement confidently.",
    sections: [
      {
        title: "Positional number systems",
        points: [
          "Decimal uses base 10 and place values 10^0, 10^1, 10^2, ... .",
          "Binary uses base 2 and only the digits 0 and 1.",
          "Octal uses base 8; hexadecimal uses base 16 with A-F representing 10-15.",
          "The value of a digit is digit × base^position, counted from the right starting at position 0."
        ],
        example: "101101₂ = 1×2^5 + 0×2^4 + 1×2^3 + 1×2^2 + 0×2^1 + 1×2^0 = 45₁₀."
      },
      {
        title: "Binary ↔ octal and hexadecimal",
        points: [
          "For binary to octal, group bits in sets of 3 from the right.",
          "For binary to hexadecimal, group bits in sets of 4 from the right.",
          "Pad the leftmost group with zeroes when necessary; padding does not change the value."
        ],
        example: "11010110₂ → 1101 0110 → D6₁₆; and 11 010 110 → 326₈."
      },
      {
        title: "1's complement",
        points: [
          "1's complement is formed by changing every 0 to 1 and every 1 to 0.",
          "For an 8-bit value, keep exactly 8 bits while taking the complement.",
          "Example: 00101101 → 11010010."
        ],
        example: "1's complement of 01010110₂ is 10101001₂."
      },
      {
        title: "2's complement",
        points: [
          "Start with the binary value and form its 1's complement.",
          "Add 1 to the 1's complement, keeping the fixed bit width.",
          "For 8-bit signed representation, the most significant bit indicates a negative value when it is 1.",
          "Example for −13: +13 = 00001101 → 1's complement 11110010 → +1 = 11110011."
        ],
        example: "8-bit 2's complement of +18: 00010010 → 11101101 → 11101110 for −18."
      },
      {
        title: "Binary subtraction using 2's complement",
        points: [
          "Write the minuend and subtrahend using the same number of bits.",
          "Take the 2's complement of the subtrahend.",
          "Add it to the minuend.",
          "If an end carry occurs, discard it for a positive result in fixed-width arithmetic.",
          "If there is no end carry, interpret the result using 2's complement."
        ],
        example: "7 − 3 (4-bit): 0111 + 2's complement(0011) = 0111 + 1101 = 1 0100 → discard carry → 0100₂ = 4."
      },
      {
        title: "Exam traps",
        points: [
          "Do not confuse 1's complement with 2's complement: 2's complement = 1's complement + 1.",
          "Never mix bit widths while adding complements.",
          "Do not discard an end carry before completing the binary addition.",
          "For conversions, show place values or grouping so the working can be reproduced in an examination."
        ]
      }
    ],
    quickPractice: [
      { question: "Convert 101011₂ to decimal.", answer: "43₁₀" },
      { question: "Find the 1's complement of 00110110₂.", answer: "11001001₂" },
      { question: "Find the 8-bit 2's complement of 25.", answer: "11100111₂" },
      { question: "Use 8-bit 2's complement to calculate 18 − 7.", answer: "00001011₂" }
    ]
  }
};
