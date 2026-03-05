import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CompanyDto } from '@synctaskpro/contracts';

@Component({
  selector: 'app-admin-overview-tab',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-overview-tab.component.html',
  styleUrl: './admin-overview-tab.component.scss',
})
export class AdminOverviewTabComponent {
  company = input.required<CompanyDto>();
}
