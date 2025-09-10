# React TypeScript Boilerplate – Development Guidelines for GitHub Copilot

​

## Project Context

​
This is a modern React web application using TypeScript, Redux Toolkit (with RTK Query), React Router v6, Ant Design, and Ant Design Charts. It is structured for scalability, maintainability, and production readiness.
​

## Architecture Patterns

​

- Use functional components with React hooks
- Maintain separation of concerns: organize code into components, pages, store, types, constants, helpers, services, and utils
- Use Redux Toolkit for state management and RTK Query for API calls
- Use React Router v6 for routing, including protected and nested routes
- Centralize static labels and constants in `src/constants/labels.ts`
- Use TypeScript strict mode for type safety
- Implement error boundaries and loading states for robust UX
  ​

## Code Style Standards

​

- Use PascalCase for component names and interfaces
- Use camelCase for variables, functions, and methods
- Use SCREAMING_SNAKE_CASE for constants
- Use kebab-case for file names (e.g., `post-form.tsx`)
- Use meaningful variable and function names
- Keep Redux slice names descriptive (e.g., `userStore`, `postStore`)
- Place reusable code in `src/utils/` and `src/components/common/`
  ​

## React/Web Specific Guidelines

​

- Use Ant Design CSS utility classes for styling (avoid inline styles)
- Use Suspense and lazy loading for code splitting and performance
- Use Error Boundaries for crash prevention
- Use FlatList/SectionList equivalents (e.g., `.map` with keys) for lists, but optimize for large datasets if needed
- Use Ant Design form component with Form.item and validation rules
- Use Ant Design theming and customization options
- Use environment variables via `import.meta.env` for configuration
- Implement proper permission and role-based guards.
  ​

## Performance Best Practices

​

- Use `React.memo` for expensive components that re-render frequently
- Use `useCallback` and `useMemo` to avoid unnecessary re-renders
- Use lazy loading (`React.lazy`) for screens and heavy components
- Optimize lists and avoid unnecessary DOM nodes
- Use Brotli compression for production assets (see [`vite.config.ts`](vite.config.ts))
  ​

## Testing Requirements

​

- Write unit tests using Vitest and React Testing Library
- Include integration tests for critical user flows
- Maintain minimum 80% code coverage for critical business logic
- Mock external dependencies in tests
- Place test files in `src/__Test__/` folders
  ​

## Error Handling Standards

​

- Use try/catch for all async operations
- Implement error boundaries with meaningful fallback UI
- Provide user-friendly error messages (never expose technical details)
- Log errors with contextual information which developer could use to debug
- Use Ant Design notifications for non-blocking error alerts
- Implement offline/maintenance handling.
  ​

## Security Considerations

​

- Never hardcode sensitive information (API keys, secrets)
- Use environment variables for configuration (`import.meta.env`)
- Validate all user inputs before processing
- Use proper authentication token handling (HTTP-only cookies)
- Restrict access to protected routes and sensitive actions via guards
- Sanitize data before rendering to prevent XSS attacks
- Keep dependencies up to date to avoid vulnerabilities
- Use HTTPS for all API calls
- Review code prior commit and push.

---
