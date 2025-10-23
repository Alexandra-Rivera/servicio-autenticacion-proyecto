import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkContent } from './link-content';

describe('LinkContent', () => {
  let component: LinkContent;
  let fixture: ComponentFixture<LinkContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
