import { appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const logDir = resolve(process.cwd(), 'logs');
const logFile = resolve(logDir, 'test.log');

type Level = 'STEP' | 'INFO' | 'WARN' | 'ERROR';

function log(level: Level, message: string): void {
    const line = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    const stream = level === 'WARN' || level === 'ERROR' ? process.stderr : process.stdout;
    stream.write(line);
    mkdirSync(logDir, { recursive: true });
    appendFileSync(logFile, line);
}

export function logStep(message: string): void {
    log('STEP', message);
}

export function logInfo(message: string): void {
    log('INFO', message);
}

export function logWarn(message: string): void {
    log('WARN', message);
}

export function logError(message: string, error?: unknown): void {
    log('ERROR', error instanceof Error ? `${message}: ${error.message}` : message);
}
