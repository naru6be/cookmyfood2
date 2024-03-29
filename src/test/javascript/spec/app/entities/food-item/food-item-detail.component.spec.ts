/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CookmyfoodTestModule } from '../../../test.module';
import { FoodItemDetailComponent } from 'app/entities/food-item/food-item-detail.component';
import { FoodItem } from 'app/shared/model/food-item.model';

describe('Component Tests', () => {
  describe('FoodItem Management Detail Component', () => {
    let comp: FoodItemDetailComponent;
    let fixture: ComponentFixture<FoodItemDetailComponent>;
    const route = ({ data: of({ foodItem: new FoodItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CookmyfoodTestModule],
        declarations: [FoodItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FoodItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FoodItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.foodItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
