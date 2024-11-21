import { Routes } from '@angular/router';
import { RegisterComponent } from './Shared Module/auth/compontents/register/register.component';
import { LoginComponent } from './Shared Module/auth/compontents/login/login.component';
import { DashboardComponent } from './admin/Compontents/dashboard/dashboard.component';
import { CreateTestComponent } from './admin/Compontents/create-test/create-test.component';
import { ViewTestComponent } from './admin/Compontents/view-test/view-test.component';
import { AddQuestingComponent } from './admin/Compontents/add-questing/add-questing.component';

export const routes: Routes = [
  
    {path:'register',component:RegisterComponent},
    {path:'Login',component:LoginComponent},
    {path:'admin/dashboard',component:DashboardComponent},
    {path:'admin/create-task' ,component:CreateTestComponent},
    {path:'admin/view-task',component:ViewTestComponent},
    {path:'admin/add-question',component:AddQuestingComponent}

    
];
