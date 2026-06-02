// Routing för webbapplikationen
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { BokaBordInfo } from './pages/boka-bord/boka-bord-info/boka-bord-info';
import { BokaBordTack } from './pages/boka-bord/boka-bord-tack/boka-bord-tack';

import { Order } from './pages/takeaway/takeaway-order/order';
import { TakeawayPay } from './pages/takeaway/takeaway-pay/takeaway-pay';
import { TakeawayTack } from './pages/takeaway/takeaway-tack/takeaway-tack';

import { Login } from './pages/admin/login/login';
import { Register } from './pages/admin/register/register';
import { Dashboard } from './pages/admin/dashboard/dashboard';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },

    { path: 'boka-bord', component: BokaBordInfo },
    { path: 'boka-bord/tack', component: BokaBordTack },

    { path: 'takeaway', component: Order },
    { path: 'takeaway/pay', component: TakeawayPay },
    { path: 'takeaway/tack', component: TakeawayTack },

    { path: 'admin/login', component: Login },
    { path: 'admin/register', component: Register },
    { path: 'admin/dashboard', component: Dashboard, canActivate: [authGuard] }
];