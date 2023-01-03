
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fantome } from 'src/app/fantome';
import { FantomeService } from 'src/app/services/fantome.service';

@Component({
  selector: 'app-secret',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private authenticationService: AuthenticationService,
    private fantomeService:FantomeService,
  ) {}

  ngOnInit(): void {
    this.getFantomes();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  fantomes:Fantome[] = [];

  getFantomes():void{
    this.fantomeService.getFantomes().subscribe(fantomes => this.fantomes = fantomes);
  }

  onSelect(fantome:Fantome):void{
   // console.log("Hello you were selected : ", fantome);
   //this.selectedFantome = fantome;
  }

}