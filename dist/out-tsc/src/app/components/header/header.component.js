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
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, loginService, authService) {
        this.router = router;
        this.loginService = loginService;
        this.authService = authService;
        this.userList = [];
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginService.$loggedInUser
            .subscribe(function (value) {
            _this.currentUser = value;
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.userList[this.currentUser._id].status = false;
        this.router.navigate(['/login']);
        this.authService.logout();
        this.loginService.$loggedInUserSubject.next(null);
        localStorage.setItem('userListLocal', JSON.stringify(this.userList));
        localStorage.removeItem('currentUser');
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'ms-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService,
            auth_service_1.AuthService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map