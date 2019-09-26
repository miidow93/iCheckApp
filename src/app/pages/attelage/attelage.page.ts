import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import { CheckboxQuestion } from 'src/app/shared/forms/checkbox-question';

@Component({
  selector: 'app-attelage',
  templateUrl: './attelage.page.html',
  styleUrls: ['./attelage.page.scss'],
  providers: [QuestionService]
})
export class AttelagePage implements OnInit {

  // AppComponent

  questions: any[];

  constructor(private service: QuestionService) {
    // this.questions = service.getQuestions();
    // service.getQuestions();
  }


  async ngOnInit() {
    // await this.service.getQuestionsFromAPI().then(responses => console.log('Attelage OnInit: ', responses));
    /*await this.service.getQuestionsFromAPI().then(async qsc => {
      console.log('Attelage Page: ', qsc[0]);
      this.questions = qsc;
    });
    console.log('Test: ', this.questions[0]);*/
  }


  /*arrayToForm(group) {
    // tslint:disable-next-line:prefer-const
    let opts = [];
    const keys = Object.values(group['Surveillance en nature de l\'état général du véhicule']);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length; i++) {
      opts[i] = { key: keys[i], value: false };
      // console.log('Keys:', opt);
      // options.push(opt);
    }

    console.log(opts);
    return opts;
  }*/
}
