import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class Juego implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  // Numero de clicks
  contadorClicks: number = 0;

  // Tiempo de juego
  tiempoJuego: number = 120;
  intervalo: any;

  // Definición de la música
  musica = new Audio('./assets/music/juego_musica.mp3');
  musicaSonando = true;

  // Sonidos
  sonidoClickLunar = new Audio('./assets/music/sonidoLuna.mp3');

  // Variable de control del modal de guardado
  mostrarGuardado: boolean = false;

  // Opciones del init (Loop, volumen y error)
  ngOnInit() {
    this.musica.loop = true;
    this.musica.volume = 0.05;
    this.reproducirMusica();
    this.iniciarTiempoJuego();
  }

  // La música se detiene al "destruir" el componente (Cambiar de ventana)
  ngOnDestroy() {
    this.musica.pause();
  }

  sumarClick() {
    // Sonido al click
    const sonidoLunarCopia = this.sonidoClickLunar.cloneNode() as HTMLAudioElement;
    sonidoLunarCopia.volume = 0.4;
    sonidoLunarCopia.play();
    // Suma al contador
    this.contadorClicks++;
  }

  iniciarTiempoJuego() {
    this.intervalo = setInterval(() => {
      if (this.tiempoJuego > 0) {
        this.tiempoJuego--;
        this.cdr.detectChanges();
      } else {
        // Añadir finalización juego
      }
    }, 1000); // Cada 1s resta 1s siempre que el tiempo restante sea mayor a 0
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

  guardarPuntuacionFinal() {
    const input = document.getElementById('inputNombre') as HTMLInputElement;
    const nombre = input.value;

    if (nombre.trim() === '') {
      alert('Debes introducir un nombre para el registro de puntuaciones.');
      return;
    }

    const datos = { nombre: nombre, score: this.contadorClicks };

    this.mostrarGuardado = false;
  }
}
