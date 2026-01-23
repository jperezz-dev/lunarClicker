import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface RankingData {
  nombre: string;
  score: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  // Definición de la música
  musica = new Audio('./assets/music/menu_musica.mp3');
  musicaSonando = true;

  // Variable de control modal puntuaciones
  mostrarPuntuaciones: boolean = false;

  // HTML insertar
  listaPuntuaciones: RankingData[] = [];

  // Opciones del init (Loop, volumen y error)
  ngOnInit() {
    this.musica.loop = true;
    this.musica.volume = 0.35;
    this.reproducirMusica();
  }

  // La música se detiene al "destruir" el componente (Cambiar de ventana)
  ngOnDestroy() {
    this.musica.pause();
  }

  reproducirMusica() {
    this.musica
      .play()
      .then(() => {
        this.musicaSonando = true;
        console.log('Musica sonando correctamente');
      })
      .catch((error) => {
        console.log('Esperando clic del usuario para sonar...');
      });
  }

  // Si la música está sonando se pausa, si está pausada se playea
  pausarMusica() {
    console.log('Estado antes:', this.musicaSonando);
    if (this.musicaSonando == true) {
      this.musica.pause();
      this.musicaSonando = false;
    } else {
      this.musica.play().then(() => {
        this.musicaSonando = true;
        this.cdr.detectChanges();
      });
    }
  }

  cerrarJuego() {
    window.close();
  }

  async mostrarRanking() {
    try {
      this.mostrarPuntuaciones = true;
      if ((window as any).electronAPI) {
      this.listaPuntuaciones = await (window as any).electronAPI.obtenerRanking();
      }
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al obtener ranking:', error);
    }
  }
  
  cerrarRanking() {
    this.mostrarPuntuaciones = false;
    this.cdr.detectChanges();
  }
}
