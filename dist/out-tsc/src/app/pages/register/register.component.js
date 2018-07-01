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
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, loginService, authService) {
        this.router = router;
        this.loginService = loginService;
        this.authService = authService;
        this.errorMsg = '';
        this.userImg = 'assets/placeholder.png';
        this.userStatus = false;
        this.errorFlag = false;
        this.userList = [];
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
    }
    RegisterComponent.prototype.dismissError = function () {
        this.errorFlag = false;
    };
    RegisterComponent.prototype.registerUser = function (form) {
        var _this = this;
        if (form.valid) {
            if (this.errorFlag == false && this.userList) {
                this.userList.forEach(function (element) {
                    if (element.username == form.value.username || element.email == form.value.email) {
                        _this.errorFlag = true;
                        _this.errorMsg = 'The username or email is already in use.';
                    }
                });
            }
            this.localUser = {
                userId: this.userList.length,
                firstName: form.value.firstName,
                lastName: form.value.lastName,
                username: form.value.username,
                email: form.value.email,
                password: form.value.password,
                status: true,
                profilePic: this.userImg,
                publicCount: 0,
                privateCount: 0,
                active: true
            };
            if (this.errorFlag == false) {
                this.userList.push(this.localUser);
                this.authService.saveUser(this.localUser)
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
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'ms-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService,
            auth_service_1.AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map