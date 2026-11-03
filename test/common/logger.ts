import { appendFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const logDir = resolve(process.cwd(), 'logs');
const logFile = resolve(logDir, 'test.log');

type Level = 'STEP' | 'INFO' | 'WARN' | 'ERROR';

async function log(level: Level, message: string): Promise<void> {
    const line = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    const stream = level === 'WARN' || level === 'ERROR' ? process.stderr : process.stdout;
    stream.write(line);
    await mkdir(logDir, { recursive: true });
    await appendFile(logFile, line);
}

export const logStep = (message: string): Promise<void> => log('STEP', message);
export const logInfo = (message: string): Promise<void> => log('INFO', message);
export const logWarn = (message: string): Promise<void> => log('WARN', message);
export const logError = (message: string, error?: unknown): Promise<void> =>
    log('ERROR', error instanceof Error ? `${message}: ${error.message}` : message);
