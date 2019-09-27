import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFoodItem } from 'app/shared/model/food-item.model';
import { FoodItemService } from './food-item.service';

@Component({
  selector: 'jhi-food-item-delete-dialog',
  templateUrl: './food-item-delete-dialog.component.html'
})
export class FoodItemDeleteDialogComponent {
  foodItem: IFoodItem;

  constructor(protected foodItemService: FoodItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.foodItemService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'foodItemListModification',
        content: 'Deleted an foodItem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-food-item-delete-popup',
  template: ''
})
export class FoodItemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ foodItem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FoodItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.foodItem = foodItem;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/food-item', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/food-item', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
