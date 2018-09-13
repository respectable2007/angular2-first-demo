import { AfterViewInit, Component, ElementRef, ViewChild, forwardRef, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { LoginService } from '../../service/login.service';
class res {
  status: string;
  message?:string;
}

class result{
  code: number;
  data: any
}

@Component({
  selector: 'app-auth-add',
  templateUrl: './auth-add.component.html',
  styleUrls: ['./auth-add.component.css']
})
export class AuthAddComponent implements OnInit {

  roleFrm: FormGroup;
  
  @ViewChild('tree') tree:ElementRef;
  treeList:any[] = [];
  
  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    private http:LoginService ) { }

  ngOnInit() {
  	this.roleFrm = this.formBuilder.group({
  	  roleName: ['', [this.nameValidator]],
  	  tree: ['', [this.treeValidator]]
  	})
  	this.getAuthList()
  }
  
  submit() {
  	console.log(this.roleFrm.value)
  }

  handleBack() {
  }
  
  getAuthList() {
    this.http.menu()
             .subscribe(result => {
             	if (result.code === 200) {
             	  this.treeList = this.authTransfer(result.data)
             	}
             })
  }
  // 权限列表迭代
  authTransfer(data:any): any[]{
     if (!data.length) return []
     let array:any[] = [];
     for (let item of data) {
        let treeItem:any;
        treeItem = {
     	  id: item.id,
     	  label: item.menuName,
     	  children: []
     	}
     	if (item.subMenuList.length) {
           treeItem.children = this.authTransfer(item.subMenuList)
     	}
     	array.push(treeItem)
     }
     return array

  }
  ctrl(item: string): AbstractControl {
    return this.roleFrm.controls[item]
  }
  
  statusCtrl(item:string):string {
  	if (!this.roleFrm.controls[item]) return
  	const control: AbstractControl = this.roleFrm.controls[item]
    return control.dirty && control.hasError('status') ? control.errors.status : ''
  }

  messageCtrl(item:string):string {
  	if (!this.roleFrm.controls[item]) return
  	const control: AbstractControl = this.roleFrm.controls[item]
    return control.dirty && control.hasError('message') ? control.errors.message : ''
  }
  private nameValidator = (control: FormGroup):res => {
    if (!control.value) {
      return { status: 'error', message: '请输入角色名称'}
    }
    if (control.value.length < 3) {
      return { status: 'error', message: '角色名称不小于3位'}
    }
    if (control.value.length > 8) {
      return { status: 'error', message: '角色名称不大于8位'}
    }
  }

  private treeValidator = (control: FormGroup):res => {
    if (!control.value.length) {
      return { status: 'error', message: '请至少选择一个权限菜单'}
    }
  }
}