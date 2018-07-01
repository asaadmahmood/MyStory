"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Angular Material
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var my_story_component_1 = require("./my-story/my-story.component");
var login_component_1 = require("./pages/login/login.component");
var header_component_1 = require("./components/header/header.component");
var feed_component_1 = require("./components/feed/feed.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var view_component_1 = require("./components/view/view.component");
var register_component_1 = require("./pages/register/register.component");
var reverse_pipe_1 = require("./pipes/reverse.pipe");
var focus_directive_1 = require("./directives/focus.directive");
var http_1 = require("@angular/common/http");
var edit_profile_component_1 = require("./pages/edit-profile/edit-profile.component");
var feed_dialog_component_1 = require("./components/feed-dialog/feed-dialog.component");
var auth_interceptor_1 = require("./interceptors/auth.interceptor");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                my_story_component_1.MyStoryComponent,
                login_component_1.LoginComponent,
                header_component_1.HeaderComponent,
                feed_dialog_component_1.FeedDialogComponent,
                feed_component_1.FeedComponent,
                sidebar_component_1.SidebarComponent,
                view_component_1.ViewComponent,
                register_component_1.RegisterComponent,
                reverse_pipe_1.ReversePipe,
                focus_directive_1.FocusDirective,
                edit_profile_component_1.EditProfileComponent,
                feed_dialog_component_1.FeedDialogComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatCardModule,
                material_1.MatMenuModule,
                material_1.MatTooltipModule,
                material_1.MatSnackBarModule,
                material_1.MatDialogModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatInputModule,
                forms_1.FormsModule,
                http_1.HttpClientModule
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [feed_dialog_component_1.FeedDialogComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map