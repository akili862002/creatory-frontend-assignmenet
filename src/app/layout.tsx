import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex px-1.5 flex-col items-center w-full min-h-screen">
        <div className="w-full max-w-2xl">{children}</div>
      </body>
    </html>
  );
}
