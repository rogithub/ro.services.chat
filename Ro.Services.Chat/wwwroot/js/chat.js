/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([10,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Sent"] = 0] = "Sent";
    Status[Status["Deliverded"] = 1] = "Deliverded";
    Status[Status["Seen"] = 2] = "Seen";
})(Status = exports.Status || (exports.Status = {}));


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chatTemplates_1 = __webpack_require__(11);
var binderService_1 = __webpack_require__(19);
var jsonReq_1 = __webpack_require__(20);
var urlBase = $("#urlBase").val();
var urlHome = $("#urlHome").val();
var urlSignalr = urlBase + "/chathub";
var getUserInfo = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var user = urlParams.get('user');
    var group = urlParams.get('group');
    var info = { name: user, group: group };
    if ($.trim(user).length === 0 || $.trim(group).length === 0) {
        window.location.href = urlHome;
        return null;
    }
    return info;
};
$(function () { return __awaiter(void 0, void 0, void 0, function () {
    var info, api, model;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                info = getUserInfo();
                if (info === null)
                    return [2 /*return*/];
                api = new jsonReq_1.JsonReq(urlBase, window);
                model = new chatTemplates_1.ChatTemplates(ko, $, info, urlSignalr);
                model.id.subscribe(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var users, others;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, api.get("GetUsers?groupName=" + info.group)];
                            case 1:
                                users = _a.sent();
                                others = ko.utils.arrayFilter(users, function (u) { return u.id !== id; });
                                model.onUserListChange(others);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, model.chatConnection.start()];
            case 1:
                _a.sent();
                binderService_1.BinderService.bind($, model, "#main");
                return [2 /*return*/];
        }
    });
}); });


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatTemplates = void 0;
var chatConnection_1 = __webpack_require__(12);
var chatStateUser_1 = __webpack_require__(17);
var status_1 = __webpack_require__(6);
var textMessage_1 = __webpack_require__(18);
var ChatTemplates = /** @class */ (function () {
    function ChatTemplates(ko, $, user, urlSignalr) {
        var _this = this;
        this.getUser = function (id) {
            var self = _this;
            return self.ko.utils.arrayFirst(self.users(), function (u) { return u.id === id; });
        };
        this.onMessage = function (userId, userName, message) {
            var self = _this;
            self.messages.push({ user: {
                    id: userId,
                    name: userName
                }, message: new textMessage_1.TextMessage(self.ko, message) });
            self.autoScroll();
        };
        this.updateMessageStatus = function (userId, messageId, state) {
            var self = _this;
            var user = self.getUser(userId);
            if (!user) {
                return;
            }
            var found = self.ko.utils.arrayFilter(user.messages(), function (it) {
                return it.message.now === messageId;
            });
            if (found.length === 0)
                return;
            found[0].message.state(state);
            self.checkSeen();
        };
        this.onReceiveMessageDelivered = function (userId, messageId) {
            var self = _this;
            self.updateMessageStatus(userId, messageId, status_1.Status.Deliverded);
        };
        this.onReceiveMessageSeen = function (userId, messageId) {
            var self = _this;
            self.updateMessageStatus(userId, messageId, status_1.Status.Seen);
        };
        this.onPrivateMessage = function (idFrom, message) {
            var self = _this;
            var userFrom = self.getUser(idFrom);
            var txtMessage = new textMessage_1.TextMessage(self.ko, message);
            userFrom.messages.push({ user: userFrom.toUser(), message: txtMessage });
            self.scrollToFirstNotRead();
            self.chatConnection.sendMessageDelivered(idFrom, message.now);
            self.updateMessageStatus(idFrom, message.now, status_1.Status.Deliverded);
        };
        this.onStarted = function (id) {
            var self = _this;
            self.id(id);
        };
        this.delChat = function () {
            var self = _this;
            var u = self.chattingWith();
            if (!u)
                return;
            u.messages.removeAll();
            self.users(self.ko.utils.arrayFilter(self.users(), function (x) { return x.id !== u.id; }));
            self.chattingWith(null);
        };
        this.onUserListChange = function (list) {
            var self = _this;
            var connectedIds = self.ko.utils.arrayMap(list, function (u) { return u.id; });
            var rescued = self.ko.utils.arrayFilter(self.users(), function (u) {
                var disconected = connectedIds.indexOf(u.id) === -1;
                if (disconected === false)
                    return false;
                return u.messages().length > 0;
            });
            self.users.removeAll();
            for (var _i = 0, rescued_1 = rescued; _i < rescued_1.length; _i++) {
                var u = rescued_1[_i];
                u.connected(false);
            }
            self.users(rescued);
            var others = self.ko.utils.arrayFilter(list, function (u) { return u.id !== self.id(); });
            for (var _a = 0, others_1 = others; _a < others_1.length; _a++) {
                var u = others_1[_a];
                self.users.push(new chatStateUser_1.ChatStateUser(self.ko, u));
            }
        };
        this.scrollToFirstNotRead = function () {
            var self = _this;
            var p = self.$("#mesagges p[data-msg-state=1]:first");
            if (p.length === 0) {
                // if all read go to last msg;
                self.autoScroll();
                return;
            }
            var marginTop = 100; //comes from css
            window.scrollTo(0, (p.offset().top - marginTop));
        };
        this.autoScroll = function () {
            var self = _this;
            var p = self.$("#mesagges p:last");
            if (p.length === 0)
                return;
            window.scrollTo(0, p.offset().top);
        };
        this.sendMessage = function () {
            var self = _this;
            var txtMessage = self.$("#txtMsg");
            var msg = self.message();
            if (self.$.trim(msg).length > 0) {
                var isPublic = self.isPublic();
                var sentMessage_1 = textMessage_1.TextMessage.createSent(msg);
                var item = { user: {
                        id: self.id(),
                        name: self.user.name
                    }, message: new textMessage_1.TextMessage(self.ko, sentMessage_1) };
                var send = isPublic ? function () { return self.chatConnection.send(sentMessage_1); } : function () { return self.chatConnection.sendTo(sentMessage_1, self.chattingWith().id); };
                var list = isPublic ? self.messages : self.chattingWith().messages;
                send();
                list.push(item);
                self.autoScroll();
            }
            self.message("");
            txtMessage.focus();
        };
        this.privateChat = function (to) {
            var self = _this;
            self.$('#tabMenu a[href="#nav-chat"]').tab('show');
            self.chattingWith(to);
        };
        this.afterRender = function () {
            var self = _this;
            var setup = function () {
                var txtMessage = self.$("#txtMsg");
                if (txtMessage.length > 0) {
                    txtMessage.focus();
                    var scrollfn = self.isPublic() ?
                        self.autoScroll : self.scrollToFirstNotRead;
                    scrollfn();
                }
                self.checkSeen();
            };
            self.$('#tabMenu a[href="#nav-chat"]').tab('show');
            self.$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                setup();
            });
            setup();
            self.$(window).scroll(function () {
                self.checkSeen();
            });
        };
        this.checkSeen = function () {
            var self = _this;
            var isVissible = function (p) {
                var marginTop = 100; //comes from css
                var height = p.height();
                var marginBottom = self.$(".bottom-nav:first").offset().top - height; //comes from css
                return (p.offset().top >= marginTop && p.offset().top <= marginBottom);
            };
            self.$("#mesagges p.msgEntrante").each(function (i, el) {
                var it = self.$(el);
                if (it.attr("data-msg-state") === "1" && isVissible(it)) {
                    var msgData = self.ko.contextFor(el).$data;
                    msgData.message.state(status_1.Status.Seen);
                    self.chatConnection.sendMessageSeen(self.chattingWith().id, msgData.message.now);
                }
            });
        };
        this.ko = ko;
        this.$ = $;
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.message = ko.observable("");
        this.id = ko.observable("");
        this.usersFilter = ko.observable("");
        this.chattingWith = ko.observable();
        this.messages = ko.observableArray([]);
        this.users = ko.observableArray([]);
        $("#txtMsg").focus();
        var self = this;
        this.chatConnection = new chatConnection_1.ChatConnection(user, urlSignalr, self.onMessage, self.onPrivateMessage, self.onReceiveMessageDelivered, self.onReceiveMessageSeen, self.onUserListChange, self.onStarted);
        this.isPublic = ko.pureComputed(function () {
            return (self.chattingWith() === null || self.chattingWith() === undefined);
        }, self);
        this.hasUnread = ko.pureComputed(function () {
            for (var _i = 0, _a = self.users(); _i < _a.length; _i++) {
                var u = _a[_i];
                for (var _b = 0, _c = u.messages(); _b < _c.length; _b++) {
                    var m = _c[_b];
                    if (m.user.id === self.id())
                        continue;
                    if (m.message.state() !== status_1.Status.Deliverded)
                        continue;
                    return true;
                }
            }
            return false;
        }, self);
        this.filteredUsers = ko.pureComputed(function () {
            if (self.usersFilter() === null ||
                self.usersFilter() === undefined ||
                self.usersFilter() === "" ||
                $.trim(self.usersFilter()).length === 0)
                return self.users();
            return ko.utils.arrayFilter(self.users(), function (u) { return u.name.toLocaleLowerCase().indexOf(self.usersFilter().toLocaleLowerCase()) !== -1; });
        }, self);
    }
    return ChatTemplates;
}());
exports.ChatTemplates = ChatTemplates;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConnection = void 0;
var signalR = __webpack_require__(21);
var ChatConnection = /** @class */ (function () {
    function ChatConnection(user, urlSignalr, onMessage, onPrivateMessage, onReceiveMessageDelivered, onReceiveMessageSeen, onUserListChange, onStarted) {
        var _this = this;
        this.send = function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.connection.invoke("SendMessage", self.user, msg);
                return [2 /*return*/];
            });
        }); };
        this.sendTo = function (msg, id) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.connection.invoke("SendMessageTo", id, msg);
                return [2 /*return*/];
            });
        }); };
        this.sendMessageDelivered = function (userId, messageId) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.connection.invoke("SendMessageDelivered", userId, messageId);
                return [2 /*return*/];
            });
        }); };
        this.sendMessageSeen = function (userId, messageId) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.connection.invoke("SendMessageSeen", userId, messageId);
                return [2 /*return*/];
            });
        }); };
        this.setInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.connection.invoke("SetInfo", self.user);
                return [2 /*return*/];
            });
        }); };
        this.start = function () { return __awaiter(_this, void 0, void 0, function () {
            var self, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, self.connection.start()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, self.setInfo()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        setTimeout(function () { return self.start(); }, 5000);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.user = user;
        this.urlSignalr = urlSignalr;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(urlSignalr)
            .configureLogging(signalR.LogLevel.Information)
            .build();
        var self = this;
        self.id = ko.observable("");
        self.connection.onclose(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, self.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        self.connection.on("ReceiveMessage", onMessage);
        self.connection.on("ReceivePrivateMessage", onPrivateMessage);
        self.connection.on("ReceiveMessageDelivered", onReceiveMessageDelivered);
        self.connection.on("ReceiveMessageSeen", onReceiveMessageSeen);
        self.connection.on("UsersListChange", onUserListChange);
        self.connection.on("SetOwnId", onStarted);
    }
    return ChatConnection;
}());
exports.ChatConnection = ChatConnection;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatStateUser = void 0;
var status_1 = __webpack_require__(6);
var ChatStateUser = /** @class */ (function () {
    function ChatStateUser(ko, u, connected) {
        var _this = this;
        if (connected === void 0) { connected = true; }
        this.toUser = function () {
            var self = _this;
            return {
                id: self.id,
                name: self.name
            };
        };
        this.id = u.id;
        this.name = u.name;
        this.connected = ko.observable(connected);
        this.messages = ko.observableArray();
        var self = this;
        this.unread = ko.pureComputed(function () {
            return ko.utils.arrayFilter(self.messages(), function (m) { return m.message.state() === status_1.Status.Deliverded; });
        }, self);
    }
    return ChatStateUser;
}());
exports.ChatStateUser = ChatStateUser;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMessage = void 0;
var status_1 = __webpack_require__(6);
var TextMessage = /** @class */ (function () {
    function TextMessage(ko, message) {
        this.ko = ko;
        this.content = message.content;
        this.now = message.now;
        this.state = ko.observable(message.state);
        var self = this;
        this.time = ko.pureComputed(function () {
            var d = new Date(self.now);
            return d.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            });
        }, self);
    }
    TextMessage.createSent = function (content) {
        return {
            now: Date.now(),
            content: content,
            state: status_1.Status.Sent
        };
    };
    return TextMessage;
}());
exports.TextMessage = TextMessage;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderService = void 0;
/** Helper class that binds one Knockout models to a DOM object */
var BinderService = /** @class */ (function () {
    function BinderService() {
    }
    /**
     * Binds a Knockout model to a DOM object.
     * @param model Knockout model object.
     * @param selector Selector of the DOM to apply bindings.
     */
    BinderService.bind = function ($, model, selector) {
        var jqObj = $(selector);
        if (jqObj.length === 0) {
            return;
        }
        var domObj = jqObj[0];
        ko.cleanNode(domObj);
        ko.applyBindings(model, domObj);
    };
    BinderService.isBound = function ($, selector) {
        var jqObj = $(selector);
        return !!ko.dataFor(jqObj[0]);
    };
    return BinderService;
}());
exports.BinderService = BinderService;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonReq = void 0;
var JsonReq = /** @class */ (function () {
    function JsonReq(baseUrl, window) {
        var _this = this;
        this.toFullUrl = function (url) { return "" + _this.baseURL + url; };
        this.get = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        this.post = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.put = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'PUT',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.patch = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'PATCH',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.del = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'DELETE',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.baseURL = baseUrl;
        this.window = window;
    }
    return JsonReq;
}());
exports.JsonReq = JsonReq;


/***/ })
/******/ ]);