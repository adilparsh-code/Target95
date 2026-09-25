/**
 * ISC Artificial Intelligence (883) — Examination Year 2027 practice bank.
 * XI and XII are separate banks; each question carries a unit id, answer, and
 * explanation/solution. CBSE 843/402 and ISC Computer Science are not sources
 * for this file.
 */

const q = (id, unitId, unit, type, difficulty, marks, question, answer, explanation, options) => ({
  id, unitId, unit, type, difficulty, marks, question, ...(options ? { options } : {}), answer, explanation,
});

export const ISC_AI_XI_PRACTICE = [
  q('xi-ai-001', 'xi-basic-ai', 'Basic Concepts of Artificial Intelligence', 'MCQ', 'Easy', 1,
    'Which statement best describes Artificial Intelligence?', 'The ability of machines to perform tasks requiring aspects of human intelligence',
    'AI covers tasks such as learning, reasoning, perception, language understanding and decision support; it is broader than one hardware device.', ['A system that only stores data', 'The ability of machines to perform tasks requiring aspects of human intelligence', 'A faster form of computer memory', 'A type of computer network']),
  q('xi-ai-002', 'xi-basic-ai', 'Basic Concepts of Artificial Intelligence', 'Direct', 'Medium', 2,
    'State one difference between a conventional rule-based program and an AI system.', 'A conventional program follows explicitly coded rules, whereas an AI system may learn patterns from data and use a model to make predictions or decisions.',
    'The distinction is not whether a computer is used; it is how behaviour is specified and how the system generalises to inputs.'),
  q('xi-ai-003', 'xi-basic-ai', 'Basic Concepts of Artificial Intelligence', 'Case Based', 'Hard', 4,
    'A school wants to identify students who need extra reading support. Identify one possible AI workflow and one risk that must be checked.', 'A possible workflow is to collect consented attendance and assessment data, learn a model that flags students who may need support, review the flags with teachers, and provide appropriate help. Risk: biased or incomplete data could cause a student to be unfairly flagged, so fairness, privacy and human review are required.',
    'A responsible AI answer includes the problem, data, model/output, action and safeguards rather than only naming a model.'),

  q('xi-ai-004', 'xi-state-art-nlp', 'Introduction and State of Art of AI, NLP and Potential Use of AI', 'MCQ', 'Easy', 1,
    'Named Entity Recognition in a news article primarily identifies:', 'People, organisations, locations and other named entities',
    'NER extracts useful named entities from unstructured text so that downstream search, summaries or question-answering systems can use them.', ['The grammatical tense of every sentence', 'People, organisations, locations and other named entities', 'The physical size of a text file', 'Only the author’s opinion']),
  q('xi-ai-005', 'xi-state-art-nlp', 'Introduction and State of Art of AI, NLP and Potential Use of AI', 'Application', 'Medium', 3,
    'Explain how NLP can be used in a voice-search application.', 'NLP can convert speech to text, identify the user’s intent, extract important entities or keywords, and retrieve an answer or result.',
    'The workflow combines speech recognition with language understanding and information retrieval.'),
  q('xi-ai-006', 'xi-state-art-nlp', 'Introduction and State of Art of AI, NLP and Potential Use of AI', 'HOTS', 'Hard', 4,
    'An AI translation system produces a fluent but factually wrong sentence. Why can fluency alone not establish quality?', 'A model may reproduce language patterns without preserving entities, numbers, negation or domain meaning. Evaluation must therefore check both language quality and factual/semantic accuracy for the use case.',
    'Fluency is one dimension of NLP quality; context, entities, numbers and meaning must also be checked.'),

  q('xi-ai-007', 'xi-mathematics-ai', 'Mathematics for AI', 'Numerical', 'Easy', 3,
    'Find the mean, median and mode of 2, 4, 4, 6, 9.', 'Mean = 5; median = 4; mode = 4.', 'The sum is 25 and there are five values, so mean = 25/5 = 5. The middle value is 4 and 4 occurs most often.'),
  q('xi-ai-008', 'xi-mathematics-ai', 'Mathematics for AI', 'Numerical', 'Medium', 3,
    'For vectors a = (2, 3) and b = (1, 4), calculate a + b and the dot product a · b.', 'a + b = (3, 7); a · b = 2(1) + 3(4) = 14.', 'Add corresponding vector components, then multiply corresponding scalar components and add the products.'),
  q('xi-ai-009', 'xi-mathematics-ai', 'Mathematics for AI', 'Application', 'Medium', 3,
    'A dataset has values 4, 4, 6, 6, 10. Which measure best describes the centre, and what should you check before choosing it?', 'Mean = 6, median = 6 and mode = 4/6 (bimodal). The centre should be selected using the data distribution and purpose; the data should also be checked for outliers or unusual values.',
    'A central measure must be interpreted with the spread and shape of the data, not read in isolation.'),

  q('xi-ai-010', 'xi-data-visualization', 'Data Visualization', 'MCQ', 'Easy', 1,
    'Which chart is most suitable for comparing the number of students in five clubs?', 'A bar chart.', 'The clubs are discrete categories, so bars make category-wise comparison straightforward.', ['A histogram of continuous measurements', 'A scatter plot of two numeric variables', 'A line chart of hourly temperature', 'A pie chart of unlabelled values']),
  q('xi-ai-011', 'xi-data-visualization', 'Data Visualization', 'Application', 'Medium', 3,
    'A teacher has a dataset with study hours and marks. Which plots should be considered, and what would they reveal?', 'A scatter plot can reveal the relationship or trend between study hours and marks; a histogram can show the distribution of either variable. The axes, scale and outliers must be labelled and interpreted carefully.', 'Chart selection follows the data type and analytical question rather than a fixed preference.'),
  q('xi-ai-012', 'xi-data-visualization', 'Data Visualization', 'Case Based', 'Hard', 4,
    'A pie chart of survey responses uses unequal slice sizes but the labels are missing. Explain two reasons this may mislead readers.', 'Readers cannot map slices to categories, and a 3-D or distorted pie design can distort perceived area. The chart should use direct labels, proportional angles, an appropriate chart and a clear title/source.',
    'A visualization is only meaningful when its encoding and labels are accurate and interpretable.'),

  q('xi-ai-013', 'xi-data-processing', 'Theoretical and Practical Aspects of Data Processing', 'MCQ', 'Easy', 1,
    'Which action is part of data cleaning?', 'Removing or investigating duplicate records.', 'Cleaning addresses missing, duplicate, inconsistent or invalid records so that later analysis is reliable.', ['Changing every value into text', 'Deleting all outliers without investigation', 'Choosing a neural network', 'Ignoring units and labels']),
  q('xi-ai-014', 'xi-data-processing', 'Theoretical and Practical Aspects of Data Processing', 'Application', 'Medium', 3,
    'Describe a suitable approach to a dataset with blank ages, duplicate rows and one impossible negative age.', 'First inspect the missing and duplicate rows and confirm whether each is a true error. Investigate the impossible negative value, use a documented strategy such as correction from a source or exclusion, and preserve a record of all changes.',
    'Cleaning is a context-dependent process; blindly deleting rows can discard useful information.'),
  q('xi-ai-015', 'xi-data-processing', 'Theoretical and Practical Aspects of Data Processing', 'Case Based', 'Hard', 4,
    'Why should a dataset be split into training and testing data before modelling?', 'Training data is used to learn patterns, while separate testing data provides a fairer estimate of performance on unseen examples. Reusing the same examples for both purposes can overstate model quality.',
    'A held-out test set helps assess generalisation and exposes overfitting or leakage.'),

  q('xi-ai-016', 'xi-data-modelling', 'Data Modelling and Simple Linear Regression', 'MCQ', 'Easy', 1,
    'In y = a + bX, what does b represent?', 'The change in predicted y associated with a one-unit change in X.', 'The slope describes the direction and rate of the fitted relationship; a is the intercept.', ['The number of rows in the dataset', 'The standard deviation of X', 'The training time', 'The number of classes']),
  q('xi-ai-017', 'xi-data-modelling', 'Data Modelling and Simple Linear Regression', 'Numerical', 'Easy', 3,
    'For the model y = 2x + 3, predict y when x = 5 and state the units meaning of the result.', 'y = 13. The dependent variable’s predicted value is 13 when the independent variable is 5, provided the input is within the range supported by the model.', 'Substitute x = 5: 2(5) + 3 = 13.'),
  q('xi-ai-018', 'xi-data-modelling', 'Data Modelling and Simple Linear Regression', 'Case Based', 'Hard', 4,
    'A linear model predicts attendance from study hours with a high R² but misses every student from one group. What should be investigated?', 'Investigate data representativeness, group-specific errors, feature relevance and model assumptions. High overall R² does not guarantee fairness or good performance for every subgroup, so group-level evaluation and responsible interpretation are required.', 'A good aggregate fit can hide systematic subgroup error and poor generalisation.'),
  q('xi-ai-019', 'xi-data-modelling', 'Data Modelling and Simple Linear Regression', 'Programming', 'Hard', 5,
    'Write Python pseudocode to fit a simple linear regression for study hours and marks and predict the mark for a student who studied for 6 hours.', 'Load the study-hours values into X and marks into y, fit LinearRegression on the training data, call predict with [[6]], and report the predicted mark with an explanation that the value depends on the quality and range of the training data.', 'The solution must separate features and labels, fit the model, create a correctly shaped input for prediction and interpret the result responsibly.'),

  q('xi-ai-020', 'xi-ethical-ai', 'Ethical Practices in AI', 'MCQ', 'Easy', 1,
    'Which practice most directly protects a learner’s personal data?', 'Collect only necessary data and restrict access to authorised people.', 'Data minimisation, purpose limitation, security and informed notice are central privacy safeguards.', ['Publishing all student records publicly', 'Ignoring consent and retention rules', 'Storing unlimited copies forever', 'Using data for unrelated decisions']),
  q('xi-ai-021', 'xi-ethical-ai', 'Ethical Practices in AI', 'Case Based', 'Hard', 5,
    'A school AI system recommends disciplinary action from student chat logs. Identify two ethical issues and two safeguards.', 'Issues include privacy, lack of transparency, bias, excessive surveillance and unfair automated decisions. Safeguards include purpose limitation, appropriate notice/consent, minimisation, access controls, an auditable explanation, bias testing and meaningful human review before action.',
    'High-impact decisions need accountability, fairness and human oversight, not only a technically accurate classifier.'),
  q('xi-ai-022', 'xi-ethical-ai', 'Ethical Practices in AI', 'HOTS', 'Hard', 4,
    'Why is explainability important even when an AI prediction is accurate?', 'Explainability helps users understand the basis and limits of a prediction, identify errors or bias, and decide whether the output is appropriate for the situation.',
    'Accuracy alone does not establish trust, accountability or suitability for high-impact decisions.'),
];

