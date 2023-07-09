import {CommandExecuter} from "../../core/executer/command.executer";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";
import {IStreamLogger} from "../../core/handler/stream-logger.interface";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/promt/promt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamHandler} from "../../core/handler/stream.handler";

export class FfmpegExecuter extends CommandExecuter<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();


    constructor(logger: IStreamLogger) {
        super(logger);

    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', "number");
        const height = await this.promptService.input<number>('Высота', "number");
        const path = await this.promptService.input<string>('Путь', "input");
        const name = await this.promptService.input<string>('Название', "input");
        return {width, height, path, name};
    }

    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, "mp4");
        const args = (new FfmpegBuilder).input(path).setVideoSize(width, height).output(output);
        return {command: "ffmpeg", args, output};
    }

    protected spawn({command, args, output}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);
    }

    protected  processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.proccessOutput(stream);
    }


}