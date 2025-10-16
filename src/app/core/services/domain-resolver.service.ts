import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainResolverService {
  // Obtiene el valor crudo de la query param "redirect"
  getRedirectRaw(search?: string): string | null {
    const s = typeof search === 'string' ? search : window.location.search;
    const params = new URLSearchParams(s);
    return params.get('redirect');
  }

  // Decodifica el valor del parámetro (maneja errores)
  decodeRedirect(raw: string | null): string {
    if (!raw) return '';
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw ?? '';
    }
  }

  extractDomainFromDecoded(decoded: string): string {
    if (!decoded) return '';
    const normalized = /^https?:\/\//i.test(decoded) ? decoded : `https://${decoded}`;
    try {
      return new URL(normalized).hostname; // solo hostname, sin protocolo ni path
    } catch {
      return decoded.replace(/^https?:\/\//i, '').split('/')[0];
    }
  }

  // Resuelve el dominio desde la query param "redirect" o usa el hostname actual como fallback
  resolveDomain(search?: string, defaultHostname?: string): string {
    const raw = this.getRedirectRaw(search);
    const decoded = this.decodeRedirect(raw);
    let domain = this.extractDomainFromDecoded(decoded);
    if (!domain) {
      domain = defaultHostname ?? window.location.hostname;
    }
    return domain;
  }

  // Construye la URL final de redirección (http para localhost, https para el resto)
  buildRedirectUrl(search?: string): string | null {
    const raw = this.getRedirectRaw(search);
    if (!raw) return null;
    const decoded = this.decodeRedirect(raw);
    if (!decoded) return null;

    const protocol = decoded.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${decoded}`;
  }

}
