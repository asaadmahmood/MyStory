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
var login_service_1 = require("../../services/login.service");
var message_service_1 = require("../../services/message.service");
var view_service_1 = require("../../services/view.service");
var material_1 = require("@angular/material");
var feed_dialog_component_1 = require("../feed-dialog/feed-dialog.component");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(loginService, msgService, viewService, snackBar, dialog) {
        var _this = this;
        this.loginService = loginService;
        this.msgService = msgService;
        this.viewService = viewService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.hasMessage = false;
        this.userPost = '';
        this.msgList = [];
        this.userList = [];
        this.viewState = 'public';
        this.viewStateLocal = '';
        this.publicPostCount = 0;
        this.privatePostCount = 0;
        this.userPublicPostCount = 0;
        this.userPrivatePostCount = 0;
        this.deletePostFlag = false;
        this.msgListLocal = (localStorage.getItem('msgListLocal') !== null) ? JSON.parse(localStorage.getItem('msgListLocal')) : [];
        if (!this.msgListLocal || this.msgListLocal.length === 0) {
            this.msgList;
        }
        else {
            this.msgList = this.msgListLocal;
        }
        this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
        if (!this.userListLocal || this.userListLocal.length === 0) {
            this.userList;
        }
        else {
            this.userList = this.userListLocal;
        }
        this.msgList.forEach(function (element) {
            if (element.public && !element.deleted) {
                _this.publicPostCount++;
            }
        });
    }
    FeedComponent.prototype.openSnackBar = function (message) {
        this.snackBar.open(message, 'Hide', {
            duration: 2000,
        });
    };
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginService.$loggedInUser
            .subscribe(function (value) {
            _this.currentUser = value;
            if (_this.currentUser) {
                _this.userPublicPostCount = value.publicCount;
                _this.userPrivatePostCount = value.privateCount;
            }
        });
        this.msgService.$currentMsg
            .subscribe(function (value) {
            _this.currentMsg = value;
        });
        this.viewService.$viewState
            .subscribe(function (value) {
            _this.viewState = value;
        });
        if (localStorage.getItem('viewStateLocal')) {
            this.viewStateLocal = JSON.parse(localStorage.getItem('viewStateLocal'));
            this.viewState = this.viewStateLocal;
        }
    };
    FeedComponent.prototype.editPost = function (message) {
        this.msgList.forEach(function (element) {
            element.editing = false;
        });
        message.editing = true;
    };
    FeedComponent.prototype.deletePost = function (message) {
        if (message) {
            this.openSnackBar('Message Deleted');
            message.editing = false;
            message.deleted = true;
            this.deletePostFlag = false;
            localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
            if (message.public) {
                this.publicPostCount--;
                this.userPublicPostCount--;
                this.updateUserCount('public');
            }
            else {
                this.userPrivatePostCount--;
                this.updateUserCount('private');
            }
        }
    };
    FeedComponent.prototype.savePost = function (post) {
        this.openSnackBar('Message Saved');
        this.regexMsg = this.removeSpaces(post.message);
        if (this.regexMsg != '\n' && this.regexMsg) {
            this.msgList[post.msgId].message = post.message;
            this.msgList[post.msgId].editing = false;
            localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
            this.msgService.updateMessage(this.currentMsg)
                .subscribe(function (message) {
            });
        }
        else {
            this.deletePostFlag = true;
        }
    };
    FeedComponent.prototype.updateUserCount = function (type) {
        if (type == 'public') {
            this.userList[this.currentUser.userId].publicCount = this.userPublicPostCount;
            localStorage.setItem('userListLocal', JSON.stringify(this.userList));
        }
        else {
            this.userList[this.currentUser.userId].privateCount = this.userPrivatePostCount;
            localStorage.setItem('userListLocal', JSON.stringify(this.userList));
        }
    };
    FeedComponent.prototype.editingChange = function (post) {
        this.regexMsg = this.removeSpaces(post.message);
        if (this.regexMsg != '\n' && this.regexMsg) {
            this.deletePostFlag = false;
        }
    };
    FeedComponent.prototype.stopEditing = function (post) {
        this.msgListLocal = (localStorage.getItem('msgListLocal') !== null) ? JSON.parse(localStorage.getItem('msgListLocal')) : [];
        post.message = this.msgListLocal[post.msgId].message;
        this.msgList[post.msgId].editing = false;
    };
    FeedComponent.prototype.postPublicly = function () {
        var _this = this;
        this.openSnackBar('Message Created');
        this.regexMsg = this.removeSpaces(this.userPost);
        if (this.regexMsg != '\n' && this.regexMsg) {
            this.userPost = this.regexMsg;
            this.currentMsg = {
                msgId: this.msgList.length,
                user: this.currentUser.email,
                firstName: this.currentUser.firstName,
                lastName: this.currentUser.lastName,
                public: true,
                message: this.regexMsg,
                date: Date(),
                editing: false,
                deleted: false
            };
            this.msgService.addMessage(this.currentMsg)
                .subscribe(function (message) {
                _this.msgList.push(_this.currentMsg);
                _this.userPublicPostCount++;
                _this.updateUserCount('public');
                localStorage.setItem('msgListLocal', JSON.stringify(_this.msgList));
                _this.userPost = '';
                _this.privatePostCount++;
                _this.hasMessage = false;
            });
        }
    };
    FeedComponent.prototype.postPrivately = function () {
        var _this = this;
        this.openSnackBar('Message Created');
        if (this.userPost) {
            this.userPost = this.regexMsg;
            this.currentMsg = {
                msgId: this.msgList.length,
                user: this.currentUser.email,
                firstName: this.currentUser.firstName,
                lastName: this.currentUser.lastName,
                public: false,
                message: this.regexMsg,
                date: Date(),
                editing: false,
                deleted: false
            };
            this.msgService.addMessage(this.currentMsg)
                .subscribe(function (message) {
                _this.msgList.push(_this.currentMsg);
                _this.userPrivatePostCount++;
                _this.updateUserCount('private');
                localStorage.setItem('msgListLocal', JSON.stringify(_this.msgList));
                _this.userPost = '';
                _this.publicPostCount++;
                _this.hasMessage = false;
            });
        }
    };
    FeedComponent.prototype.removeSpaces = function (message) {
        return message.replace(/[\r\n]+/g, '\n');
    };
    FeedComponent.prototype.messageFlag = function () {
        if (this.userPost) {
            this.regexMsg = this.removeSpaces(this.userPost);
            if (this.regexMsg != '\n') {
                this.hasMessage = true;
            }
        }
        else {
            this.hasMessage = false;
        }
    };
    FeedComponent.prototype.openDeleteDialog = function (message) {
        var _this = this;
        var dialogRef = this.dialog.open(feed_dialog_component_1.FeedDialogComponent, {
            data: { message: message }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deletePost(result.message);
            }
        });
    };
    FeedComponent = __decorate([
        core_1.Component({
            selector: 'ms-feed',
            templateUrl: './feed.component.html',
            styleUrls: ['./feed.component.scss']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService,
            message_service_1.MessageService,
            view_service_1.ViewService,
            material_1.MatSnackBar,
            material_1.MatDialog])
    ], FeedComponent);
    return FeedComponent;
}());
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map