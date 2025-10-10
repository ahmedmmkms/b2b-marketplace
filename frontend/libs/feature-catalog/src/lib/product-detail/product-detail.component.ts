import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'p4-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  constructor() { }

}