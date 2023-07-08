import {IStreamLogger} from "./stream-logger.interface";
import * as stream from "stream";
import {ChildProcessWithoutNullStreams} from "child_process";

export class StreamHandler {
    constructor(private logger: IStreamLogger) {
    }

    proccessOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on("data", (data: any) => {
            this.logger.log((data));
        });

        stream.stderr.on("data", (data: any) => {
            this.logger.error(data);
        });
        stream.on("close", () => {
            this.logger.end();
        });
    }

}