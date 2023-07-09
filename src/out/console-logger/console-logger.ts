import {IStreamLogger} from "../../core/handler/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static logger: ConsoleLogger;

    public static getInstance(): ConsoleLogger {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }

    end(): void {
        console.log("Готово")
    }

    error(...args: any[]): void {
        console.log(...args);
    }

    log(...args: any[]): void {
        console.log(...args);
    }

}