export const ISC_AI_XII_PRACTICE = [
  q('xii-ai-001', 'xii-applications-ai', 'Applications of AI', 'MCQ', 'Easy', 1,
    'Which is an example of AI used for decision support?', 'A system analysing patient data to assist clinical decision-making.', 'AI can analyse patterns and provide decision support, while a professional remains responsible for the final decision.', ['A calculator performing a fixed arithmetic operation', 'A system analysing patient data to assist clinical decision-making', 'A keyboard storing characters', 'A monitor displaying a fixed image']),
  q('xii-ai-002', 'xii-applications-ai', 'Applications of AI', 'Application', 'Medium', 3,
    'Explain how a spam-detection system can classify a new email.', 'The system extracts features such as words, sender or links, compares them with patterns learned from labelled spam and non-spam examples, and predicts a class. Its performance should be checked using appropriate precision, recall and false-positive trade-offs.',
    'Classification requires features, labelled examples, a learned model and evaluation.'),
  q('xii-ai-003', 'xii-applications-ai', 'Applications of AI', 'Numerical', 'Medium', 3,
    'For values 4, 6, 6, 8, calculate the mean and variance using the population formula.', 'Mean = 6. Deviations are −2, 0, 0, 2, so squared deviations sum to 8 and population variance = 8/5 = 1.6.', 'The population variance divides by the number of values, n = 5.'),

  q('xii-ai-004', 'xii-ai-paradigms', 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning', 'MCQ', 'Easy', 1,
    'Which relationship is correct?', 'Deep learning is a specialised approach using multi-layer neural networks, and machine learning is the broader field of learning patterns from data.',
    'AI contains machine learning; deep learning is a machine-learning paradigm based on multi-layer neural networks.', ['Deep learning is unrelated to machine learning', 'Machine learning requires explicit rules for every case', 'A neural network is only a physical robot', 'All machine-learning systems use computer vision']),
  q('xii-ai-005', 'xii-ai-paradigms', 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning', 'Direct', 'Medium', 3,
    'Differentiate supervised and unsupervised learning.', 'Supervised learning uses labelled examples to learn a mapping for prediction, while unsupervised learning works with data without target labels to discover patterns or groups.',
    'Classification and regression are supervised tasks; clustering is a common unsupervised task.'),
  q('xii-ai-006', 'xii-ai-paradigms', 'Different Paradigms of AI: Neural Networks, Machine Learning and Deep Learning', 'HOTS', 'Hard', 4,
    'A model performs almost perfectly on training data but poorly on unseen test data. What problem is likely present?', 'Overfitting: the model learned training-specific patterns too closely and does not generalise well.',
    'A large train-test performance gap is a warning sign of overfitting; more representative data, simpler models or regularisation may help.'),

  q('xii-ai-007', 'xii-ann', 'Practical Implications of Artificial Neural Networks', 'MCQ', 'Easy', 1,
    'What is the main role of weights in an artificial neuron?', 'They determine the contribution of each input to the neuron’s weighted sum.', 'During training, weights are adjusted so the network’s predictions improve.', ['They decide which dataset is deleted', 'They store only the class labels', 'They replace the loss function']),
  q('xii-ai-008', 'xii-ann', 'Practical Implications of Artificial Neural Networks', 'Application', 'Medium', 3,
    'Describe the forward pass of a small neural network.', 'Inputs are multiplied by their weights, the weighted values are added with a bias, an activation function produces the neuron output, and the result passes through the remaining layers to produce a prediction.',
    'Forward propagation carries an input through the network; backpropagation later adjusts weights to reduce loss.'),
  q('xii-ai-009', 'xii-ann', 'Practical Implications of Artificial Neural Networks', 'HOTS', 'Hard', 4,
    'A student changes the learning rate from 0.01 to 100. What training symptom would be plausible?', 'The loss may fail to converge or become unstable because updates are either too small to learn or too large to settle. Learning rate, batch size and model size should be tuned and monitored with validation data.',
    'Hyperparameters affect optimisation; extreme values can cause slow learning, oscillation or divergence.'),

  q('xii-ai-010', 'xii-ml', 'Practical Implications of Machine Learning', 'MCQ', 'Easy', 1,
    'Which value is a false positive in a disease-screening classifier?', 'A prediction of disease when the patient is healthy.', 'A false positive is an incorrect positive prediction.', ['A correct healthy prediction', 'A missed disease case', 'The number of training rows', 'A true negative']),
  q('xii-ai-011', 'xii-ml', 'Practical Implications of Machine Learning', 'Numerical', 'Medium', 4,
    'A binary classifier gives TP = 42, TN = 38, FP = 8 and FN = 12. Calculate accuracy, precision and recall.', 'Accuracy = (42+38)/100 = 80%; precision = 42/(42+8) = 84%; recall = 42/(42+12) = 77.78% (about 77.8%).', 'Use TP, TN, FP and FN in the definitions; the best measure depends on the cost of each error.'),
  q('xii-ai-012', 'xii-ml', 'Practical Implications of Machine Learning', 'Programming', 'Hard', 5,
    'Write Python pseudocode for a training/testing split followed by a linear-regression fit and evaluation on the test set.', 'Use train_test_split with a fixed random_state, create a LinearRegression model, call fit on the training features and labels, call predict on the test features, and compare predictions with the held-out labels using a metric such as mean squared error.',
    'The solution should keep the test set separate, use training data for fitting and report performance on unseen examples.'),

  q('xii-ai-013', 'xii-computer-vision', 'Introduction to Computer Vision', 'MCQ', 'Easy', 1,
    'In a digital image, a pixel primarily represents:', 'A small picture element containing image information.', 'A digital image is represented as an array of pixel values.', ['A unit of network bandwidth', 'A machine-learning algorithm', 'A database table']),
  q('xii-ai-014', 'xii-computer-vision', 'Introduction to Computer Vision', 'Application', 'Medium', 3,
    'Describe a basic pipeline for detecting a coloured object in a video frame.', 'Acquire the frame, convert or normalise its pixel representation, identify candidate pixels in the target colour range, find connected regions or bounding boxes, and track or classify those regions across frames. Lighting and camera changes must be tested.',
    'Computer-vision systems commonly acquire, preprocess, detect and interpret image data.'),
  q('xii-ai-015', 'xii-computer-vision', 'Introduction to Computer Vision', 'Case Based', 'Hard', 5,
    'A camera-based attendance system identifies students automatically. State two computer-vision tasks it may involve and two ethical concerns.', 'Possible tasks include face detection/identification and image classification or feature extraction. Concerns include privacy, consent, data security, bias, misuse of biometric information and the impact of false matches.',
    'Biometric vision applications require strong attention to accuracy, proportionality, consent, security and human recourse.'),
];

export const ISC_AI_883_PRACTICE = {
  board: 'ISC', code: '883', examinationYear: 2027,
  classXI: ISC_AI_XI_PRACTICE, classXII: ISC_AI_XII_PRACTICE,
};

export default ISC_AI_883_PRACTICE;
