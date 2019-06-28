import { Injectable } from "@angular/core";
import { Article } from "../models/article";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  baseUrl = environment.apiurl + `/api/${environment.apiversion}`;
  baseService = "article";

  constructor(private http: HttpClient) {}

  findAll() {
    const url = `${this.baseUrl}/${this.baseService}/all`;
    return this.http.get<Article[]>(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  delete(id: string) {
    const url = `${this.baseUrl}/${this.baseService}/${id}/delete`;
    return this.http.delete(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
