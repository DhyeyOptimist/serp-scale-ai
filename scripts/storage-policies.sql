-- RLS Policies for tool-logos bucket

-- First, make sure the storage.objects table has RLS enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Public read access policy for tool-logos bucket
CREATE POLICY "Allow public read access for tool logos" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'tool-logos');

-- Authenticated users can insert/upload to tool-logos bucket  
CREATE POLICY "Allow authenticated users to upload tool logos" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'tool-logos' AND auth.role() = 'authenticated');

-- Authenticated users can update objects in tool-logos bucket
CREATE POLICY "Allow authenticated users to update tool logos" 
  ON storage.objects 
  FOR UPDATE
  USING (bucket_id = 'tool-logos' AND auth.role() = 'authenticated');

-- Authenticated users can delete objects from tool-logos bucket  
CREATE POLICY "Allow authenticated users to delete tool logos" 
  ON storage.objects 
  FOR DELETE
  USING (bucket_id = 'tool-logos' AND auth.role() = 'authenticated');
