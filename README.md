# Adressable ID Inspector

Adressable ID Inspector is a Chrome extension designed to validate the implementation of Unified ID 2.0 (UID2) and other addressable ID solutions like ID5 on websites. This tool is tailored for developers and media professionals working with Addressable Media, helping ensure proper integration and functionality of ID solutions.

## Features

- **UID2 Validation**
  - Checks if UID2 SDK is correctly implemented on the current page.
  - Displays the following details:
    - SDK Name and Version
    - Initialization Settings
    - Current UID2 Token Information

- **Future Support for Other ID Solutions**
  - Planned support for similar addressable ID frameworks.

- **User-Friendly Interface**
  - Integrated side panel for seamless interaction.
  - Real-time results and actionable feedback.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miyaichi/adressable-id-inspector.git
   ```

2. Navigate to the project directory:
   ```bash
   cd adressable-id-inspector
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right corner).
   - Click "Load unpacked" and select the project directory.

## Usage

1. Open a webpage you want to inspect.
2. Open the Chrome extension side panel.
3. Click the "Start Inspection" button to analyze the page.
4. Review the results displayed in the side panel, including SDK details and token information.

## Development

This extension is built on the [Chrome Extension Skeleton](https://github.com/miyaichi/chrome-extension-skeleton) framework and uses modern web technologies like TypeScript and React.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. Start development mode:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue for any bugs, features, or suggestions.

## Acknowledgments

- [Unified ID 2.0](https://unifiedid.com/)

---

For questions or feedback, please contact [miyaichi@gmail.com].
