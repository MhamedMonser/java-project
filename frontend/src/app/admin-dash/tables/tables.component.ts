import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class Tables2Component implements OnInit {
  users: any[] | undefined; // Define an array to store the list of translators

  constructor(private UserService: UserService) {}

  ngOnInit() {
    // Call the service method to fetch all translators
    this.UserService.getAllUsers().subscribe((data: any) => {
      this.users = data; // Assign the retrieved data to your component property
    });
  }

  deleteUser() {
    const table = document.getElementById("myTable") as HTMLTableElement; // Get the table element
    if (table && table.rows.length > 0) {
      table.deleteRow(1); // Delete the first row
    }
  }
}
