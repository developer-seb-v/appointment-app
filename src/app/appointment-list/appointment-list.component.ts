import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  

  newAppointmentTitle = ''
  newAppointmentDate: Date = new Date()
  appointments: Appointment[] = []

  ngOnInit(): void {
   let savedAppointments = localStorage.getItem("appointments")

   // newer syntax to check if there are any saved appointments 
   // and if true parse the JSON
   // if false create new empty array []
    this.appointments = savedAppointments? JSON.parse(savedAppointments) : []
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(newAppointment)

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date()

      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }



  }
  deleteAppointment(index: number) {

    this.appointments.splice(index, 1)
    localStorage.setItem("appointments", JSON.stringify(this.appointments))

  }
}

