import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { ErrorInfo } from 'react';

interface ErrorModalProps {
  error: Error | null;
  errorInfo?: ErrorInfo | null;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export function ErrorModal({
  error,
  errorInfo,
  onClose,
  onRetry,
  title,
  message,
}: ErrorModalProps) {
  const errorMessage = message || error?.message || 'An unexpected error occurred';
  const errorTitle = title || 'Something went wrong';
  const stackTrace = error?.stack || errorInfo?.componentStack;

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              {errorTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            <p className="text-sm text-gray-600">{errorMessage}</p>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-red-900 mb-2">
                Error Details:
              </h4>
              <p className="text-sm text-red-800 font-mono break-words">
                {error.name}: {error.message}
              </p>
            </div>
          )}

          {stackTrace && (
            <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <summary className="text-sm font-semibold text-gray-700 cursor-pointer mb-2">
                Technical Details (Click to expand)
              </summary>
              <pre className="text-xs text-gray-600 overflow-x-auto mt-2 whitespace-pre-wrap break-words">
                {stackTrace}
              </pre>
            </details>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>What you can do:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
              <li>Try refreshing the page</li>
              <li>Check your internet connection</li>
              <li>Clear your browser cache and try again</li>
              <li>If the problem persists, please contact support</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:gap-0">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

