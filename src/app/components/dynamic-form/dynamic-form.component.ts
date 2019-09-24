import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from 'src/app/shared/forms/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    console.log('DynamicFormComponent', this.questions);
    this.form = this.qcs.toFormGroup(this.questions);
    console.log('Length: ', this.questions.length);
    // await this.qcs.toFormGroup(this.questions).then(formGroup => this.form = formGroup);

  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
