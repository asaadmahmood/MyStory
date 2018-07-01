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
var router_1 = require("@angular/router");
var login_service_1 = require("../../services/login.service");
var auth_service_1 = require("../../api-services/auth.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, loginService, authService) {
        this.router = router;
        this.loginService = loginService;
        this.authService = authService;
        this.errorMsg = '';
        this.errorFlag = false;
    }
    LoginComponent.prototype.dismissError = function () {
        this.errorFlag = false;
    };
    LoginComponent.prototype.loginUser = function (form) {
        var _this = this;
        if (form.valid) {
            if (this.userList.length == 0) {
                this.errorFlag = true;
                this.errorMsg = 'We currently have no users on the system, please register';
            }
            if (this.errorFlag == false) {
                this.authService.login(form.value)
                    .subscribe(function (result) {
                    localStorage.setItem('userListLocal', JSON.stringify(_this.userList));
                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                    _this.loginService.$loggedInUserSubject.next(result.user);
                    _this.router.navigate(['/']);
                }, function (err) {
                    _this.errorFlag = true;
                    _this.errorMsg = err.error.error.message;
                });
            }
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUsers()
            .subscribe(function (data) {
            _this.userList = data;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ms-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map