# Security Notes

## Principles
- Treat all client-side state as untrusted input.
- Sanitize values before rendering or persisting them.
- Avoid storing secrets in frontend code.
- Validate route parameters and user-provided values before use.

## Current protections
- Mock-test answers are sanitized before being stored and compared.
- Study progress values are restricted to a safe set of statuses.
- Local storage writes are limited to validated data shapes.
