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
    'Meaning and purpose of Artificial Intelligence; AI as a field concerned with systems that perform tasks associated with human intelligence.',
    'Evolution and major milestones of AI, from early symbolic approaches to modern data-driven systems.',
    'Types of AI: narrow/weak AI and the idea of general AI; limits of current AI systems.',
    'Major AI domains: Data, Computer Vision and Natural Language Processing, with everyday examples.',
    'Common AI terminology: dataset, model, training, inference, algorithm, automation and intelligent system.',
    'AI applications in education, healthcare, agriculture, finance, transport, accessibility and sustainability.'
  ], ['Classify real-world applications into the major AI domains and explain the AI component used.'], 4, { theory: 4, practical: 10 }),
  unit('843-xi-u2', 2, 'Unlocking your Future in AI', [
    'AI career landscape and the roles involved in building, deploying, evaluating and governing AI systems.',
    'Technical skills: programming, data handling, mathematics, machine learning and communication with AI tools.',
    'Soft skills: problem solving, collaboration, communication, creativity, critical thinking and responsible decision making.',
    'Career pathways and the importance of continuous learning as AI technologies evolve.',
    'Reading job descriptions and mapping required technical and transferable skills to career roles.'
  ], ['Analyse AI job descriptions and create a skills roadmap for a chosen AI role.'], 5, { theory: 6, practical: 10 }),
  unit('843-xi-u3', 3, 'Python Programming', [
    'Python basics: character set, tokens, identifiers, keywords, literals, variables and comments.',
    'Data types, operators, expressions, input/output and type conversion.',
    'Conditional statements and iterative control structures for problem solving.',
    'Functions, basic modular programming and readable program structure.',
    'NumPy fundamentals for numerical arrays and efficient numerical operations.',
    'Pandas fundamentals for tabular data and introductory Scikit-learn usage for machine-learning workflows.'
  ], ['Write Python programs using operators, data types and control statements; process CSV data with NumPy/Pandas; demonstrate a basic Scikit-learn workflow.'], 5, { theory: 10, practical: 20 }),
  unit('843-xi-u4', 4, 'Introduction to Capstone Project', [
    'Design Thinking as a human-centred approach to solving authentic problems.',
    '5W1H problem framing: Who, What, Where, When, Why and How.',
    'Empathy mapping to understand stakeholders, needs, pain points and desired outcomes.',
    'Problem statement, ideation, solution constraints and measurable success criteria.',
    'From problem definition to an AI solution concept, including responsible-use considerations.'
  ], ['Create an empathy map, 5W1H problem statement and project abstract for an AI problem.'], 5, { theory: 6, practical: 15 }),
  unit('843-xi-u5', 5, 'Data Literacy – Data Collection to Data Analysis', [
    'Data literacy: understanding data, sources, formats, quality and context before analysis.',
    'Data collection methods, primary and secondary data, sampling and responsible data acquisition.',
    'Data cleaning: missing values, duplicates, inconsistent values and basic validation.',
    'Descriptive statistics: mean, median, mode, range, variance and standard deviation.',
    'Data visualisation using suitable charts such as line, bar, histogram, scatter and pie charts.',
    'Correlation and interpretation of patterns without confusing correlation with causation.'
  ], ['Calculate descriptive statistics and create visualisations using Python/Excel; inspect and clean a small dataset.'], 6, { theory: 6, practical: 15 }),
  unit('843-xi-u6', 6, 'Machine Learning Algorithms', [
    'Machine Learning as a subset of AI that learns patterns from data rather than relying only on explicitly coded rules.',
    'Supervised, unsupervised and reinforcement learning: purpose, data requirements and examples.',
    'Correlation and regression: relationship between variables and the idea of fitting a line to data.',
    'Linear regression: inputs, target, line of best fit and prediction limitations.',
    'Classification: assigning observations to categories; introduction to nearest-neighbour reasoning.',
    'Training, testing, generalisation and the importance of evaluating models on suitable data.'
  ], ['Demonstrate correlation/regression and a simple classification workflow using Python or approved tools.'], 6, { theory: 9, practical: 15 }),
  unit('843-xi-u7', 7, 'Leveraging Linguistics and Computer Science', [
    'Natural Language Processing (NLP) as the intersection of language, data and computing.',
    'Language data challenges: ambiguity, context, spelling variation, intent and meaning.',
    'Basic NLP workflow: text input, preprocessing, representation and task-specific analysis.',
    'Chatbots and conversational systems: intents, responses, limitations and evaluation.',
    'Applications of NLP such as sentiment analysis, translation, search and text classification.'
  ], ['Build or demonstrate a simple rule-based chatbot and explore an introductory NLP activity.'], 5, { theory: 5, practical: 10 }),
  unit('843-xi-u8', 8, 'AI Ethics and Values', [
    'Why ethics matters when AI affects people, resources, opportunities or decisions.',
    'Five-pillar style responsible-AI considerations: fairness, transparency/explainability, accountability, privacy and safety.',
    'Bias, sources of bias in data and systems, and the consequences of biased AI outputs.',
    'Bias mitigation through better data, evaluation, diverse perspectives, documentation and human oversight.',
    'AI policies, responsible deployment and the importance of human judgement in high-impact contexts.',
    'Ethical dilemmas and trade-offs: examining competing outcomes rather than treating AI decisions as automatically correct.'
  ], ['Analyse an AI ethics scenario, identify bias and propose responsible safeguards.'], 4, { theory: 4, practical: 5 }),
];

