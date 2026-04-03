Analyze the required md file or files and create a quiz based on the content.
If the file is at content/chapter3/3_6.md create a quiz in quiz/3_6.json, following the structure of quiz/sample.json.

Use the text under the content section, the subtitles of the linked youtube videos and the code in the files and/or folders linked under the code section.

If a json file already exists for the chapter, update it with the new questions.

As possible values for the tags field, use the following:
- theory
- practice

Here are the files to analyze:
- content/chapter3/3_01.md
- content/chapter3/3_02.md
- content/chapter3/3_03.md
- content/chapter3/3_04.md

Rules:
- if the json file already exists, delete it and create a new one using this updated prompt
- Generate high quality questions and answers only. Generate as many questions as you can, as long as they remain high quality - aim at at least 15 questions per chapter
- Each question can have one or more correct answers
- The feedback should be explanatory and helpful, providing external links when possible
- Always fetch the youtube subtitles for the linked videos and use them to generate questions
- Always fetch the code files and use them to generate questions
- If you can't fetch the subtitles or the code, stop the execution and signal the error.
- When adding questions about the code, do not ask what was used, but rather what the code does or how it works or how something functions or how something different could have been achieved when changing the code. Use code snippets when needed in both the questions and answers.
- Always read deeply the content section and use it to generate questions
- If you see there are additional pieces of external content that would be useful to include in the quiz, include them especially when they help piece together the current content with the overall ML/AI context (but do not make them the main focus on the quiz)
- Add the number in the filename as a tag
- Add the text under title section as a tag (one single tag for the entire sentence).
- The tag order should be: [title_tag, number_tag, theory/practice]
- Do not ask questions about what the content of the lesson X is or which lesson covers topic Y
- When asking what a function or piece of code does, include the code snippet of the entire function and the caller in the question statement.
- Do not ask questions such as: to what value was this parameter set. But rather, to accomplish task X, with Y in mind, which value should be used and why?

Subtitles download:
To download the subtitles, use this command. Install the tool as needed.
Store them in the subtitles/chapterX/lessonY/ folder, e.g. if processing 3_1.md, store the subtitles in subtitles/chapter3/lesson01/
Before downloading, check if the subtitles already exist in the folder and skip if they do.

yt-dlp \
  --skip-download \
  --write-sub \
  --write-auto-sub \
  --sub-langs "en,en-US" \
  --sub-format "vtt" \
  "https://www.youtube.com/watch?v=VIDEO_ID"