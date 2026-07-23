// Service HTTP pour appeler l'API Django (SQLite en local, Supabase en prod)
export const api = {
  // Base URL - à configurer selon l'environnement
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Méthode générique pour les requêtes GET
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Ajouter les paramètres de requête si fournis
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
    
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
          
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },
  
  // Méthode pour récupérer tous les services/produits
  async getServices(params = {}) {
    return await this.get('/api/services/list/', params);
  },
  
  // Méthode pour récupérer un service spécifique par slug
  async getServiceBySlug(slug) {
    return await this.get(`/api/services/list/?search=${slug}`);
  },
  
  // Méthode pour récupérer les catégories
  async getCategories() {
    return await this.get('/api/services/categories/');
  }
};
// ─── Méthodes d'authentification ───────────────────────────────────────
export const authApi = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',

  async register(data) {
    const response = await fetch(`${this.baseUrl}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(JSON.stringify(err));
    }
    return await response.json();
  },

  async login(username, password) {
    const response = await fetch(`${this.baseUrl}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Identifiants invalides');
    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async getProfile() {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${this.baseUrl}/api/auth/profile/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Non authentifié');
    return await response.json();
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
};
