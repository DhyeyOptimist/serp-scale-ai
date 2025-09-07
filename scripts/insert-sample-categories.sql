-- Insert sample categories
INSERT INTO public.categories (name) VALUES
  ('AI Assistants'),
  ('AI Image Generation'),
  ('AI Video Tools'),
  ('AI Writing Assistant'),
  ('Content Creation'),
  ('Developer Tools'),
  ('Productivity'),
  ('Research & Discovery'),
  ('Video Creation'),
  ('Writing & Editing')
ON CONFLICT (name) DO NOTHING;
