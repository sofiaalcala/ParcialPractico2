import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  selectedBAnime!: Anime;
  selected = false;
  animes: Array<Anime> = [];
  averageRating: number = 0;
  totalEpisodes: number = 0;
  
  constructor(private animeService: AnimeService) { }

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes;
      this.calculateAverageRating();
    });
  }

  calculateAverageRating(): void {
    if (this.animes.length === 0) return;
    
    let sum = 0;
    this.animes.forEach(anime => {
      const rating = parseFloat(anime.Rating);
      if (!isNaN(rating)) {
        sum += rating;
      }
    });
    
    this.averageRating = parseFloat((sum / this.animes.length).toFixed(2));
  }

  onSelected(anime: Anime): void {
    this.selected = true;
    this.selectedBAnime = anime;
  }

  ngOnInit() {
    this.getAnimes();
  }
}