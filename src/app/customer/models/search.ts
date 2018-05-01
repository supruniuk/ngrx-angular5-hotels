import { Params } from "@angular/router";

export class SearchParams {
  name: string;
  rating: number;
  favorites: boolean;

  constructor(p: Params) {
    this.name = p["name"] || undefined;
    this.rating = +p["rating"] || undefined;
    this.favorites = p["favorites"] === "true" || undefined;
  }
}