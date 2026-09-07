/**
 * ISC Artificial Intelligence (883) — Examination Year 2027
 * Source: CISCE official ISC AI syllabus.
 * Theory and project/practical work are intentionally kept separate.
 */

export const ISC_AI_XI_THEORY = [
  { id: 'xi-basic-ai', title: 'Basic Concepts of Artificial Intelligence', weightage: 8, topics: ['Meaning, scope and goals of AI', 'AI systems and intelligent agents', 'AI vs conventional computing', 'Applications and limitations of AI', 'Data, models and decision making'] },
  { id: 'xi-state-art-nlp', title: 'Introduction and State of Art of AI, NLP and Potential Use of AI', weightage: 8, topics: ['Evolution and current state of AI', 'Natural Language Processing', 'Speech and language applications', 'Chatbots, translation and sentiment analysis', 'Potential uses and limitations of AI'] },
  { id: 'xi-mathematics-ai', title: 'Mathematics for AI', weightage: 12, topics: ['Sets and functions used in AI', 'Basic statistics and probability', 'Mean, median and mode', 'Measures of dispersion', 'Correlation and interpretation of numerical data'] },
  { id: 'xi-data-visualization', title: 'Data Visualization', weightage: 16, topics: ['Purpose of data visualization', 'Types of charts and graphs', 'Choosing an appropriate visualization', 'Distribution, trends and comparisons', 'Reading and interpreting visual data', 'Misleading visualizations and responsible presentation'] },
  { id: 'xi-data-processing', title: 'Theoretical and Practical Aspects of Data Processing', weightage: 8, topics: ['Data collection and sources', 'Structured and unstructured data', 'Data cleaning and preprocessing', 'Missing values and outliers', 'Data transformation and preparation'] },
  { id: 'xi-data-modelling', title: 'Data Modelling and Simple Linear Regression', weightage: 12, topics: ['Data modelling concepts', 'Features and target variables', 'Training and testing concepts', 'Simple linear regression', 'Regression line and prediction', 'Interpreting model output and limitations'] },
  { id: 'xi-ethical-ai', title: 'Ethical Practices in AI', weightage: 6, topics: ['Fairness and bias', 'Privacy and data protection', 'Transparency and explainability', 'Accountability and human oversight', 'Responsible use of AI'] }
];

export const ISC_AI_XII_THEORY = [
  { id: 'xii-applications-ai', title: 'Applications of AI', weightage: 10, topics: ['AI in healthcare', 'AI in finance and business', 'AI in education', 'AI in agriculture and transport', 'AI in recommendation and decision-support systems', 'Benefits, risks and limitations of real-world AI'] },
  { id: 'xii-ai-paradigms', title: 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning', weightage: 15, topics: ['Artificial neural networks', 'Machine learning concepts', 'Supervised and unsupervised learning', 'Deep learning', 'Training data, features and labels', 'Model generalisation and overfitting'] },
  { id: 'xii-ann', title: 'Practical Implications of Artificial Neural Networks', weightage: 15, topics: ['Neuron and weighted inputs', 'Activation functions', 'Layers and network structure', 'Training and prediction', 'Classification using neural networks', 'Applications and limitations of ANN'] },
  { id: 'xii-ml', title: 'Practical Implications of Machine Learning', weightage: 20, topics: ['Machine learning workflow', 'Data preparation', 'Classification and regression', 'Model training and testing', 'Performance measures and confusion matrix', 'Overfitting, underfitting and model limitations'] },
  { id: 'xii-computer-vision', title: 'Introduction to Computer Vision', weightage: 10, topics: ['Images as data', 'Pixels, resolution and colour channels', 'Image classification and object detection', 'Feature extraction concepts', 'Applications of computer vision', 'Bias, privacy and limitations in vision systems'] }
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
