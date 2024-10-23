import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
reservations: any[] = [];

  constructor(private reservationService: ReservationsService){}

  ngOnInit(): void{
    this.reservationService.getReservations().subscribe((reservations: any) => {
      this.reservations = reservations;
      console.log(reservations);

      // this.reservations.forEach(reservation => {
      //   console.log(reservation)
      // })
    })
  }
}
