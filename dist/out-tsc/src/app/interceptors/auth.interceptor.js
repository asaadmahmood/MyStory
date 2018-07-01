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
var auth_service_1 = require("../api-services/auth.service");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var authToken = this.authService.token;
        var protectedUrls = [
            '/message',
            '/user'
        ];
        var isProtectedUrl = protectedUrls.find(function (protectedUrl) {
            return req.url.includes(protectedUrl);
        });
        if (authToken && isProtectedUrl) {
            req = req.clone({
                setHeaders: {
                    'x-access-token': authToken
                }
            });
            return next.handle(req)
                .pipe(operators_1.tap(function (event) {
                _this.onSuccess(event);
            }, function (err) {
                _this.onError(err);
            }));
        }
        else {
            return next.handle(req)
                .pipe(operators_1.tap(function (event) {
                _this.onSuccess(event);
            }, function (err) {
                _this.onError(err);
            }));
        }
    };
    AuthInterceptor.prototype.onSuccess = function (event) {
        if (event instanceof http_1.HttpResponse) {
            // do stuff with response if you want
            console.log('success');
            console.log(event);
        }
    };
    AuthInterceptor.prototype.onError = function (err) {
        if (err instanceof http_1.HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
                // redirect to the login route
                // or show a modal
                console.log('401 found');
                alert('Your session is expired. Or you don\'t have the access');
                this.router.navigate(['/login']);
                console.log(err);
            }
        }
    };
    AuthInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map