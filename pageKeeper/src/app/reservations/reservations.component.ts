import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
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

  constructor(private reservationService: ReservationsService) {}

  ngOnInit(): void {
    // do map before subscribe
    this.reservationService
      .getReservations()
      .subscribe((reservations: any[]) => {
        this.dataSource = reservations.map((reservation) => ({
          bookName: reservation.book.name,
          customerName: reservation.customer.name,
          status: reservation.status,
          reservedOn: reservation.reservedOn,
          returnBy: reservation.returnBy,
        }));
        //console.log(reservations);

        // this.reservations.forEach(reservation => {
        //   console.log(reservation)
        // })
      });
  }

  //for the buttons
  viewReservation(reservation: any) {
    console.log('Viewing reservation:', reservation);
  }

  editReservation(reservation: any) {
    console.log('Editing reservation:', reservation);
  }

  deleteReservation(reservation: any) {
    console.log('Deleting reservation:', reservation);
  }
}
