import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() btnText: string = '';
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

	open(content: any) {
		this.modalService.open(content);
	}

  onClick(){
    console.log(1)
    this.emmiter.emit();
  }
}
