import {IStreamLogger} from "../../core/handler/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static instance: ConsoleLogger;

    public static getInstance(): ConsoleLogger {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }
        return ConsoleLogger.instance;
    }

    end(): void {
        console.log("Готово")
    }

    error(...args: any): void {
        console.log(new Error("Произошла ошибка"));
    }

    log(...args: any): void {
        console.log(...args);
    }

}