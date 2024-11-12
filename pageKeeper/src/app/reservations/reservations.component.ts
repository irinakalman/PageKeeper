import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { Router, RouterLink } from '@angular/router';
import { Reservation } from '../types/reservation';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, ReservationFormComponent, RouterLink],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = [
    'bookName',
    'customerName',
    'status',
    'reservedOn',
    'returnBy',
    'actions',
  ];
  dataSource: Reservation[] = [];

  constructor(private reservationService: ReservationsService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();

  }

  loadReservations(): void {
    this.reservationService
    .getReservations()
    .subscribe((reservations: Reservation[]) => {
      const activeReservations = reservations.filter(
        (reservation) => reservation.book?.available === false && reservation.status !== 'completed'
      );

      console.log('active reservations:', activeReservations)

      this.dataSource = activeReservations
    });
  }


  completeReservation(reservation: Reservation): void {
    if(reservation._id && confirm('Are you sure you want to complete this reservation?')){
      this.reservationService.completeReservation(reservation._id).subscribe({
        next: () => {
          console.log('reservation completed');
          this.loadReservations()
        },
        error: (error) => [
          console.error('error completing reservation', error)
        ]


      })
    }
  }

}
