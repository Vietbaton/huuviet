// ==UserScript==
// @name         Bypass by Vietbaton
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động bypass Yeumoney với mã từ OCR URL
// @match        *://yeumoney.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_openInTab
// @connect      *
// ==/UserScript==

(function () {
    'use strict';

    const OCR_URL = 'https://bet88ho.com/';
    let menuVisible = true;
    let bypassCode = '';

    // Tạo giao diện menu
    const menu = document.createElement('div');
    menu.id = 'vietbaton-bypass-menu';
    menu.innerHTML = `
        <div style="background:#222;padding:10px;color:#fff;position:fixed;bottom:20px;right:20px;z-index:9999;border-radius:10px;">
            <div style="font-weight:bold;margin-bottom:8px;">Bypass by Vietbaton</div>
            <button id="bypass-now">Bypass Now</button>
            <button id="auto-bypass-toggle">Auto Bypass: OFF</button>
            <button id="auto-fill-toggle">Auto Nhập Mã: OFF</button>
            <button id="fake-ip">Fake IP</button>
            <button id="afk">AFK</button>
            <button id="change-task">Đổi Nhiệm Vụ</button>
            <button id="fb-link">Facebook</button>
            <button id="hide-menu">Ẩn Menu</button>
        </div>
    `;
    document.body.appendChild(menu);

    // CSS tuỳ chỉnh (nếu muốn thêm style đẹp)
    GM_addStyle(`
        #vietbaton-bypass-menu button {
            margin: 5px;
            padding: 5px 10px;
            background: #444;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    `);

    // Hàm lấy mã tự động từ OCR URL
    async function getCodeFromOCR() {
        try {
            const res = await fetch(OCR_URL);
            const text = await res.text();
            const codeMatch = text.match(/[A-Z0-9]{6,}/); // Regex đơn giản tìm mã
            bypassCode = codeMatch ? codeMatch[0] : '';
            console.log('Code:', bypassCode);
        } catch (e) {
            console.error('OCR fetch error:', e);
        }
    }

    // Auto nhập mã xác nhận
    function autoFillCode() {
        const input = document.querySelector('input[name="code"]');
        if (input && bypassCode) {
            input.value = bypassCode;
            input.form?.submit(); // Gửi form nếu có
        }
    }

    // Fake IP (dùng proxy hay VPN thực sự sẽ cần extension hoặc thiết bị hỗ trợ)
    function fakeIP() {
        alert('Fake IP kích hoạt (placeholder – cần extension hỗ trợ)');
    }

    // AFK: giữ màn hình sáng
    function keepScreenAwake() {
        let wakeLock = null;
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then(lock => {
                wakeLock = lock;
                alert('AFK bật – màn hình sẽ không tắt');
            }).catch(console.error);
        } else {
            alert('Trình duyệt không hỗ trợ Wake Lock');
        }
    }

    // Đổi nhiệm vụ (placeholder)
    function changeTask() {
        location.reload(); // đơn giản là tải lại nhiệm vụ
    }

    // Sự kiện các nút
    document.getElementById('bypass-now').onclick = async () => {
        await getCodeFromOCR();
        autoFillCode();
    };

    let autoBypass = false;
    document.getElementById('auto-bypass-toggle').onclick = function () {
        autoBypass = !autoBypass;
        this.textContent = `Auto Bypass: ${autoBypass ? 'ON' : 'OFF'}`;
        if (autoBypass) {
            setInterval(async () => {
                await getCodeFromOCR();
                autoFillCode();
            }, 10000); // kiểm tra mỗi 10s
        }
    };

    let autoFill = false;
    document.getElementById('auto-fill-toggle').onclick = function () {
        autoFill = !autoFill;
        this.textContent = `Auto Nhập Mã: ${autoFill ? 'ON' : 'OFF'}`;
    };

    document.getElementById('fake-ip').onclick = fakeIP;
    document.getElementById('afk').onclick = keepScreenAwake;
    document.getElementById('change-task').onclick = changeTask;
    document.getElementById('fb-link').onclick = () => GM_openInTab('https://www.facebook.com/share/19G8Q8dDAt/', { active: true });
    document.getElementById('hide-menu').onclick = () => {
        menu.style.display = menuVisible ? 'none' : 'block';
        menuVisible = !menuVisible;
    };
})();
