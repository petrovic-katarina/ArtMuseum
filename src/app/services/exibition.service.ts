import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Exibition } from '../model/exibition.model';
import { Artwork } from '../model/artwork.model';
import { ExibitionLocation } from '../model/exibition-location.model';

const baseURL = 'http://localhost:3000/api/exibitions';
const baseURLArtworks = 'http://localhost:3000/api/artworks';
const baseURLLocations = 'http://localhost:3000/api/locations';


@Injectable({
  providedIn: 'root'
})
export class ExibitionService {

  constructor(private http: HttpClient) { }

  // Izložbe se mogu dobiti pomoću GET zahteva na 
  // http://localhost:3000/api/exibitions

  getAllExibitions(): Observable<Exibition[]> {
    return this.http.get(`${baseURL}`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Exibition(elem)) || []
    }))
  }

  // Informacije o jednoj izložbi dobija se pomoću GET zahteva na http://localhost:3000/api/exibitions/:id

  getExibition(id: number): Observable<Exibition> {
    return this.http.get(`${baseURL}/${id}`).pipe(map((data: any) => {
      return new Exibition(data)
    }))
  }

  // Informacije o umetničkim delima neke izložbe nalaze se na endpoint-u GET http://localhost:3000/api/exibitions/:id/artworks

  getExibitionArtworks(exibitionId: number): Observable<Artwork[]> {
    return this.http.get(`${baseURL}/${exibitionId}/artworks`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Artwork(elem)) || []
    }))
  }

  // GET http://localhost:3000/api/artworks

  getAllArtworks(params?: any): Observable<Artwork[]> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams().set("filter", params.filter && JSON.stringify(params.filter) || "").set("sort", params.sort || "").set("sortDirection", params.sortDirection || "")
      }
    }

    return this.http.get(`${baseURLArtworks}`, options).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Artwork(elem)) || []
    }))
  }

  // http://localhost:3000/api/exibitions/:exibitionId/artworks/:artworkId 

  addArtworkToExibition(exibitionId: number, artworkId: number, artwork: Artwork): Observable<Artwork> {
    return this.http.put(`${baseURL}/${exibitionId}/artworks/${artworkId}`, artwork).pipe(map((data: any) => {
      return new Artwork(data);
    }))
  }

  // http://localhost:3000/api/exibitions/:exibitionId/artworks/:artworkId

  removeArtworkFromExibition(exibitionId: number, artworkId: number): Observable<Artwork> {
    return this.http.delete(`${baseURL}/${exibitionId}/artworks/${artworkId}`).pipe(map((data: any) => {
      return new Artwork(data);
    }))
  }

  // http://localhost:3000/api/locations

  getAllLocations(): Observable<ExibitionLocation[]> {
    return this.http.get(`${baseURLLocations}`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new ExibitionLocation(elem)) || [];
    }))
  }

}
