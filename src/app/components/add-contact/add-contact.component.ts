import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  form: FormGroup = new FormGroup({
    photo: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    mobiletwo: new FormControl(''),
    title: new FormControl(''),
    address: new FormControl(''),
  });

  submitted = false;
  constructor(private contactService: ContactService, private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.contact.photo = this.dfimage;

    this.form = this.formBuilder.group(
      {
        photo: ['', []],
        name: ['', [Validators.required, Validators.maxLength(30)]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern("[0-9 ]{11}")
          ]
        ],
        mobiletwo: [
          '',
          [
            Validators.pattern("[0-9 ]{11}")
          ]
        ],
        email: ['', [Validators.email]],
        title: [
          '',
          [
            Validators.maxLength(30)
          ]
        ],
        address: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      this.contactService.createContact(this.contact).subscribe((data) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate(['/contact/add']).then();
      })

    }
   
   

  }

  dfimage = '../../../assets/avatar.jpg';
  imgUpload(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.contact.photo = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}

