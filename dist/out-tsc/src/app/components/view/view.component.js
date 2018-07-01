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
var ViewComponent = /** @class */ (function () {
    function ViewComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.userList = [];
    }
    ViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
        this.userList.forEach(function (element) {
            if (element.status == true) {
                _this.loginService.$loggedInUserSubject.next(element);
                _this.router.navigate(['/']);
            }
        });
    };
    ViewComponent = __decorate([
        core_1.Component({
            selector: 'ms-view',
            templateUrl: './view.component.html',
            styleUrls: ['./view.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService])
    ], ViewComponent);
    return ViewComponent;
}());
exports.ViewComponent = ViewComponent;
//# sourceMappingURL=view.component.js.map