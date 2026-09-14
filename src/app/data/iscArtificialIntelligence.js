/**
 * ISC Artificial Intelligence (883) — Examination Year 2027
 * Source: CISCE official ISC AI syllabus + CISCE Primer on Artificial Intelligence.
 * Theory and project/practical work are intentionally kept separate.
 *
 * Coverage rule: unit titles/weightages must match the official CISCE 883
 * Examination Year 2027 syllabus; topic lists must preserve the syllabus
 * examples and practical tooling rather than silently substituting generic AI.
 */

export const ISC_AI_XI_THEORY = [
  { id: 'xi-basic-ai', title: 'Basic Concepts of Artificial Intelligence', weightage: 8, topics: ['Meaning, scope, goals and evolution of AI', 'AI systems and intelligent agents', 'AI vs conventional computing', 'AI, ML and DL relationship', 'Common AI applications', 'Types of data: structured, semi-structured and unstructured', 'AI project workflow and problem scoping', 'Benefits, limitations and societal impact of AI'] },
  { id: 'xi-state-art-nlp', title: 'Introduction and State of Art of AI, NLP and Potential Use of AI', weightage: 8, topics: ['History/evolution and state of the art of AI', 'ML and DL as AI paradigms', 'Computer vision, speech recognition and information retrieval', 'NLP: text understanding and text generation', 'Language translation, question answering and dialogue systems', 'Named Entity Recognition and text summarisation', 'Search and voice-search use cases', 'AI in healthcare, transportation, agriculture, commerce and society'] },
  { id: 'xi-mathematics-ai', title: 'Mathematics for AI', weightage: 12, topics: ['Matrices: introduction, types, addition, subtraction, multiplication and transpose', 'Vectors and vector arithmetic', 'Set theory and set operations', 'Data-table joins and relational-algebra context', 'Mean, median and mode', 'Range, variance and standard deviation', 'Probability basics and uncertainty', 'Uniform, normal and binomial distributions', 'Correlation coefficient and interpretation', 'Hypothesis testing: null/alternative hypotheses and Type I/II errors'] },
  { id: 'xi-data-visualization', title: 'Data Visualization', weightage: 16, topics: ['Purpose and principles of data visualization', 'Python visualization with Matplotlib and Seaborn', 'Excel charts and data-cleaning features', 'Bar graph, histogram, scatter plot and pie graph', 'Choosing graphs from data type and analytical goal', 'Multi-dimensional data visualization', 'Pair plots, heatmaps and parallel-coordinate style representations', 'Distribution, trends, comparisons and interpretation', 'Misleading visualizations and responsible presentation', 'Handling missing values, outliers and inconsistencies during visualization workflows'] },
  { id: 'xi-data-processing', title: 'Theoretical and Practical Aspects of Data Processing', weightage: 8, topics: ['Data collection and sources', 'Structured, semi-structured and unstructured data', 'Pandas DataFrames and dataset exploration', 'Kaggle dataset exploration', 'Data cleaning with Pandas', 'Duplicates and inconsistent data', 'Missing values and outliers', 'Data transformation', 'Standardization and preparation for analysis/modelling'] },
  { id: 'xi-data-modelling', title: 'Data Modelling and Simple Linear Regression', weightage: 12, topics: ['Purpose of data modelling', 'Conceptual, logical and physical modelling', 'Dimensional, relational and entity-relationship models', 'Independent/dependent variables and regression analysis', 'Simple, multiple and other regression types in brief', 'Linear regression equation y = a + bX', 'Least-squares regression line and regression coefficient', 'Properties/assumptions and interpretation of a regression line', 'Correlation vs regression', 'Solving linear equations and prediction with Python', 'Model limitations and responsible interpretation'] },
  { id: 'xi-ethical-ai', title: 'Ethical Practices in AI', weightage: 6, topics: ['AI code of ethics', 'Fairness and bias and sources of bias', 'Privacy and protection of user data', 'Transparency, explainability and accountability', 'Human oversight and responsible use', 'Environmental impact and sustainable AI', 'Ethical implications of designing technology to replicate human life', 'Trust, autonomy, human relationships and societal impact'] }
];

