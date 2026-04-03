# LLM Quiz Application

A comprehensive quiz application for testing knowledge of Large Language Model (LLM) concepts, fine-tuning techniques, and practical implementations. This project includes interactive quizzes for multiple chapters covering LLM engineering topics.

## 🚀 How to Run the Application

<details>
<summary>Development Mode</summary>

```bash
cd quiz-app
npm run dev
```

The application will be available at `http://localhost:5173` with hot reload enabled.

</details>

<details>
<summary>Production Build</summary>

```bash
cd quiz-app
npm run build
npm run preview
```

The production build will be available at `http://localhost:4173`.

</details>

<details>
<summary>Prerequisites & Installation</summary>

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/marcopierobon/llm-quiz.git
cd llm-quiz
```

2. Install dependencies:
```bash
cd quiz-app
npm install
```

3. Start the development server (see above)

</details>

## 📁 Project Structure

<details>
<summary>View Directory Structure</summary>

```
llm-quiz/
├── quiz-app/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
├── content/                # Course content and lessons
│   └── chapter3/          # Chapter 3 materials
├── quiz/                   # Quiz JSON files
│   ├── 3_01.json         # Chapter 3 Lesson 1 quiz
│   ├── 3_02.json         # Chapter 3 Lesson 2 quiz
│   ├── 3_03.json         # Chapter 3 Lesson 3 quiz
│   └── 3_04.json         # Chapter 3 Lesson 4 quiz
├── subtitles/             # YouTube video subtitles
└── README.md
```

</details>

## ➕ How to Add New Quizzes

<details>
<summary>Creating Quiz Content</summary>

Create a new JSON file in the `quiz/` directory following the naming convention: `{chapter}_{lesson}.json`

Example: `quiz/4_01.json` for Chapter 4, Lesson 1

</details>

<details>
<summary>Quiz JSON Structure</summary>

Each quiz file must follow this structure:

```json
[
  {
    "id": "q1",
    "type": "multiple_choice_single",
    "prompt": "Your question here?",
    "allowMultiple": false,
    "tags": ["Lesson Title", "4_01", "theory"],
    "options": [
      {
        "id": "a",
        "text": "Option A",
        "isCorrect": false,
        "feedback": "Explanation for why this is incorrect"
      },
      {
        "id": "b",
        "text": "Option B",
        "isCorrect": true,
        "feedback": "Explanation for why this is correct"
      }
    ]
  }
]
```

</details>

<details>
<summary>Required Fields</summary>

- `id`: Unique question identifier
- `type`: Question type (`multiple_choice_single` or `multiple_choice_multiple`)
- `prompt`: The question text
- `allowMultiple`: Whether multiple answers can be selected
- `tags`: Array with format `["Lesson Title", "chapter_lesson", "theory/practice"]`
- `options`: Array of answer choices

</details>

<details>
<summary>Answer Options</summary>

Each option must include:
- `id`: Option identifier (a, b, c, etc.)
- `text`: Option text
- `isCorrect`: Boolean indicating if this is a correct answer
- `feedback`: Explanation for this option

</details>

<details>
<summary>Best Practices</summary>

- Include at least 15 high-quality questions per quiz
- Mix of theory and practice questions
- Provide helpful, educational feedback
- Use external links in feedback when relevant
- Ensure questions test understanding, not just memorization

</details>

## 📚 Content Guidelines

<details>
<summary>Question Types</summary>

1. **Theory Questions**: Test conceptual understanding
2. **Practice Questions**: Test practical implementation knowledge
3. **Code Questions**: Include code snippets and ask about functionality

</details>

<details>
<summary>Tag Convention</summary>

Tags must follow this order: `[title_tag, number_tag, theory/practice]`

- `title_tag`: The exact lesson title
- `number_tag`: Chapter and lesson number (e.g., "3_01")
- `theory/practice`: Categorize the question type

</details>

<details>
<summary>Quality Standards</summary>

- No questions asking "what was used" - focus on "how it works"
- Include full function code when asking about code functionality
- Provide external links for additional learning
- Ensure all options are plausible but clearly correct/incorrect

</details>

## 🔧 Development

<details>
<summary>Available Scripts</summary>

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

</details>

<details>
<summary>Adding New Features</summary>

1. Create components in `quiz-app/src/components/`
2. Add pages in `quiz-app/src/pages/`
3. Update routing in `quiz-app/src/App.jsx`
4. Add utility functions in `quiz-app/src/utils/`

</details>

## ❓ FAQs

<details>
<summary>How do I add a new chapter?</summary>

Create a new directory under `content/` (e.g., `content/chapter4/`) and add corresponding quiz files in the `quiz/` directory.

</details>

<details>
<summary>Can I include images in questions?</summary>

Currently, the quiz system supports text-based questions. Image support would require frontend modifications.

</details>

<details>
<summary>How are quiz scores calculated?</summary>

Scores are calculated based on correct answers. For multiple-choice questions, all correct options must be selected to get full points.

</details>

<details>
<summary>Can I randomize question order?</summary>

This feature would need to be implemented in the frontend. The current version displays questions in the order they appear in the JSON file.

</details>

<details>
<summary>How do I update existing quizzes?</summary>

Simply edit the corresponding JSON file in the `quiz/` directory. Changes will be reflected immediately in development mode.

</details>

<details>
<summary>Are there any limits on quiz size?</summary>

While there's no hard limit, keeping quizzes under 50 questions ensures good performance and user experience.

</details>

<details>
<summary>Can I export quiz results?</summary>

This feature is not currently implemented but could be added to the frontend application.

</details>

<details>
<summary>How do I contribute new quiz content?</summary>

Follow the structure guidelines in this README and submit a pull request with your new quiz files.

</details>

<details>
<summary>What if I find an error in a quiz?</summary>

Open an issue on GitHub or submit a pull request with the correction.

</details>

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA) license.

## 🤝 Contributing

<details>
<summary>Contribution Steps</summary>

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all quizzes follow the structure guidelines
5. Submit a pull request

</details>

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the FAQs above
- Review the quiz structure guidelines
