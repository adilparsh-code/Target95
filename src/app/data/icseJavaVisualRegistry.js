const icseJavaVisualRegistry = {
  introduction: [
    {
      id: "java-program-life-cycle",
      title: "Java Program Life Cycle",
      explanation: "Visualize the main stages from Java source code to execution on the Java Virtual Machine.",
      src: "/visuals/icse-java/java-program-life-cycle.svg",
      alt: "Flow diagram showing Java source code compiled to bytecode and executed by the Java Virtual Machine.",
      caption: "Source code → compilation → bytecode → JVM execution."
    },
    {
      id: "java-platform-stack",
      title: "Java Platform Stack",
      explanation: "See how the JDK, JRE and JVM fit together in the Java platform.",
      src: "/visuals/icse-java/java-platform-stack.svg",
      alt: "Layered diagram showing JDK containing JRE and JRE containing the JVM and core libraries.",
      caption: "JDK contains the development tools; JRE provides the runtime environment; JVM executes bytecode."
    }
  ],
  "for-loop": [
    {
      id: "java-loop-flow",
      title: "FOR Loop Execution Flow",
      explanation: "Follow initialization, condition checking, loop body execution and iteration in the correct order.",
      src: "/visuals/icse-java/java-loop-flow.svg",
      alt: "Flowchart showing the Java for loop sequence of initialization, condition, body and iteration.",
      caption: "Initialization happens once; condition is checked before each iteration; iteration runs after the body."
    }
  ],
  "arrays-1d": [
    {
      id: "java-array-indexing",
      title: "One-Dimensional Array Indexing",
      explanation: "Java arrays are zero-indexed. For five elements, valid indexes are 0 through 4.",
      src: "/visuals/icse-java/java-array-indexing.svg",
      alt: "Array with values 72, 85, 91, 64 and 78 labelled at indexes 0 through 4.",
      caption: "Five elements have valid indexes 0 to 4; the last valid index is length minus one."
    }
  ],
  "classes-objects": [
    {
      id: "java-encapsulation-flow",
      title: "Encapsulation Flow",
      explanation: "Encapsulation groups data and methods inside a class and controls direct access to internal state.",
      src: "/visuals/icse-java/java-encapsulation-flow.svg",
      alt: "Diagram showing controlled access to private data through public methods in a Java class.",
      caption: "Keep state protected and expose controlled operations through methods."
    },
    {
      id: "java-inheritance-hierarchy",
      title: "Inheritance Hierarchy",
      explanation: "A parent class can provide inherited members to a child class using Java inheritance.",
      src: "/visuals/icse-java/java-inheritance-hierarchy.svg",
      alt: "Class hierarchy diagram showing a parent class and child classes connected by inheritance relationships.",
      caption: "Inheritance expresses an is-a relationship between a subclass and its superclass."
    }
  ]
};

export default icseJavaVisualRegistry;
