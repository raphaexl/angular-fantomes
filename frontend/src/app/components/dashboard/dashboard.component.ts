import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Fantome } from '../../fantome';
import { FantomeService } from '../../services/fantome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fantomes: Fantome[] = [];
  fantome?: Fantome;

  constructor(private fantomeService: FantomeService, private authenticationService: AuthenticationService, private location: Location ) { }

  ngOnInit(): void {
    this.getFantomes();
  }

  getFantomes(): void {
   
    this.fantomeService.getFantomes()
      .subscribe(fantomes => {
        this.fantome = fantomes.find(fantome => fantome._id == this.authenticationService.getLocalID())
        this.fantome?.friends.forEach(friend => {
          const friendFantome = fantomes.find(fantome => fantome._id == friend);
          if (friendFantome){
            this.fantomes.push(friendFantome);
          }
        })
        }
        );
  }

  goBack():void{
    this.location.back();
  }
}
