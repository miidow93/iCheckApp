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
          this.questionService.getQuestionsFromAPI(checklist.vehicule.engin).then(res => {
            console.log('Question: ', res);
            let controle1 = 'مراقبة عينية للحالة العامة للعربة الرافعة';
            let controle2 = 'مراقبة عمل الآلية';
            let controle3 = 'مراقبة مكان التدخل';

            res.forEach(element => {
              console.log(checklist.catchAll[controle1]);
              element.options.forEach(opt => {

                /*if (element.label === 'Surveillance en nature de l\'état général du véhicule') {
                  let test = {key: opt.key, value: checklist.}
                  this.keys1.push(opt.key);
                }
                if (element.label === 'Suivi du travail du mécanisme') {
                  this.keys2.push(opt.key);
                }
                if (element.label === 'Surveiller le lieu de l\'intervention') {
                  this.keys3.push(opt.key);
                }*/
              });
              // console.log('Keys: ', keys1);
            });
          });
        }
      })
    });

  }

}
