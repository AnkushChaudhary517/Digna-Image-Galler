import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ErrorModal } from '@/components/ErrorModal';

interface ErrorContextType {
  showError: (error: Error | string, title?: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorState {
  error: Error | null;
  title?: string;
  message?: string;
}

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    title: undefined,
    message: undefined,
  });

  const showError = useCallback((error: Error | string, title?: string) => {
    if (typeof error === 'string') {
      setErrorState({
        error: new Error(error),
        title: title || 'Error',
        message: error,
      });
    } else {
      setErrorState({
        error,
        title: title || error.name || 'Error',
        message: error.message,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      title: undefined,
      message: undefined,
    });
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      {errorState.error && (
        <ErrorModal
          error={errorState.error}
          title={errorState.title}
          message={errorState.message}
          onClose={clearError}
          onRetry={clearError}
        />
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

