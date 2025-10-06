// src/app/core/feature-flags/feature-flag.directive.ts

import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagName } from './feature-flag.types';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFeatureFlag]'
})
export class FeatureFlagDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;
  private hasView = false;

  @Input() appFeatureFlag!: FeatureFlagName;
  @Input() appFeatureFlagElse?: TemplateRef<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private featureFlagsService: FeatureFlagsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.featureFlagsService.flags$.subscribe(() => {
      this.updateView();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateView(): void {
    const isEnabled = this.featureFlagsService.isFeatureEnabled(this.appFeatureFlag);

    if (isEnabled && !this.hasView) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isEnabled && this.hasView) {
      this.viewContainer.clear();
      if (this.appFeatureFlagElse) {
        this.viewContainer.createEmbeddedView(this.appFeatureFlagElse);
      }
      this.hasView = false;
    }
  }
}