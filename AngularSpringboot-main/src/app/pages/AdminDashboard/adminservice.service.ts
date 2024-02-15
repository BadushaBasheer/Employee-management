import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  baseURL:string="http://localhost:8080";

  constructor(private http:HttpClient) {}

  getAllUsers(){
    return this.http.get<User[]>(`${this.baseURL}/getAll`);
  }

  getUser(userName:string){
    return this.http.get<User>(this.baseURL + '/getUser'+ '/' + userName)
  }

  deleteUser(userName:string){
    return this.http.delete(this.baseURL + '/deleteUser' + '/' + userName);
  }
  updateUser(data:User){
    console.log(data);

    return this.http.put(this.baseURL + '/updateUser',data);
  }

  createUser(data:User){
    return this.http.post(this.baseURL + '/create',data);
  }

  upload(formData: FormData): Observable<string> {
      return this.http.post(`${this.baseURL}/upload`, formData,{
        responseType:'text'
      });
  }

  download(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseURL}/download/${filename}`,{
      responseType:'blob'
    });
  }

}
