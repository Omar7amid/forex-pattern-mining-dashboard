import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forex Pattern Mining Dashboard",
  description: "Machine Learning Dashboard for Forex Pattern Mining with Kaggle Integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">FX</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Forex Pattern Mining</h1>
                  <p className="text-gray-400 text-sm">ML Dashboard with Kaggle Integration</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-600 rounded-full text-white text-sm">
                  ✅ Kaggle Verified
                </span>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                  Research Based
                </span>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}