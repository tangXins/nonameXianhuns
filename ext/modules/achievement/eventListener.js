import { createApp } from '../../../../../game/vue.esm-browser.js';

const eventListener = createApp({}).config.globalProperties.$bus = {};
eventListener.events = {};

// 监听事件
eventListener.on = function (eventName, callback) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
};

// 触发事件
eventListener.emit = function (eventName, ...args) {
    if (this.events[eventName]) {
        this.events[eventName].forEach(callback => {
            callback(...args);
        });
    }
};

export default eventListener;
