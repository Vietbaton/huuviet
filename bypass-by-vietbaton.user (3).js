
// ==UserScript==
// @name         Bypass by Vietbaton
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động bypass nhiệm vụ Yeumoney
// @author       Vietbaton
// @match        *://yeumoney.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // UI Elements
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '10%';
    panel.style.left = '10px';
    panel.style.zIndex = 9999;
    panel.style.background = '#111';
    panel.style.color = '#fff';
    panel.style.padding = '10px';
    panel.style.borderRadius = '10px';
    panel.style.fontFamily = 'Arial';
    panel.style.width = '300px';
    panel.style.display = 'none';

    panel.innerHTML = `
        <h3>Bypass by Vietbaton</h3>
        <label>OCR URL: <input type="text" id="ocr-url" style="width:100%" value="https://bet88ho.com/" /></label><br><br>
        <label>Thời gian bypass (giây):
            <input type="number" id="bypass-time" value="85" min="1" style="width:100%" />
        </label><br><br>
        <label><input type="checkbox" id="auto-bypass" checked /> Tự động bypass</label><br>
        <label><input type="checkbox" id="auto-input" checked /> Tự động nhập mã xác nhận</label><br>
        <label><input type="checkbox" id="afk-mode" /> AFK - giữ màn hình</label><br><br>
        <button id="bypass-now">Bypass Now</button>
        <button id="switch-task">Đổi nhiệm vụ</button>
        <button id="fake-ip">Fake IP</button>
        <button id="fake-browser">Fake Browser</button>
        <button id="facebook-link">Facebook</button>
    `;

    document.body.appendChild(panel);

    // Toggle menu key (Shift+M)
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key === 'M') {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Event listeners for buttons
    document.getElementById('bypass-now').addEventListener('click', () => {
        alert('Bypass thủ công đã kích hoạt (giả lập)!');
        // Viết logic bypass tại đây
    });

    document.getElementById('switch-task').addEventListener('click', () => {
        alert('Đã chuyển sang nhiệm vụ khác (giả lập)!');
    });

    document.getElementById('fake-ip').addEventListener('click', () => {
        alert('Fake IP đang bật (giả lập)!');
    });

    document.getElementById('fake-browser').addEventListener('click', () => {
        alert('Fake Browser đang bật (giả lập)!');
    });

    document.getElementById('facebook-link').addEventListener('click', () => {
        window.open('https://www.facebook.com/share/19G8Q8dDAt/', '_blank');
    });

    // AFK - giữ màn hình bật (ngăn tắt màn hình do không chạm)
    let afkInterval = null;
    document.getElementById('afk-mode').addEventListener('change', function() {
        if (this.checked) {
            afkInterval = setInterval(() => {
                console.log('AFK - giữ màn hình');
            }, 10000);
        } else {
            clearInterval(afkInterval);
        }
    });

})();
