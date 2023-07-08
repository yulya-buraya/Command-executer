//1 ввод данных
//2 билд команды
//билд команды
//спаунд + доп действия

import {IStreamLogger} from "../handler/stream-logger.interface";
import {ConsoleLogger} from "../../out/console-logger/console-logger";
import {ChildProcessWithoutNullStreams} from "child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecuter<Input> {
    private constructor(private logger: IStreamLogger) {
    }

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<Input>;

    protected abstract build(input: Input): ICommandExec;

    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;

    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}