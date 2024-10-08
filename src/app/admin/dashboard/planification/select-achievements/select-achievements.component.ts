import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { CommonModule } from '@angular/common';
import { Element, RequestCreateElement } from '../../../../utils/interfaces/element';
import { SwalService } from '../../../../utils/services/swal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'app-select-achievements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgPipesModule
  ],
  templateUrl: './select-achievements.component.html',
  styleUrl: './select-achievements.component.css'
})
export class SelectAchievementsComponent {
  @Input() apparatusesSelected: number[] = [];
  @Input() elementsSelected: number[] = [];
  @Output() elementsSelectedChanges = new EventEmitter<number[]>();

  constructor(private planificationService: PlanificationService,
              private swal: SwalService,
              private fb: FormBuilder
  ) { }

  get elements(): Element[] {    
    return this.apparatuses.filter((apparatus) => this.apparatusesSelected.includes(apparatus.id))[0].elements;
  }

  get apparatuses() {
    return this.planificationService.apparatuses.filter((apparatus) => this.apparatusesSelected.includes(apparatus.id));
  }

  emitElementsSelected() {
    this.elementsSelectedChanges.emit(this.elementsSelected);
  }

  selectElement(id_element: number) {
    if (this.elementsSelected.includes(id_element)) {
      this.elementsSelected = this.elementsSelected.filter((element) => element != id_element);
    } else {
      this.elementsSelected.push(id_element);
    }
    this.emitElementsSelected();
  }

  se = this.fb.group({
    elements: this.fb.array([]),
  });

  /* selectedElements = new FormGroup({
    elements: new FormArray([
      new FormControl(null)
    ]),
  }); */

  createElement = this.fb.group({
    name:                 [, [Validators.required]],        
    video:                [, ],        
    image:                [, ],       
    difficulty:           [, [Validators.required]], 
    id_apparatus:         [, [Validators.required]],    
  });

  create() {
    if (this.createElement.valid) {
      const req: RequestCreateElement = {
        name: this.createElement.value.name!,
        video: this.createElement.value.video!,
        image: this.createElement.value.image!,
        difficulty: this.createElement.value.difficulty!,
        id_apparatus: this.createElement.value.id_apparatus!
      };
      this.planificationService.createElement(req)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planificationService.fillElementsByApparatus();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }

}
