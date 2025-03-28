import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, Persons } from './models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http : HttpClient) { }


  ruta = "http://localhost:8080/persons"


  getPersons(): Observable<Persons[]> {
    return this.http.get<Persons[]>(this.ruta + '/newPersonIsAdded')
  }

  createPerson(person : Person): Observable<void> {
    return this.http.post<void> (this.ruta + '/', person)
  }

}
