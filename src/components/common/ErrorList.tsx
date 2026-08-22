interface ErrorListProps {
  errors: string[];
}

function ErrorList({ errors }: ErrorListProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 space-y-1">
      {errors.map((error, index) => (
        <p key={index} className="text-xs text-red-600 flex items-center">
          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      ))}
    </div>
  );
}

export default ErrorList;
