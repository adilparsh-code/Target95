/**
 * CBSE Artificial Intelligence (843) — Classes XI & XII — Session 2026-27.
 * Theory is kept separate from project work so students do not see projects mixed
 * into chapter/unit learning content.
 * Unit structure follows the official CBSE 2026-27 skill-education curriculum.
 */

const unit = (id, code, name, theory, practicalActivities = [], marks = null, hours = null) => ({
  id,
  code: String(code),
  name,
  learningOutcomes: [],
  theory,
  practicalActivities,
  chapters: [],
  ...(marks !== null ? { marks } : {}),
  ...(hours !== null ? { hours } : {}),
});

export const CBSE_843_XI_THEORY = [
  unit('843-xi-u1', 1, 'Introduction: Artificial Intelligence for Everyone', [
    'What is Artificial Intelligence?',
    'Evolution/history of AI.',
    'Types and domains of AI.',
    'AI terminology and key machine-learning/deep-learning concepts.',
    'Benefits and limitations of AI.',
    'Practical: categorize applications into the three AI domains and explore introductory machine-learning/reinforcement-learning examples.'
  ], ['Communicate AI concepts, describe AI evolution, differentiate types/domains, recognize key terminology and discuss benefits/limitations.'], 4, { theory: 10, practical: 4 }),
  unit('843-xi-u2', 2, 'Unlocking your Future in AI', [
    'Global demand for AI professionals.',
    'Common AI job roles and responsibilities.',
    'Essential technical and soft skills and tools for AI careers.',
    'AI opportunities across industries.',
    'Practical career research: identify companies hiring for AI positions and compare required technical and soft skills.',
  ], ['Research AI career pathways and evaluate personal interests, skills and learning resources.'], 6, { theory: 10, practical: 5 }),
  unit('843-xi-u3', 3, 'Python Programming', [
    'Level 1: Python character set, tokens, execution modes, operators, data types and control statements.',
    'Level 2: CSV files and introductory use of NumPy, Pandas and Scikit-learn.',
    'Minimum five Level-1 programs covering operators, data types and control statements.',
    'Minimum five Level-2 programs using NumPy, Pandas and Scikit-learn.',
    'Advanced-only regression/classification/clustering material is practice enrichment and not part of theory/practical evaluation.',
  ], ['Write and test prescribed Python programs and perform basic data manipulation using the listed libraries.'], 10, { theory: 20, practical: 5 }),
  unit('843-xi-u4', 4, 'Introduction to Capstone Project', [
    'Design Thinking.',
    '5W1H problem decomposition.',
    'Empathy Map.',
    'Sustainable Development Goals (SDGs).',
    'Capstone Project and translating a solution into non-technical language.',
    'Practical: create an empathy map and a project abstract using the Design Thinking framework.',
  ], ['Decompose an authentic problem, create an empathy map, align the problem with an SDG and communicate a proposed AI solution.'], 6, { theory: 15, practical: 5 }),
  unit('843-xi-u5', 5, 'Data Literacy – Data Collection to Data Analysis', [
    'Data literacy and data collection.',
    'Exploring and representing data.',
    'Statistical analysis and Python programs for mean, median, mode, standard deviation and variance.',
    'Introduction to matrices and their basic operations/applications.',
    'Data preprocessing and data in modelling/evaluation.',
    'Levels of measurement.',
    'Visualisation with line, bar, histogram, scatter and pie charts using Matplotlib; rainfall.csv activity.',
  ], ['Perform prescribed statistical analysis and data-visualisation programs and identify appropriate levels of measurement.'], 6, { theory: 15, practical: 6 }),
  unit('843-xi-u6', 6, 'Machine Learning Algorithms', [
    'Machine Learning in a nutshell and types of machine learning.',
    'Supervised learning.',
    'Correlation, regression, finding the line and linear-regression algorithm.',
    'Classification: how it works, types and k-Nearest Neighbour.',
    'Unsupervised learning.',
    'Clustering: how it works, types and k-means clustering.',
    'Practical: Pearson correlation in Excel and linear regression in Excel; advanced learners may use Python for regression, k-NN and k-means.',
  ], ['Differentiate ML methods and demonstrate simple regression/classification/clustering workflows appropriate to the prescribed level.'], 9, { theory: 15, practical: 6 }),
  unit('843-xi-u7', 7, 'Leveraging Linguistics and Computer Science', [
    'Human language complexity.',
    'Introduction to Natural Language Processing (NLP).',
    'Emotion detection and sentiment analysis.',
    'Classification problems and chatbots.',
    'Phases of NLP.',
    'Applications of NLP.',
    'Practical: research IBM Project Debater, create an ice-cream-ordering chatbot, and explore POS tagging/rule-based chatbot as advanced practice.',
  ], ['Explain NLP challenges and phases and apply basic NLP concepts to a chatbot/sentiment-oriented activity.'], 5, { theory: 10, practical: 5 }),
  unit('843-xi-u8', 8, 'AI Ethics and Values', [
    'Ethics in Artificial Intelligence.',
    'Five pillars of AI Ethics.',
    'Bias, bias awareness and sources of bias.',
    'Mitigating bias in AI systems.',
    'Developing AI policies.',
    'Ethical dilemmas using Moral Machine and Survival of the Best Fit.',
    'Practical: role-play biased-AI scenarios and compare AI policies from organisations/regulatory bodies.',
  ], ['Explain ethical principles, identify bias and propose mitigation and responsible-policy measures.'], 4, { theory: 5, practical: 4 }),
];

