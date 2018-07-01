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
var auth_service_1 = require("../../api-services/auth.service");
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.errorMsg = '';
        this.profilePic = 'assets/placeholder.png';
        this.errorFlag = false;
        this.userList = [];
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        this.currentUser = (localStorage.getItem('currentUser') !== null) ? JSON.parse(localStorage.getItem('currentUser')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
    }
    EditProfileComponent.prototype.dismissError = function () {
        this.errorFlag = false;
    };
    EditProfileComponent.prototype.updateCurrentUser = function () {
        var _this = this;
        if (this.currentUser.firstName == '' ||
            this.currentUser.lastName == '' ||
            this.currentUser.username == '' ||
            this.currentUser.email == '') {
            this.errorMsg = 'Please fill out all the fields';
            this.errorFlag = true;
        }
        else {
            this.errorFlag = false;
        }
        if (this.errorFlag == false && this.userList) {
            this.userList.forEach(function (element) {
                if ((element.username == _this.currentUser.username || element.email == _this.currentUser.email) && element._id != _this.currentUser._id) {
                    _this.errorFlag = true;
                    _this.errorMsg = 'The username or email is already in use.';
                }
            });
        }
        if (this.errorFlag == false) {
            this.userList[this.currentUser.userId] = this.currentUser;
            localStorage.setItem('userListLocal', JSON.stringify(this.userList));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.router.navigate(['/']);
            // Saving in Database
            this.authService.updateUser(this.currentUser)
                .subscribe(function (data) {
                _this.ngOnInit();
            });
        }
    };
    EditProfileComponent.prototype.deleteUser = function () {
        var _this = this;
        this.currentUser.active = false;
        this.userList[this.currentUser._id].active = this.currentUser.active;
        localStorage.setItem('userListLocal', JSON.stringify(this.userList));
        // Saving in Database
        this.authService.deleteUser(this.currentUser)
            .subscribe(function (data) {
            localStorage.removeItem('currentUser');
            _this.authService.logout();
            _this.router.navigate(['/']);
        });
    };
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: 'ms-edit-profile',
            templateUrl: './edit-profile.component.html',
            styleUrls: ['./edit-profile.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            auth_service_1.AuthService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map