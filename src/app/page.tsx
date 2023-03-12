import { cn } from "@/utils/classnames.utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-10">
      <div className="text-center">
        <h1>Assignment Pages</h1>
        <p className="mt-2 text-base text-gray-600">
          Please use the following links to access the application developed by
          Dung Nguyen.
        </p>
      </div>
      <div className="mt-8 space-y-3">
        <RouteLink
          href="/auth/login"
          title="Sign in page"
          description="Assignment task 1: Sign in page using /api/auth endpoint"
        />
        <RouteLink
          href="/create"
          title="Create user page"
          description="Assignment task 2: Create a page with a form that is only accessible by authenticated users"
        />
        <RouteLink
          href="/users"
          title="List Users page"
          description="Assignment task 3: Create a page where only authenticated users can see a paginated table with the return data"
        />
      </div>
    </div>
  );
}

const RouteLink: React.FC<{
  href: string;
  title: string;
  description: string;
}> = ({ href, title, description }) => {
  return (
    <Link
      href={href}
      className={cn(
        "block p-4 duration-200 border border-gray-300 rounded-lg",
        "hover:no-underline hover:bg-gray-50 hover:shadow-lg hover:border-transparent"
      )}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-700">{description}</p>
      <p className="mt-2 text-sm font-medium">Visit page →</p>
    </Link>
  );
};
