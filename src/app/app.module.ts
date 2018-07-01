import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatSnackBarModule, MatMenuModule, MatTooltipModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyStoryComponent } from './my-story/my-story.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FeedComponent } from './components/feed/feed.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewComponent } from './components/view/view.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { FocusDirective } from './directives/focus.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FeedDialogComponent } from './components/feed-dialog/feed-dialog.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MyStoryComponent,
    LoginComponent,
    HeaderComponent,
    FeedDialogComponent,
    FeedComponent,
    SidebarComponent,
    ViewComponent,
    RegisterComponent,
    ReversePipe,
    FocusDirective,
    EditProfileComponent,
    FeedDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FeedDialogComponent]
})
export class AppModule { }
