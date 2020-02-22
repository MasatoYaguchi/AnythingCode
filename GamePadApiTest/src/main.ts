import { GamePadManager } from './GamePad';

window.onload = () => {
    console.log("load document!");
    new Main();
}

class Main {
    constructor() {
        new GamePadManager();
    }
}
