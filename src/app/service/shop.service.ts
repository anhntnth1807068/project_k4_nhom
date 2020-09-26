import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Accounts} from '../model/account';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = 'http://localhost:8080/products';
  private url4 = 'http://localhost:8080/products/getListProductById';
  private url2 = 'http://localhost:8080/warehouse';
  private url3 = 'http://localhost:8080/commentRating/getListByProductId';
  private url5 = 'http://localhost:8080/accounts';
  private url6 = 'http://localhost:8080/products/listImage';

  public currentUser: Observable<Accounts>;

  constructor(private http: HttpClient) {
  }


  public options = {headers: new HttpHeaders().set('Authorization', JSON.parse(localStorage.getItem('currentUser')).token)};

  load() {
    return this.http.get(this.url, this.options);
  }

  images(id: string) {
    return this.http.get(`${this.url6}/${id}`, this.options);
  }


  detail(id: string) {
    return this.http.get(`${this.url}/${id}`, this.options);
  }

  warehouseByProductId(id: string) {
    return this.http.get(`${this.url2}/${id}`, this.options);
  }

  commentRating(id: string) {
    return this.http.get(`${this.url3}/${id}`, this.options);
  }


  getAllProductByAccoutnId(id: string) {
    return this.http.get(`${this.url4}/${id}`, this.options);
  }

  getAccount(id: string) {
    return this.http.get(`${this.url5}/${id}`, this.options);
  }

}
