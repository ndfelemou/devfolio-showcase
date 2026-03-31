-- Script de configuration de la base de données pour DevFolio Showcase
-- À exécuter dans le SQL Editor de Supabase

-- 1. Activer l'extension pour les UUID (souvent activée par défaut)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Création des tables

-- TABLE: profiles
CREATE TABLE profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    name varchar(255) NOT NULL,
    title varchar(255),
    bio text,
    email varchar(255),
    phone varchar(50),
    location varchar(255),
    github_url varchar(255),
    linkedin_url varchar(255),
    avatar_url text,
    updated_at timestamp with time zone DEFAULT now()
);

-- TABLE: projects
CREATE TABLE projects (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    description text,
    category varchar(50) CHECK (category IN ('frontend', 'backend', 'fullstack', 'mobile')),
    origin varchar(50) CHECK (origin IN ('entreprise', 'perso', 'freelance')),
    technologies text[] DEFAULT '{}',
    github_url varchar(255),
    live_url varchar(255),
    image_url text,
    gradient_index integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT now()
);

-- TABLE: skills
CREATE TABLE skills (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    name varchar(100) NOT NULL,
    level integer CHECK (level >= 0 AND level <= 100),
    category varchar(100) NOT NULL
);

-- TABLE: experiences
CREATE TABLE experiences (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    company varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    period varchar(100),
    description text,
    technologies text[] DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);

-- TABLE: education
CREATE TABLE education (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    school varchar(255) NOT NULL,
    degree varchar(255) NOT NULL,
    period varchar(100),
    description text
);

-- TABLE: trainings
CREATE TABLE trainings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    institution varchar(255) NOT NULL,
    period varchar(100),
    description text,
    technologies text[] DEFAULT '{}'
);

-- TABLE: blog_posts
CREATE TABLE blog_posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    title varchar(255) NOT NULL,
    excerpt text,
    content text,
    tags text[] DEFAULT '{}',
    published_at timestamp with time zone DEFAULT now()
);

-- TABLE: messages
CREATE TABLE messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    subject varchar(255),
    content text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- 3. Configuration de la sécurité (Row Level Security - RLS)

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Politiques pour 'profiles'
CREATE POLICY "Lecture publique des profils" ON profiles FOR SELECT USING (true);
CREATE POLICY "L'admin peut modifier son profil" ON profiles FOR ALL USING (auth.uid() = id);

-- Politiques pour les autres tables liées au profil (Lecture publique, Écriture admin)
-- Note: 'USING (true)' permet à tout le monde de voir vos données publiquement.
-- Note: 'WITH CHECK' assure que vous ne pouvez modifier que vos propres données.

CREATE POLICY "Lecture publique des projets" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer ses projets" ON projects FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Lecture publique des compétences" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer ses compétences" ON skills FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Lecture publique des expériences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer ses expériences" ON experiences FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Lecture publique de l'éducation" ON education FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer son éducation" ON education FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Lecture publique des formations" ON trainings FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer ses formations" ON trainings FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Lecture publique du blog" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer son blog" ON blog_posts FOR ALL USING (auth.uid() = profile_id);

-- Politiques spécifiques pour 'messages'
CREATE POLICY "Tout le monde peut envoyer un message" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Seul l'admin peut voir les messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Seul l'admin peut modifier/supprimer les messages" ON messages FOR ALL USING (auth.role() = 'authenticated');

-- 4. Fonctions utiles (Auto-update timestamp)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
