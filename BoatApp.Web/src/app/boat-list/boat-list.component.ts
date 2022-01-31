import { Component, Input, OnInit } from '@angular/core';
import { Boat } from '../Models/Boat';
import { BoatService } from '../Services/boat.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { AuthenticationService, NullableUser } from '../Services/authentication.service';
import { Alert, AlertService, alertType } from '../Services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  boats: Boat[] = [];
  tabBoats: Boat[] = [];
  collectionSize: number = this.boats.length;
  page: number = 1;
  pageSize: number = 5;
  loading = false;
  currentUser: NullableUser;
  
  constructor(
    private alertService: AlertService,
    private router: Router,
    private boatService: BoatService,
    private modalService: NgbModal,
    private authService: AuthenticationService) { }

  
  ngOnInit(): void {
    this.authService.User.subscribe(u => this.currentUser = u);
    this.getBoats();
  }

  getBoats() {
    this.loading = true;
    this.boatService.getBoats().subscribe(data => {
      this.boats = data;      
      this.collectionSize = this.boats.length;
      this.refreshPage();
      this.loading = false;
    });
  }

  delete(id:string)
  {
    let modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = "Delete boat";
    modalRef.componentInstance.content = "You are going to delete a boat.";
    modalRef.result.then(result => {
      //console.log(id);
      this.boatService.deleteBoat(id).subscribe(data => {
        this.getBoats();
        this.alertService.changeAlert(new Alert(alertType.success, 'The boat has been deleted'));
        this.router.navigateByUrl("/");
      });
    }, result => {
      console.log("Cancel")
    })    
  }

  refreshPage()
  {
    this.tabBoats = this.boats
      .map((boat, i) => ({ ...boat}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
