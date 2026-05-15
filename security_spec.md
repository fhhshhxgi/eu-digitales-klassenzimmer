# Security Spec for feedback collection

1. Data Invariants:
   - Feedback must have text (max 2000 chars).
   - Category must be one of ["Bug", "Suggestion", "Question", "Other"].
   - createdAt must be a server timestamp.
   - userId must match request.auth.uid if provided.

2. The "Dirty Dozen" Payloads:
   - [P1] Missing text.
   - [P2] Text too long (> 2000 chars).
   - [P3] Invalid category.
   - [P4] Client-side createdAt (wrong timestamp).
   - [P5] Spofing userId (request.auth.uid != payload.userId).
   - [P6] Updating a feedback (feedback should be immutable).
   - [P7] Deleting a feedback.
   - [P8] Reading all feedback (list operation) as a non-admin.
   - [P9] Injecting large strings in document IDs.
   - [P10] Shadow field injection (extra fields).
   - [P11] Missing createdAt.
   - [P12] Non-string text.

3. Rule Requirements:
   - Root deny-all.
   - Helper `isValidId` for feedbackId.
   - Helper `isValidFeedback` for schema validation.
   - `allow create`: if schema valid.
   - `allow read, update, delete`: if false (admin omitted for now unless requested).
