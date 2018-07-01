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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.token = localStorage.getItem('mystory-token');
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        return this.http.post('http://localhost:3000/user/login', {
            user: credentials
        })
            .pipe(operators_1.tap(function (response) {
            _this.token = response.user.token;
            localStorage.setItem('mystory-token', _this.token);
        }));
    };
    AuthService.prototype.updateUser = function (credentials) {
        return this.http.post('http://localhost:3000/user/update', {
            user: credentials
        });
    };
    AuthService.prototype.deleteUser = function (credentials) {
        return this.http.post('http://localhost:3000/user/delete', {
            user: credentials
        });
    };
    AuthService.prototype.getUsers = function () {
        return this.http.get('http://localhost:3000/user/users/');
    };
    AuthService.prototype.saveUser = function (credentials) {
        var _this = this;
        return this.http.post('http://localhost:3000/user/signup', {
            user: credentials
        })
            .pipe(operators_1.tap(function (response) {
            _this.token = response.user.token;
            localStorage.setItem('mystory-token', _this.token);
        }));
    };
    AuthService.prototype.logout = function () {
        this.token = '';
        localStorage.removeItem('mystory-token');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map