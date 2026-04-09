/**
 * Utility to suppress ResizeObserver errors that are common with Material-UI components
 * These errors are harmless but can clutter the console
 */

export const suppressResizeObserverErrors = () => {
  // Suppress ResizeObserver errors in the console
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      message.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      // Suppress this specific error
      return;
    }
    // Call the original console.error for other errors
    originalError.apply(console, args);
  };

  // Also handle window error events
  const handleError = (event: ErrorEvent) => {
    if (event.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  window.addEventListener('error', handleError);
  
  // Return cleanup function
  return () => {
    console.error = originalError;
    window.removeEventListener('error', handleError);
  };
};

/**
 * Hook to suppress ResizeObserver errors in React components
 */
export const useResizeObserverErrorSuppression = () => {
  const cleanup = suppressResizeObserverErrors();
  
  // Cleanup on unmount
  return () => cleanup();
};
