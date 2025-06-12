import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonIcon, IonButton, IonButtons, IonItem, IonInput } from '@ionic/angular/standalone';
import { MessageComponent } from '../contact-details/contact-details.component';

import { DataService, Message } from '../services/data.service';
import { Contact, ContactDetailService } from '../services/contact-detail.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
  imports: [IonInput, CommonModule, IonItem, IonButtons, 
    IonButton, IonIcon, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList,
     MessageComponent,ReactiveFormsModule, FormsModule,ContactFormComponent],
})
export class ContactsPage implements OnInit {
  private data = inject(DataService);
  private contactService = inject(ContactDetailService);
  contacts: Contact[] = [];
  addMode = false;
  newContact: Contact = { contactId: 0, name: '', phoneNumber: '', email: '' };
  constructor() {}

  ngOnInit() {
    this.getAllContacts();
  }
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getAllContacts() {
     this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
      }
    });
  }

  openAddContact() {
    this.addMode = true;
    this.newContact = { contactId: 0, name: '', phoneNumber: '', email: '' };
  }

  saveAddContact() {
    this.contactService.insertContact(this.newContact).subscribe({
      next: () => {
        this.addMode = false;
        this.getAllContacts();
      },
      error: (err) => {
        console.error('Error saving contact:', err);
      }
    });
  }
  filterContacts(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.getAllContacts();
      return;
    }
    const term = searchTerm.toLowerCase();
    this.contacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.phoneNumber.toLowerCase().includes(term) ||
      contact.email!.toLowerCase().includes(term)
    );
  }

  onSearchInput(event: any) {
  const value = event.target.value;
  if (value && value.length >= 3) {
    this.filterContacts(value);
  } else if (!value || value.length === 0) {
    this.getAllContacts();
  }
}
  
}
