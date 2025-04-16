# Revision Assistant

Revision Assistant is a browser-only app written with Vue that uses an LLM (currently only GPT) to:\
**a)** extract questions and other relevant data from an exam paper \
**b)** mark the user's answers based on a mark scheme or user-defined guidelines

### Important notes

-   Exams (including answers and marks) as well as API keys are stored in local storage in your browser, nothing is
    saved on a server
-   The LLM is communicated with directly from your browser
-   Never reveal your API keys to anyone else
-   This is a powerful study tool, but **please remember that the code here could fail you (always back up your data
    yourself) and that LLMs can always be wrong or misleading (independently verify any information it gives you)!**

### Future improvements

This tool could be expanded on in many ways, and contributions are always welcome! \
Some urgently needed features include:

-   UI/UX overhaul - a proper layout and better design (ideally both dark and light mode), implemented in Tailwind
-   Support for other LLMs
-   Logo, navbar, footer, etc.
-   More consistent error messages and logging - these also need to be displayed to the user
-   Option to generate new exam questions - this would require careful prompting and pessimistic usage, but could be
    extremely powerful
-   Unit tests and manual testing