export const ISC_AI_XII_THEORY = [
  { id: 'xii-applications-ai', title: 'Applications of AI', weightage: 10, topics: ['NLP applications: Named Entity Recognition and text summarisation', 'Spam email detection using machine learning: classify emails as spam or non-spam from content/features', 'Python NLP workflow and spaCy-style entity extraction', 'Statistics: mean, median, mode, range, variance and standard deviation', 'Probability basics and uniform, normal and binomial distributions', 'Hypothesis testing, null/alternative hypotheses and Type I/II errors', 'Simple linear regression for prediction and correlation coefficient for relationships', 'AI in healthcare and medical diagnosis', 'AI in finance: fraud detection and risk applications', 'AI in education, transportation and agriculture', 'Benefits, risks, limitations and societal implications of AI applications'] },
  { id: 'xii-ai-paradigms', title: 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning', weightage: 15, topics: ['Artificial neural networks and biological inspiration', 'Neurons, nodes, weights and layers', 'Input, hidden and output layers', 'Forward propagation and backward propagation', 'Artificial neural network model and multilayer perceptron', 'Handwritten-digit recognition with MLP as the syllabus example', 'Machine learning: learning from data for prediction/decision making without explicit programming', 'Supervised and unsupervised learning', 'Decision-tree model for house-price prediction as a syllabus example', 'Deep learning and multi-layer neural networks', 'CNNs for image/pattern recognition and computer vision', 'ML/DL applications, advantages, limitations and ethics'] },
  { id: 'xii-ann', title: 'Practical Implications of Artificial Neural Networks', weightage: 15, topics: ['Data preparation with NumPy for numerical computation and Pandas for data manipulation', 'Scikit-learn preprocessing: scaling, encoding categorical variables and train/test splitting', 'Building ANN with beginner-friendly Keras/TensorFlow concepts', 'Network architecture and activation functions', 'Forward pass, loss and backpropagation', 'Training with model.fit(), epochs and batch size', 'Weight updates and training iterations', 'Model evaluation on test data using accuracy, precision and recall', 'Visualizing ANN performance metrics with Matplotlib', 'Hyperparameter tuning with grid search or random search: learning rate, batch size, hidden layers and neurons', 'Classification and regression outputs', 'Practical applications and limitations'] },
  { id: 'xii-ml', title: 'Practical Implications of Machine Learning', weightage: 20, topics: ['End-to-end ML workflow', 'Data acquisition, cleaning and preprocessing', 'Feature/label selection', 'Encoding and scaling', 'Training and testing data', 'Classification and regression', 'Decision-tree and linear-regression applications', 'Predictive maintenance using historical machine data to anticipate equipment failure/maintenance needs', 'Confusion matrix: TP, TN, FP, FN', 'Accuracy, precision, recall and F1-style error interpretation', 'Overfitting and underfitting', 'Generalisation and model limitations', 'Choosing evaluation measures according to application risk'] },
  { id: 'xii-computer-vision', title: 'Introduction to Computer Vision', weightage: 10, topics: ['Introduction to CV and OpenCV', 'Images as arrays of pixels', 'Image channels, colour and resolution', 'CV workflow and preprocessing', 'Image classification', 'Object detection and localisation', 'Facial recognition', 'Colour detection', 'Object tracking in video', 'Real-world CV applications', 'Privacy, bias, security and limitations of vision systems'] }
];

export const ISC_AI_XI_PROJECTS = [
  { id: 'xi-project-01', title: 'AI Problem Investigation', outcome: 'Identify a real-world problem, define stakeholders, collect suitable data and propose an AI-based solution.' },
  { id: 'xi-project-02', title: 'Data Visualization Study', outcome: 'Collect a small dataset, clean it, create meaningful visualizations and explain the findings.' },
  { id: 'xi-project-03', title: 'Simple Linear Regression', outcome: 'Build and interpret a simple regression model and discuss prediction accuracy and limitations.' }
];

export const ISC_AI_XII_PROJECTS = [
  { id: 'xii-project-01', title: 'Machine Learning Application', outcome: 'Develop an end-to-end ML workflow from data preparation to evaluation.' },
  { id: 'xii-project-02', title: 'Neural Network Investigation', outcome: 'Study an ANN-based solution, explain its architecture and evaluate its practical use.' },
  { id: 'xii-project-03', title: 'Computer Vision Application', outcome: 'Investigate an image-based AI problem and document data, model, results, limitations and ethics.' }
];

export const ISC_AI_2027 = {
  code: '883',
  subject: 'Artificial Intelligence',
  board: 'ISC',
  examinationYear: 2027,
  theoryMarks: 70,
  practicalMarks: 15,
  projectMarks: 10,
  practicalFileMarks: 5,
  classes: {
    11: { theoryUnits: ISC_AI_XI_THEORY, projects: ISC_AI_XI_PROJECTS },
    12: { theoryUnits: ISC_AI_XII_THEORY, projects: ISC_AI_XII_PROJECTS }
  }
};

export default ISC_AI_2027;
