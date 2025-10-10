import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    TranslateModule
  ],
  template: `
    <nz-layout class="app-layout" [attr.dir]="isRTL ? 'rtl' : 'ltr'">
      <nz-header>
        <div class="logo" [attr.aria-label]="'APP.LOGO_ARIA_LABEL' | translate">
          <a routerLink="/" [attr.aria-label]="'APP.HOME_LINK' | translate">P4 B2B Marketplace</a>
        </div>
        <nav role="navigation" [attr.aria-label]="'APP.MAIN_NAVIGATION' | translate">
          <ul nz-menu nzTheme="dark" nzMode="horizontal" class="nav-menu" [attr.aria-label]="'APP.NAVIGATION_MENU' | translate">
            <li nz-menu-item [nzSelected]="isRouteActive('/')">
              <a routerLink="/" (click)="onNavItemClick('/')">{{ 'NAVIGATION.HOME' | translate }}</a>
            </li>
            <li nz-menu-item [nzSelected]="isRouteActive('/catalog')">
              <a routerLink="/catalog" (click)="onNavItemClick('/catalog')">{{ 'NAVIGATION.CATALOG' | translate }}</a>
            </li>
            <li nz-menu-item [nzSelected]="isRouteActive('/rfq')">
              <a routerLink="/rfq" (click)="onNavItemClick('/rfq')">{{ 'NAVIGATION.RFQ' | translate }}</a>
            </li>
            <li nz-menu-item [nzSelected]="isRouteActive('/orders')">
              <a routerLink="/orders" (click)="onNavItemClick('/orders')">{{ 'NAVIGATION.ORDERS' | translate }}</a>
            </li>
            <li nz-menu-item class="login-menu-item">
              <button 
                nz-button 
                nzType="primary" 
                (click)="onLoginClick()"
                [attr.aria-label]="'BUTTONS.LOGIN' | translate">
                {{ 'BUTTONS.LOGIN' | translate }}
              </button>
            </li>
          </ul>
        </nav>
      </nz-header>
      <nz-layout>
        <nz-content>
          <div class="content" [attr.aria-label]="'APP.MAIN_CONTENT' | translate">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
    }
    
    .logo {
      float: left;
      color: white;
      font-size: 18px;
      line-height: 64px;
      padding: 0 20px;
      font-weight: bold;
    }
    
    .logo a {
      color: inherit;
      text-decoration: none;
    }
    
    .nav-menu {
      float: left;
    }
    
    .content {
      padding: 24px;
      min-height: 280px;
    }
    
    nz-header {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .login-menu-item {
      float: right !important;
    }
    
    /* Focus styles for accessibility */
    a:focus, button:focus {
      outline: 2px solid #1890ff;
      outline-offset: 2px;
    }
    
    /* RTL support */
    .app-layout[dir="rtl"] .logo {
      float: right;
    }
    
    .app-layout[dir="rtl"] .nav-menu {
      float: right;
    }
    
    .app-layout[dir="rtl"] .login-menu-item {
      float: left !important;
    }
    
    @media (max-width: 768px) {
      .logo {
        float: none;
        text-align: center;
      }
      
      .nav-menu {
        float: none;
        display: flex;
        flex-direction: column;
      }
      
      .login-menu-item {
        float: none !important;
        text-align: center;
      }
    }
  `]
})
export class App implements OnInit {
  isRTL: boolean = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'en');
    
    this.translate.onLangChange.subscribe(event => {
      this.isRTL = event.lang === 'ar';
      this.document.dir = this.isRTL ? 'rtl' : 'ltr';
      
      // Update document direction for accessibility
      this.document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
    });
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  onNavItemClick(route: string): void {
    // This method can be used to track navigation clicks or perform other actions
    console.log('DEBUG: Navigating to:', route, 'Current URL:', this.router.url);
  }

  onLoginClick(): void {
    // This method can be used to handle login functionality
    console.log('DEBUG: Login button clicked');
  }
}