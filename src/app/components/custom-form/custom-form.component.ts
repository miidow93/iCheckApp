import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  providers: [QuestionService]
})
export class CustomFormComponent implements OnInit {

  // AppComponent
  @Input() engin = '';
  questions: any[];

  constructor(private service: QuestionService) {
    // this.questions = service.getQuestions();
    // service.getQuestions();
  }


  async ngOnInit() {
    // await this.service.getQuestionsFromAPI().then(responses => console.log('Attelage OnInit: ', responses));
    await this.service.getQuestionsFromAPI(this.engin).then(async qsc => {
      console.log('CustomForm: ', qsc[0]);
      this.questions = qsc;
    });
  }

}
