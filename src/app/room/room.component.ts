import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  rooms: Object;
  constructor(
    private roomService: RoomService

  ) { }

  ngOnInit() {

  }
}