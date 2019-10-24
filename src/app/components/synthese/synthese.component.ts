import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CheckListRefService } from 'src/app/core/services/checkListRef/check-list-ref.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
})
export class SyntheseComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'date', 'conducteur', 'vehicule', 'engin', 'detail'];
  dataSource = new MatTableDataSource();

  constructor(private checkListRefService: CheckListRefService, 
            private questionService: QuestionService,
            private router: Router,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkListRefService.getAllCheckListRef().subscribe((res: any)   => {
      console.log(res);
      this.dataSource.data = res;
    });

    // this.questionService.getQuestionsFromAPI('Compacteur').then(res => console.log('Question: ', res));
  }

  showDetails(element) {
    // const url = `synthese/details/${element.idCheckListRef}`;
    // console.log(url);
    // this.router.navigate(['admin', { outlets: { admin: ['synthese', element.idCheckListRef] } }], { relativeTo: this.activatedRoute });
    this.router.navigateByUrl(`/admin/(admin:synthese/${element.idCheckListRef}`);
    console.log('Element: ', element);
    console.log(this.activatedRoute)
  }

}
