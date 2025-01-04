import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/auth/login.service';;
import { Router } from '@angular/router';
import { User } from '../services/user/user';
import { UserService } from '../services/user/user.service';
import { ModalService } from '../modal/modal.service';
import { ProfileComponent } from './profile-template/profile-template.component';
@Component({
  selector: 'app-dashboard-profile',
  imports: [CommonModule, ProfileComponent],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: './dashboard-profile.component.css'
})
export class DashboardProfileComponent {
  dashboardData: any[] = [];
  isAuthenticated:boolean = false;

  
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    phone: 0,
    password: '',
    confirmPassword: '',
  };
  @ViewChild('profile') profileTemplate!: TemplateRef<any>;

  constructor(private loginService: LoginService, private router: Router, private userService: UserService, private modalService: ModalService) {
    /* this.dashboardData = dashboardData; */
  }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(
      (userData: User) => {
        this.user = userData;
      },
    )
    
    this.loginService.userLogin.subscribe((isAuthenticated) => {
      this.isAuthenticated = this.isAuthenticated;
    });


  }


  
  logout() {
    this.loginService.methodlogout();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

    goToProfile(): void {
      this.modalService.component = this.profileTemplate;
      this.modalService.openModal();
    }
    
} 