export const CBSE_843_XII_THEORY = [
  unit('843-xii-u1', 1, 'Python Programming – II', [
    'Recap of NumPy and Pandas.',
    'Import/export data between CSV files and Pandas DataFrames.',
    'Handling missing values.',
    'Linear Regression algorithm for advanced learners.',
  ], ['Import/export CSV data, inspect and handle missing values, and perform the prescribed practical data workflow.'], null, { theory: 6, practical: 18 }),
  unit('843-xii-u2', 2, 'Data Science Methodology: An Analytic Approach to Capstone Project', [
    'Introduction to Data Science Methodology and its steps.',
    'Model validation techniques.',
    'Model performance evaluation metrics.',
    'Integrating the methodology into the Capstone Project.',
    'Representing a solution appropriately.',
    'Practical: calculate MSE/RMSE in Excel, calculate Precision/Recall/F1/Accuracy from a confusion matrix, and evaluate a model using Python.',
  ], ['Apply the data-science lifecycle, validate models and interpret appropriate evaluation metrics.'], 8, { theory: 8, practical: 12 }),
  unit('843-xii-u3', 3, 'Making Machines See', [
    'How machines see and the working of Computer Vision.',
    'Computer Vision process: acquisition, preprocessing, feature extraction and analysis.',
    'Applications, challenges, future of Computer Vision and responsible use.',
    'Practical: Binary Art, create a website containing an ML model, and explore OpenCV image loading/resizing as advanced practice.',
  ], ['Explain Computer Vision and its stages, applications, challenges and future potential.'], 6, { theory: 6, practical: 12 }),
  unit('843-xii-u4', 4, 'AI with Orange Data Mining Tool', [
    'What is Data Mining?',
    'Introduction to Orange Data Mining and its beneficiaries.',
    'Getting started with Orange, components and default widget catalogue.',
    'Key AI domains supported by Orange.',
    'Practical: Iris visualisation, classification, classification-model evaluation, Computer Vision and NLP workflows.',
  ], ['Navigate Orange and execute practical data-analysis workflows across AI domains.'], null, { theory: 4, practical: 18 }),
  unit('843-xii-u5', 5, 'Introduction to Big Data and Data Analytics', [
    'Introduction and types of Big Data.',
    'Advantages and disadvantages.',
    'Characteristics of Big Data.',
    'Big Data Analytics and working with Big Data.',
    'Mining Data Streams.',
    'Future of Big Data Analytics.',
    'Practical: perform Big Data analytics with Orange Data Mining.',
  ], ['Explain Big Data characteristics and analytics and evaluate future trends and data-stream concepts.'], 7, { theory: 7, practical: 12 }),
  unit('843-xii-u6', 6, 'Understanding Neural Networks', [
    'Parts and components of a neural network.',
    'Working of neural networks.',
    'Types of neural networks.',
    'Future of neural networks and societal impact.',
    'Practical: Machine Learning for Kids animal/bird classifier; TensorFlow Celsius-to-Fahrenheit model; advanced Keras/TensorFlow Playground activities.',
  ], ['Explain neural-network structure/working and identify types and applications.'], 8, { theory: 8, practical: 12 }),
  unit('843-xii-u7', 7, 'Generative AI', [
    'Introduction to Generative AI and how it works.',
    'Generative vs discriminative models and use cases.',
    'Applications of Generative AI.',
    'Large Language Models (LLMs).',
    'Future of Generative AI.',
    'Ethical and social implications.',
    'Practical: Canva, Animaker AI video, Gemini/ChatGPT prompting and an advanced Gemini API chatbot.',
  ], ['Differentiate generative/discriminative AI, use AI tools responsibly and discuss ethical, social and legal concerns.'], 6, { theory: 6, practical: 12 }),
  unit('843-xii-u8', 8, 'Data Storytelling', [
    'Introduction to storytelling and elements of a story.',
    'Introduction to Data Storytelling and why it is powerful.',
    'Essential elements and narrative structure using Freytag’s Pyramid.',
    'Types of data and visualisations for different data.',
    'Steps to create a story through data.',
    'Ethics in Data Storytelling.',
  ], ['Create an effective evidence-based data story and communicate insights using appropriate visuals and narrative.'], 5, { theory: 5, practical: 4 }),
];

