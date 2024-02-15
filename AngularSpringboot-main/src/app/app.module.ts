import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './component/header/header.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './pages/home/home.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {userReducer} from './state/user.reducers'
import {userEffects} from './state/user.effects'
import {AppEffects} from './common/common.effects';
import {AuthInterceptorInterceptor} from './services/authInterceptor/auth-interceptor.interceptor';
import {AdminDashboardComponent} from './pages/AdminDashboard/admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './pages/UserDashboard/user-dashboard/user-dashboard.component';
import {MaterialModule} from './Material.Module';
import {AddUserComponent} from './pages/AdminDashboard/add-user/add-user.component';
import {EditUserComponent} from './pages/AdminDashboard/edit-user/edit-user.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from "./component/footer/footer.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        AdminDashboardComponent,
        AddUserComponent,
        UserDashboardComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot({'users': userReducer}),
        EffectsModule.forRoot([userEffects, AppEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgOptimizedImage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
