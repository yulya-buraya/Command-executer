import {PromptService} from "./core/promt/promt.service";

export class App {
    run() {
        const res = (new PromptService()).input<number>("Число", "number");
        console.log(res);
    }
}

const app = new App();
app.run();