import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('content') content: any;
  @Input() btnModal!: TemplateRef<any>;
  @Input() headerModal!: TemplateRef<any>;
  @Input() primaryBtnText: string | undefined = undefined;
  @Input() secondaryBtnText: string | undefined = undefined;
  @Input() formId: string = '';

  @Output() emmiter = new EventEmitter<void>();
  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}
  @Input() clearForm?:()=>void;

  closeForm(dimiss: () =>void){
    if(this.clearForm){
      this.clearForm()
    }
    dimiss();
  }
	open() {
		this.modalService.open(this.content, {centered: true});
	}

  close(){
    this.modalService.dismissAll()
  }

  onClick(){
    this.emmiter.emit();
  }

  
}
