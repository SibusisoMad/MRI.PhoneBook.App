import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts.page').then((m) => m.ContactsPage),
  },
  {
    path: 'contact-details/:id',
    loadComponent: () =>
      import('./view-message/view-message.page').then((m) => m.ViewMessagePage),
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];

