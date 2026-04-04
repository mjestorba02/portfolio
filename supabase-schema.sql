-- ============================================================
-- PORTFOLIO WEBSITE — SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ─── PROJECTS TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT        NOT NULL,
  description     TEXT,                          -- Markdown supported
  picture_url     TEXT,                          -- Supabase Storage URL
  link            TEXT,                          -- External website link
  featured        BOOLEAN     DEFAULT FALSE,
  featured_order  INTEGER     DEFAULT 0,         -- Order shown on homepage (1–5)
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── CONTACTS TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT,
  message     TEXT        NOT NULL,
  read        BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Projects: public can read all
CREATE POLICY "Public read projects"
  ON public.projects FOR SELECT
  USING (true);

-- Projects: only authenticated users can insert/update/delete
CREATE POLICY "Auth manage projects"
  ON public.projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Contacts: anyone can submit
CREATE POLICY "Public insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

-- Contacts: only authenticated can read/update
CREATE POLICY "Auth read contacts"
  ON public.contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth update contacts"
  ON public.contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ─── STORAGE BUCKET ─────────────────────────────────────────
-- Run this separately if the bucket doesn't exist yet:
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Auth upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update project images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- ─── SAMPLE DATA (5 placeholder featured projects) ──────────
INSERT INTO public.projects (title, description, picture_url, link, featured, featured_order)
VALUES
  ('Capstone Web System',
   '**Full Stack Web Application**\n\nA complete capstone project system built for university students.\n\n- Built with **Laravel** backend and **React** frontend\n- Includes user authentication, dashboard, and reporting\n- Deployed on shared hosting with MySQL database',
   'https://placehold.co/800x450/111111/ffffff?text=Capstone+System',
   NULL, TRUE, 1),

  ('GTA SA-MP Game Server',
   '**Custom Multiplayer Game Server**\n\nAn optimized and realistic GTA San Andreas Multiplayer server.\n\n- Built with **Pawn scripting** language\n- Features custom jobs, vehicles, and economy system\n- Supports up to 100 concurrent players',
   'https://placehold.co/800x450/111111/ffffff?text=GTA+SA-MP+Server',
   NULL, TRUE, 2),

  ('Freelance Dashboard',
   '**Client Management Platform**\n\nA web dashboard for managing freelance projects and clients.\n\n- Built with **Next.js** and **Supabase**\n- Real-time project tracking and invoicing\n- Fully responsive with **Tailwind CSS**',
   'https://placehold.co/800x450/111111/ffffff?text=Freelance+Dashboard',
   NULL, TRUE, 3),

  ('E-Commerce Store',
   '**Online Shopping Platform**\n\nA full-featured e-commerce store with product management.\n\n- **Laravel** REST API with **Angular** frontend\n- Stripe payment integration\n- Admin panel for product and order management',
   'https://placehold.co/800x450/111111/ffffff?text=E-Commerce+Store',
   NULL, TRUE, 4),

  ('Portfolio Website',
   '**Personal Portfolio**\n\nThe very website you are viewing right now!\n\n- Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**\n- **Supabase** for dynamic content and admin panel\n- 3D animations powered by **Three.js** and **Spline**',
   'https://placehold.co/800x450/111111/ffffff?text=Portfolio+Website',
   NULL, TRUE, 5);
