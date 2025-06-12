import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Contact {
  contactId: number;
  name: string;
  phoneNumber: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactDetailService {
public contacts: Contact[] = []
private apiUrl = 'https://localhost:7022/api/Contacts';
  constructor(private http: HttpClient) { }
  
  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  public insertContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Update an existing contact
  public updateContact(contact: Contact): Observable<void> {
    return this.http.put<void>(this.apiUrl, contact);
  }

  
  public deleteContact(contactId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${contactId}`);
}

  // Search contacts by name and/or phone number
  public searchContacts(name?: string, phoneNumber?: string): Observable<Contact[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (phoneNumber) params = params.set('phoneNumber', phoneNumber);
    return this.http.get<Contact[]>(this.apiUrl, { params });
  }

  public getContactById(contactId: number): Observable<Contact> {
  return this.http.get<Contact>(`${this.apiUrl}/${contactId}`);
}
}

