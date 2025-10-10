import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageSwitcherComponent } from './../../../../apps/landing/src/app/shared/components/language-switcher/language-switcher.component';
import { LanguageService } from './../../../../apps/landing/src/app/core/i18n/language.service';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LanguageSwitcherComponent],
      providers: [LanguageService]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display both language options', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.lang-btn').textContent).toContain('EN');
    expect(compiled.querySelectorAll('.lang-btn')[1].textContent).toContain('العربية');
  });

  it('should change language when button is clicked', () => {
    spyOn(languageService, 'setLanguage');
    
    const arabicButton = fixture.debugElement.queryAll(By.css('.lang-btn'))[1];
    arabicButton.triggerEventHandler('click', null);
    
    expect(languageService.setLanguage).toHaveBeenCalledWith('ar');
  });

  it('should have active class on current language', () => {
    // Initially English should be active
    const buttons = fixture.debugElement.queryAll(By.css('.lang-btn'));
    expect(buttons[0].nativeElement.classList).toContain('active');  // EN button
    expect(buttons[1].nativeElement.classList).not.toContain('active');  // AR button
    
    // Switch to Arabic
    languageService.setLanguage('ar');
    fixture.detectChanges();
    
    // Now Arabic should be active
    expect(buttons[0].nativeElement.classList).not.toContain('active');  // EN button
    expect(buttons[1].nativeElement.classList).toContain('active');  // AR button
  });
});