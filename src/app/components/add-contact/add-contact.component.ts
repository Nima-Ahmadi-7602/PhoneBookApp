import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
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
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactService: ContactService , private router: Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    })
  }

  public createSbmit(){
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage=error;
      this.router.navigate(['/contact/add']).then();
      
    });
  }

}
