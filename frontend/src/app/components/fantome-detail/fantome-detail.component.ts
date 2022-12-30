import { Component } from '@angular/core';
import { Fantome } from '../../fantome';
import { FantomeService } from '../../services/fantome.service';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-fantome-detail',
  templateUrl: './fantome-detail.component.html',
  styleUrls: ['./fantome-detail.component.css']
})
export class FantomeDetailComponent {
  //@Input() fantome?: fantome;
  fantome: Fantome | undefined;

  constructor(
    private route: ActivatedRoute,
    private fantomeService: FantomeService, private authenticationService: AuthenticationService ,
    private location: Location){

  }

  ngOnInit():void{
    this.getfantome();
  }

  getfantome():void{
   // const id =  Number(this.route.snapshot.paramMap.get('id'));
    const id =  String(this.route.snapshot.paramMap.get('id'));
    this.fantomeService.getFantome(id)
    .subscribe(fantome => this.fantome = fantome);
  }

  goBack():void{
    this.location.back();
  }

  save(): void {
    if (this.fantome) {
      const localIdKey = this.getLocalUserId();
        if (localIdKey){
        this.fantomeService.updateFantome(this.fantome, localIdKey, undefined, undefined, this.fantome.role)
          .subscribe(() => this.goBack());
      }
    }
  }

  updateRole(){
    if (this.fantome) {
      const localIdKey = this.getLocalUserId();
      if (localIdKey){
      this.fantomeService.updateFantome(this.fantome, localIdKey, undefined, undefined, this.fantome.role)
        .subscribe(() => this.goBack());
      }
    }
  }

  addAsFriend(){
    if (this.fantome) {
      const localIdKey = this.getLocalUserId();
      if (localIdKey){
      this.fantomeService.updateFantome(this.fantome, localIdKey,  this.fantome._id, 'add', this.fantome.role)
        .subscribe(() => this.goBack());
      }
    }
  }

  removeAsFriend(){
    if (this.fantome) {
      const localIdKey = this.getLocalUserId();
      if (localIdKey){
        this.fantomeService.updateFantome(this.fantome, localIdKey, this.fantome._id, 'remove', this.fantome.role)
        .subscribe(() => this.goBack());
      }
      
    }
  }

  isFriend(){
    const localIdKey = this.getLocalUserId();
    return this.fantome?.friends.find(userId => userId === localIdKey) !== undefined;
  }

  public getLocalUserId():string | null{
    return this.authenticationService.getLocalID();
  }


/*
  public getLocalUserId():string | null{
    return this.authenticationService.getLocalID();
  }*/
}

