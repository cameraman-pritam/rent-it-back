alter table public.items add column description text;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'item-img' );
create policy "Users can upload" on storage.objects for insert with check ( bucket_id = 'item-img' AND auth.role() = 'authenticated' );