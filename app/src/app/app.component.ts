import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person, Persons } from './models/Person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  pollingInterval : any
  persons : Persons[] = []
  p : Person[] = []

  // Form
  person : Person = {
    id : 1,
    name : "",
    sex : "",
    gender : ""
  }

  constructor(private service: PersonService){}

  ngOnInit(): void {
    this.getPersons();
    this.startPolling();
  }

  getPersons(): void {
    this.service.getPersons().subscribe(
      (response) => {
        this.persons = response

        this.persons.forEach(element => {
          this.p = element.person
        });
      },
      (err) => {
        console.error("Error en el servidor")
      }
    )
  }

  startPolling(): void {
    const pollingIntervalMs = 10000;

    this.pollingInterval = setInterval(() => {
      this.getPersons();
    }, pollingIntervalMs);

  }

  sendPerson(): void {
    this.service.createPerson(this.person).subscribe(
      (response) => {
        alert("Persona creada")
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
