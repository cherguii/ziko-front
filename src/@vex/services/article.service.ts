import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // Fields.
  isGetArticleByIdOK = false;
  isAddCommandOK = false;
  currentCommand: any;

  // Ctor.
  constructor(private store: AngularFirestore) { }

  // // Retourne la liste des articles.
  // getAllArticle(itemsName: string): Observable<any> {
  //   return this.store
  //       .collection(itemsName)
  //       .get()
  //       .pipe(
  //         map((response) => {
  //           this.isGetAllArticleOK = true;

  //           var articles = new Array<any>();
  //           response.forEach((doc) => {
  //             var article = doc.data();
  //             (<any>article).id = doc.id
  //             articles.push(article);
  //           });

  //           return articles;
  //         }),
  //         catchError((error) => {
  //           this.isGetAllArticleOK = false;
  //           var error = error;
  //           return of(0);
  //         })
  //       );
  // }

  // Retourne la liste des articles.
  getArticleById(itemsName: string, articleId: string): Observable<any> {
    return this.store
        .collection(itemsName)
        .doc(articleId)
        .get()
        .pipe(
          map((response) => {
            this.isGetArticleByIdOK = true;
            var article = response.data();
            (<any>article).id = response.id;
            return article;
          }),
          catchError((error) => {
            this.isGetArticleByIdOK = false;
            var error = error;
            return of(0);
          })
        );
  }


  // Ajouter une command en base de données Firebase.
  addCommand(command: any) {
    return this.store.collection('Command').add(command)
            .then((response) => {
                this.isAddCommandOK = true;
                // var currentAdded = new Article();
                // currentAdded.id = response.id;
                // return currentAdded;
                return response;
            })
            .catch(error => {
                console.log(error);
                this.isAddCommandOK = false;
                return of(0);
            });
  }

  // // Mettre à jour un article en base de données Firebase.
  // updateArticle(article) {
  //   return this.store.collection('Article').doc(article.id).update(article)
  //         .then((response) => {
  //             this.isUpdateArticleOK = true;
  //             return response;
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           this.isUpdateArticleOK = false;
  //           return of(0);
  //         });
  // }

  // // Supprimer un article en base de données Firebase.
  // deleteArticle(articleId) {
  //   return this.store.collection('Article').doc(articleId).delete()
  //           .then((response) => {
  //             this.isDeleteArticleOK = true;
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           this.isDeleteArticleOK = false;
  //           return of(0);
  //         });
  // }
}
