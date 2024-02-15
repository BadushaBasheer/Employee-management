import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {AdminserviceService} from "../../AdminDashboard/adminservice.service";
import {UserService} from "../../../services/userservices.service";

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {



    file!: File;
    user: User = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        gender: '',
        image: ''

    }
    url: string = '';

    constructor(private adminService: AdminserviceService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((data: User): void => {
            this.user.firstName = data.firstName;
            this.user.lastName = data.lastName;
            this.user.email = data.email;
            this.user.phoneNumber = data.phoneNumber;
            this.user.password = data.password;
            this.user.gender = data.gender;
            this.user.image = data.image;
            this.user.username = data.username;
            this.url = `http://localhost:8080/static/${this.user.image}`;
        })
    }

    onChange(event: any): void {
        this.file = event.target.files[0];
    }


    onClick(): void {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        this.adminService.upload(formData).subscribe((e) => {
            console.log(e);
        })


    }

}
