import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { BokaBordInfo } from './pages/boka-bord/boka-bord-info/boka-bord-info';
import { BokaBordKontakt } from './pages/boka-bord/boka-bord-kontakt/boka-bord-kontakt';
import { BokaBordTack } from './pages/boka-bord/boka-bord-tack/boka-bord-tack';

import { Order } from './pages/takeaway/takeaway-order/order';
import { TakeawayPay } from './pages/takeaway/takeaway-pay/takeaway-pay';
import { TakeawayTack } from './pages/takeaway/takeaway-tack/takeaway-tack';

export const routes: Routes = [
    { path: '', component: Home },

    { path: 'boka-bord', component: BokaBordInfo },
    { path: 'boka-bord/kontakt', component: BokaBordKontakt },
    { path: 'boka-bord/tack', component: BokaBordTack },

    { path: 'takeaway', component: Order },
    { path: 'takeaway/pay', component: TakeawayPay },
    { path: 'takeaway/tack', component: TakeawayTack }
];