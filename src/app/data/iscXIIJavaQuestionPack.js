import { ISC_XII_JAVA_STANDARD } from "./iscXIICurriculum";

export const ISC_XII_JAVA_QUESTION_PACK = {
  standard: ISC_XII_JAVA_STANDARD,
  workedExample: {
    title: "Method Overriding + Dynamic Method Dispatch",
    level: "board",
    code: `class A\n{\n    void show()\n    {\n        System.out.println("Class A");\n    }\n}\n\nclass B extends A\n{\n    void show()\n    {\n        System.out.println("Class B");\n    }\n\n    void display()\n    {\n        System.out.println("Display B");\n    }\n}\n\nclass Test\n{\n    public static void main(String args[])\n    {\n        A obj = new B();\n        obj.show();\n        // obj.display();\n    }\n}`,
    tasks: ["State the output.","Identify the concept demonstrated by A obj = new B().","Explain why obj.show() executes B's version.","Predict what happens when obj.display() is uncommented.","State whether show() demonstrates overloading or overriding and justify."],
    answer: ["Output: Class B.","The reference type is A, but the actual object created is B; this demonstrates runtime polymorphism/dynamic method dispatch.","Because show() is overridden, the runtime object type B determines the method implementation selected.","obj.display() causes a compile-time error because display() is not declared in reference class A.","It is method overriding because B supplies a new implementation of the inherited show() method with the same signature."],
  },
  practice: [
    { id:"JXII-Q01", type:"output", difficulty:"board", topic:"Inheritance / overriding", question:"Predict the output and justify the method selected when a superclass reference stores a subclass object and an overridden method is called." },
    { id:"JXII-Q02", type:"debugging", difficulty:"board", topic:"Methods", question:"A program compiles until a subclass-only method is called through a superclass reference. Identify the error and explain how the reference type affects method visibility." },
    { id:"JXII-Q03", type:"programming", difficulty:"challenge", topic:"Inheritance", question:"Write a Java program with a superclass and subclass where an overridden method produces different output for the subclass object. Demonstrate dynamic method dispatch in main()." },
    { id:"JXII-Q04", type:"reasoning", difficulty:"application", topic:"Overloading vs overriding", question:"A student claims that changing only the parameter list creates method overriding. Decide whether the claim is correct and give a counterexample." },
    { id:"JXII-Q05", type:"tracing", difficulty:"board", topic:"Constructor / inheritance", question:"Trace constructor execution in a superclass-subclass hierarchy and list the order in which constructors execute. Explain why that order occurs." },
    { id:"JXII-Q06", type:"debugging", difficulty:"challenge", topic:"Arrays", question:"Given a program that traverses an array and accidentally skips the last valid index, identify the boundary error and state the correct loop condition." },
    { id:"JXII-Q07", type:"output", difficulty:"board", topic:"Strings", question:"Predict the output of a short String-manipulation program and justify each intermediate value rather than giving only the final line." },
    { id:"JXII-Q08", type:"programming", difficulty:"board", topic:"Arrays / methods", question:"Write a method that receives an integer array and returns the second-largest distinct value. State how your solution handles duplicate maximum values." },
    { id:"JXII-Q09", type:"debugging", difficulty:"application", topic:"Recursion", question:"A recursive method never reaches its base case. Identify the defect and explain how the recursive call should move toward termination." },
    { id:"JXII-Q10", type:"programming", difficulty:"challenge", topic:"Integrated programming", question:"Design a small Java class that stores data, validates input through a method, and generates a formatted result. Explain your choice of fields, constructor and methods." },
  ],
  mcqs: [
    { id:"JXII-MCQ01", question:"Which statement best describes method overriding?", options:["A) Same method name with different parameter lists in one class","B) Subclass provides a new implementation of an inherited method with the same signature","C) A method is declared static","D) A method returns a different primitive type"], answer:"B", explanation:"Overriding replaces the inherited implementation in the subclass while keeping the method signature compatible." },
    { id:"JXII-MCQ02", question:"In A obj = new B(); which determines whether obj.display() can be called directly?", options:["A) Object creation only","B) Reference type","C) Constructor name","D) Variable value"], answer:"B", explanation:"Compile-time member visibility is checked using the reference type A." }
  ],
};

export default ISC_XII_JAVA_QUESTION_PACK;
