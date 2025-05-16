import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Anime } from './anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime[]>(this.apiUrl).pipe(
      map((animes: Anime[]) => {
        // Complete the code to find the anime with the given id
        for (let i = 0; i < animes.length; i++) {
          if (animes[i].id.toString() === id) {
            return animes[i];
          }
        }
        
        //No borre esto, es necesario para manejar el caso en el que no exista un anime con el id dado por parámetro.
        throw new Error(`Anime con ID ${id} no encontrado`);
      })
    );
  }
}
