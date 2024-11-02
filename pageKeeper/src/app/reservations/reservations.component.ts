import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { Router, RouterLink } from '@angular/router';

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
  dataSource: any[] = [];

  constructor(private reservationService: ReservationsService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();

  }

  loadReservations(): void {
    this.reservationService
    .getReservations()
    .subscribe((reservations: any[]) => {
      const activeReservations = reservations.filter(
        (reservation) => reservation.book?.available === false && reservation.status !== 'completed'
      );

      console.log('active reservations:', activeReservations)

      this.dataSource = activeReservations.map((reservation) => ({
        id: reservation._id,
        bookName: reservation.book?.name,
        customerName: reservation.customer?.name,
        status: reservation.status,
        reservedOn: reservation.reservedOn,
        returnBy: reservation.returnBy,
      }));
    });
  }


  completeReservation(reservation: any): void {
    if(confirm('Are you sure you want to complete this reservation?')){
      this.reservationService.completeReservation(reservation.id).subscribe({
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
