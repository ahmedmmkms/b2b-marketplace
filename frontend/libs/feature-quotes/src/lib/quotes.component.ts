import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'p4-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent {

  constructor() { }

}