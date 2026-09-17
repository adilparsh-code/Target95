// ISC XII — Combinational Logic: Encoders, Decoders, Multiplexers and Adders
export const COMBINATIONAL_LOGIC = {
  encoder: {
    title: "Encoder",
    idea: "An encoder converts one active input line into a binary code at its output.",
    keyRule: "2^n input lines can be represented using n output bits.",
    example: "4-to-2 encoder: D2 active → output 10.",
    truthTable: [
      { input: "D0=1", output: "00" },
      { input: "D1=1", output: "01" },
      { input: "D2=1", output: "10" },
      { input: "D3=1", output: "11" }
    ],
    caution: "A basic encoder assumes only one input is active. Priority encoders handle multiple active inputs."
  },
  decoder: {
    title: "Decoder",
    idea: "A decoder takes n binary input bits and activates one of 2^n output lines.",
    keyRule: "n input bits → 2^n output lines.",
    example: "2-to-4 decoder: input 10 activates output Y2.",
    truthTable: [
      { input: "00", output: "Y0=1" },
      { input: "01", output: "Y1=1" },
      { input: "10", output: "Y2=1" },
      { input: "11", output: "Y3=1" }
    ],
    caution: "Check whether outputs are active-high or active-low in the circuit diagram."
  },
  multiplexer: {
    title: "Multiplexer (MUX)",
    idea: "A multiplexer selects one of several data inputs and sends the selected value to a single output.",
    keyRule: "2^n data inputs require n select lines.",
    example: "4-to-1 MUX uses S1,S0 to choose one of D0–D3.",
    selectTable: [
      { S1: 0, S0: 0, selected: "D0" },
      { S1: 0, S0: 1, selected: "D1" },
      { S1: 1, S0: 0, selected: "D2" },
      { S1: 1, S0: 1, selected: "D3" }
    ],
    equation: "Y = S1'S0'D0 + S1'S0D1 + S1S0'D2 + S1S0D3"
  },
  halfAdder: {
    title: "Half Adder",
    idea: "Adds two one-bit binary inputs. It produces Sum and Carry.",
    equations: ["S = A ⊕ B", "C = AB"],
    truthTable: [
      { A: 0, B: 0, S: 0, C: 0 },
      { A: 0, B: 1, S: 1, C: 0 },
      { A: 1, B: 0, S: 1, C: 0 },
      { A: 1, B: 1, S: 0, C: 1 }
    ],
    example: "1 + 1 = binary 10 → Sum=0, Carry=1."
  },
  fullAdder: {
    title: "Full Adder",
    idea: "Adds three one-bit values: A, B and an incoming carry Cin.",
    equations: ["S = A ⊕ B ⊕ Cin", "Cout = AB + BCin + ACin"],
    truthTable: [
      { A: 0, B: 0, Cin: 0, S: 0, Cout: 0 },
      { A: 0, B: 0, Cin: 1, S: 1, Cout: 0 },
      { A: 0, B: 1, Cin: 0, S: 1, Cout: 0 },
      { A: 0, B: 1, Cin: 1, S: 0, Cout: 1 },
      { A: 1, B: 0, Cin: 0, S: 1, Cout: 0 },
      { A: 1, B: 0, Cin: 1, S: 0, Cout: 1 },
      { A: 1, B: 1, Cin: 0, S: 0, Cout: 1 },
      { A: 1, B: 1, Cin: 1, S: 1, Cout: 1 }
    ],
    construction: "A full adder can be built from two half adders and one OR gate."
  },
  demultiplexer: {
    title: "Demultiplexer (DEMUX)",
    idea: "A demultiplexer takes one data input and routes it to one of 2^n output lines chosen by n select bits. It is the inverse of a MUX.",
    keyRule: "1 data input + n select lines → 2^n outputs.",
    example: "1-to-4 DEMUX with S1S0=10 sends D to Y2; the other Yi stay 0.",
    selectTable: [
      { S1: 0, S0: 0, selected: "Y0 = D" },
      { S1: 0, S0: 1, selected: "Y1 = D" },
      { S1: 1, S0: 0, selected: "Y2 = D" },
      { S1: 1, S0: 1, selected: "Y3 = D" }
    ]
  },
  universalGates: {
    title: "Universal NAND and NOR designs",
    idea: "NAND and NOR are universal: any combinational circuit (NOT, AND, OR, half adder, MUX) can be built using only NAND or only NOR.",
    nand: [
      "NOT A = A NAND A",
      "A AND B = (A NAND B) NAND (A NAND B)",
      "A OR B = (A NAND A) NAND (B NAND B)"
    ],
    nor: [
      "NOT A = A NOR A",
      "A OR B = (A NOR B) NOR (A NOR B)",
      "A AND B = (A NOR A) NOR (B NOR B)"
    ],
    examTip: "On board papers, draw the two-NAND inverter bubble clearly and label each gate. A half-adder Sum is XOR, which needs four NAND gates in the standard NAND-only XOR circuit."
  },
  practice: [
    { id: "CL-P1", difficulty: "easy", type: "reasoning", question: "How many output bits are needed for an 8-to-3 encoder?", answer: "3. 2^3 = 8 input lines map to 3 output bits." },
    { id: "CL-P2", difficulty: "easy", type: "reasoning", question: "How many outputs does a 3-to-8 decoder have?", answer: "8. n inputs give 2^n outputs." },
    { id: "CL-P3", difficulty: "medium", type: "tracing", question: "For a 4-to-1 MUX, which data input is selected when S1S0=10?", answer: "D2. S1S0=10 is decimal 2." },
    { id: "CL-P4", difficulty: "medium", type: "tracing", question: "Find the Sum and Carry of a half adder for A=1,B=1.", answer: "S=0, C=1 because 1+1 = binary 10." },
    { id: "CL-P5", difficulty: "hard", type: "tracing", question: "For a full adder, find S and Cout when A=1,B=1,Cin=1.", answer: "S=1, Cout=1. Three 1s sum to binary 11." },
    { id: "CL-P6", difficulty: "hard", type: "reasoning", question: "Explain why a full adder is needed instead of a half adder when adding multi-bit numbers.", answer: "Higher bit positions must include the carry generated by the previous position. A half adder has no Cin." },
    { id: "CL-P7", difficulty: "hard", type: "reasoning", question: "Write the Boolean expression for a 4-to-1 MUX output.", answer: "Y = S1'S0'D0 + S1'S0D1 + S1S0'D2 + S1S0D3" },
    { id: "CL-P8", difficulty: "board", type: "tracing", question: "A 2-to-4 decoder has inputs A1A0 = 01. Which output line is 1 (active-high)?", answer: "Y1. Binary 01 selects the second output line (Y0 for 00, Y1 for 01)." },
    { id: "CL-P9", difficulty: "board", type: "tracing", question: "4-to-2 encoder: only D3 is 1. State Y1Y0.", answer: "11. D3 encodes as 11." },
    { id: "CL-P10", difficulty: "board", type: "tracing", question: "1-to-4 DEMUX, D=1, S1S0=11. Which Yi is 1?", answer: "Y3. Select 11 routes D to Y3." },
    { id: "CL-P11", difficulty: "board", type: "debugging", question: "A student uses a half adder for bit 1 of a 4-bit adder and ignores Cin from bit 0. What is wrong?", answer: "Bit 1 must be a full adder so that the carry from bit 0 is included. Using a half adder drops that carry and gives a wrong sum." },
    { id: "CL-P12", difficulty: "board", type: "debugging", question: "A 4-to-1 MUX equation is written Y = S1S0D0 + S1S0D1 + S1S0D2 + S1S0D3. Identify the error.", answer: "Every product uses the same S1S0. The select bits must be complemented correctly: S1'S0'D0, S1'S0D1, S1S0'D2, S1S0D3." },
    { id: "CL-P13", difficulty: "board", type: "debugging", question: "A basic 4-to-2 encoder is given D1=1 and D2=1 together. Why is the output undefined in the basic encoder?", answer: "A basic encoder assumes exactly one input is active. Two active inputs produce an OR-ed, invalid code. Use a priority encoder, which ranks inputs." },
    { id: "CL-P14", difficulty: "board", type: "programming", question: "Show how to build NOT, AND and OR using NAND only.", answer: "NOT A = A NAND A. AND = NAND followed by NAND-inverter. OR = invert each input with NAND, then NAND the inverted inputs." },
    { id: "CL-P15", difficulty: "board", type: "programming", question: "Describe how a 4-bit adder is built from one half adder and three full adders (or four full adders with Cin0=0).", answer: "LSB can be a half adder (no incoming carry). Each higher bit is a full adder whose Cin is the previous Cout. Four full adders with Cin of the LSB tied to 0 is equivalent." },
    { id: "CL-P16", difficulty: "board", type: "reasoning", question: "How many select lines does an 8-to-1 MUX need, and how many data inputs does a MUX with 3 select lines have?", answer: "8-to-1 needs 3 select lines (2^3=8). 3 select lines give 8 data inputs." }
  ],
  mcqs: [
    { id: "CL-M1", question: "Which device selects one input and routes it to one output?", options: ["Encoder", "Decoder", "MUX", "Half Adder"], answer: "MUX", explanation: "A multiplexer is a many-to-one selector." },
    { id: "CL-M2", question: "A 2-to-4 decoder has how many outputs?", options: ["2", "4", "6", "8"], answer: "4", explanation: "2^2 = 4 outputs." },
    { id: "CL-M3", question: "The Sum output of a half adder is:", options: ["AB", "A+B", "A⊕B", "A'B"], answer: "A⊕B", explanation: "The Sum is 1 when inputs differ." },
    { id: "CL-M4", question: "Which input makes a full adder different from a half adder?", options: ["Cin", "D0", "Enable", "Select"], answer: "Cin", explanation: "Full adders include the incoming carry." },
    { id: "CL-M5", question: "NAND is called a universal gate because", options: ["It is faster than AND", "Any Boolean function can be built from NAND alone", "It has two inputs only", "It is the same as XOR"], answer: "Any Boolean function can be built from NAND alone", explanation: "NOT, AND and OR — hence any combinational circuit — can be realised with NAND only." },
    { id: "CL-M6", question: "A 1-to-8 demultiplexer needs how many select lines?", options: ["1", "2", "3", "8"], answer: "3", explanation: "2^3 = 8 output lines." },
    { id: "CL-M7", question: "Full-adder Cout is 1 when", options: ["At least two of A, B, Cin are 1", "Exactly one input is 1", "A is 1 only", "Cin is 0"], answer: "At least two of A, B, Cin are 1", explanation: "Cout = AB + BCin + ACin, majority of the three bits." },
    { id: "CL-M8", question: "A basic encoder vs a decoder:", options: ["Encoder: 2^n in → n out; decoder: n in → 2^n out", "Both have the same mapping", "Encoder has select lines", "Decoder adds two bits"], answer: "Encoder: 2^n in → n out; decoder: n in → 2^n out", explanation: "They are inverse operations." }
  ],
  viva: [
    "Why does an encoder require one active input in its basic form?",
    "Why are select lines necessary in a MUX?",
    "Why does a full adder need a carry-in?",
    "How can a full adder be constructed using two half adders?",
    "Why are NAND and NOR called universal gates?",
    "How does a demultiplexer differ from a multiplexer?",
    "Why can the LSB of a multi-bit adder be a half adder while the other bits cannot?"
  ]
};

export default COMBINATIONAL_LOGIC;
