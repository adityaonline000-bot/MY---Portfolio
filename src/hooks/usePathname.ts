import { useState, useEffect } from 'react';

/**
 * Custom hook to track the current pathname across browser navigation,
 * SPA pushState/replaceState, and hash navigation.
 */
export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const updatePathname = () => {
      const current = window.location.pathname || '/';
      setPathname(current);
    };

    window.addEventListener('popstate', updatePathname);
    window.addEventListener('pushstate', updatePathname);
    window.addEventListener('replacestate', updatePathname);

    // Monkey-patch pushState & replaceState so SPA route changes trigger listeners
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      const result = origPush.apply(this, args);
      window.dispatchEvent(new Event('pushstate'));
      return result;
    };

    history.replaceState = function (...args) {
      const result = origReplace.apply(this, args);
      window.dispatchEvent(new Event('replacestate'));
      return result;
    };

    return () => {
      window.removeEventListener('popstate', updatePathname);
      window.removeEventListener('pushstate', updatePathname);
      window.removeEventListener('replacestate', updatePathname);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  return pathname;
}

export default usePathname;
