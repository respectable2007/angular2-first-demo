import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
class res {
  message:string;
}
@Component({
  selector: 'app-asdvert',
  templateUrl: './asdvert.component.html',
  styleUrls: ['./asdvert.component.css']
})
export class AsdvertComponent implements OnInit {
  
  searchFrm: FormGroup;

  constructor(
  	@Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.searchFrm = this.formBuilder.group({
  		comName: ['', this.comNameValidator],
  		keyword: ['', this.keywordValidator],
  		pubStartDate: ['', this.pubStartDateValidator],
  		pubEndDate: ['', this.pubEndDateValidator],
  		dataCollectStartDate: ['', this.dataCollectStartDateValidator],
  		dataCollectEndDate: ['', this.dataCollectEndDateValidator]
  	})
  }

  handleSearch() {

  }

  messageCtrl(item: string):string {
  	if(!this.searchFrm.controls[item]) return
  	const control:AbstractControl = this.searchFrm.controls[item];
    return control.dirty && control.hasError('message') ? control.errors.message : '';
  }

  private comNameValidator = (control:FormGroup): res => {
    if(control.value.length > 100) {
      return { message: '企业名称不能超过100位' }
    }
  }

  private keywordValidator = (control:FormGroup): res => {
  	if(control.value.length > 200) {
  	  return { message: '关键词不能超过200位' }
  	}
  }

  private pubStartDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['pubEndDate'].value) {
    	// let start = new Date(control.value.replace(/-/g, '/'))
    	// let end = new Date(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))
    	console.log(Date.parse(control.value.replace(/-/g, '/')))
    	if (Date.parse(control.value.replace(/-/g, '/')) > Date.parse(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}

    	}
    }
  }

  private pubEndDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['pubStartDate'].value) {
    	// let start = new Date(control.value.replace(/-/g, '/'))
    	// let end = new Date(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))
    	console.log(Date.parse(control.value.replace(/-/g, '/')))
    	if (Date.parse(control.value.replace(/-/g, '/')) < Date.parse(this.searchFrm.controls['pubStartDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }

  private dataCollectStartDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['dataCollectEndDate'].value) {
    	// let start = new Date(control.value.replace(/-/g, '/'))
    	// let end = new Date(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))
    	console.log(Date.parse(control.value.replace(/-/g, '/')))
    	if (Date.parse(control.value.replace(/-/g, '/')) > Date.parse(this.searchFrm.controls['dataCollectEndDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}

    	}
    }
  }

   private dataCollectEndDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['dataCollectStartDate'].value) {
    	// let start = new Date(control.value.replace(/-/g, '/'))
    	// let end = new Date(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))
    	console.log(Date.parse(control.value.replace(/-/g, '/')))
    	if (Date.parse(control.value.replace(/-/g, '/')) < Date.parse(this.searchFrm.controls['dataCollectStartDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }
}
