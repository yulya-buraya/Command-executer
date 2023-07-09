"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    static getInstance() {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }
    end() {
        console.log("Готово");
    }
    error(...args) {
        console.log(...args);
    }
    log(...args) {
        console.log(...args);
    }
}
exports.ConsoleLogger = ConsoleLogger;
