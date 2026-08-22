export const iscClass12BooleanLogic = {
  className: 'ISC Class XII',
  examYear: 2028,
  section: 'Section A',
  units: [
    {
      title: 'Boolean Algebra',
      topics: [
        'Binary-valued quantities and Boolean operations AND, OR, NOT',
        'Truth tables and Boolean expressions',
        'Boolean algebra postulates and theorems',
        'Duality, idempotence, commutativity, associativity, distributivity',
        'Identity, null, complement, absorption and involution laws',
        "De Morgan's theorems and applications",
        'Sum of Products (SOP) and Product of Sums (POS)',
        'Maxterms and minterms',
        'Canonical and cardinal representations',
        'Karnaugh maps up to four variables',
        'Reduction of Boolean expressions using Boolean algebra and K-maps',
        'Truth-table verification of Boolean laws',
        'Half adder, full adder and majority circuit inputs/outputs'
      ]
    },
    {
      title: 'Computer Hardware: Logic Gates and Combinational Circuits',
      topics: [
        'NOT, AND, OR, NAND, NOR, XOR and XNOR gates',
        'Gate symbols, Boolean expressions, truth tables and use in circuits',
        'Half adder and full adder',
        'Encoders and decoders',
        'Multiplexers',
        'Half subtractor and full subtractor',
        'NAND and NOR as universal gates',
        'Conversion of circuits to NAND-only or NOR-only implementations',
        'Correspondence between Boolean methods, switching circuits and gates'
      ]
    }
  ],
  contentRequirements: {
    keywords: true,
    commonMistakes: true,
    workedExamples: true,
    truthTables: true,
    logicCircuitExamples: true,
    kMapExamples: true,
    programmingQuestions: false,
    theoryQuestions: true
  },
  source: 'CISCE ISC Computer Science, Examination Year 2028, Section A'
};

export default iscClass12BooleanLogic;