export const CBSE_843_XI_PROJECTS = [
  { id: '843-xi-project-01', title: 'AI Career Exploration', outcome: 'Research AI roles, required skills and a personal learning roadmap.' },
  { id: '843-xi-project-02', title: 'Empathy-to-AI Problem Canvas', outcome: 'Convert a real-world need into a 5W1H problem statement and AI solution concept.' },
  { id: '843-xi-project-03', title: 'Data Literacy Mini Study', outcome: 'Collect, clean, analyse and visualise a small real-world dataset.' },
  { id: '843-xi-project-04', title: 'Machine Learning Mini Demonstration', outcome: 'Demonstrate a simple regression or classification workflow and explain its limitations.' },
  { id: '843-xi-project-05', title: 'Responsible AI Case Study', outcome: 'Investigate bias or an ethical dilemma and propose safeguards.' },
  { id: '843-xi-project-06', title: 'Capstone Project Proposal', outcome: 'Prepare the problem, stakeholders, data, proposed AI approach, evaluation plan and expected impact.' },
];

export const CBSE_843_XII_PROJECTS = [
  { id: '843-xii-project-01', title: 'AI Capstone Project', outcome: 'Develop and document a team AI solution aligned to a real-world problem and measurable outcome.' },
  { id: '843-xii-project-02', title: 'Computer Vision Investigation', outcome: 'Analyse an image-based problem and evaluate a suitable computer-vision workflow.' },
  { id: '843-xii-project-03', title: 'Big Data Analytics Study', outcome: 'Explore a larger dataset and communicate patterns, limitations and insights.' },
  { id: '843-xii-project-04', title: 'Neural Network Explainer', outcome: 'Build or simulate a simple neural-network workflow and explain its components.' },
  { id: '843-xii-project-05', title: 'Generative AI Responsibility Audit', outcome: 'Evaluate AI-generated content for reliability, bias, privacy, copyright and misuse risks.' },
  { id: '843-xii-project-06', title: 'Data Storytelling Portfolio', outcome: 'Turn an analytical result into an evidence-based visual story for a defined audience.' },
];

export const CBSE_843_AI_2026_27 = {
  code: '843',
  name: 'Artificial Intelligence',
  session: '2026-27',
  classes: {
    11: { theoryUnits: CBSE_843_XI_THEORY, projects: CBSE_843_XI_PROJECTS },
    12: { theoryUnits: CBSE_843_XII_THEORY, projects: CBSE_843_XII_PROJECTS },
  },
};

export default CBSE_843_AI_2026_27;
