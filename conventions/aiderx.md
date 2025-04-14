# Aiderx Command Development and Testing Guidelines

- **Adding New Commands:**
  - Define the command using `aiderCommand` from `utils.js`.
  - Specify the command name, description, and arguments.
  - Implement the command action function to perform the desired operations.

- **Testing Commands:**
  - Write tests for new commands in the `tests` directory.
  - Use `vitest` for writing and running tests.
  - Ensure each command is tested for expected behavior and edge cases.

- **Example Command:**
  ```javascript
  aiderCommand(program, 'example-command')
    .description('Example command description')
    .arguments('<arg>', 'Argument description')
    .action(async (arg, options) => {
      const aider = new Aider();
      aider.setAiderOptionsFromCliOptions(options);
      // Add necessary actions here
      await aider.run();
    });
  ```

- **Running Tests:**
  - Use the following command to run tests:
    ```bash
    pnpm test
    ```

- **Code Style:**
  - Follow the existing code style and conventions.
  - Use `eslint` to lint your code:
    ```bash
    pnpm lint
    ```

- **Dependencies:**
  - Add new dependencies to `package.json` as needed.
  - Install dependencies using:
    ```bash
    pnpm install
    ```

- **Documentation:**
  - Update this document as needed to reflect new conventions and guidelines.
