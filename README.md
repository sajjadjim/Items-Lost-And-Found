# side-sajjadjim

This project is a client-side application built with React. Below you'll find setup instructions, installed packages, and development guidelines.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd b11a11-client-side-sajjadjim
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Main Packages Used

- **react**: UI library for building user interfaces.
- **react-dom**: DOM bindings for React.
- **react-router-dom**: Routing for React applications.
- **axios**: Promise-based HTTP client for API requests.
- **tailwindcss**: Utility-first CSS framework for styling.
- **daisyui**: Tailwind CSS component library.
- **firebase**: For authentication and backend services.
- **react-hook-form**: For managing forms and validation.
- **@tanstack/react-query**: Data fetching and caching.
- **sweetalert2**: For beautiful alert messages.

> _Check `package.json` for the full list of dependencies._

## Development

- Run the app in development mode:
  ```bash
  npm start
  ```
- Build for production:
  ```bash
  npm run build
  ```

## Project Structure

- `/src`: Source code
- `/public`: Static files

## Contribution

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---
## Environment Variables

Create a `.env` file in the root directory and add the required environment variables. Example:

```env
REACT_APP_API_URL=<your-api-url>
REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
```

Refer to the documentation or `src/config` for all required variables.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

For any issues, please open an issue in the repository.
