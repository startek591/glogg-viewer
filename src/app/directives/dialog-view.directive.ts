import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appDialogView]',
})
export class DialogViewDirective {
  private resizeListener!: () => void;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  @Input() set appMediaQuery(minWidth: number) {
    const condition = window.innerWidth >= minWidth;
    this.toggleVisibility(condition);
  }

  ngOnInit() {
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      const condition = window.innerWidth >= this.appMediaQuery;
      this.toggleVisibility(condition);
    });
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private toggleVisibility(condition: boolean) {
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
