import { PropsWithChildren } from "react";

interface IFormPageLayoutProps {
  title: string;
  description: string;
}

const FormPageLayout: React.FC<PropsWithChildren<IFormPageLayoutProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <main className="mt-11">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
        <div>{children}</div>
      </div>
    </main>
  );
};

export default FormPageLayout;
