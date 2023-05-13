import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/@vex/services/layout.service';
import { ArticleService } from 'src/@vex/services/article.service';
import { Article } from 'src/@vex/models/article.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TransactionStatusCodeConstante, TransactionStatusLibelleConstante } from 'src/@vex/helpers/globalConstants';
import { CommonHelper } from 'src/@vex/helpers/commonHelper';
import { MatSnackBar } from '@angular/material/snack-bar';

import {  Image, 
          LineLayout, 
          PlainGalleryConfig, 
          PlainGalleryStrategy, 
          ModalGalleryService, 
          ModalGalleryRef, 
          PlainLibConfig, 
          ModalLibConfig, 
          ModalGalleryConfig } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'vex-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ArticleDetailComponent implements OnInit {

  // Fields.
  form: UntypedFormGroup;
  mobileQuery = this.layoutService.isMobile();
  currentArticle: Article = new Article();
  photo_1: string;
  photo_2: string;
  photo_3: string;
  total: string;
  showLoading = false;

  //Config.
  plainGalleryRow: PlainGalleryConfig;
  libConfigPlainGalleryRow: PlainLibConfig;
  galleryImages: Array<Image>;
  
  // Ctor.
  constructor(private layoutService: LayoutService,
              private formBuilder: UntypedFormBuilder,
              private articleService: ArticleService,
              private snackBar: MatSnackBar,
              private modalGalleryService: ModalGalleryService,
              private router: Router,
              private route: ActivatedRoute) { }

  // ngOnInit.              
  ngOnInit() {
    this.initForm();
    this.loadArticle();
  }

  // initForm.
  initForm() {
    this.form = this.formBuilder.group({
      NomPrenom: [null, Validators.required],
      Telephone: [null, Validators.required],
      Wilaya: [null, Validators.required],
      CommuneAdresse: [null, Validators.required],
      Quantite: [null, Validators.required]
    });
  }

  // loadFourniture.
  loadArticle() {
    const articleId = this.route.snapshot.queryParamMap.get('articleId');
    this.articleService.getArticleById('Article', articleId)
          .subscribe({
              next: (data: any) => {
                if(this.articleService.isGetArticleByIdOK === true) {

                  if(data.IsActive === true && data.IsValid === true) {
                    this.currentArticle.id = data.id;
                    this.currentArticle.Titre = data.Titre;
                    this.currentArticle.PrixInitialeUnitaire = data.PrixInitialeUnitaire;
                    this.currentArticle.PrixInitialeUnitaireTexteLibre = data.PrixInitialeUnitaireTexteLibre;
                    this.currentArticle.QuantiteInitiale = data.QuantiteInitiale;
                    this.currentArticle.QuantiteEnStock = data.QuantiteEnStock;
                    this.currentArticle.Categorie = data.Categorie;
                    this.currentArticle.Marque = data.Marque;
                    this.currentArticle.Description = data.Description;
  
                    this.currentArticle.IsPromo = data.IsPromo;
                    this.currentArticle.CodePromo = data.CodePromo;
                    this.currentArticle.IsActive = data.IsActive;
                    this.currentArticle.IsValid = data.IsValid;
  
                    this.currentArticle.Photos = data.Photos;
                    this.currentArticle.Vendeur = data.Vendeur;
                    this.currentArticle.CreatedDate = data.CreatedDate;
                    this.currentArticle.CreatedDateString = data.CreatedDateString;
                    this.currentArticle.LastUpdatedDate = data.LastUpdatedDate;
                    this.currentArticle.LastUpdatedDateString = data.LastUpdatedDateString;
                    
                    this.photo_1 = this.currentArticle.Photos.find(x => x.Order === 1 && x.IsNoImage === false) !== undefined ? this.currentArticle.Photos.find(x => x.Order === 1 && x.IsNoImage === false).PhotoBase64 : '';
                    this.photo_2 = this.currentArticle.Photos.find(x => x.Order === 2 && x.IsNoImage === false) !== undefined ? this.currentArticle.Photos.find(x => x.Order === 2 && x.IsNoImage === false).PhotoBase64 : '';
                    this.photo_3 = this.currentArticle.Photos.find(x => x.Order === 3 && x.IsNoImage === false) !== undefined ? this.currentArticle.Photos.find(x => x.Order === 3 && x.IsNoImage === false).PhotoBase64 : '';
                    
                    this.loadPhotos();
                    this.setGalleryOption();

                  }
                  else {
                    this.router.navigate(['/error404']);
                  }
                }
                else {
                  this.router.navigate(['/error404']);
                }
              },
              complete: () => {},
              error: (err) => {
                console.error(err);
              }
            }
          );
  }

  // loadPhotos.
  loadPhotos() {
    var photo;
    this.galleryImages = new Array<Image>();
    if(this.photo_1 !== '') {
      photo = new Image(0, {
          img: this.photo_1,
          extUrl: ''
        }),
      this.galleryImages.push(photo);
    }
    if(this.photo_2 !== '') {
      photo = new Image(1, {
        img: this.photo_2,
        extUrl: ''
      }),
      this.galleryImages.push(photo);
    }
    if(this.photo_3 !== '') {
      photo = new Image(2, {
        img: this.photo_3,
        extUrl: ''
      }),
      this.galleryImages.push(photo);
    }

  }

  // setGalleryOption.
  setGalleryOption() {
    this.plainGalleryRow = {
      strategy: PlainGalleryStrategy.ROW,
      layout: new LineLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true }, 'flex-start')
    };

    this.libConfigPlainGalleryRow = {
      plainGalleryConfig: this.plainGalleryRow
    };
  }

 // onSubmitCommandForm.
 onSubmitCommandForm() {
  this.showLoading = true;
  var commandForm = this.form.value;
  
  var achteur = this.getAcheteur(commandForm);
  if(achteur.NomPrenom === null || achteur.NomPrenom === '' || achteur.NomPrenom === undefined) {
    this.showLoading = false;
    this.showNotification(
      'snackbar-danger',
      'Merci de saisir votre Nom et Prénom.',
      'bottom',
      'right'
    );  
  } 
  else if(achteur.Telephone === null || achteur.Telephone === '' || achteur.Telephone === undefined) {
    this.showLoading = false;
    this.showNotification(
      'snackbar-danger',
      'Merci de saisir votre Numéro de Téléphone.',
      'bottom',
      'right'
    );  
  }
  else if(achteur.Wilaya === null || achteur.Wilaya === '' || achteur.Wilaya === undefined) {
    this.showLoading = false;
    this.showNotification(
      'snackbar-danger',
      'Merci de saisir votre Wilaya.',
      'bottom',
      'right'
    );  
  }
  else if(achteur.CommuneAdresse === null || achteur.CommuneAdresse === '' || achteur.CommuneAdresse === undefined) {
    this.showLoading = false;
    this.showNotification(
      'snackbar-danger',
      'Merci de saisir votre Commune et adresse.',
      'bottom',
      'right'
    );  
  }
  else if(commandForm.Quantite === null || commandForm.Quantite === '' || commandForm.Quantite === undefined || commandForm.Quantite === 0) {
    this.showLoading = false;
    this.showNotification(
      'snackbar-danger',
      'Merci de saisir la Quantité.',
      'bottom',
      'right'
    );  
  }
  else {
    var dateCreate = new Date();
    var command = {
      NumeroCommand: CommonHelper.generateCommandCode(10000000, 40000000),
      NumeroReferenceTransporteur: '00000000',
      Acheteur: achteur,
      Transporteur: this.getTransporteur(),
      Article:{
        ArticleId: this.currentArticle.id,
        TitreArticle: this.currentArticle.Titre,
        PrixInitialeUnitaire: this.currentArticle.PrixInitialeUnitaire,
        PhotoArticle: this.currentArticle.Photos.length > 0 ? this.currentArticle.Photos.find(x => x.Order === 1).PhotoBase64 : '',
      },
      Quantite: commandForm.Quantite,
      Tva: '0',
      PrixSousTotal: '0',
      PrixTotal: '0',
      TransporteurPrix: '0',
      TransactionStatus: this.getStatusCreation(),
      CreatedDate: dateCreate,
      CreatedDateString: CommonHelper.formatDate(dateCreate),
      LastUpdatedDate: null,
      LastUpdatedDateString: '',
      PriseEnChargeParTransporteurDate: null,
      PriseEnChargeParTransporteurDateString: '',
      ReceptionClientDate: null,
      ReceptionClientDateString: '',
      RetourClientDate: null,
      RetourClientDateString: ''
    };
    
    this.articleService.addCommand(command)
        .then((response) => {
          if (this.articleService.isAddCommandOK === true) {
            this.articleService.currentCommand = command;
            this.router.navigate(['/article/confirm-command']);
          }
          else {
            this.showNotification(
              'snackbar-danger',
              'Une erreur est survenue lors de l\'ajout de la commande.',
              'bottom',
              'right'
            );  
          }
          this.showLoading = false;
        })
        .catch(e => {
            console.log(e);
            this.showLoading = false;
        });
    }
  
  }

  // getvendeur.
  getAcheteur(transactionForm: any) {
    var acheteur = {
      NomPrenom: transactionForm.NomPrenom,
      Telephone: transactionForm.Telephone,
      Email: 'TODO@yahoo.fr',
      Wilaya: transactionForm.Wilaya,
      CommuneAdresse: transactionForm.CommuneAdresse
    };
    return acheteur;
  }

  getTransporteur() {
    var transporteur = {
      Nom: 'Non renseigné',
      Prenom: 'Non renseigné',
      NomEntreprise: 'Non renseigné',
      Email: 'Non renseigné',
      TelephoneEntreprise: 'Non renseigné',
      TelephoneTransporteur: 'Non renseigné',
      AdresseEntreprise: 'Non renseigné'
    };
    return transporteur;
  }

  // getvendeur.
  getStatusCreation() {
    var status = {
      Code: TransactionStatusCodeConstante.CreatationCode,
      Libelle: TransactionStatusLibelleConstante.CreatationLibelle
    };
    return status;
  }

  onShowImage(id: number, image: Image): void {
    const imageIndex: number = this.getCurrentIndexCustomLayout(image, this.galleryImages);
    const dialogRef: ModalGalleryRef = this.modalGalleryService.open({
      id: id,
      images: this.galleryImages,
      currentImage: this.galleryImages[imageIndex],
      libConfig: {
        slideConfig: {
          infinite: true,
          sidePreviews: {
            show: false
          }
        }
      } as ModalLibConfig
    } as ModalGalleryConfig) as ModalGalleryRef;
  }

  // getCurrentIndexCustomLayout.
  private getCurrentIndexCustomLayout(image: Image, galleryImages: Image[]): number {
    return image ? galleryImages.indexOf(image) : -1;
  }

  // isArabicLanguage.
  isArabicLanguage(text): boolean {
    var arabicCodes = /[\u0600-\u06FF]/;
    return arabicCodes.test(text);
  }

  // showNotification.
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
