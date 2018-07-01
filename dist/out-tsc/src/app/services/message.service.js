"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/internal/BehaviorSubject");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var MessageService = /** @class */ (function () {
    function MessageService(http) {
        this.http = http;
        this.$currentMsgSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.$currentMsg = this.$currentMsgSubject.asObservable();
    }
    MessageService.prototype.getMessages = function () {
        return this.http.get('http://localhost:3000/message')
            .pipe(operators_1.map(function (response) {
            return response.message;
        }));
    };
    MessageService.prototype.updateMessage = function (message) {
        return this.http.get('http://localhost:3000/message/update')
            .pipe(operators_1.map(function (response) {
            return response.message;
        }));
    };
    MessageService.prototype.addMessage = function (message) {
        return this.http.post('http://localhost:3000/message', {
            message: message
        })
            .pipe(operators_1.map(function (response) {
            return response.message;
        }));
    };
    MessageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map