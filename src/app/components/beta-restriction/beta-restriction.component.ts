import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beta-restriction',
  templateUrl: './beta-restriction.component.html',
  styleUrls: ['./beta-restriction.component.css']
})
export class BetaRestrictionComponent implements OnInit {
  @Input() image: any;
  @Input() height: any;
  @Input() postcard: any;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  public openBetaInfo(content) {
    this.modalService.open(content);
  }
}
