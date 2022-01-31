import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Boat } from '../Models/Boat';
import { BoatService } from '../Services/boat.service';
import { Router, ActivatedRoute} from '@angular/router'
import { Subject } from 'rxjs';
import { Alert, AlertService, alertType } from '../Services/alert.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, NullableUser } from '../Services/authentication.service';

@Component({
  selector: 'app-boat-detail',
  templateUrl: './boat-detail.component.html',
  styleUrls: ['./boat-detail.component.css']
})
export class BoatDetailComponent implements OnInit {

  public boat: Boat = new Boat('','','');
  public title: string = '';
  public alertMessage = '';
  public alertClosed = false;
  currentUser: NullableUser;
  
  constructor(private boatService: BoatService,
    private alertService: AlertService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.User.subscribe(u => this.currentUser = u);
    let id = this.activeRoute.snapshot.params["id"];
    if (id){
      this.boatService.getBoat(id).subscribe(data => this.boat = data);
      this.title = 'Update boat';
    }      
    else
    {
      this.boat = new Boat('', '', '');
      this.title = 'Create boat';
    }
  }

  OnSave()
  {
    if (this.boat.id)
    {
      // update existing boat and change the alert message
      this.boatService.putBoat(this.boat)
        .subscribe(data => {
          this.alertService.changeAlert(new Alert(alertType.success, 'The boat has been updated'));
          this.router.navigateByUrl("/"); 
        });
    }
    else
    {
      // create new boat and change the alert message 
      this.boatService.postBoat(this.boat)
        .subscribe(data => {
          this.alertService.changeAlert(new Alert(alertType.success, 'The boat has been created'));
          this.router.navigateByUrl("/"); 
        });
    }  
       
  }

  OnDelete()
  {
    let modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = "Delete boat";
    modalRef.componentInstance.content = "You are going to delete a boat.";
    modalRef.result.then(result => {
      this.boatService.deleteBoat(this.boat.id).subscribe(data => {
        this.alertService.changeAlert(new Alert(alertType.success, 'The boat has been deleted'));
        this.router.navigateByUrl("/");
      });
    }, result => {
      console.log("Cancel")
    })
  }
}
