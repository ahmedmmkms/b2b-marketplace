import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeatureFlagService } from './feature-flag.service';

@Directive({
  selector: '[p4FfIf]'
})
export class FfIfDirective implements OnDestroy {
  private subscription: Subscription | undefined;

  @Input() set p4FfIf(feature: string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.featureFlagService.isFeatureEnabled(feature as any).subscribe(
      isEnabled => {
        if (isEnabled) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureFlagService: FeatureFlagService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}