import React from 'react';
import GlobalCursorGrid from './GlobalCursorGrid';

interface InternalPageLayoutProps {
  pathname: string;
  children: React.ReactNode;
}

export const InternalPageLayout: React.FC<InternalPageLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen bg-transparent text-[#E8DFD8]">
      {/* Route-conditional CursorGrid on internal pages */}
      <GlobalCursorGrid />

      {/* Main Page Content (with top padding for fixed Navbar) */}
      <main className="relative z-10 w-full pt-20 sm:pt-24">
        {children}
      </main>

      {/* Footer Navigation Back to Home */}
      <footer className="relative z-10 w-full py-8 sm:py-12 px-6 sm:px-12 lg:px-16 pb-safe border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7D70]">
        <p>© {new Date().getFullYear()} Aditya Yadav. All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-4 sm:mt-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('pushstate'));
            }}
            className="text-[#C4B5A5] hover:text-[#D4AF37] tracking-[0.2em] uppercase transition-colors min-h-[44px] inline-flex items-center"
          >
            ← Return to Home
          </a>
        </div>
      </footer>
    </div>
  );
};

export default InternalPageLayout;
