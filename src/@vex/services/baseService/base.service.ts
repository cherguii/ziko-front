import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseService {

  // Fields.
  private headers = new HttpHeaders();
  private headersMultiPart = new HttpHeaders();
  
  // Ctor.
  constructor(private httpClient: HttpClient) {
    this.initHeaders();
  }

  // initHeaders .
  initHeaders() {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  // getAllById.
  getAllById<T>(id: string, uri: string) {
    return this.httpClient.get<T>(uri + '\?id=' + id, { headers: this.headers, observe: 'response' });
  }

  // getAll.
  getAll<T>(uri: string) {
    return this.httpClient.get<T>(uri, { headers: this.headers, observe: 'response' });
  }

  // getAllWithFilter.
  getAllWithFilter<T>(id: string, uri: string) {
    return this.httpClient.get<T>(uri+ '\?id=' + id, { headers: this.headers, observe: 'response' });
  }

  // getSingle.
  getSingle<T>(uri: string) {
    return this.httpClient.get<T>(uri, { headers: this.headers, observe: 'response' });
  }

  // getSingleById.
  getSingleById<T>(id: string, parmName: string, uri: string) {
    return this.httpClient.get<T>(uri + '\?'+ parmName +'=' + id, { headers: this.headers, observe: 'response' });
  }

  // getSingleByQuery.
  getSingleByQuery<T>(query: string, uri: string) {
    return this.httpClient.get<T>(uri + '/query?' + query, { headers: this.headers, observe: 'response' });
  }

  // post.
  post<T>(toAdd: T, uri: string) {
    return this.httpClient.post<T>(uri, JSON.stringify(toAdd), { headers: this.headers, observe: 'response' });
  }

  // postUri.
  postUri( uri: string) {
    return this.httpClient.post<any>(uri, { headers: this.headers, observe: 'response' });
  }

  postMedia<T>(toAdd: T, uri: string) {    
    return this.httpClient.post<T>(uri, toAdd, { headers: this.headersMultiPart, reportProgress: true, observe: 'events' });
  }
  // putUri.
  putUri(uri: string) {
    return this.httpClient.put<any>(uri, { headers: this.headers, observe: 'response' });
  }

  // update.
  put<T>(toUpdate: T, uri: string) {
    return this.httpClient.put<T>(uri, toUpdate, { headers: this.headers, observe: 'response' });
  }

  // // delete.
  // delete(url: string) {
  //   return this.httpClient.delete(url);
  // }

  // delete.

  delete(url: string) {
    return this.httpClient.delete(url, { headers: this.headers, observe: 'response' });
  }

  // deleteObject.
  deleteObject<T>(toDelete: T, uri: string) {
    return this.httpClient.delete<T>(uri, toDelete);
  }

  // deleteById.
  deleteById(id: string, uri: string) {
    return this.httpClient.delete(uri + '\?id=' + id);
  }

  // handleError.
  handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
  }

}
