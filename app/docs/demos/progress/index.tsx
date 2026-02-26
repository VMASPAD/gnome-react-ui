"use client";
import * as React from 'react';
import { Progress } from '@/app/components/progress';
import { Download, RefreshCw, UploadCloud } from 'lucide-react';

export function ProgressDefault() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root value={progress} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <Progress.Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Download className="size-4 text-muted-foreground" />
          Downloading Ubuntu 24.04 LTS
        </Progress.Label>
        <Progress.Value className="text-sm font-medium text-muted-foreground" />
      </div>
      <Progress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <Progress.Indicator className="h-full bg-primary transition-all duration-500 ease-in-out" />
      </Progress.Track>
    </Progress.Root>
  );
}

export function ProgressIndeterminate() {
  return (
    <Progress.Root value={null} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <Progress.Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <RefreshCw className="size-4 animate-spin text-muted-foreground" />
          Syncing repositories...
        </Progress.Label>
      </div>
      <Progress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        {/* Use animate-pulse and full width for indeterminate state if no custom keyframes */}
        <Progress.Indicator className="h-full bg-primary transition-all duration-500 ease-in-out data-[state=indeterminate]:w-full data-[state=indeterminate]:animate-pulse" />
      </Progress.Track>
    </Progress.Root>
  );
}

export function ProgressSteps() {
  const step = 3;
  const totalSteps = 5;
  
  return (
    <Progress.Root value={step} max={totalSteps} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <Progress.Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <UploadCloud className="size-4 text-muted-foreground" />
          Uploading files
        </Progress.Label>
        <span className="text-sm font-medium text-muted-foreground">
          Step {step} of {totalSteps}
        </span>
      </div>
      <Progress.Track className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <Progress.Indicator className="h-full bg-[oklch(0.55_0.12_250)] transition-all duration-500 ease-in-out" />
      </Progress.Track>
    </Progress.Root>
  );
}