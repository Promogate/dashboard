
type FormErrorMessageProps = {
  message?: string;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  return (
    <span className="text-[12px] text-red-600">
      {message ? message : "Error"}
    </span>
  );
};