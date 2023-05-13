import { Component, OnInit } from '@angular/core';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { trackByRoute } from '../../../../@vex/utils/track-by';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { ArticleService } from 'src/@vex/services/article.service';

@Component({
  selector: 'vex-confirm-command',
  templateUrl: './confirm-command.component.html',
  styleUrls: ['./confirm-command.component.scss'],
  animations: [
    stagger40ms,
    fadeInUp400ms
  ]
})
export class ConfirmCommandComponent implements OnInit {

  // Fields.
  numeroCommand: number;
  currentCommand: any;

  // Ctor.
  constructor(private articleService: ArticleService) { }

  // ngOnInit.
  ngOnInit() {
    this.currentCommand = this.articleService.currentCommand;
    if(this.currentCommand !== undefined)
      this.numeroCommand = this.currentCommand.NumeroCommand;
  }

 

}
