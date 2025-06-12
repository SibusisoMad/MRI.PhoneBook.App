import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Platform, IonItem, IonLabel, IonNote, IonIcon, IonTitle, IonToolbar, IonContent, IonHeader, IonSearchbar, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { Message } from '../services/data.service';
import { Contact } from '../services/contact-detail.service';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton } from '@ionic/angular/standalone';
import { ContactDetailService } from '../services/contact-detail.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonList, FormsModule,IonSearchbar, IonHeader, IonContent, IonToolbar, IonTitle, RouterLink, IonItem, IonLabel, IonNote, IonIcon, IonInput, IonButton],
})
export class MessageComponent {
  private platform = inject(Platform);
  private contactDetailService = inject(ContactDetailService);
  contacts: Contact[] = [];
  selectedContact?: Contact;
  newContact: Partial<Contact> = {};
  searchName: string = '';
  searchPhone: string = '';
  @Input() contact?: Contact;
  isIos() {
    return this.platform.is('ios')
  }
  constructor() {
    addIcons({ chevronForward });
    // this.loadContacts();
  }

  loadContacts() {
    this.contactDetailService.searchContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  addContact() {
    if (!this.newContact.name || !this.newContact.phoneNumber) return;
    const contact: Contact = {
      contactId: 0,
      name: this.newContact.name,
      phoneNumber: this.newContact.phoneNumber,
      email: this.newContact.email
    };
    this.contactDetailService.insertContact(contact).subscribe(() => {
      this.loadContacts();
      this.newContact = {};
    });
  }

  updateContact(contact: Contact) {
    this.contactDetailService.updateContact(contact).subscribe(() => {
      this.loadContacts();
    });
  }

  deleteContact(id: number) {
    this.contactDetailService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }
  searchContacts() {
    this.contactDetailService.searchContacts(this.searchName, this.searchPhone).subscribe(contacts => {
      this.contacts = contacts;
    });
  }

 
  
}
