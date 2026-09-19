/**
 * CBSE 2026-27 syllabus gap-fill content.
 * ====================================================================
 * Some CBSE skill-subject units (802 Employability Skills, 402 IT,
 * 065/802 Part B, 843 AI) shipped with empty theory / learning-outcome /
 * practical-activation arrays, which the student unit page renders as
 * "No theory topics available". This module supplies the missing,
 * syllabus-aligned content keyed by the canonical unit id.
 *
 * It is additive: any field that already carries content is preserved,
 * the enrichment is only used when the source field is empty.
 */

export const CBSE_UNIT_ENRICHMENT = {
  /* ---------------- CBSE 802 · Class XI · Part A (Employability Skills-III) ---------------- */
  "802-xi-a1": {
    learningOutcomes: [
      "Use appropriate verbal and non-verbal communication in professional settings.",
      "Draft clear emails, notices and short reports.",
      "Participate effectively in group discussions.",
      "Apply active listening to respond accurately.",
    ],
    theory: [
      "Communication process: sender, message, channel, receiver and feedback.",
      "Verbal vs non-verbal communication and their role at the workplace.",
      "The 7 Cs of effective communication: clear, concise, concrete, correct, coherent, complete and courteous.",
      "Listening as an active skill and common barriers to listening.",
      "Written workplace communication: email etiquette, notice, memo and report structure.",
      "Group discussion and interview conduct; presenting ideas with confidence.",
    ],
    practicalActivities: [
      "Draft a professional email and a short notice for a school event.",
      "Conduct a mock group discussion and give peer feedback.",
    ],
  },
  "802-xi-a2": {
    learningOutcomes: [
      "Set and track realistic personal and academic goals.",
      "Manage time using prioritisation techniques.",
      "Recognise and regulate stress and emotions.",
      "Demonstrate a positive attitude and self-confidence.",
    ],
    theory: [
      "Self-awareness: strengths, weaknesses, values and interests.",
      "Goal setting using SMART criteria.",
      "Time management: prioritisation, to-do lists and avoiding procrastination.",
      "Stress and emotion management with simple coping strategies.",
      "Positive thinking, self-motivation and resilience.",
    ],
    practicalActivities: [
      "Prepare a weekly time-table balancing study, activity and rest.",
      "Write three SMART goals and a plan to review them.",
    ],
  },
  "802-xi-a3": {
    learningOutcomes: [
      "Use the internet safely and ethically.",
      "Search, evaluate and cite information efficiently.",
      "Use email, cloud storage and collaboration tools.",
      "Recognise cyber threats and protective measures.",
    ],
    theory: [
      "Internet, WWW, browsers and search engines; effective search strategies.",
      "Evaluating the credibility of online information.",
      "Email, cloud storage and online collaboration tools.",
      "Digital footprint, netiquette and responsible social-media use.",
      "Cyber security basics: strong passwords, phishing, malware and safe browsing.",
    ],
    practicalActivities: [
      "Perform an advanced web search and record the sources used.",
      "Configure a strong password and identify a phishing email.",
    ],
  },
  "802-xi-a4": {
    learningOutcomes: [
      "Explain the qualities and functions of an entrepreneur.",
      "Identify business opportunities and target customers.",
      "Describe the basics of a business plan.",
      "Show initiative and problem-solving.",
    ],
    theory: [
      "Entrepreneurship and its role in the economy.",
      "Entrepreneurial competencies: initiative, risk-taking, perseverance and innovation.",
      "Idea generation, market survey and identifying customer needs.",
      "Business plan basics: product, market, funds and operations.",
      "Small business and startup ecosystem, including government support schemes.",
    ],
    practicalActivities: [
      "Prepare a one-page idea for a small business and its target customers.",
      "List the sections of a simple business plan.",
    ],
  },
  "802-xi-a5": {
    learningOutcomes: [
      "Explain sustainable development and environmental responsibility.",
      "Identify green jobs and green practices.",
      "Demonstrate resource conservation and waste management.",
      "Promote awareness of climate and energy issues.",
    ],
    theory: [
      "Sustainability, sustainable development and the environment.",
      "Natural-resource conservation: energy, water and materials.",
      "Waste management, reuse and recycling; the 4Rs.",
      "Green jobs and green entrepreneurship.",
      "Climate change, pollution and individual responsibility.",
    ],
    practicalActivities: [
      "Conduct an energy/water audit of your home and suggest savings.",
      "Plan a waste-segregation system for your classroom.",
    ],
  },

  /* ---------------- CBSE 802 · Class XII · Part A (Employability Skills-IV) ---------------- */
  "802-xii-a1": {
    learningOutcomes: [
      "Communicate effectively in professional and workplace contexts.",
      "Prepare and deliver structured presentations.",
      "Use appropriate business-writing formats.",
      "Apply communication skills during teamwork and negotiation.",
    ],
    theory: [
      "Professional communication: formality, tone and audience awareness.",
      "Presentation skills: planning, visual aids and delivery.",
      "Business writing: application, report, agenda and minutes.",
      "Team communication, negotiation and conflict resolution.",
      "Interview skills and workplace etiquette.",
    ],
    practicalActivities: [
      "Deliver a three-minute presentation with two slides.",
      "Draft a formal application for a job or internship.",
    ],
  },
  "802-xii-a2": {
    learningOutcomes: [
      "Apply self-management strategies in a work environment.",
      "Manage time, priorities and deadlines.",
      "Demonstrate emotional intelligence and teamwork.",
      "Maintain work-life balance and well-being.",
    ],
    theory: [
      "Self-management at the workplace: ownership, discipline and accountability.",
      "Advanced time management and prioritisation of tasks.",
      "Emotional intelligence and managing workplace relationships.",
      "Adaptability, resilience and dealing with setbacks.",
      "Work-life balance, health and well-being.",
    ],
    practicalActivities: [
      "Create a task tracker for a project with milestones.",
      "Reflect on a situation needing emotional regulation and write the response you would choose.",
    ],
  },
  "802-xii-a3": {
    learningOutcomes: [
      "Use productivity and collaboration software for tasks.",
      "Apply data-protection and privacy practices.",
      "Use advanced communication and cloud tools.",
      "Identify and respond to cyber incidents.",
    ],
    theory: [
      "Advanced use of word processors, spreadsheets and presentations.",
      "Cloud collaboration: shared documents, versioning and permissions.",
      "Data privacy, consent and digital rights.",
      "Cyber-incident response: reporting, backup and recovery.",
      "Emerging workplace technologies and digital citizenship.",
    ],
    practicalActivities: [
      "Collaborate on a shared document using comments and versioning.",
      "Create a data-backup plan and an incident-report format.",
    ],
  },
  "802-xii-a4": {
    learningOutcomes: [
      "Develop a business idea into an actionable plan.",
      "Understand the basics of finance, marketing and operations.",
      "Demonstrate teamwork and leadership.",
      "Evaluate risks and opportunities.",
    ],
    theory: [
      "From idea to enterprise: validating an opportunity.",
      "Marketing basics: the 4Ps and the target audience.",
      "Basics of costing, pricing and simple bookkeeping.",
      "Team building, leadership and delegation.",
      "Risk assessment and growth planning.",
    ],
    practicalActivities: [
      "Prepare a mini marketing plan for a class business idea.",
      "Estimate the cost and selling price of a product or service.",
    ],
  },
  "802-xii-a5": {
    learningOutcomes: [
      "Apply sustainable practices at the workplace.",
      "Explain green standards and compliance.",
      "Manage resources and waste responsibly.",
      "Advocate sustainability in a community.",
    ],
    theory: [
      "Green practices in industry and offices.",
      "Resource efficiency, energy audits and renewable energy.",
      "Environmental standards, regulations and compliance.",
      "Circular economy and lifecycle thinking.",
      "Sustainability advocacy and community action.",
    ],
    practicalActivities: [
      "Design a green-office checklist for a small organisation.",
      "Plan a sustainability-awareness campaign.",
    ],
  },

  /* ---------------- CBSE 802 · Part B · learning outcomes ---------------- */
  "802-xi-b1": { learningOutcomes: ["Describe the functional units of a computer.", "Explain number systems and conversions.", "Identify types of software and memory.", "Distinguish system and application software."] },
  "802-xi-b2": { learningOutcomes: ["Explain network types and topologies.", "Describe internet services and protocols.", "Use the internet safely and effectively."] },
  "802-xi-b3": { learningOutcomes: ["Create and format documents.", "Build spreadsheets with formulas and charts.", "Design effective presentations."] },
  "802-xi-b4": { learningOutcomes: ["Explain database concepts and the relational model.", "Write SQL to create, query and modify data.", "Apply keys and constraints."] },
  "802-xi-b5": { learningOutcomes: ["Explain OOP concepts and Java fundamentals.", "Use control flow, arrays and classes.", "Handle exceptions and write simple programmes."] },
  "802-xii-b1": { learningOutcomes: ["Apply the relational model and normalisation.", "Use SQL for joins, aggregates and sub-queries.", "Design and query a simple database."] },
  "802-xii-b2": { learningOutcomes: ["Describe web architecture and services.", "Use web-based applications and e-commerce features.", "Apply online-safety practices."] },
  "802-xii-b3": { learningOutcomes: ["Apply OOP, inheritance and polymorphism.", "Use arrays, strings and collections.", "Write exception-handled, thread-aware programmes."] },
  "802-xii-b4": { learningOutcomes: ["Understand data-management and analytics roles.", "Apply IT skills in a workplace scenario.", "Communicate technical results professionally."] },

  /* ---------------- CBSE 065 · Informatics Practices · learning outcomes ---------------- */
  "065-xi-u1": { learningOutcomes: ["Describe computer hardware and software components.", "Explain number systems and conversions.", "Identify emerging computing trends."] },
  "065-xi-u2": { learningOutcomes: ["Write and run Python programmes.", "Use data types, control flow and functions.", "Work with lists, dictionaries and strings."] },
  "065-xi-u3": { learningOutcomes: ["Explain relational database concepts.", "Write SQL to create and query tables.", "Apply keys, joins and aggregate functions."] },
  "065-xi-u4": { learningOutcomes: ["Explain AI, IoT, cloud and big-data concepts.", "Identify applications and societal impact.", "Discuss ethical use of technology."] },
  "065-xii-u1": { learningOutcomes: ["Use Pandas Series and DataFrame.", "Clean, merge and analyse data.", "Create plots for data visualisation."] },
  "065-xii-u2": { learningOutcomes: ["Use aggregate, group and join queries.", "Write sub-queries and apply constraints.", "Apply SQL functions to real datasets."] },
  "065-xii-u3": { learningOutcomes: ["Explain network types and topologies.", "Describe protocols and network devices.", "Discuss network security and ethics."] },
  "065-xii-u4": { learningOutcomes: ["Discuss the impact of technology on society.", "Explain digital rights, privacy and cyber ethics.", "Describe e-waste and sustainability concerns."] },

  /* ---------------- CBSE 843 · Artificial Intelligence · learning outcomes ---------------- */
  "843-xi-u1": { learningOutcomes: ["Define AI and its major domains.", "Give examples of AI in everyday life.", "Distinguish AI from conventional software."] },
  "843-xi-u2": { learningOutcomes: ["Identify AI career paths and required skills.", "Describe AI's impact across industries.", "Plan a learning pathway in AI."] },
  "843-xi-u3": { learningOutcomes: ["Use Python data types and control flow.", "Write functions and use standard libraries.", "Manipulate data for AI tasks."] },
  "843-xi-u4": { learningOutcomes: ["Define a problem suitable for an AI capstone.", "Plan the data, tools and evaluation to be used.", "Document project milestones."] },
  "843-xi-u5": { learningOutcomes: ["Collect and organise data.", "Clean and summarise datasets.", "Interpret simple analyses."] },
  "843-xi-u6": { learningOutcomes: ["Explain supervised and unsupervised learning.", "Describe common ML algorithms.", "Evaluate a simple model."] },
  "843-xi-u7": { learningOutcomes: ["Explain NLP concepts.", "Describe text-processing steps.", "Give NLP application examples."] },
  "843-xi-u8": { learningOutcomes: ["Discuss AI bias and fairness.", "Explain privacy and accountability.", "Apply responsible-AI principles."] },
  "843-xii-u1": { learningOutcomes: ["Use advanced Python structures and libraries.", "Process data with Pandas/NumPy.", "Write modular programmes."] },
  "843-xii-u2": { learningOutcomes: ["Apply the data-science lifecycle.", "Frame an analytic problem for a capstone.", "Communicate results to stakeholders."] },
  "843-xii-u3": { learningOutcomes: ["Explain computer-vision basics.", "Describe image representation and features.", "Give CV application examples."] },
  "843-xii-u4": { learningOutcomes: ["Use Orange for visual data workflows.", "Build and evaluate models.", "Interpret and report results."] },
  "843-xii-u5": { learningOutcomes: ["Explain big-data characteristics.", "Describe types of analytics.", "Give big-data application examples."] },
  "843-xii-u6": { learningOutcomes: ["Describe neurons, layers and networks.", "Explain training and activation.", "Identify neural-network applications."] },
  "843-xii-u7": { learningOutcomes: ["Explain generative models.", "Describe use cases and limitations.", "Discuss responsible use of generative AI."] },
  "843-xii-u8": { learningOutcomes: ["Structure a data story.", "Choose effective visuals.", "Present insights persuasively."] },

  /* ---------------- CBSE 402 · Information Technology · Class IX ---------------- */
  "402-ix-a1": {
    learningOutcomes: ["Communicate clearly for everyday and academic purposes.", "Use correct grammar, punctuation and vocabulary.", "Apply reading and writing skills."],
    theory: ["The communication cycle: sender, message, channel, receiver and feedback.", "Verbal and non-verbal communication.", "Reading comprehension and note-making.", "Writing: paragraph, letter and notice.", "Basic grammar, punctuation and vocabulary."],
    practicalActivities: ["Write a short notice and a friendly letter on a given topic.", "Read a passage and answer comprehension questions."],
  },
  "402-ix-a2": {
    learningOutcomes: ["Recognise personal strengths and set simple goals.", "Manage time and study effectively.", "Stay calm and positive.", "Maintain personal hygiene and well-being."],
    theory: ["Self-awareness and self-esteem.", "Goal setting and study planning.", "Time management for students.", "Stress management and positive thinking.", "Personal hygiene, health and safety."],
    practicalActivities: ["Prepare a study timetable for one week.", "List five personal strengths and one goal for each."],
  },
  "402-ix-a3": {
    learningOutcomes: ["Use basic computer hardware and software.", "Create and save simple documents.", "Use the internet safely for information.", "Follow safe and ethical ICT practices."],
    theory: ["Computer parts and their functions.", "Files, folders and basic file operations.", "Basic word processing and drawing tools.", "Internet basics and safe searching.", "Password safety and digital etiquette."],
    practicalActivities: ["Create and format a simple document and save it in a folder.", "Search for information on a topic and note the sources."],
  },
  "402-ix-a4": {
    learningOutcomes: ["Describe what an entrepreneur does.", "Identify business ideas around you.", "Show initiative and teamwork.", "Understand basic money management."],
    theory: ["Who is an entrepreneur; qualities of an entrepreneur.", "Finding a business idea and knowing customers.", "Teamwork and simple planning.", "Basics of money, cost and profit.", "Being creative and solving problems."],
    practicalActivities: ["List three business ideas in your locality and their customers.", "In a group, plan a stall for a school fair."],
  },
  "402-ix-a5": {
    learningOutcomes: ["Explain why the environment matters.", "Conserve water, energy and materials.", "Segregate and reduce waste.", "Practise sustainable habits."],
    theory: ["Natural resources and their conservation.", "Water, energy and material conservation.", "Waste management and the 4Rs.", "Pollution and its effects.", "Individual actions for a greener life."],
    practicalActivities: ["Plan a waste-segregation chart for your class.", "Record three ways you saved energy or water this week."],
  },

  /* ---------------- CBSE 402 · Information Technology · Class X ---------------- */
  "402-x-a1": {
    learningOutcomes: ["Communicate effectively in personal and professional situations.", "Write formal letters, emails and reports.", "Apply listening and speaking skills.", "Use appropriate body language."],
    theory: ["The 7 Cs of communication.", "Formal writing: email, letter and report.", "Listening skills and barriers to listening.", "Speaking: presentations and discussions.", "Non-verbal communication and body language."],
    practicalActivities: ["Write a formal email and a short report.", "Give a two-minute oral presentation."],
  },
  "402-x-a2": {
    learningOutcomes: ["Set realistic goals and manage time.", "Regulate emotions and manage stress.", "Maintain a positive attitude.", "Work well with others."],
    theory: ["SMART goal setting.", "Time management and prioritisation.", "Emotional intelligence and stress management.", "Positive thinking and motivation.", "Teamwork and respecting differences."],
    practicalActivities: ["Write three SMART goals and a weekly plan.", "Describe a situation where you stayed calm under pressure."],
  },
  "402-x-a3": {
    learningOutcomes: ["Use word processing and spreadsheets effectively.", "Create simple presentations.", "Use email and cloud storage.", "Practise safe and ethical ICT habits."],
    theory: ["Word processing: formatting, tables and printing.", "Spreadsheets: formulas, functions and charts.", "Presentations: slides and delivery.", "Email and cloud storage basics.", "Cyber safety and responsible ICT use."],
    practicalActivities: ["Create a spreadsheet with a sum and average formula and a chart.", "Prepare a five-slide presentation on a chosen topic."],
  },
  "402-x-a4": {
    learningOutcomes: ["Describe entrepreneurial qualities and functions.", "Identify opportunities and customers.", "Prepare a simple business plan.", "Show initiative and problem-solving."],
    theory: ["Entrepreneurship and its importance.", "Entrepreneurial competencies.", "Market survey and customer needs.", "Components of a simple business plan.", "Money management and basic record-keeping."],
    practicalActivities: ["Prepare a one-page business plan for a small idea.", "Estimate the cost and price of a product."],
  },
  "402-x-a5": {
    learningOutcomes: ["Explain sustainable development.", "Apply resource-conservation practices.", "Manage waste responsibly.", "Promote environmental awareness."],
    theory: ["Sustainability and sustainable development.", "Conserving energy, water and materials.", "Waste management, reuse and recycling.", "Green skills and green jobs.", "Climate change and individual responsibility."],
    practicalActivities: ["Conduct a home energy audit and suggest savings.", "Design a sustainability-awareness poster."],
  },
  "402-x-b1": {
    learningOutcomes: ["Create and format advanced documents.", "Use tables, images and styles.", "Use mail merge and review tools."],
    theory: ["Advanced formatting: styles, sections and page setup.", "Tables, images and text wrapping.", "Mail merge and templates.", "Track changes, comments and proofing.", "Exporting and printing documents."],
    practicalActivities: ["Prepare a formatted report with a table of contents.", "Perform a mail merge for invitations."],
  },
  "402-x-b2": {
    learningOutcomes: ["Use advanced spreadsheet functions.", "Analyse data with sorting, filtering and charts.", "Apply conditional formatting."],
    theory: ["Referencing: relative, absolute and mixed.", "Functions: SUM, AVERAGE, IF, COUNT and lookups.", "Sorting, filtering and conditional formatting.", "Charts: types and creation.", "Data validation and printing."],
    practicalActivities: ["Build a marks spreadsheet with IF-based grades and a chart.", "Apply conditional formatting to highlight top scores."],
  },
  "402-x-b3": {
    learningOutcomes: ["Explain database concepts and the relational model.", "Create tables and apply keys.", "Write queries to retrieve and modify data."],
    theory: ["Database, table, record and field.", "Primary key, foreign key and relationships.", "Data types and constraints.", "Data manipulation: insert, update, delete.", "Queries with SELECT, WHERE and ORDER BY."],
    practicalActivities: ["Create a student table with a primary key.", "Write queries to list and filter records."],
  },
  "402-x-b4": {
    learningOutcomes: ["Maintain a healthy and safe work environment.", "Follow security and emergency procedures.", "Observe workplace hygiene and ethics.", "Manage workplace stress."],
    theory: ["Workplace health, hygiene and safety.", "Fire safety, first aid and emergencies.", "Workplace security and safe practices.", "Ergonomics and posture at the workstation.", "Workplace ethics, rights and responsibilities."],
    practicalActivities: ["Prepare a workplace-safety checklist.", "Demonstrate correct posture and workstation setup."],
  },
};

export default CBSE_UNIT_ENRICHMENT;
