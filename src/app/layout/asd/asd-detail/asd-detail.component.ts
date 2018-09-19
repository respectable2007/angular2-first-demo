import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-asd-detail',
  templateUrl: './asd-detail.component.html',
  styleUrls: ['./asd-detail.component.css']
})
export class AsdDetailComponent implements OnInit {

  id: string;
  asd: any;
  constructor(private router: Router,
  	          private route: ActivatedRoute,
  	          private service: LoginService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  getAsdDetail() {
  	this.service.getAsdDetail({id: this.id})
  	            .subscribe(result => {
  	               if (result.code === 200) {
                     this.asd = result.data
  	               }
  	            })
  }

}
