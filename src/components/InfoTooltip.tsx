import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface InfoTooltipProps {
  content: string;
  isDark?: boolean;
}

export function InfoTooltip({ content, isDark = false }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center">
            <HelpCircle 
              size={14} 
              className={`${isDark ? 'text-white/60 hover:text-white/80' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
