import chapter05 from "./05-for-loop";

const chapter05AuditFix = {
  ...chapter05,

  mcqs: [
    { id: "for-audit-mcq-01", question: "What is the value of i after the loop finishes? for (int i = 1; i <= 5; i++) { }", options: ["4", "5", "6", "7"], answer: 2, explanation: "The last iteration uses i = 5; the update i++ then makes i = 6 before the condition 6 <= 5 fails." },
    { id: "for-audit-mcq-02", question: "Which part of a for loop is executed only once?", options: ["Condition", "Body", "Initialization", "Iteration"], answer: 2, explanation: "The initialization expression runs once before the first condition check." },
    { id: "for-audit-mcq-03", question: "How many times does for(int i=0; i<4; i++) execute its body?", options: ["3", "4", "5", "0"], answer: 1, explanation: "The values are 0, 1, 2 and 3, so the body executes four times." },
    { id: "for-audit-mcq-04", question: "Which loop correctly prints 10, 8, 6, 4, 2?", options: ["for(int i=10;i>0;i-=2)", "for(int i=10;i>=2;i-=2)", "for(int i=2;i<=10;i-=2)", "for(int i=10;i>=2;i++)"], answer: 1, explanation: "Starting at 10 and subtracting 2 while i remains at least 2 produces the required sequence." },
    { id: "for-audit-mcq-05", question: "What is printed by for(int i=1;i<=3;i++) System.out.print(i*i+\" \");?", options: ["1 2 3", "1 4 9", "2 4 6", "1 3 5"], answer: 1, explanation: "The squares of 1, 2 and 3 are 1, 4 and 9." },
    { id: "for-audit-mcq-06", question: "In nested loops, how many times does the inner loop execute if both loops run 3 times?", options: ["3", "6", "9", "12"], answer: 2, explanation: "The inner loop completes 3 iterations for each of the 3 outer iterations: 3 × 3 = 9." },
    { id: "for-audit-mcq-07", question: "Which statement about for(;;) is correct?", options: ["It is invalid Java", "It executes exactly once", "It creates an infinite loop unless exited", "It skips the loop body"], answer: 2, explanation: "All three expressions are optional; omitting the condition makes it equivalent to a true condition." },
    { id: "for-audit-mcq-08", question: "What is the main cause of an infinite loop in a counter-controlled for loop?", options: ["A correct condition", "A loop variable that never moves toward termination", "Using braces", "Using int"], answer: 1, explanation: "If the update does not move the control variable toward the stopping condition, the condition may remain true indefinitely." },
    { id: "for-audit-mcq-09", question: "Which initialization is valid for two counters?", options: ["for(int i=0, j=10; i<j; i++,j--)", "for(int i=0; int j=10; i<j; i++,j--)", "for(int i=0; j=10; i<j; i++,j--)", "for(int i=0; j=10; i<j; i++ j-- )"], answer: 0, explanation: "Variables of the same declaration can be initialized with commas in the initialization part." },
    { id: "for-audit-mcq-10", question: "What is the output? int s=0; for(int i=1;i<=4;i++) s+=i;", options: ["4", "6", "10", "16"], answer: 2, explanation: "The accumulator becomes 1 + 2 + 3 + 4 = 10." },
    { id: "for-audit-mcq-11", question: "Which loop is best when the number of repetitions is known before execution?", options: ["for", "switch", "if", "try"], answer: 0, explanation: "A for loop naturally expresses initialization, continuation condition and update together." },
    { id: "for-audit-mcq-12", question: "What does continue do inside a for loop?", options: ["Terminates the program", "Exits the loop permanently", "Skips the rest of the current iteration and proceeds to the update", "Repeats initialization"], answer: 2, explanation: "continue skips the remaining body statements for the current iteration; control proceeds to the loop's update/next condition check." },
  ],

  trueFalse: [
    { id: "for-audit-tf-01", question: "The initialization part of a for loop is normally executed once.", answer: true, explanation: "Initialization occurs before the first condition check." },
    { id: "for-audit-tf-02", question: "The condition of a for loop is checked after the body for the first iteration.", answer: false, explanation: "The condition is checked before each iteration; a false condition prevents the body from executing." },
    { id: "for-audit-tf-03", question: "for(int i=0;i<5;i++) executes five times.", answer: true, explanation: "The body runs for i = 0, 1, 2, 3 and 4." },
    { id: "for-audit-tf-04", question: "A variable declared in the initialization of a for loop is normally accessible after the loop.", answer: false, explanation: "A variable declared in the for initialization has loop scope and is not accessible after the loop." },
    { id: "for-audit-tf-05", question: "A for loop can contain another for loop.", answer: true, explanation: "This is called a nested for loop." },
    { id: "for-audit-tf-06", question: "The three expressions of a for loop must all be present.", answer: false, explanation: "Initialization, condition and update expressions may be omitted; for(;;) is valid." },
    { id: "for-audit-tf-07", question: "A semicolon immediately after a for header can make the loop body an empty statement.", answer: true, explanation: "The semicolon becomes the loop body, so a following statement is outside the loop." },
    { id: "for-audit-tf-08", question: "The update expression runs after the loop body executes.", answer: true, explanation: "The normal order is condition, body, update, then condition again." },
    { id: "for-audit-tf-09", question: "Nested loops always execute only as many times as the outer loop.", answer: false, explanation: "The inner loop may execute multiple times for every outer iteration." },
    { id: "for-audit-tf-10", question: "An accumulator used for a sum should normally be initialized before the loop.", answer: true, explanation: "The accumulator needs a defined starting value before repeated additions." },
  ],

  shortAnswerQuestions: [
    { id: "for-audit-sa-01", question: "State the three parts of a for loop and their purposes.", answer: "Initialization sets the starting state, condition controls whether another iteration occurs, and update changes the loop control variable after each iteration." },
    { id: "for-audit-sa-02", question: "Differentiate between i++ in a for loop update and ++i in the same position.", answer: "When used only as the update expression, both increase i by one and lead to the same next loop state." },
    { id: "for-audit-sa-03", question: "Why can for(int i=1;i<=10;i--) become an infinite loop?", answer: "i moves downward from 1 while the condition requires i to remain less than or equal to 10, so the condition never becomes false." },
    { id: "for-audit-sa-04", question: "What is an off-by-one error in a loop?", answer: "It is a boundary mistake that causes a loop to execute one iteration too many or one too few, often because of < versus <=." },
    { id: "for-audit-sa-05", question: "What is a nested for loop?", answer: "It is a for loop placed inside another loop; the inner loop normally completes its iterations for each outer-loop iteration." },
    { id: "for-audit-sa-06", question: "What is the purpose of an accumulator in a loop?", answer: "An accumulator stores a running result such as a sum, product or count while iterations are performed." },
    { id: "for-audit-sa-07", question: "Write a for loop to print odd numbers from 1 to 9.", answer: "for(int i=1;i<=9;i+=2) System.out.println(i);" },
    { id: "for-audit-sa-08", question: "Why are braces recommended even when a loop has one statement?", answer: "They make the loop body explicit and reduce mistakes when additional statements are later added." },
    { id: "for-audit-sa-09", question: "What happens when the condition is false before the first iteration?", answer: "The loop body does not execute at all." },
    { id: "for-audit-sa-10", question: "How can a for loop be used to generate a multiplication table?", answer: "Use the loop counter as the multiplier, for example for(int i=1;i<=10;i++) and print num*i." },
  ],

  longAnswerQuestions: [
    { id: "for-audit-la-01", question: "Explain the complete execution sequence of for(int i=1;i<=3;i++) System.out.println(i); with the values of i.", answer: "Initialize i=1; check 1<=3 and print 1; update to 2; check and print 2; update to 3; check and print 3; update to 4; check 4<=3, which is false, so the loop terminates." },
    { id: "for-audit-la-02", question: "Explain how nested for loops work and determine the number of executions when the outer loop runs 4 times and the inner loop runs 5 times.", answer: "For each outer iteration the inner loop completes five iterations. Therefore the body of the inner loop executes 4×5=20 times." },
    { id: "for-audit-la-03", question: "Explain how to find the sum of the first n natural numbers using a for loop, including initialization and update of the accumulator.", answer: "Initialize sum=0. Run i from 1 through n. On each iteration add i to sum. After the loop, sum contains 1+2+...+n." },
    { id: "for-audit-la-04", question: "Explain two common causes of infinite for loops and how to prevent them.", answer: "A loop can be infinite when the update never moves the control variable toward the termination boundary or when the condition itself remains true. Check the update direction and trace the boundary values before execution." },
    { id: "for-audit-la-05", question: "Explain the difference between a counter loop and an accumulator loop with one example of each.", answer: "A counter tracks how many times an event occurs, while an accumulator combines values into a running result. Example counter: count++ when a number is even. Example accumulator: sum += i while adding numbers." },
    { id: "for-audit-la-06", question: "Explain how a for loop can generate a right-angled star pattern using nested loops.", answer: "Use the outer loop for rows and the inner loop for the number of stars in each row. If row i should contain i stars, run the inner loop from 1 through i and print a star on each iteration." },
    { id: "for-audit-la-07", question: "Explain loop scope with a variable declared in the for initialization.", answer: "A variable declared in the for initialization is local to the loop. It can be used in the initialization, condition, update and body, but it cannot normally be referenced after the loop ends." },
    { id: "for-audit-la-08", question: "Explain how break and continue affect a for loop.", answer: "break terminates the loop immediately. continue skips the remaining statements of the current iteration and proceeds to the loop's update and next condition check." },
  ],

  programmingQuestions: {
    easy: [
      { id: "for-audit-pg-e-01", question: "Write a Java program to print the numbers from 1 to n and also display their sum.", solution: "int n=10,sum=0;\nfor(int i=1;i<=n;i++){ System.out.println(i); sum+=i; }\nSystem.out.println(\"Sum = \"+sum);", output: "1 through 10 followed by Sum = 55" },
      { id: "for-audit-pg-e-02", question: "Write a Java program to print all even numbers from 2 to n using a for loop.", solution: "int n=20;\nfor(int i=2;i<=n;i+=2) System.out.print(i+\" \" );", output: "2 4 6 8 10 12 14 16 18 20" },
    ],
    medium: [
      { id: "for-audit-pg-m-01", question: "Write a Java program to accept a positive integer and find the sum of its digits using a for loop.", solution: "int n=538, sum=0;\nfor(;n>0;n/=10) sum+=n%10;\nSystem.out.println(sum);", output: "16" },
      { id: "for-audit-pg-m-02", question: "Write a Java program to print the first n terms of the Fibonacci series using a for loop.", solution: "int n=8,a=0,b=1;\nfor(int i=1;i<=n;i++){ System.out.print(a+\" \" ); int c=a+b; a=b; b=c; }", output: "0 1 1 2 3 5 8 13" },
    ],
    hard: [
      { id: "for-audit-pg-h-01", question: "Write a Java program using nested for loops to print Floyd's triangle for n rows.", solution: "int n=5,num=1;\nfor(int i=1;i<=n;i++){ for(int j=1;j<=i;j++) System.out.print(num++ +\" \" ); System.out.println(); }", output: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15" },
      { id: "for-audit-pg-h-02", question: "Write a Java program to print all prime numbers from 2 to n using nested for loops.", solution: "int n=30;\nfor(int x=2;x<=n;x++){ boolean prime=true; for(int d=2;d*d<=x;d++){ if(x%d==0){ prime=false; break; } } if(prime) System.out.print(x+\" \" ); }", output: "2 3 5 7 11 13 17 19 23 29" },
    ],
  },

  challengeProblems: [
    { id: "for-audit-cp-01", title: "Digit-reversal palindrome", question: "Using a for loop, determine whether a positive integer is a palindrome without converting it to a String. Display the original number and the result.", solution: "Store the original number. Repeatedly extract the last digit and build the reverse using a for loop whose condition is n>0. Compare the reverse with the original number." },
    { id: "for-audit-cp-02", title: "Prime factors", question: "Use a for loop to print the distinct prime factors of a positive integer in increasing order.", solution: "Test possible divisors from 2 upward, print a divisor when it divides n, and repeatedly divide n by that divisor before continuing." },
    { id: "for-audit-cp-03", title: "Pattern reasoning", question: "Print a hollow square of n rows using nested for loops, printing stars only on the boundary.", solution: "For each row and column, print * when row or column is on a boundary; otherwise print spaces." },
  ],

  // No fabricated previous-year questions are retained. Verified CISCE material is kept separately as competency-focused practice.
  previousYearQuestions: [],

  competencyFocusedQuestions: [
    { id: "for-audit-cisce-cfq-58", source: "CISCE ICSE Class X Competency-Focused Practice Questions", question: "Convert the following for-loop segment to an exit-controlled loop: for(k=10;k>=-1;k--) System.out.println(k*2);", answer: "Use a do-while structure with the same initialization, body and termination condition, taking care to preserve the final value and update order.", sourceUrl: "https://cisce.org/wp-content/uploads/2025/01/CFQs-ICSE_Computer-Application-Class-X.pdf" },
    { id: "for-audit-cisce-cfq-62", source: "CISCE ICSE Class X Competency-Focused Practice Questions", question: "Consider a for loop that prints k from 1 to 5 followed by another println(k). Identify whether it executes successfully, state the error, and correct it.", answer: "It does not execute successfully because k declared in the for initialization is out of scope after the loop. Declare k before the loop if it must be used afterwards.", sourceUrl: "https://cisce.org/wp-content/uploads/2025/01/CFQs-ICSE_Computer-Application-Class-X.pdf" },
    { id: "for-audit-cisce-2024", source: "CISCE ICSE 2024 Computer Applications", question: "Give the output and number of executions for: for(x=10; x>20; x++) System.out.println(x); System.out.println(x*2);", answer: "The loop executes zero times because 10>20 is false initially. The following statement then executes with x still equal to 10, so it prints 20.", sourceUrl: "https://cisce.org/wp-content/uploads/2025/11/12.-Computer-Applications.pdf" },
  ],
};

export default chapter05AuditFix;
