export const metadata = {
  title: "GROFAST DIGITAL | Team Management",
  description: "Team management platform for GROFAST DIGITAL"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="gradient-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
