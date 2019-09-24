import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QuestionBase } from 'src/app/shared/forms/question-base';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { map } from 'rxjs/operators';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [QuestionControlService]
})
export class HomePage implements OnInit {

  // DynamicFormQuestionComponent

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  formGroup: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private questionService: QuestionService) { }

  ngOnInit() {
    // this.readPage();
  }

  /*readPage() {
    this.http.get('../assets/checkList/manuscopique.json').subscribe(text => {
      console.log(text['Surveillance en nature de l\'état général du véhicule'][0].control_1);
    });

    this.questionService.getQuestions();
  }*/

}

