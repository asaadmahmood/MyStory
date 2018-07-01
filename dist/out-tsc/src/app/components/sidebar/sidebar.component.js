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
var view_service_1 = require("../../services/view.service");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(viewService) {
        this.viewService = viewService;
        this.viewChange = new core_1.EventEmitter();
        this.viewState = 'public';
        this.viewStateLocal = '';
        this.userList = [];
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.viewStateLocal = JSON.parse(localStorage.getItem('viewStateLocal'));
        if (this.viewStateLocal) {
            this.viewState = this.viewStateLocal;
        }
    };
    SidebarComponent.prototype.changeView = function (state) {
        this.viewService.$viewStateSubject.next(state);
        this.viewState = state;
        localStorage.setItem('viewStateLocal', JSON.stringify(this.viewState));
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "viewChange", void 0);
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'ms-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        }),
        __metadata("design:paramtypes", [view_service_1.ViewService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map