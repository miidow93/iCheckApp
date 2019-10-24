import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/question.service';
import { CheckListService } from 'src/app/core/services/check-list/check-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  keys1 = [];
  keys2 = [];
  keys3 = [];

  constructor(private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private checkListService: CheckListService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      console.log(param)
      this.checkListService.getCheckListByID(param.id).subscribe(checklist => {
        console.log('Checklist: ', checklist);
        if (checklist) {
          this.questionService.getQuestionsFromAPI(checklist['vehicule'].engin).then(res => {
            console.log('Question: ', res);
            let controle1 = 'مراقبة عينية للحالة العامة للعربة الرافعة';
            let controle2 = 'مراقبة عمل الآلية';
            let controle3 = 'مراقبة مكان التدخل';

            res.forEach(element => {
              if (element.key === controle1) {
                console.log(checklist['catchAll'][controle1]);
                this.keys1 = this.arrayToJson(element['options'], checklist['catchAll'][controle1]);
                console.log('Keys 1: ', this.keys1);
              }
              if (element.key === controle2) {
                console.log(checklist['catchAll'][controle2]);
                this.keys2 = this.arrayToJson(element['options'], checklist['catchAll'][controle2]);
                console.log('Keys 2: ', this.keys2);
              }
              if (element.key === controle3) {
                console.log(checklist['catchAll'][controle3]);
                this.keys3 = this.arrayToJson(element['options'], checklist['catchAll'][controle3]);
                console.log('Keys 3: ', this.keys3);
              }

            });
          });
        }
      })
    });

  }


  arrayToJson(options: any = [], values: any = []): any[] {
    let index = 0;
    let keys = [];
    options.forEach(elt => {
      let js = {key: elt.key, value: values[index]};
      keys.push(js);
      index++;
    });
    return keys;
  }

}