export const CBSE_843_XII_THEORY = [
  unit('843-xii-u1', 1, 'Python Programming – II', [
    'Advanced Python concepts used in AI/data workflows, building on core programming foundations.',
    'Functions, modules and structured programs for reusable data-processing tasks.',
    'Working with files and tabular data for practical AI workflows.',
    'Using Python libraries appropriately and interpreting program output and errors.',
    'Practical coding discipline: validation, testing, debugging and readable documentation.'
  ], ['Write and debug Python programs required for the prescribed AI practical workflow.'], null, { theory: 6, practical: 18 }),
  unit('843-xii-u2', 2, 'Data Science Methodology: An Analytic Approach to Capstone Project', [
    'Data Science Methodology as a structured process for converting a real-world problem into a data-driven solution.',
    'Business/problem understanding, analytical approach and data requirements.',
    'Data collection, preparation, exploration and identification of useful features or variables.',
    'Model building, evaluation, interpretation and iteration based on evidence.',
    'Communicating findings, limitations and recommendations to stakeholders.',
    'Connecting the methodology to capstone-project documentation and responsible AI practice.'
  ], ['Map a capstone problem through the data-science lifecycle and document decisions at each stage.'], 8, { theory: 8, practical: 12 }),
  unit('843-xii-u3', 3, 'Making Machines See', [
    'Computer Vision: enabling computers to extract useful information from images and video.',
    'Image representation, pixels, resolution, colour information and common image-processing operations.',
    'Image classification and object detection as distinct computer-vision tasks.',
    'Feature extraction and the role of training data in visual models.',
    'Applications of computer vision in healthcare, security, retail, agriculture and accessibility.',
    'Limitations and ethical concerns including bias, privacy and surveillance.'
  ], ['Perform an introductory image-analysis activity and interpret outputs from an approved computer-vision tool.'], 6, { theory: 6, practical: 12 }),
  unit('843-xii-u4', 4, 'AI with Orange Data Mining Tool', [
    'Concept of no-code/low-code machine-learning workflows and why visual pipelines can support rapid experimentation.',
    'Datasets, widgets, connections and the flow from data preparation to modelling and evaluation in Orange.',
    'Classification, visualisation and evaluation workflows using suitable Orange components.',
    'Comparing models using appropriate evaluation measures and avoiding misleading conclusions.',
    'Reproducibility: keeping workflow steps, datasets and assumptions documented.'
  ], ['Build and evaluate a basic Orange Data Mining workflow; document the workflow and outputs.'], null, { theory: 4, practical: 18 }),
  unit('843-xii-u5', 5, 'Introduction to Big Data and Data Analytics', [
    'Big Data characteristics: volume, velocity, variety and the need for scalable processing.',
    'Structured, semi-structured and unstructured data with practical examples.',
    'Data analytics as the process of discovering patterns, trends and insights from data.',
    'Descriptive, diagnostic, predictive and prescriptive perspectives on analytics.',
    'Data quality, privacy, security and responsible interpretation at scale.'
  ], ['Explore a dataset, identify its scale/variety challenges and produce a concise analytical summary.'], 6, { theory: 7, practical: 12 }),
  unit('843-xii-u6', 6, 'Understanding Neural Networks', [
    'Neural networks as computational models inspired by connected processing units.',
    'Neuron, weights, bias, activation function, input layer, hidden layers and output layer.',
    'Forward propagation as the process of producing an output from inputs.',
    'Training as adjustment of model parameters to reduce prediction error.',
    'Applications of neural networks in classification, vision, language and prediction.',
    'Limitations: data requirements, interpretability, computational cost and risk of biased outputs.'
  ], ['Trace a simple neural-network workflow and explain the role of weights, activation and training.'], 8, { theory: 8, practical: 12 }),
  unit('843-xii-u7', 7, 'Generative AI', [
    'Generative AI systems create new content such as text, images, audio or video from learned patterns.',
    'Difference between generative and discriminative tasks at a conceptual level.',
    'Prompts, context and iterative refinement as tools for interacting with generative systems.',
    'Hallucination, reliability, source verification and the need for human review.',
    'Copyright, privacy, consent, deepfakes and responsible use of generated content.',
    'Applications and limitations of generative AI in education, media, design and productivity.'
  ], ['Compare generated outputs, document prompts and perform a reliability/ethics review of AI-generated content.'], 7, { theory: 6, practical: 12 }),
  unit('843-xii-u8', 8, 'Data Storytelling', [
    'Data storytelling combines evidence, visualisation and narrative to communicate insights clearly.',
    'Choosing a story objective, audience and relevant evidence before creating a visual narrative.',
    'Selecting suitable charts and avoiding misleading scales, clutter and unsupported conclusions.',
    'Narrative structure: context, evidence, insight and actionable conclusion.',
    'Communicating uncertainty, limitations and source information honestly.'
  ], ['Create a short data story using a dataset, appropriate visualisations and an evidence-based conclusion.'], 5, { theory: 5, practical: 4 }),
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
