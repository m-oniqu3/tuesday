## Mutation Error Handling Flow

1. Handle expected errors in the service layer
- `services/`
- Services detect business logic failures and throw meaningful errors.

2. Use a centralized error system
- `utils/AppError.ts`
- `constants/errorCodes.ts`
- Store reusable error types and codes in one place.

3. Let mutations handle service errors
- `hooks/`
- React Query mutations should receive and manage errors instead of swallowing them.

4. Convert errors into user-friendly messages
- `utils/getErrorMessage.ts`
- Use a shared helper to safely handle unknown errors and return readable messages.

5. Display errors at the UI level
- `components/`
- Components should only display feedback and not contain business error logic.

6. Handle successful mutations separately
- `hooks/`
- After success: invalidate queries, close modals, reset forms, and show feedback.