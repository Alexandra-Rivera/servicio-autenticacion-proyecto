import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  /**
   * Actualizar título
   * @param newTitle nuevo título para la página
   */
  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Actualizar descripción
   * @param desc descripción para la página
   */
  updateDescription(desc: string) {
    this.metaService.updateTag({ name: 'description', content: desc });
  }

  /**
   * Actualizar etiqueta open graph para la página.
   *
   * Las etiqueta Open Graph se utilizan para añadir
   * metadata al sitio y que otras aplicaciones puedan generar
   * una vista previa del sitio.
   *
   * @param tags etiquetas open graph
   */
  updateOgTags(tags: { [key: string]: string }) {
    Object.keys(tags).forEach((key) => {
      this.metaService.updateTag({ property: key, content: tags[key] });
    });
  }

  /**
   * Actualizar toda la metadata de la página
   *
   * @param seoData título, descripción y etiquetas
   */
  setAll(seoData: { title?: string; description?: string; og?: { [key: string]: string } }) {
    if (seoData.title) this.updateTitle(seoData.title);
    if (seoData.description) this.updateDescription(seoData.description);
    if (seoData.og) this.updateOgTags(seoData.og);
  }
}
