import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlanificationService } from '../../../../utils/services/planification.service';
import { SwalService } from '../../../../utils/services/swal.service';
import { Element, RequestCreateElement } from '../../../../utils/interfaces/element';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.css'
})
export class ElementsComponent {

  id_establishment: number = 0;
  chosenElement: number = 0;
  chosenApparatus: number = 0;
  selectedElements: Element[] = [];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private planningService: PlanificationService,
              private swal: SwalService) 
  { 
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
  }
/* RequestCreateElement */
  createElement = this.fb.group({
    name:                 [, [Validators.required]],        
    video:                [, ],        
    image:                [, ],       
    difficulty:           [, [Validators.required]], 
    id_apparatus:         [, [Validators.required]],    
  });

  chooseAttachment = this.fb.group({
    id_element_connection:                 [, [Validators.required]],        
    difficulty:                [, [Validators.required]], 
  });

  setSelectedElementsByApparatus(id_apparatus: number) {
    this.selectedElements = this.planningService.apparatuses.filter((apparatus) => apparatus.id == id_apparatus)[0].elements;
  }

  get elementsToConnect() {
    return this.selectedElements;
  }

  create() {
    if (this.createElement.valid) {
      const req: RequestCreateElement = {
        name: this.createElement.value.name!,
        video: this.createElement.value.video!,
        image: this.createElement.value.image!,
        difficulty: this.createElement.value.difficulty!,
        id_apparatus: this.createElement.value.id_apparatus!
      };
      this.planningService.createElement(req)
      .subscribe((data) => {
        if (data.affectedRows > 0) {
          this.planningService.fillElementsByApparatus();
          this.swal.success('Listo', 'Item de Calentamiento creado con éxito');
        }
      });
    }
  }

  delete(id: number) {
    
    this.planningService.deleteWarmUp(id).subscribe((data) => {
      if (data.affectedRows > 0) {
        this.planningService.fillWarmUps();
        this.swal.success('Listo', 'Item de Calentamiento eliminado con éxito');
      }
    });
  }

  chooseElement(id_element: number, id_apparatus: number) {
    this.chosenElement = id_element;
    this.chosenApparatus = id_apparatus;    
    this.setSelectedElementsByApparatus(id_apparatus);
  }
  


  updateElement() {
    this.planningService.attachElement(this.chosenElement, this.chooseAttachment.value.id_element_connection!, this.chooseAttachment.value.difficulty!).subscribe((data) => {
      if (data.affectedRows > 0) {
        this.planningService.fillElementsByApparatus();
        this.swal.success('Listo', 'Elemento actualizado con éxito');
      }
    });
  }

  get elementsByApparatuses(): Element[] {
    return this.planningService.apparatuses.filter((apparatus) => apparatus.id == this.chosenApparatus)[0].elements;
  }

  get apparatuses() {
    return this.planningService.apparatuses;
  }

}
