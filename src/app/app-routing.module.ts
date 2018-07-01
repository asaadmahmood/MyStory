import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './pages/login/login.component';
import { MyStoryComponent } from './my-story/my-story.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'profile',
  component: EditProfileComponent
},
{
  path: '',
  canActivate: [AuthGuard],
  component: MyStoryComponent
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
