interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-thin font-pokemon-solid py-2 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors";
  const disabledClasses = "disabled:bg-yellow-300 disabled:cursor-not-allowed";
  const finalClasses = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <button className={finalClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
