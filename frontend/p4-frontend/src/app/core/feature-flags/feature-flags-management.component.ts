// src/app/core/feature-flags/feature-flags-management.component.ts

import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlag, FeatureFlagName } from './feature-flag.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature-flags-management',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzTableModule,
    NzSwitchModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzSpaceModule,
    NzSliderModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzPopconfirmModule,
    FormsModule
  ],
  template: `
    <div class="feature-flags-container">
      <div class="header">
        <h1>{{ 'FEATURE_FLAGS.TITLE' | translate }}</h1>
        <p>{{ 'FEATURE_FLAGS.DESCRIPTION' | translate }}</p>
      </div>

      <nz-card>
        <div class="controls">
          <button nz-button nzType="primary" (click)="refreshFlags()">
            <span nz-icon nzType="sync"></span> {{ 'FEATURE_FLAGS.REFRESH' | translate }}
          </button>
          <button nz-button nzType="default" (click)="resetToDefaults()" nz-popconfirm 
                  [nzPopconfirmTitle]="'FEATURE_FLAGS.RESET_CONFIRM' | translate">
            <span nz-icon nzType="rollback"></span> {{ 'FEATURE_FLAGS.RESET_DEFAULTS' | translate }}
          </button>
        </div>

        <nz-table
          #flagTable
          [nzData]="flagsArray"
          [nzShowPagination]="false"
          [nzFrontPagination]="false">
          <thead>
            <tr>
              <th>{{ 'FEATURE_FLAGS.NAME' | translate }}</th>
              <th>{{ 'FEATURE_FLAGS.DESCRIPTION' | translate }}</th>
              <th>{{ 'FEATURE_FLAGS.STATUS' | translate }}</th>
              <th>{{ 'FEATURE_FLAGS.ROLLOUT' | translate }}</th>
              <th>{{ 'FEATURE_FLAGS.TAGS' | translate }}</th>
              <th>{{ 'FEATURE_FLAGS.ACTIONS' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let flag of flagTable.data">
              <td>
                <code>{{ flag.key }}</code>
              </td>
              <td>{{ flag.description }}</td>
              <td>
                <nz-switch 
                  [ngModel]="flag.enabled"
                  (ngModelChange)="toggleFlag(flag.key, $event)"
                  [nzCheckedChildren]="'FEATURE_FLAGS.ENABLED' | translate"
                  [nzUnCheckedChildren]="'FEATURE_FLAGS.DISABLED' | translate">
                </nz-switch>
              </td>
              <td style="min-width: 200px;">
                <nz-slider 
                  [ngModel]="flag.rolloutPercentage || 0"
                  (ngModelChange)="updateRollout(flag.key, $event)"
                  [nzMin]="0" 
                  [nzMax]="100"
                  [nzStep]="5"
                  [nzMarks]="{0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%'}">
                </nz-slider>
                <div class="rollout-text">{{ flag.rolloutPercentage || 0 }}%</div>
              </td>
              <td>
                <nz-tag *ngFor="let tag of flag.tags" [nzColor]="'blue'">{{ tag }}</nz-tag>
              </td>
              <td>
                <nz-space>
                  <button *nzSpaceItem nz-button nzType="default" nzSize="small">
                    <span nz-icon nzType="edit"></span>
                  </button>
                  <button *nzSpaceItem nz-button nzType="dashed" nzSize="small">
                    <span nz-icon nzType="copy"></span>
                  </button>
                </nz-space>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>
    </div>
  `,
  styles: [`
    .feature-flags-container {
      padding: 24px;
    }
    
    .header {
      margin-bottom: 24px;
    }
    
    .header h1 {
      margin-bottom: 8px;
    }
    
    .controls {
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
    }
    
    .rollout-text {
      text-align: center;
      font-size: 12px;
      color: #8c8c8c;
      margin-top: 4px;
    }
  `]
})
export class FeatureFlagsManagementComponent implements OnInit {
  flagsArray: FeatureFlag[] = [];

  constructor(private featureFlagsService: FeatureFlagsService) {}

  ngOnInit() {
    this.loadFlags();
  }

  loadFlags() {
    const flags = this.featureFlagsService.getAllFlags();
    if (flags) {
      this.flagsArray = Object.values(flags);
    }
  }

  toggleFlag(flagKey: string, enabled: boolean) {
    const flagName = flagKey as FeatureFlagName;
    this.featureFlagsService.updateFlag(flagName, enabled);
    this.loadFlags(); // Refresh the array
  }

  updateRollout(flagKey: string, percentage: number) {
    // In a real implementation, this would update the rollout percentage
    console.log(`Updating rollout for ${flagKey} to ${percentage}%`);
  }

  refreshFlags() {
    // Reload flags from the service
    this.loadFlags();
  }

  resetToDefaults() {
    this.featureFlagsService.resetToDefaults();
    this.loadFlags();
  }
}