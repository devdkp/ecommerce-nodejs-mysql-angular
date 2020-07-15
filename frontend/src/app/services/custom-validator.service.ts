import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }


  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  phoneNoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }


      // const regex = new RegExp(/^\(?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/);
      const regex = new RegExp(/[0-9]{6,}/);
      const valid = regex.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }

  emailValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      let valid = re.test(control.value);
      return valid ? null : { invalidEmail: true };

    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }


  showApiMessage(type, message) {
  
    switch (type) {
      case 'success':
        return `<div class="alert alert-success" role="alert">
      ${message}
    </div>`;
        break;
      case 'danger':
        return `<div class="alert alert-danger" role="alert">
        ${message}
     </div>`;
        break;
      case 'info':
        return `<div class="alert alert-info" role="alert">
        ${message}
       </div>`;
        break;
      case 'warning':
        return `<div class="alert alert-warning" role="alert">
        ${message}
         </div>`;
        break;
      // default:
      //   return `<div class="alert alert-info" role="alert">
      //   <strong>${message}</strong>..
      //      </div>`

           
    }
  }

  getUserRole(role)
  {
    switch(role)
    {
      case '1':
        return 'Admin';
        break;
        case '2':
          return 'Learner';
          break;
          default:
            return 'Learner';
    }
  }

}
