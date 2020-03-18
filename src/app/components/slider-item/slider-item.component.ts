import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChildren} from '@angular/core';

interface Slide {
  src: string;
}

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})
export class SliderItemComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  @Input() slides: Slide[];
  @ViewChildren('images') images: QueryList<ElementRef>;

  private MARGIN_LEFT_IMG_OFFSET = 45;
  private activeOffset = 0;
  private activeImgOffset = 0;
  private scrollSize = 0;
  private imgWidth = 0;

  public currIndex = 0;
  public imgContainerLeftPos = 0;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.code;
    if (key === 'ArrowRight' && this.currIndex < this.slides.length - 1) {
      this.currIndex++;
      this.shiftTiles(-this.activeOffset);
    }
    if (key === 'ArrowLeft' && this.currIndex > 0) {
      this.currIndex--;
      this.shiftTiles(this.activeOffset);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setOffsetWidth();
    setTimeout(() => {
      this.centrifyTiles();
    });
  }

  focusNextSlide(): void {
    this.currIndex = this.currIndex >= this.slides.length ? this.slides.length - 1 : ++this.currIndex;
    this.next();
  }

  focusPrevSlide(): void {
    this.currIndex = this.currIndex <= 0 ? 0 : --this.currIndex;
    this.prev();
  }

  private centrifyTiles(): void {
    this.shiftTiles(0);
  }

  setOffsetWidth() {
    const activeImg = this.images.find((_, i) => i === this.currIndex);
    this.imgWidth = activeImg ? activeImg.nativeElement.offsetWidth : 0;
    this.activeOffset = this.imgWidth + this.MARGIN_LEFT_IMG_OFFSET;
    this.activeImgOffset = this.activeOffset * this.currIndex + this.imgWidth / 2;
    this.scrollSize = this.activeOffset * (this.slides.length - 1);
  }

  public next(): void {
    this.shiftTiles(-this.activeOffset);
  }

  public prev(): void {
    this.shiftTiles(this.activeOffset);
  }

  private shiftTiles(offset: number): void {
    this.imgContainerLeftPos = this.imgContainerLeftPos + offset;
  }
}
