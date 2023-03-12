"use client";

interface IPageSizeSelectProps {
  className?: string;
  size: number;
  options: number[];
  onChange: (size: number) => void;
}

const PageSizeSelect: React.FC<IPageSizeSelectProps> = ({
  className,
  size,
  options,
  onChange,
}) => {
  return (
    <div className={className}>
      <select
        className="bg-transparent"
        value={size}
        onChange={(e) => onChange?.(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span> items per page</span>
    </div>
  );
};

export default PageSizeSelect;
