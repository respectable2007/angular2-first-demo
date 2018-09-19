import { AfterViewInit, Component, ElementRef, ViewChild, forwardRef, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { UserSafeHooks } from 'element-angular/release/tree/tree';

import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';

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
export class AuthAddComponent implements OnInit, AfterViewInit {

  roleFrm: FormGroup;
  
  @ViewChild('tree') tree:ElementRef;
  hooks: UserSafeHooks;
  treeList:any[] = [];
  menuList:string[] = [];
  menuIdList:number[] = [];
  showError:boolean = false;

  private roleId:number;

  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    private http: LoginService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.roleId = +this.route.snapshot.paramMap.get('id')
  	this.roleFrm = this.formBuilder.group({
  	  roleName: ['', [this.nameValidator]]
  	})
  	this.getAuthList()
    if (this.roleId) {
      this.http.roleDetail({roleId: this.roleId})
               .subscribe(result => {
                 if (result.code === 200) {
                   this.roleFrm.setValue({roleName: result.data.role.roleName})
                   let list = this.getChecked(result.data.menuList)
                   this.updateItemChecked(list)
                 }
               })
    }
  }
  // etree方法初始化
  ngAfterViewInit(){
  	if (!this.tree) return
  		this.hooks = (<any>this.tree).userSafeHooks()
  }
  // 新增或修改
  submit() {
  	this.menuList = this.hooks.findAllChecked()
  	this.showError = !this.menuList.length
  	if (this.roleFrm.valid && !this.showError) {
  	  this.menuIdList = []
  	  this.getAuthId(this.treeList)
      if (this.roleId) {
        this.http.updateRole({
          id: this.roleId,
          menuIdList: this.menuIdList,
          roleName: this.roleFrm.value.roleName
        }).subscribe(result => {
          if (result.code === 200) {
             this.router.navigate(['layout/authorition'])
           }
        })
      } else {
        this.http.addRole({roleName: this.roleFrm.value.roleName, menuIdList: this.menuIdList})
         .subscribe(result => {
           if (result.code === 200) {
             this.router.navigate(['layout/authorition'])
           }
         })
      }
  	}
  }
  // 返回
  handleBack() {
  	this.router.navigate(['layout/authorition'])
  }
  // 获取权限列表
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
  // 获取选中id数组
  getAuthId(data:any): any[] {
  	if (!data.length) return []
  	let array:number[] =[]
    for(let item of data) {
       if(this.menuList.indexOf(item.label) > -1) {
       	  this.menuIdList.push(Number(item.id))
       }
       if (item.children.length) {
       	 this.getAuthId(item.children)
       }
    }
  }
  // 获取选中项
  getChecked(data:any): any[] {
    let array:any[] = [];
    for(let item of data) {
      if(item.subMenuList.length > 0) {
        for(let i of item.subMenuList) {
          if (i.status === 1) {
            array.push(i.id)
          }
        }
      } else {
        if (item.status === 1 && item.parentId === 0) {
          array.push(item.id)
        }
      }
    }
    return array
  }
  // 更新选中项
  updateItemChecked(data:any):void {
    if (!data.length) return
    for (let item of data) {
      this.hooks.updateItemChecked(item)
    }
  }
  // 验证规则
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

  // private treeValidator = (control: FormGroup):res => {
  //   if (!control.value.length) {
  //     return { status: 'error', message: '请至少选择一个权限菜单'}
  //   }
  // }
}