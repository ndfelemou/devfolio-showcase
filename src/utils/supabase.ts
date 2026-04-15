// Supabase client est désactivé pour utiliser des données locales statiques
// Ce fichier est conservé comme placeholder pour éviter les erreurs d'importation

const supabase: any = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
    }),
    insert: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
    update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
  }),
};

export default supabase;
