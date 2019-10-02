import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionBase } from '../forms/question-base';
import { DropdownQuestion } from '../forms/dropdown-question';
import { TextboxQuestion } from '../forms/textbox-question';
import { CheckboxQuestion } from '../forms/checkbox-question';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: QuestionBase<any>[] = [];
  options: [];

  constructor(private http: HttpClient) { }
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  /*getQuestions() {
    this.http.get('../assets/checkList/manuscopique.json').subscribe(text => {
      // console.log(text);
      console.log(Object.keys(text['Surveillance en nature de l\'état général du véhicule']));

      const checkbox1 = new CheckboxQuestion({
        key: 'etatGeneral',
        label: 'Surveillance en nature de l\'état général du véhicule',
        options: this.arrayToForm(text)
      });
      const dropDown = new DropdownQuestion({
        controlType: 'choice',
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      });

      this.questions.push(checkbox1);
      this.questions.push(dropDown);

    });
    return this.questions;
  }*/

  async getQuestionsFromAPI(engin) {
    // tslint:disable-next-line:no-shadowed-variable
    await this.http.get(`../assets/checkList/${engin}.json`).pipe(take(1)).toPromise().then(async (res) => {
      console.log('Service: ', res);
      const checkbox1 = new CheckboxQuestion({
        key: 'مراقبة عينية للحالة العامة للعربة الرافعة',
        label: 'Surveillance en nature de l\'état général du véhicule',
        options: this.arrayToForm(res['Surveillance en nature de l\'état général du véhicule'])
      });
      const checkbox2 = new CheckboxQuestion({
        // key: 'stm',
        key: 'مراقبة عمل الآلية',
        label: 'Suivi du travail du mécanisme',
        options: this.arrayToForm(res['Suivi du travail du mécanisme'])
      });
      const checkbox3 = new CheckboxQuestion({
        key: 'مراقبة مكان التدخل ',
        label: 'Surveiller le lieu de l\'intervention',
        options: this.arrayToForm(res['Surveiller le lieu de l\'intervention'])
      });
      /*const dropDown = new DropdownQuestion({
        controlType: 'choice',
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      });*/
      this.questions.push(checkbox1);
      this.questions.push(checkbox2);
      this.questions.push(checkbox3);
      // this.questions.push(dropDown);
      console.log('Questions Service: ', this.questions.length);
    });

    return this.questions;





    /*.pipe(
      map(text => {
        console.log(Object.keys(text['Surveillance en nature de l\'état général du véhicule']));

        const checkbox1 = new CheckboxQuestion({
          key: 'etatGeneral',
          label: 'Surveillance en nature de l\'état général du véhicule',
          options: this.arrayToForm(text)
        });
        const dropDown = new DropdownQuestion({
          controlType: 'choice',
          key: 'brave',
          label: 'Bravery Rating',
          options: [
            { key: 'solid', value: 'Solid' },
            { key: 'great', value: 'Great' },
            { key: 'good', value: 'Good' },
            { key: 'unproven', value: 'Unproven' }
          ],
          order: 3
        });

        this.questions.push(checkbox1);
        this.questions.push(dropDown);
      }));*/

  }




  arrayToForm(group) {
    // tslint:disable-next-line:prefer-const
    let opts = [];
    const keys = Object.values(group);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length; i++) {
      opts[i] = { key: keys[i], value: false };
      // console.log('Keys:', opt);
      // options.push(opt);
    }

    console.log(opts);
    return opts;
  }
}
