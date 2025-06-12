import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts.page').then((m) => m.ContactsPage),
  },
  {
    path: 'add-contact',
    loadComponent: () =>
      import('./contact-form/contact-form.component').then((m) => m.ContactFormComponent)
  },
  {
    path: 'contact-details/:id',
    loadComponent: () =>
      import('./view-contact/view-contact.page').then((m) => m.ViewContactPage)
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];

