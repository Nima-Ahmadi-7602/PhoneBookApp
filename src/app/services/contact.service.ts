import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = `http://localhost:9000`;
  constructor(private HttpClient: HttpClient) { }

  //get all contact
  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.HttpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get single contact
  public getContact(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // create a contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.HttpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }
  // update contact

  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }
  // delete contact

  public deleteContact(contactId: string): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }


  //errorhandeling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client eeror
      errorMessage = `Error :${error.error.message}`
    }
    else {
      //server eeror
      errorMessage = `Status:${error.status}\n Message:${error.message}`;
    }
    return throwError(errorMessage);
  }
}  
