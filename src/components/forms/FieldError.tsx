"use client"

/**
 * Reusable field error UI
 * Keep the field validation message style consistent across forms.
 */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="text-sm text-red-400">
      {message}
    </p>
  );
}