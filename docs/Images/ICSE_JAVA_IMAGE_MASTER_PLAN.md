# Target95 — ICSE/ISC Java Visual Learning Master Plan

## Purpose
Create meaningful educational visuals for every ICSE/ISC Computer Science Java chapter. Images must teach, clarify, or reinforce a concept; decorative-only assets are not sufficient.

## Global visual standard
- Target: 5–15 meaningful visuals per chapter, aligned to the existing Target95 content architecture.
- Prefer clean vector-style educational diagrams, flowcharts, memory diagrams, comparison tables, and annotated code visuals.
- Each visual should have a short student-friendly caption and alt text.
- Keep visuals syllabus-safe and board-appropriate.
- Do not alter routing or learning flow just to add images.

## Chapter plan

### 1. Introduction to Java
1. Java ecosystem: source code → compiler → bytecode → JVM → output
2. JDK vs JRE vs JVM comparison
3. Platform independence concept
4. Java program structure annotated
5. Compilation and execution flow
6. Comments in Java visual syntax guide

### 2. Data Types & Variables
1. Java primitive data type family
2. Size/range comparison chart
3. Variable declaration → initialization → use
4. Identifier naming rules
5. Primitive vs reference type concept
6. Type conversion overview

### 3. Operators
1. Operator categories map
2. Arithmetic operators
3. Relational operators
4. Logical operators
5. Assignment/compound assignment
6. Increment/decrement timeline
7. Operator precedence ladder
8. Expression evaluation worked visual

### 4. Input in Java
1. Scanner input flow
2. Input → conversion → variable diagram
3. Common Scanner methods comparison
4. String vs numeric input distinction
5. Input validation concept
6. Sample program annotated with input/output markers

### 5. Conditional Statements
1. if flowchart
2. if-else flowchart
3. else-if ladder flowchart
4. nested-if flowchart
5. switch flow diagram
6. Decision-making comparison chart
7. Common branching mistakes visual

### 6. Iterative Statements / Loops
1. for loop flowchart
2. while loop flowchart
3. do-while flowchart
4. Entry-controlled vs exit-controlled comparison
5. Loop variable lifecycle
6. break vs continue visual
7. Nested loop execution pattern

### 7. Methods
1. Method declaration anatomy
2. Method call flow
3. Actual vs formal parameters
4. Return value flow
5. Void vs value-returning method comparison
6. Stack-style method call visual
7. Method overloading concept

### 8. Arrays
1. Array concept
2. Indexing visual
3. Array memory layout
4. One-dimensional array traversal
5. Array initialization forms
6. Two-dimensional array grid
7. Row/column indexing
8. Common array errors

### 9. Strings
1. String indexing
2. String length and character positions
3. Common String methods map
4. Substring concept
5. String comparison visual
6. String immutability concept
7. String vs char[] comparison

### 10. Classes & Objects
1. Class as blueprint → object as instance
2. Object state vs behaviour
3. Fields and methods relationship
4. Object creation with new
5. Reference variable concept
6. Dot operator/member access
7. Two objects from one class

### 11. Constructors
1. Constructor anatomy
2. Object creation → constructor call
3. Default vs parameterized constructor
4. Constructor overloading
5. Constructor vs method comparison
6. this keyword basics

### 12. Inheritance
1. Parent-child class hierarchy
2. extends relationship
3. Single-level inheritance
4. Multilevel inheritance
5. Method inheritance/overriding concept
6. Access visibility in inheritance
7. super keyword concept

### 13. Polymorphism
1. Polymorphism overview
2. Method overloading visual
3. Method overriding visual
4. Compile-time vs run-time comparison
5. Reference type vs object type
6. Dynamic method dispatch concept

### 14. Encapsulation
1. Data hiding concept
2. private fields + public methods
3. Getter/setter flow
4. Encapsulated class anatomy
5. Controlled access visual
6. Benefits comparison: exposed vs encapsulated state

### 15. Packages & Access Modifiers
1. Package/folder structure
2. import flow
3. public/protected/default/private comparison matrix
4. Same-class/same-package/subclass/outside-package access visual
5. Package naming concept

### 16. Exception Handling
1. try → catch → finally flowchart
2. Normal execution vs exceptional execution
3. Exception hierarchy overview
4. throw vs throws comparison
5. Multiple catch flow
6. Common exception examples
7. Graceful recovery concept

### 17. Recursion
1. Recursive call stack
2. Base case vs recursive case
3. Factorial recursion trace
4. Call/unwind sequence
5. Infinite recursion warning
6. Recursion vs iteration comparison

### 18. Searching & Sorting
1. Linear search step-by-step
2. Binary search elimination visual
3. Bubble sort passes
4. Selection sort visualization
5. Insertion sort visualization
6. Searching algorithm comparison
7. Sorting algorithm comparison

### 19. Stack
1. Stack data structure concept
2. PUSH operation
3. POP operation
4. LIFO concept
5. Stack pointer/top visual
6. Stack overflow/underflow
7. Stack implementation in Java concept

### 20. Queue
1. Queue data structure concept
2. ENQUEUE operation
3. DEQUEUE operation
4. FIFO concept
5. Front/rear pointers
6. Overflow/underflow concept
7. Queue vs stack comparison

### 21. Trees
1. Tree anatomy: root, parent, child, leaf
2. Binary tree concept
3. Tree levels/depth/height
4. Traversal: preorder/inorder/postorder
5. Traversal trace example
6. Binary search tree concept
7. Tree vs linear structure comparison

## Production priorities
### Tier 1 — Must-have before content is considered visually complete
Introduction to Java; Data Types & Variables; Operators; Conditional Statements; Loops; Methods; Arrays; Strings; Classes & Objects; Constructors; Inheritance; Polymorphism; Encapsulation; Exception Handling; Recursion; Searching & Sorting; Stack; Queue; Trees.

### Tier 2 — Strongly recommended
Input in Java; Packages & Access Modifiers.

## Asset metadata standard
Each generated asset should be registered with:
- `id`
- `chapterSlug`
- `title`
- `purpose`
- `caption`
- `alt`
- `assetType` (`diagram`, `flowchart`, `memory`, `comparison`, `code-visual`)
- `priority`
- `sourceSection`
- `path`

## Integration rule
Images should be mapped to the relevant theory/example section through the existing chapter-content architecture. Do not create a separate image-only learning route. The existing Study Mode already expects diagrams/visuals as part of chapter learning.
