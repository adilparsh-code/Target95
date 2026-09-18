/**
 * ISC Artificial Intelligence (883) — Class XII project packages.
 */

export const ISC_AI_XII_PROJECTS_FULL = [
  {
    slug: "machine-learning-application",
    title: "Machine Learning Application",
    boardLabel: "ISC AI 883 · Class XII",
    classNumber: 12,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Advanced",
    summary:
      "A complete end-to-end supervised classification workflow: data preparation, train/test split, decision-tree training and evaluation with accuracy and a classification report.",
    shortOutcome: "Build an end-to-end ML classification pipeline from data preparation to evaluation.",
    academicNote:
      "This is a Target95 guided implementation aligned with the ISC Class XII AI project work. Follow your school's instructions for the final submission format.",
    problemStatement:
      "Develop a complete machine-learning application that predicts whether a student is likely to pass, using study hours, attendance and assignment completion as features. Demonstrate the full workflow — preparing features and labels, splitting data, training a model, and evaluating it honestly — and state clearly that the output is educational only.",
    objectives: [
      "Prepare feature (X) and label (y) data.",
      "Split into training and testing sets with stratification.",
      "Train a decision-tree classifier.",
      "Evaluate with accuracy and a classification report.",
      "Predict for a new student and discuss responsible use.",
    ],
    learningOutcomes: [
      "Describe the end-to-end machine-learning workflow.",
      "Explain the purpose of a train/test split.",
      "Read a classification report (precision, recall, F1, support).",
      "Explain why a prediction is educational, not authoritative.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["pandas", "scikit-learn"],
      data: ["The built-in 16-row labelled dataset"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Supervised classification",
      "Features and labels",
      "Train/test split and stratification",
      "Decision-tree model",
      "Accuracy, precision, recall, F1 and support",
      "Responsible use and human oversight",
    ],
    algorithm: [
      "Build the labelled dataset.",
      "Select Hours, Attendance and Assignments as features and Pass as the label.",
      "Split the data with stratification so both classes appear in each set.",
      "Train a decision tree with limited depth.",
      "Predict on the test set and print accuracy and a classification report.",
      "Predict for a new student and add a responsible-use note.",
    ],
    code: {
      language: "Python",
      filename: "machine_learning_application.py",
      content: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

data = {
    "Hours": [1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 4, 6, 3, 8],
    "Attendance": [60, 65, 70, 72, 75, 78, 80, 82, 85, 88, 92, 95, 74, 86, 71, 90],
    "Assignments": [3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 6, 9, 4, 10],
    "Pass": [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
}

df = pd.DataFrame(data)

print("=== DATASET (first 6 rows) ===")
print(df.head(6))
print("Rows:", len(df), "| Pass distribution:", df["Pass"].value_counts().to_dict())

X = df[["Hours", "Attendance", "Assignments"]]
y = df["Pass"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print()
print("=== EVALUATION ===")
print("Accuracy:", round(accuracy_score(y_test, pred), 3))
print(classification_report(y_test, pred, zero_division=0))

new_student = pd.DataFrame([{"Hours": 5, "Attendance": 84, "Assignments": 8}])
prediction = model.predict(new_student)[0]
print("Prediction for new student:",
      "Pass" if prediction == 1 else "Needs support")

print()
print("This prediction is educational only. Human review and context are required.")
`,
    },
    setup: "pip install pandas scikit-learn",
    codeExplanation: [
      "X is the feature matrix and y is the binary label.",
      "stratify=y keeps the class balance in both splits, which matters on small data.",
      "DecisionTreeClassifier with max_depth=3 limits complexity and reduces overfitting.",
      "classification_report shows precision, recall and F1 per class plus support counts.",
      "predict() applies the trained tree to a new student's features.",
    ],
    sampleInput: "No input required — the program trains and evaluates on the built-in dataset.",
    sampleOutput: `=== DATASET (first 6 rows) ===
   Hours  Attendance  Assignments  Pass
0      1          60            3     0
1      2          65            4     0
2      2          70            4     0
3      3          72            5     0
4      3          75            5     0
5      4          78            6     0
Rows: 16 | Pass distribution: {0: 8, 1: 8}

=== EVALUATION ===
Accuracy: 1.0
              precision    recall  f1-score   support

           0       1.00      1.00      1.00         2
           1       1.00      1.00      1.00         2

    accuracy                           1.00         4
   macro avg       1.00      1.00      1.00         4
weighted avg       1.00      1.00      1.00         4

Prediction for new student: Pass

This prediction is educational only. Human review and context are required.`,
    testCases: [
      { input: "Dataset", expected: "16 rows, 8 and 8 in each class", note: "Balanced labels" },
      { input: "Stratified split", expected: "Both classes present in train and test", note: "Fair evaluation" },
      { input: "Evaluation", expected: "Accuracy 1.0 on the 4 test rows", note: "Clean separable data" },
      { input: "New student (5h, 84%, 8)", expected: "Pass", note: "Prediction" },
    ],
    edgeCases: [
      "Perfect accuracy on 4 rows does not prove generalisation.",
      "Unstratified splits on small data can leave a class out of the test set.",
      "Duplicate identical rows can leak into both splits.",
      "Unseen feature values far outside the range are extrapolation.",
      "Class imbalance would need careful metric choice, not just accuracy.",
    ],
    reportFormat: [
      "1. Problem statement and objectives",
      "2. Dataset and features",
      "3. Train/test split and stratification",
      "4. Model and training",
      "5. Evaluation (accuracy and classification report)",
      "6. Prediction example",
      "7. Limitations and responsible use",
      "8. Conclusion",
    ],
    viva: [
      "What is the target variable?",
      "Why do we split training and testing data?",
      "What does accuracy measure, and what does it hide?",
      "What is overfitting?",
      "Why is human oversight necessary for this application?",
      "How can biased data affect the model?",
    ],
    extensions: [
      "Compare the decision tree with a logistic regression model.",
      "Add k-fold cross-validation.",
      "Add a confusion matrix.",
      "Test what happens with a much smaller dataset.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XII unit 'Practical Implications of Machine Learning': end-to-end workflow, evaluation and confusion matrix.",
      "Maps to 'Applications of AI': classification and evaluation of results.",
      "Maps to machine-learning practical work with scikit-learn.",
      "Maps to ethical practice in AI: responsible use and limitations.",
    ],
  },
  {
    slug: "neural-network-investigation",
    title: "Neural Network Investigation",
    boardLabel: "ISC AI 883 · Class XII",
    classNumber: 12,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Advanced",
    summary:
      "Build a small artificial neural network, print and explain its architecture (input, hidden, output layers, weight shapes and iterations), train it and evaluate the result.",
    shortOutcome: "Study an ANN-based solution, explain its architecture and evaluate its practical use.",
    academicNote:
      "This is a Target95 guided implementation aligned with the ISC Class XII AI project work. Follow your school's instructions for the final submission format.",
    problemStatement:
      "Investigate how an artificial neural network learns. Build a small multilayer perceptron on a synthetic two-class dataset, print the architecture and weight shapes, train it until convergence and evaluate accuracy. Explain in words what the forward pass, the loss and the backward pass do at each iteration.",
    objectives: [
      "Prepare and scale a dataset.",
      "Build an MLP with one hidden layer.",
      "Print and explain the network architecture.",
      "Train until convergence and evaluate accuracy.",
      "Explain the forward and backward propagation loop.",
    ],
    learningOutcomes: [
      "Describe neurons, weights, layers and activation.",
      "Explain why scaling helps training.",
      "Interpret weight matrix shapes.",
      "Explain epochs, iterations and convergence.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["numpy", "scikit-learn"],
      data: ["A synthetic 300-sample dataset generated by the program"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Artificial neural networks and neurons",
      "Input, hidden and output layers",
      "Activation functions (ReLU)",
      "Forward and backward propagation",
      "Epochs and convergence",
      "Accuracy and evaluation",
    ],
    algorithm: [
      "Generate a synthetic two-class dataset.",
      "Scale the features.",
      "Split into training and testing sets.",
      "Build an MLP with one hidden layer and ReLU activation.",
      "Train until the optimiser converges.",
      "Print the architecture and evaluate accuracy.",
      "Explain the training loop.",
    ],
    code: {
      language: "Python",
      filename: "neural_network_investigation.py",
      content: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score

X, y = make_classification(
    n_samples=300, n_features=4, n_informative=3, n_redundant=0,
    n_classes=2, random_state=42,
)

print("=== DATASET ===")
print("Samples:", X.shape[0], "| Features:", X.shape[1], "| Classes:", len(set(y)))

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.25, random_state=42, stratify=y
)
print("Training samples:", len(X_train), "| Testing samples:", len(X_test))

mlp = MLPClassifier(hidden_layer_sizes=(6,), activation="relu",
                    max_iter=2000, random_state=42)
mlp.fit(X_train, y_train)

pred = mlp.predict(X_test)
print()
print("=== NETWORK ===")
print("Input neurons :", X.shape[1])
print("Hidden neurons:", mlp.hidden_layer_sizes[0], "(activation: relu)")
print("Output neurons:", len(mlp.classes_))
print("Weight shapes :", [w.shape for w in mlp.coefs_])
print("Iterations    :", mlp.n_iter_)

print()
print("=== EVALUATION ===")
print("Accuracy:", round(accuracy_score(y_test, pred), 3))

print()
print("Forward pass: inputs -> weighted sums -> activation -> output.")
print("Backward pass: the loss is used to update every weight a little.")
print("This repeats for many iterations until the loss stops improving.")
`,
    },
    setup: "pip install numpy scikit-learn",
    codeExplanation: [
      "make_classification creates a reproducible synthetic two-class dataset.",
      "StandardScaler puts features on a common scale so training converges.",
      "hidden_layer_sizes=(6,) means a single hidden layer of six neurons.",
      "mlp.coefs_ gives the weight matrices connecting the layers.",
      "mlp.n_iter_ shows how many iterations the optimiser actually ran.",
    ],
    sampleInput: "No input required — the program builds, trains and evaluates the network.",
    sampleOutput: `=== DATASET ===
Samples: 300 | Features: 4 | Classes: 2
Training samples: 225 | Testing samples: 75

=== NETWORK ===
Input neurons : 4
Hidden neurons: 6 (activation: relu)
Output neurons: 2
Weight shapes : [(4, 6), (6, 1)]
Iterations    : 593

=== EVALUATION ===
Accuracy: 0.827

Forward pass: inputs -> weighted sums -> activation -> output.
Backward pass: the loss is used to update every weight a little.
This repeats for many iterations until the loss stops improving.`,
    testCases: [
      { input: "Dataset", expected: "300 samples, 4 features, 2 classes", note: "Setup" },
      { input: "Split", expected: "225 training, 75 testing", note: "75/25 split" },
      { input: "Architecture", expected: "4 input, 6 hidden, weights [(4,6),(6,1)]", note: "Layers" },
      { input: "Accuracy", expected: "≈0.83", note: "Evaluation" },
    ],
    edgeCases: [
      "Too few iterations leave the model unconverged.",
      "Unscaled features slow down or prevent convergence.",
      "Too many hidden neurons overfit a small dataset.",
      "A different seed changes the iteration count and accuracy.",
      "Binary classification uses a single output logit internally.",
    ],
    reportFormat: [
      "1. Introduction to neural networks",
      "2. Dataset and scaling",
      "3. Network architecture",
      "4. Training loop explanation",
      "5. Evaluation",
      "6. Interpretation",
      "7. Limitations",
      "8. Conclusion",
    ],
    viva: [
      "What does a neuron compute?",
      "Why is ReLU used as an activation?",
      "What do the weight shapes [(4, 6), (6, 1)] mean?",
      "What happens in one training iteration?",
      "What is convergence?",
      "Why scale features before training?",
    ],
    extensions: [
      "Try two hidden layers and compare accuracy.",
      "Plot training loss over iterations.",
      "Compare ReLU with tanh.",
      "Compare the ANN with a decision tree.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XII unit 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning': neurons, layers, forward/backward propagation.",
      "Maps to 'Practical Implications of Artificial Neural Networks': training, activation, evaluation and visualisation.",
      "Maps to ANN architecture and weight interpretation topics.",
      "Maps to responsible-AI limitations discussion.",
    ],
  },
  {
    slug: "computer-vision-application",
    title: "Computer Vision Application",
    boardLabel: "ISC AI 883 · Class XII",
    classNumber: 12,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Advanced",
    summary:
      "Investigate an image-based AI problem: build an image, analyse brightness, count bright regions with a flood-fill and detect edges — then discuss privacy, bias and limitations.",
    shortOutcome: "Investigate an image-based AI problem and document data, method, results, limits and ethics.",
    academicNote:
      "This is a Target95 guided implementation aligned with the ISC Class XII AI project work. Follow your school's instructions for the final submission format.",
    problemStatement:
      "Computers can detect and count objects in images. Build a synthetic image with two bright regions, analyse its brightness, count the bright regions with a simple connected-region method and detect edges with gradients. Then document the data, method, results and the privacy, bias and security risks that real vision systems carry.",
    objectives: [
      "Represent and inspect an image as an array.",
      "Analyse image brightness.",
      "Implement a simple connected-region count.",
      "Detect edges with gradients.",
      "Document results, limitations and ethics.",
    ],
    learningOutcomes: [
      "Explain images as pixel arrays with channels.",
      "Apply a threshold to segment bright objects.",
      "Implement and explain a flood-fill count.",
      "Describe privacy and bias risks in computer vision.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["Pillow", "numpy", "matplotlib (no OpenCV needed)"],
      data: ["A synthetic image generated by the program"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Images as arrays and channels",
      "Thresholding and segmentation",
      "Connected-region (flood-fill) counting",
      "Edge detection with gradients",
      "Classification vs detection vs tracking",
      "Privacy, bias and security in vision systems",
    ],
    algorithm: [
      "Create a synthetic image with a dark background and two bright regions.",
      "Save and reload the image, then print its shape.",
      "Convert to grayscale and analyse brightness.",
      "Threshold to find bright pixels.",
      "Count connected bright regions with flood fill.",
      "Detect edges with gradients.",
      "Document the applications and risks.",
    ],
    code: {
      language: "Python",
      filename: "computer_vision_application.py",
      content: `import numpy as np
from PIL import Image
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

h, w = 80, 120
image = np.full((h, w, 3), 30, dtype=np.uint8)
image[10:30, 10:40] = [230, 200, 60]
image[45:70, 70:110] = [80, 180, 230]

img = Image.fromarray(image, "RGB")
img.save("cv_shapes.png")

arr = np.array(img)
print("=== IMAGE ===")
print("Mode:", img.mode, "| Size (w x h):", img.size)
print("Array shape:", arr.shape, "| Total pixels:", arr.shape[0] * arr.shape[1])

gray = np.array(img.convert("L"), dtype=int)
print()
print("=== BRIGHTNESS ANALYSIS ===")
print("Min gray:", int(gray.min()), "| Max gray:", int(gray.max()))
print("Mean gray:", round(gray.mean(), 2))
bright = (gray > 120)
print("Bright pixels (gray > 120):", int(bright.sum()),
      "(" + str(round(bright.sum() / gray.size * 100, 1)) + "%)")

print()
print("=== SIMPLE BLOB COUNT (connected bright regions) ===")
visited = np.zeros_like(bright, dtype=bool)


def flood(i, j):
    stack = [(i, j)]
    size = 0
    while stack:
        a, b = stack.pop()
        if a < 0 or b < 0 or a >= bright.shape[0] or b >= bright.shape[1]:
            continue
        if visited[a, b] or not bright[a, b]:
            continue
        visited[a, b] = True
        size += 1
        stack.extend([(a + 1, b), (a - 1, b), (a, b + 1), (a, b - 1)])
    return size


blobs = []
for i in range(bright.shape[0]):
    for j in range(bright.shape[1]):
        if bright[i, j] and not visited[i, j]:
            blobs.append(flood(i, j))
blobs = [b for b in blobs if b > 20]
print("Bright regions found:", len(blobs), "| Sizes:", sorted(blobs, reverse=True))

print()
print("=== EDGES ===")
v_edges = np.abs(np.diff(gray, axis=1))
h_edges = np.abs(np.diff(gray, axis=0))
print("Vertical-edge pixels  (>60):", int((v_edges > 60).sum()))
print("Horizontal-edge pixels(>60):", int((h_edges > 60).sum()))

plt.imshow(arr)
plt.title("Synthetic image with two bright regions")
plt.axis("off")
plt.tight_layout()
plt.savefig("cv_shapes_plot.png")

print()
print("Applications: classification, detection, colour detection, tracking.")
print("Risks: privacy (faces), bias (unseen conditions) and security.")
`,
    },
    setup: "pip install Pillow numpy matplotlib",
    codeExplanation: [
      "np.full creates a dark background image and slices paint the bright regions.",
      "Image.fromarray turns the array into an image; np.array returns an array.",
      "Thresholding converts the grayscale image into a bright/not-bright map.",
      "The flood-fill counts each connected group of bright pixels as one region.",
      "np.diff measures brightness change between neighbours; big changes are edges.",
    ],
    sampleInput: "No input required — the synthetic image is generated in code.",
    sampleOutput: `=== IMAGE ===
Mode: RGB | Size (w x h): (120, 80)
Array shape: (80, 120, 3) | Total pixels: 9600

=== BRIGHTNESS ANALYSIS ===
Min gray: 30 | Max gray: 193
Mean gray: 53.31
Bright pixels (gray > 120): 1600 (16.7%)

=== SIMPLE BLOB COUNT (connected bright regions) ===
Bright regions found: 2 | Sizes: [1000, 600]

=== EDGES ===
Vertical-edge pixels  (>60): 90
Horizontal-edge pixels(>60): 140

Applications: classification, detection, colour detection, tracking.
Risks: privacy (faces), bias (unseen conditions) and security.`,
    testCases: [
      { input: "Image shape", expected: "(80, 120, 3)", note: "Height, width, channels" },
      { input: "Bright pixels", expected: "1600 (16.7%)", note: "Thresholding" },
      { input: "Blob count", expected: "2 regions of 1000 and 600 pixels", note: "Flood fill" },
      { input: "Edges", expected: "90 vertical, 140 horizontal edge pixels", note: "Gradient" },
    ],
    edgeCases: [
      "Two bright regions that touch would be counted as one — note this.",
      "Changing the threshold changes the pixel counts; justify the choice.",
      "A grayscale image has one channel, changing the array shape.",
      "Noisy real images need smoothing before edge detection.",
      "Rule-based detection is not a trained model and fails in new conditions.",
    ],
    reportFormat: [
      "1. Introduction and problem statement",
      "2. Image as data",
      "3. Method: brightness, thresholding, regions and edges",
      "4. Results",
      "5. Applications of computer vision",
      "6. Privacy, bias and security risks",
      "7. Limitations",
      "8. Conclusion",
    ],
    viva: [
      "How is an image stored as an array?",
      "What does thresholding do?",
      "How does the flood-fill count regions?",
      "How does gradient edge detection work?",
      "Why is this not a trained AI model?",
      "What privacy risks do facial-recognition systems raise?",
    ],
    extensions: [
      "Detect coloured regions instead of bright ones.",
      "Blur the image and compare edge counts.",
      "Count regions of several sizes with a minimum-size filter.",
      "Compare with a trained classifier on a labelled image set.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XII unit 'Introduction to Computer Vision': images as arrays, channels, classification, colour detection.",
      "Maps to applying CV workflow and preprocessing topics.",
      "Maps to privacy, bias and limitations of vision systems.",
      "Maps to practical work with Python imaging libraries.",
    ],
  },
];
