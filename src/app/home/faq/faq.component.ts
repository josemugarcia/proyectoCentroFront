import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements AfterViewInit {
  faqs = [
    {
      pregunta: '¿Que somos?',
      respuesta: 'Somos un centro de especialidades médicas, con un gran equipo de profesionales cuyo objetivo es ofrecer los mejores cuidados para tu salud.'
    },
    {
      pregunta: '¿Que especialidades tenemos?',
      respuesta: 'Disponemos de un buen numero de especialidades sanitarias: Alergologia, Cardiología, Dermatologia,Fisioterapia, Podologia, Enfermeria, Traumatologia, Pediatria '
    },
    {
      pregunta: '¿Que tal es la calidad de nuestros servicios?',
      respuesta: 'En Centro Médico Jamud damos un servicio de calidad: nuestras instalaciones han sido diseñadas y construidas por profesionales especializados en centros sanitarios'
    },
    {
      pregunta: '¿Cuanto se tarda en recoger los resultados de una prueba?',
      respuesta: 'Dependiendo de la prueba , los resultados estarán disponibles para recoger entre 3 y 14 dias'
    },
    {
      pregunta: '¿Dispone el centro de Servicio de Urgencias?',
      respuesta: 'Si, si disponemos de Servicio de Urgencias'
    },
    
  ];

  ngAfterViewInit() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach(item => {
      const header = item.querySelector('.flex');
      if (header) {
        header.addEventListener('click', () => {
          const answer = item.querySelector('.faq__answer');
          if (answer) {
            answer.classList.toggle('hidden');
          }
        });
      }
    });
  }

  toggleAnswer(event: Event) {
    // Esta función es necesaria para evitar errores en la plantilla
  }
}
