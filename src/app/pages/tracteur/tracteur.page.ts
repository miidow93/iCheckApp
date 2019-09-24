import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from 'src/app/shared/forms/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';

@Component({
  selector: 'app-tracteur',
  templateUrl: './tracteur.page.html',
  styleUrls: ['./tracteur.page.scss'],
})
export class TracteurPage implements OnInit {

  //  DynamicFormComponent

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    // this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
