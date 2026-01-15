import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit, OnDestroy {
  // Definición de la música
  musica = new Audio('./assets/music/menu_musica.mp3');

  // Opciones del init (Loop, volumen y error)
  ngOnInit() {
    this.musica.loop = true;
    this.musica.volume = 0.5;
    this.reproducirMusica();

    window.addEventListener(
      'click',
      () => {
        this.reproducirMusica();
      },
      { once: true }
    );
  }

  // La música se detiene al "destruir" el componente (Cambiar de ventana)
  ngOnDestroy() {
    this.musica.pause();
  }

  reproducirMusica() {
    this.musica
      .play()
      .then(() => {
        console.log('Musica sonando correctamente');
      })
      .catch((error) => {
        console.log('Esperando clic del usuario para sonar...');
      });
  }
}
