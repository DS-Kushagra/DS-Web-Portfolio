import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  { id: "0", title: "Projects", url: "#features" },
  { id: "1", title: "Publications", url: "#publications" },
  { id: "2", title: "Contribute", url: "#call-for-contributors" },
  { id: "3", title: "Currently working on", url: "#roadmap" },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice Assistant",
    text: "Enable the assistant to understand and respond to voice commands, making it easier for users to interact hands-free.",
    date: "August 2024",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "New Ideas",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "2024",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "August 2024",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "2024",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch communication, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  { id: "0", title: "Seamless Integration", text: collabText },
  { id: "1", title: "Smart Automation" },
  { id: "2", title: "Top-notch Communication" },
];

export const collabApps = [
  { id: "0", title: "Figma", icon: figma, width: 26, height: 36 },
  { id: "1", title: "Notion", icon: notion, width: 34, height: 36 },
  { id: "2", title: "Discord", icon: discord, width: 36, height: 28 },
  { id: "3", title: "Slack", icon: slack, width: 34, height: 35 },
  { id: "4", title: "Photoshop", icon: photoshop, width: 34, height: 34 },
  { id: "5", title: "Protopie", icon: protopie, width: 34, height: 34 },
  { id: "6", title: "Framer", icon: framer, width: 26, height: 34 },
  { id: "7", title: "Raindrop", icon: raindrop, width: 38, height: 32 },
];

export const dataAnalysisSkills = [
  "Machine Learning Model Development",
  "Statistical Analysis & Hypothesis Testing",
  "Data Cleaning & Preprocessing",
  "Feature Engineering & Selection",
];

export const dataScienceTools = [
  {
    id: 1,
    title: "Python",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    width: 31,
    height: 24,
  },
  {
    id: 2,
    title: "TensorFlow",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
    width: 31,
    height: 24,
  },
  {
    id: 3,
    title: "PyTorch",
    icon: "https://blog.christianperone.com/wp-content/uploads/2018/10/pytorch-logo.png",
    width: 31,
    height: 24,
  },
  {
    id: 4,
    title: "Scikit-learn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    width: 31,
    height: 24,
  },
  {
    id: 5,
    title: "Statistics",
    icon: "https://cdn-icons-png.flaticon.com/512/8920/8920975.png",
    width: 31,
    height: 24,
  },
];

export const projectHighlights = [
  {
    title: "Data Analysis",
    description:
      "In-depth exploratory data analysis and statistical modeling using Python",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    url: "https://github.com/DS-Kushagra/Data-Analysis-Repo",
  },
  {
    title: "Machine Learning",
    description: "Building and deploying ML models for real-world applications",
    skills: ["Scikit-learn", "TensorFlow", "PyTorch"],
    url: "https://github.com/DS-Kushagra/Machine-Learning-Repo",
  },
  {
    title: "Deep Learning",
    description:
      "Developing neural networks for complex pattern recognition tasks",
    skills: ["CNN", "RNN", "LSTM", "Transformers"],
    url: "https://github.com/DS-Kushagra/Deep-Learning-Repo",
  },
];

export const projects = [
  {
    id: "0",
    title: "Jarvis Voice Assistant",
    text: "A voice assistant capable of performing tasks like opening websites, fetching news, & generating AI-driven responses using OpenAI API, with integrated speech recognition & text-to-speech features.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl:
      "https://github.com/DS-Kushagra/Jarvis-Voice-Assistant-Project",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["AI", "Python"],
  },
  {
    id: "1",
    title: "Network Security",
    text: "This project is a comprehensive solution for detecting and analyzing network security threats using machine learning techniques and have various automations to detect phishing attacks.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl: "https://github.com/DS-Kushagra/Network-Security",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["AI", "ML", "Data Science"],
  },
  {
    id: "2",
    title: "AI ChatBot",
    text: "Designed an automated conversational bot using OpenAI API to analyze chat history and generate context-aware, humorous, and interactive responses using Python.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl: "https://github.com/DS-Kushagra/AI-ChatBot",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["AI", "Python"],
  },
  {
    id: "3",
    title: "Job Scraper",
    text: "Developed a web scraper using Python, BeautifulSoup library, and CSV to extract and store job listings from Indeed (or any other site), including titles, companies, locations, and descriptions.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl: "https://github.com/DS-Kushagra/Job-Scrapping-Project",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["Python", "Web Scraping"],
  },
  {
    id: "4",
    title: "Social Media Usage Analysis",
    text: "Built a data analysis project to evaluate social media usage patterns using statistical techniques, highlighting trends and user behavior insights.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl:
      "https://github.com/DS-Kushagra/Social-Media-Analysis-Project",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["Data Analysis"],
  },
  {
    id: "5",
    title: "Customer Risk Analysis",
    text: "Designed a dashboard leveraging machine learning models to assess customer risk levels, visualize insights, and aid financial decision-making for businesses.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    status: "done",
    borderColor: "from-purple-500 via-blue-500 to-cyan-500",
    sourceCodeUrl: "https://github.com/DS-Kushagra/Customer-Risk-Analysis",
    demoUrl: null, // Demo URL can be updated if available
    technologies: ["PowerBI", "Data Analysis"],
  },
];

export const dataScienceProjects = [
  {
    id: "0",
    title: "AI-based Chatbot",
    description:
      "An advanced conversational chatbot using NLP techniques for businesses to offer automated customer support.",
    link: "https://github.com/DS-Kushagra/AI-based-Chatbot",
  },
  {
    id: "1",
    title: "Customer Segmentation Model",
    description:
      "Implemented a clustering model to analyze customer behavior and segment them based on purchasing patterns.",
    link: "https://github.com/DS-Kushagra/Customer-Segmentation-Model",
  },
];

export const publications = [
  {
    id: "0",
    title: "Data Science Approach to Predict Customer Churn",
    description:
      "Explores various machine learning techniques to predict customer churn using historical data and model optimization techniques.",
    link: "https://medium.com/@ds_kushagra/data-science-approach-to-predict-customer-churn-5249eb10cf1e",
    iconUrl: file02,
    technologies: ["Data Science", "Machine Learning"],
  },
  {
    id: "1",
    title: "AI and its Role in Business Automation",
    description:
      "A deep dive into the implementation of AI technologies to automate business processes and improve efficiency.",
    link: "https://medium.com/@ds_kushagra/ai-and-its-role-in-business-automation-e0d3309dcb9c",
    iconUrl: file02,
    technologies: ["AI", "Business Automation"],
  },
];
