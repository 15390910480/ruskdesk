
export const view = Window.this;
export const handler = document.$("#handler") || view;

try { view.windowIcon = document.url(handler.xcall("get_icon")); } catch (e) { }

export const OS = view.mediaVar("platform");
export const is_osx = OS == "OSX";
export const is_win = OS == "Windows";
export const is_linux = OS == "Linux";

view.mediaVar("is_osx", is_osx);
view.mediaVar("not_osx", !is_osx);
handler.is_port_forward = false;
handler.is_file_transfer = false;
export var is_xfce = false;
try { is_xfce = handler.xcall("is_xfce"); } catch (e) { }


export function translate(name) {
    try {
        return handler.xcall("t", name);
    } catch (_) {
        return name;
    }
}

export function hashCode(str) {
    let hash = 160 << 16 + 114 << 8 + 91;
    for (let i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 16777216;
}

export function intToRGB(i, a = 1) {
    return `rgba(${((i >> 16) & 0xFF)}, ${((i >> 8) & 0x7F)},${(i & 0xFF)},${a})`;
}

export function string2RGB(s, a = 1) {
    return intToRGB(hashCode(s), a);
}

export function getTime() {
    return new Date().valueOf();
}

export function platformSvg(platform, color) {
    platform = (platform || "").toLowerCase();
    if (platform == "linux") {
        return (<svg viewBox="0 0 256 256">
            <g transform="translate(0 256) scale(.1 -.1)" fill={color}>
                <path d="m1215 2537c-140-37-242-135-286-278-23-75-23-131 1-383l18-200-54-60c-203-224-383-615-384-831v-51l-66-43c-113-75-194-199-194-300 0-110 99-234 244-305 103-50 185-69 296-69 100 0 156 14 211 54 26 18 35 19 78 10 86-18 233-24 335-12 85 10 222 38 269 56 9 4 19-7 29-35 20-50 52-64 136-57 98 8 180 52 282 156 124 125 180 244 180 380 0 80-28 142-79 179l-36 26 4 119c5 175-22 292-105 460-74 149-142 246-286 409-43 49-78 92-78 97 0 4-7 52-15 107-8 54-19 140-24 189-13 121-41 192-103 260-95 104-248 154-373 122zm172-112c62-19 134-80 163-140 15-31 28-92 41-193 27-214 38-276 57-304 9-14 59-74 111-134 92-106 191-246 236-334 69-137 115-339 101-451l-7-55-71 10c-100 13-234-5-265-36-54-55-85-207-82-412l1-141-51-17c-104-34-245-51-380-45-69 3-142 10-162 16-32 10-37 17-53 68-23 72-87 201-136 273-80 117-158 188-237 215-37 13-37 13-34 61 13 211 182 555 373 759 57 62 58 63 58 121 0 33-9 149-19 259-21 224-18 266 26 347 67 122 193 174 330 133zm687-1720c32-9 71-25 87-36 60-42 59-151-4-274-59-119-221-250-317-257-34-3-35-2-48 47-18 65-20 329-3 413 16 83 29 110 55 115 51 10 177 6 230-8zm-1418-80c79-46 187-195 247-340 41-99 43-121 12-141-39-25-148-30-238-10-142 32-264 112-307 202-20 41-21 50-10 87 24 83 102 166 192 207 54 25 53 25 104-5z" />
                <path d="m1395 1945c-92-16-220-52-256-70-28-15-29-18-29-89 0-247 165-397 345-312 60 28 77 46 106 111 54 123 0 378-80 374-9 0-47-7-86-14zm74-156c15-69 14-112-5-159s-55-70-111-70c-48 0-78 20-102 68-15 29-41 131-41 159 0 9 230 63 242 57 3-2 11-27 17-55z" />
            </g>
        </svg>);
    }
    if (platform == "mac os") {
        return (<svg viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill={color} />
        </svg>);
    }
    return (<svg viewBox="0 0 448 512">
        <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" fill={color} />
    </svg>);
}

export function centerize(w, h) {
    let [sx, sy, sw, sh] = view.screenBox("workarea", "rectw");
    if (w > sw) w = sw;
    if (h > sh) h = sh;
    const x = (sx + sw - w) / 2;
    const y = (sy + sh - h) / 2;
    view.move(x, y, w, h);
}

// TODO CSS 
export function setWindowButontsAndIcon(only_min = false) {
    if (only_min) {
        document.$("div.window-buttons").content(
            <div>
                <button class="window minimize" id="button-window" tabindex="-1" role="window-minimize" ><div /></button>
            </div>
        );
    } else {
        document.$("div.window-buttons").content(<div>
            <button class="window minimize" tabindex="-1" role="window-minimize" ><div /></button>
            <button class="window maximize" tabindex="-1" role="window-maximize" ><div /></button>
            <button class="window close" tabindex="-1" role="window-close" ><div /></button>
        </div>);
    }
    document.$("div.window-icon>icon").style.setProperty(
        "background-image", `url(${handler.xcall("get_icon")})`,
    );
}

export function adjustBorder() {
    if (is_osx) {
        let headerStyle = document.$("header").style;
        if (view.state == Window.WINDOW_FULL_SCREEN) {
            headerStyle.setProperty("display", "none",);
        } else {
            headerStyle.setProperty("display", "block",);
            headerStyle.setProperty("padding", "0",);
        }
        return;
    }
    if (view.state == Window.WINDOW_MAXIMIZED) {
        document.style.setProperty("border", "window-frame-width solid transparent");
    } else if (view.state == Window.WINDOW_FULL_SCREEN) {
        document.style.setProperty("border", "none");
    } else {
        document.style.setProperty("border", "black solid 1px");
    }
    let el = document.$("button#maximize");
    if (el) el.classList.toggle("restore", view.state == Window.WINDOW_MAXIMIZED);
    el = document.$("span#fullscreen");
    if (el) el.classList.toggle("active", view.state == Window.WINDOW_FULL_SCREEN);
}

export const svg_checkmark = (<svg viewBox="0 0 492 492"><path d="M484 105l-16-17a27 27 0 00-38 0L204 315 62 173c-5-5-12-7-19-7s-14 2-19 7L8 189a27 27 0 000 38l160 160v1l16 16c5 5 12 8 19 8 8 0 14-3 20-8l16-16v-1l245-244a27 27 0 000-38z" /></svg>);
export const svg_edit = (<svg id="edit" viewBox="0 0 384 384">
    <path d="M0 304v80h80l236-236-80-80zM378 56L328 6c-8-8-22-8-30 0l-39 39 80 80 39-39c8-8 8-22 0-30z" />
</svg>);
export const svg_eye = (<svg viewBox="0 0 469.33 469.33">
    <path d="m234.67 170.67c-35.307 0-64 28.693-64 64s28.693 64 64 64 64-28.693 64-64-28.694-64-64-64z" />
    <path d="m234.67 74.667c-106.67 0-197.76 66.346-234.67 160 36.907 93.653 128 160 234.67 160 106.77 0 197.76-66.347 234.67-160-36.907-93.654-127.89-160-234.67-160zm0 266.67c-58.88 0-106.67-47.787-106.67-106.67s47.787-106.67 106.67-106.67 106.67 47.787 106.67 106.67-47.787 106.67-106.67 106.67z" />
</svg>);
export const svg_send = (<svg viewBox="0 0 448 448">
    <polygon points="0.213 32 0 181.33 320 224 0 266.67 0.213 416 448 224" />
</svg>);
export const svg_chat = (<svg viewBox="0 0 511.07 511.07">
    <path d="m74.39 480.54h-36.213l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425-14.093-35.647-15.864-74.888-5.121-113.48 12.89-46.309 43.123-88.518 85.128-118.85 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.61 22.389 189.95 64.745 41.744 38.159 64.734 89.63 64.734 144.93 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.04 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.04 0-200.15 73.973-220.56 147.28-19.284 69.28 9.143 134.74 76.043 175.12l7.475 4.511-0.23 8.727c-0.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.37 0 224.68-93.473 224.68-180.32 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.71-56.888z" />
</svg>);

export function scrollToBottom(el) {
    // TEST .box() 
    let y = el.state.box("height", "content") - el.state.box("height", "client");
    el.scrollTo(0, y);
}

export function getNowStr() {
    let now = new Date();
    return String.printf("%02d:%02d:%02d", now.hour, now.minute, now.second);
}

/******************** start of chatbox ****************************************/
export class ChatBox extends Element {
    msgs = [];
    callback;

    this(props) {
        if (props) {
            this.msgs = props.msgs || [];
            this.callback = props.callback;
        }
    }

    renderMsg(msg) {
        let cls = msg.name == "me" ? "right-side msg" : "left-side msg";
        return (
            <div class={cls}>
                {msg.name == "me" ?
                    <div class="time">{msg.time + "  "} me</div> :
                    <div class="name">{msg.name} {"  " + msg.time}</div>
                }
                <div class="text">{msg.text}</div>
            </div>
        );
    }

    render() {
        let msgs = this.msgs.map((msg) => this.renderMsg(msg));
        setTimeout(() => {
            scrollToBottom(this.msgs);
        }, 1);
        // TODO @{this.msgs} in TIS:<htmlarea spellcheck="false" readonly .msgs @{this.msgs} >
        return (<div class="msgbox">
            <htmlarea spellcheck="false" readonly class="msg" >
                {msgs}
            </htmlarea>
            <div class="send">
                <input type="text" class="outline-focus" />
                <span>{svg_send}</span>
            </div>
        </div >);
    }

    send() {
        let el = this.$("input");
        let value = (el.value || "").trim();
        el.value = "";
        if (!value) return;
        if (this.callback) this.callback(value);
    }

    ["on keydown at input"](evt) {
        // TODO is shortcutKey useless?
        if (!evt.shortcutKey) {
            // TODO TEST Windows/Mac
            if (evt.code == "KeyRETURN") {
                this.send();
            }
        }
    }

    ["on click at div.send span"](evt) {
        this.send();
        view.focus = this.$("input");
    }
}
/******************** end of chatbox ****************************************/

/******************** start of msgbox ****************************************/
var remember_password = false;
var msgbox_params;
function getMsgboxParams() {
    return msgbox_params;
}

// tmp workaround https://sciter.com/forums/topic/menu-not-be-hidden-when-open-dialog-on-linux/
export function msgbox(type, title, text, callback = null, height = 180, width = 500, retry = 0, contentStyle = "") {
    if (is_linux) { // fix menu not hidden issue
        setTimeout(() => msgbox_(type, title, text, callback, height, width, retry, contentStyle), 1);
    } else {
        msgbox_(type, title, text, callback, height, width, retry, contentStyle);
    }
}

function msgbox_(type, title, text, callback, height, width, retry, contentStyle) {
    let has_msgbox = msgbox_params != null;
    if (!has_msgbox && !type) return;
    let remember = false;
    try {
        remember = handler.xcall("get_remember");
    } catch (e) { }
    msgbox_params = {
        remember: remember, type: type, text: text, title: title,
        getParams: getMsgboxParams,
        callback: callback, translate: translate,
        retry: retry, contentStyle: contentStyle,
    };
    if (has_msgbox) return;
    let dialog = {
        client: true,
        parameters: msgbox_params,
        width: width + (is_xfce ? 50 : 0),
        height: height + (is_xfce ? 50 : 0),
    };
    let html = handler.xcall("get_msgbox");
    if (html) dialog.html = html;
    else dialog.url = document.url("msgbox.html");
    let res = view.modal(dialog);
    msgbox_params = null;
    console.log(`msgbox return, type: ${type}, res: ${res}`);
    if (type.indexOf("custom") >= 0) {
        //
    } else if (!res) {
        if (!handler.is_port_forward) view.close();
    } else if (res == "!alive") {
        // do nothing
    } else if (res.type == "input-password") {
        if (!handler.is_port_forward) msgbox("connecting", "Connecting...", "Logging in...");
        handler.login(res.password, res.remember);
        if (!is_port_forward) msgbox("connecting", "Connecting...", "Logging in...");
    } else if (res.reconnect) {
        if (!handler.is_port_forward) connecting();
        handler.reconnect();
    }
}

export function connecting() {
    handler.msgbox("connecting", "Connecting...", "Connection in progress. Please wait.");
}

handler.msgbox = function (type, title, text, retry = 0) {
    setTimeout(() => msgbox(type, title, text, null, 180, 500, retry), 30);
}

var reconnectTimeout = 1;
handler.msgbox_retry = function (type, title, text, hasRetry) {
    handler.msgbox(type, title, text, hasRetry ? reconnectTimeout : 0);
    if (hasRetry) {
        reconnectTimeout *= 2;
    } else {
        reconnectTimeout = 1;
    }
}
/******************** end of msgbox ****************************************/
// TODO Progress 
// function Progress()
// {
//     var _val;
//     var pos = -0.25;

//     function step() {
//         if( _val !== undefined ) { this.refresh(); return false; }
//         pos += 0.02;
//         if( pos > 1.25)
//             pos = -0.25;
//         this.refresh();
//         return true;
//     }

//     function paintNoValue(gfx)
//     {
//         var (w,h) = this.box(#dimension,#inner);
//         var x = pos * w;
//         w = w * 0.25;
//         gfx.fillColor( this.style#color )
//              .pushLayer(#inner-box)
//              .rectangle(x,0,w,h)
//              .popLayer();
//         return true;
//     }

//     this[#value] = property(v) {
//         get return _val;
//         set {
//             _val = undefined;
//             pos = -0.25;
//             this.paintContent = paintNoValue;
//             this.animate(step);
//             this.refresh();
//         }
//     }

//     this.value = "";
// }

const svg_eye_cross = (<svg viewBox="0 -21 511.96 511">
    <path d="m506.68 261.88c7.043-16.984 7.043-36.461 0-53.461-41.621-100.4-140.03-165.27-250.71-165.27-46.484 0-90.797 11.453-129.64 32.191l-68.605-68.609c-8.3438-8.3398-21.824-8.3398-30.168 0-8.3398 8.3398-8.3398 21.824 0 30.164l271.49 271.49 86.484 86.488 68.676 68.672c4.1797 4.1797 9.6406 6.2695 15.102 6.2695 5.4609 0 10.922-2.0898 15.082-6.25 8.3438-8.3398 8.3438-21.824 0-30.164l-62.145-62.145c36.633-27.883 66.094-65.109 84.438-109.38zm-293.91-100.1c12.648-7.5742 27.391-11.969 43.199-11.969 47.062 0 85.332 38.273 85.332 85.336 0 15.805-4.3945 30.547-11.969 43.199z" />
    <path d="m255.97 320.48c-47.062 0-85.336-38.273-85.336-85.332 0-3.0938 0.59766-6.0195 0.91797-9.0039l-106.15-106.16c-25.344 24.707-46.059 54.465-60.117 88.43-7.043 16.98-7.043 36.457 0 53.461 41.598 100.39 140.01 165.27 250.69 165.27 34.496 0 67.797-6.3164 98.559-18.027l-89.559-89.559c-2.9844 0.32031-5.9062 0.91797-9 0.91797z" />
</svg>);

export class PasswordComponent extends Element {
    visible = false;
    value = '';
    name = 'password';

    constructor(props) {
        if (props && props.value) {
            this.value = props.value;
        }
        if (props && props.name) {
            this.name = props.name;
        }
    }

    render() {
        return (
            <div class="password">
                <input class="outline-focus" name={this.name} value={this.value} type={this.visible ? "text" : "password"} />
                {this.visible ? svg_eye_cross : svg_eye}
            </div>);
    }

    ["on click at svg"](svg) {
        let el = this.$("input");
        let value = el.value;
        // TODO selectionStart/selectionEnd run ok,but always return 0
        let start = el.xcall("selectionStart") || 0;
        let end = el.xcall("selectionEnd");
        this.componentUpdate({ visible: !this.visible });
        setTimeout(() => {
            let el = this.$("input");
            view.focus = el;
            el.value = value;
            el.xcall("setSelection", start, end);
        }, 30)
    }
}

export function isReasonableSize(r) {
    let x = r[0];
    let y = r[1];
    return !(x < -3200 || x > 3200 || y < -3200 || y > 3200);
}

