import { Component, Input, OnInit
 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Fantome } from 'src/app/fantome';
import { FantomeService } from '../../services/fantome.service';
import { Location } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-friend',
  templateUrl: './register-friend.component.html',
  styleUrls: ['./register-friend.component.css']
})
export class RegisterFriendComponent {
  public registerForm!: FormGroup;
  @Input() fantome!: Fantome;
  constructor(  private route: ActivatedRoute,  private fantomeService: FantomeService, private authenticationService: AuthenticationService ,
    private location: Location) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.getfantome();
  }

  goBack():void{
    this.location.back();
  }

  getfantome():void{
    const id =  String(this.route.snapshot.paramMap.get('id'));
    this.fantomeService.getFantome(id)
    .subscribe(fantome => this.fantome = fantome);
  }
  


  public onSubmit() {
    this.authenticationService.registerFriend(
      this.registerForm.get('username')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.fantome
    );

    //Then Add as Friend

  }
}
