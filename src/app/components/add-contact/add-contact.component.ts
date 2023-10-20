import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  constructor(private contactService: ContactService, private router: Router , private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  public createSbmit() {
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contact/add']).then();

    });
  }
  addForm!:FormGroup;
  submited=false;


}

