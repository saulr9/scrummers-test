import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  rooms = [{typeName: 'Familiar', type: 1}, {typeName: 'Double', type: 2},
  {typeName: 'Single', type: 3}]
  reservationForm: FormGroup;
  loading = false;
  submitted = false;
  bookingDone = false;
  availability= false;
  roomsLeft: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    private alertService: AlertService
  
  ) { }


  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      type: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required]
  });
  }
  get f() { return this.reservationForm.controls; }


  checkAvailability() {
    this.loading = true;
    this.bookingService.checkAvailability(this.reservationForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Booking successful', true);
                this.roomsLeft = data.availability;
                this.roomsLeft >0 ? this.availability= !this.availability : this.availability = false;
                this.loading = false;
                
            },
            error => {
                this.alertService.error(error);
                console.log(error);
                this.loading = false;
            });
  }
  onSubmit() {
    this.submitted = true;
  
    // reset alerts on submit
    this.alertService.clear();
  
    // stop here if form is invalid
    if (this.reservationForm.invalid) {
        return;
    }
  
    this.loading = true;
    console.log(this.reservationForm.value);
    this.bookingService.booking(this.reservationForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Booking successful', true);
                console.log('good');
                this.bookingDone= true;
            },
            error => {
                this.alertService.error(error);
                console.log(error);
                this.loading = false;
            });
  }
}


