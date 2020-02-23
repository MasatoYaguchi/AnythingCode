export class GamePadManager {

  private isGamePad: boolean = false;
  private circleDiv: HTMLDivElement = document.createElement("div");
  private logDiv: HTMLDivElement = document.createElement("div");
  private addPosition: number = 4;

  constructor() {
    // var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
    if (navigator.getGamepads())
      console.log("start game pad manager");
    this.init();
  }

  private init(): void {
    this.circleDiv.className = "circle";
    document.body.appendChild(this.circleDiv);
    document.body.appendChild(this.logDiv);

    this.circleDiv.style.left = "100px";
    this.circleDiv.style.top = "100px";

    // GamePadが接続された時 もしくは接続後に初めてGamePadを動作させた時
    window.addEventListener("gamepadconnected", this.gamePadInit.bind(this));
    // GamePadが外された時
    window.addEventListener("gamepaddisconnected", (e: Event): void => { console.log("gamepaddisconnected", e); });

    window.requestAnimationFrame(this.tick.bind(this));
  }

  private tick(): void {
    window.requestAnimationFrame(this.tick.bind(this));
    if (!this.isGamePad) return;
    for (const gamepad of navigator.getGamepads()) {
      if (gamepad === null) continue;



      for (let i = 0; i < gamepad.axes.length; i++) {
        const axes = gamepad.axes[i];
        if (axes !== 0) {
          console.log(axes);
        }

      }

      for (let i = 0; i < gamepad.buttons.length; i++) {
        const button = gamepad.buttons[i];
        this.pressButton(button, i);
      }
    }
  }

  private pressButton(button: GamepadButton, buttonNumber: number): void {
    if (button.pressed) {
      console.log(buttonNumber, button);
      switch (buttonNumber) {
        case 12:
          // up
          this.moveCircle({ x: 0, y: -button.value });
          break;
        case 13:
          // down
          this.moveCircle({ x: 0, y: button.value });
          break;
        case 14:
          // left
          this.moveCircle({ x: -button.value, y: 0 });
          break;
        case 15:
          // right
          this.moveCircle({ x: button.value, y: 0 });
          break;

        default:
          break;
      }
    }

  }



  private moveCircle(point: { x: number, y: number }) {
    let x = parseInt(this.circleDiv.style.left || "0");
    let y = parseInt(this.circleDiv.style.top || "0");
    x = x + point.x * this.addPosition;
    y = y + point.y * this.addPosition;
    this.circleDiv.style.left = `${Math.floor(x)}px`;
    this.circleDiv.style.top = `${Math.floor(y)}px`;


  }


  private gamePadInit(e: Event): void {
    let gamepadEvent = e as GamepadEvent;
    console.log(gamepadEvent.gamepad);
    this.bodyLog(gamepadEvent.gamepad.id);
    this.isGamePad = true;

  }

  private bodyAddLog(message: string): void {
    this.bodyLog(this.logDiv.textContent + " ¥n " + message);
  }

  private bodyLog(message: string): void {
    this.logDiv.textContent = message;
  }

}