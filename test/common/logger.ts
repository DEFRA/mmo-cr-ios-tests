import { appendFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const logDir = resolve(process.cwd(), 'logs');
const logFile = resolve(logDir, 'test.log');

type Level = 'INFO' | 'WARN';

async function log(level: Level, message: string): Promise<void> {
    const line = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    const stream = level === 'INFO' ? process.stdout : process.stderr;
    stream.write(line);
    await mkdir(logDir, { recursive: true });
    await appendFile(logFile, line);
}

export const logInfo = (message: string): Promise<void> => log('INFO', message);
export const logWarn = (message: string): Promise<void> => log('WARN', message);
