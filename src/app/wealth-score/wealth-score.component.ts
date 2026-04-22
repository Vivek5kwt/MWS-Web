import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wealth-score',
  templateUrl: './wealth-score.component.html',
  styleUrls: ['./wealth-score.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WealthScoreComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLDivElement>;
  @Input() score: number = 75;
  @Input() domainScores: { name: string; value: number; description?: string; percent?: number }[] = [];
  @Input() recommendations: { title: string; priority: string; description: string }[] = [];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Progress circle animation
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach((el: any) => {
      const target = parseInt(el.getAttribute('data-value'), 10) || 0;
      let current = 0;
      const step = () => {
        if (current < target) {
          current += 1;
          el.style.setProperty('--value', current.toString());
          requestAnimationFrame(step);
        } else {
          el.style.setProperty('--value', target.toString());
        }
      };
      step();
    });

    // ✅ Confirm the carousel exists
    console.log('Carousel Element:', this.carousel?.nativeElement);

    // ✅ Animate elements on scroll in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.scroll-animate, .scroll-animate-stagger').forEach((el) => {
      observer.observe(el);
    });
  }

  scrollCarousel(direction: 'left' | 'right') {
    const scrollAmount = 300; // adjust if needed
    if (this.carousel) {
      const container = this.carousel.nativeElement;
      const offset = direction === 'left' ? -scrollAmount : scrollAmount;
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }

  scrollToSection(section: string) {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToBeyondScore() {
    const el = document.querySelector('.beyond-score-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onBeginJourney() {
    this.router.navigate(['/begin-journey']);
  }
}
