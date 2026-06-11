type LogLevel = 'info' | 'warn' | 'error';

interface LogEvent {
  context?: string;
  data?: unknown;
  error?: unknown;
  level: LogLevel;
  message: string;
  timestamp: string;
}

const logs: LogEvent[] = [];

function write(level: LogLevel, message: string, options: Omit<LogEvent, 'level' | 'message' | 'timestamp'> = {}) {
  const event: LogEvent = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...options,
  };

  logs.push(event);

  if (logs.length > 100) {
    logs.shift();
  }

  if (import.meta.env.DEV) {
    const method = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info;
    method(`[${event.timestamp}] ${message}`, options);
  }
}

export const logger = {
  error: (message: string, options?: Omit<LogEvent, 'level' | 'message' | 'timestamp'>) => write('error', message, options),
  events: () => [...logs],
  info: (message: string, options?: Omit<LogEvent, 'level' | 'message' | 'timestamp'>) => write('info', message, options),
  warn: (message: string, options?: Omit<LogEvent, 'level' | 'message' | 'timestamp'>) => write('warn', message, options),
};
