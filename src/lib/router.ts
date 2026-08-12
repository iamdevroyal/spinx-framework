import { useState, useEffect } from 'react';

export function getPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

export function navigateTo(path: string, options?: { scrollToTop?: boolean }) {
  if (typeof window === 'undefined') return;
  
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
  
  window.dispatchEvent(new Event('spinx-navigate'));

  if (options?.scrollToTop !== false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useLocationPath(): string {
  const [path, setPath] = useState<string>(getPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(getPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('spinx-navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('spinx-navigate', handleLocationChange);
    };
  }, []);

  return path;
}
