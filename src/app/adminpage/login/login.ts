import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private toastService: ToastService) {}

  onLogin() {
    if (this.loginData.username === 'Admin' && this.loginData.password === 'Qwerty@123') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isLogin', 'true');
      }
      this.toastService.success('Logged in successfully!');
      this.router.navigate(['/admin/images']);
    } else {
      this.toastService.error('Invalid username or password');
    }
  }
}
