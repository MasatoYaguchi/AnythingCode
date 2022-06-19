console.log(`load expansion test ${location.href}`);


/**
 * ヤフオクのa要素があればクリック
 * @returns 
 */
const auctionsClick = () => {
    const linkElementArray = document.body.getElementsByTagName("a");
    console.log(linkElementArray[0]);
    for (const element of linkElementArray) {
        console.log(element.ariaLabel);
        if (element.ariaLabel && element.ariaLabel.includes("ヤフオク")) {
            mouseClickEmulate(element);
            return;
        }
    }
}



const dispathMouseEvent = (element, eventName, x, y) => {
    element.dispatchEvent(new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0
    }));
};

const mouseClickEmulateClassName = (elementClassName) => {
    const element = document.querySelector(elementClassName);
    console.log(elementClassName, element);
    if (!element) return;
}

const mouseClickEmulate = (element) => {
    console.log("click", element);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left + (rect.right - rect.left) / 4 + 2;
    const y = rect.top + (rect.bottom - rect.top) - 20;

    dispathMouseEvent(element, "mousedown", x, y);
    setTimeout(() => {
        dispathMouseEvent(element, "mouseup", x, y);
        dispathMouseEvent(element, "click", x, y);
    }, 88);
}


// MutationObserver で変更状態の監視
//https://developer.mozilla.org/ja/docs/Web/API/MutationObserver

// 変更を監視するノードを選択
const targetNode = document.body;

// (変更を監視する) オブザーバーのオプション
const config = { attributes: true, childList: true, subtree: true };

// 変更が発見されたときに実行されるコールバック関数
const mutationCallback = (mutationsList, observer) => {

    for (const mutation of mutationsList) {
        // 子要素変更時
        if (mutation.type === 'childList') {
            console.log(`子要素変更${mutation.addedNodes}`);
        }
        // 属性変更時 CSSの変更とか取得可能 
        else if (mutation.type === 'attributes') {
            console.log(`属性変更 ${mutation.attributeName}`);
        }
    }
};


// コールバック関数に結びつけられたオブザーバーのインスタンスを生成
const observer = new MutationObserver(mutationCallback);

// 対象ノードの設定された変更の監視を開始
observer.observe(targetNode, config);


document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "1":
            auctionsClick();
            break;

        default:
            break;
    }
});
