import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from 'src/app/shared/forms/question-base';
import { FormGroup, NgForm } from '@angular/forms';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { EnginService } from 'src/app/core/services/engin/engin.service';
import { Constants } from 'src/app/shared/constants';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [QuestionControlService, NgbRatingConfig]
})
export class DynamicFormComponent implements OnInit {
  dir = 'rtl';
  @Input() questions: QuestionBase<any>[] = [];
  @Input() engin: string = '';
  form: FormGroup;
  payLoad = '';
  size = 0;

  imageEngin: string = '';

  constructor(private qcs: QuestionControlService,
    private enginService: EnginService,
    private checkListService: CheckListService,
    config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    console.log('DynamicFormComponent', this.questions);
    this.form = this.qcs.toFormGroup(this.questions);
    console.log('Length: ', this.questions.length);
    // await this.qcs.toFormGroup(this.questions).then(formGroup => this.form = formGroup);
    this.enginService.getEnginsByName(this.engin).subscribe(res => this.imageEngin = res.imageEngin);
  }

  onSubmit(form: NgForm) {
    console.log('Values: ', form);
    // this.payLoad = JSON.stringify(this.form.value);
  }

  onSub(form: NgForm) {
    console.log('Form Values: ', form);
    const data = {
      conducteur: { id: '1', nomComplet: 'biyi' },
      tracteur: { id: '2', engin: this.engin, matricule: '25879| 12| b' },
      date: new Date().toISOString(),
      catchAll: form
    };
    console.log('CheckList: ', data);
    this.checkListService.addCheckList(data).subscribe(res => console.log('Add CheckList: ', res));
  }

  createImagePath(serverPath: string) {
    return `${Constants.serverImg}${serverPath}`;
    // return `http://localhost:4772/${serverPath}`;
  }

}
