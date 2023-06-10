create or replace function fetch_job_and_company_data(input_job_id uuid)
  returns table (
    job_id uuid, 
    job_name text,
    job_description text,
    company_id uuid,
    company_name text,
    company_description text,
    company_created_at timestamp with time zone,
    logo_url text,
    logo_path text,
    location geography,
    city text,
    user_id uuid,
    lat float,
    lng float,
    job_created_at timestamp with time zone,
    hours_per_week_min smallint,
    hours_per_week_max smallint,
    requirements text[],
    preferences text[],
    benefits text[]
  ) as $$
begin
  return query 
    select 
      jobs.id as job_id,
      jobs.name as job_name,
      jobs.description as job_description,
      companies.id as company_id,
      companies.name as company_name,
      companies.description as company_description,
      companies.created_at as company_created_at,
      companies.logo_url,
      companies.logo_path,
      companies.location,
      companies.city,
      companies.user_id,
      st_y(companies.location::geometry) as lat,
      st_x(companies.location::geometry) as lng,
      jobs.created_at as job_created_at,
      jobs.hours_per_week_min,
      jobs.hours_per_week_max,
      jobs.requirements,
      jobs.preferences,
      jobs.benefits
    from 
      jobs 
    inner join 
      companies 
    on 
      jobs.company_id = companies.id
    where 
      jobs.id = input_job_id;
end; $$
language plpgsql;




-- set location data
alter table companies drop column if exists lat;
alter table companies drop column if exists lng;

alter table companies add column lat float8;
alter table companies add column lng float8;

update companies
set lat = st_y(CAST(location AS geometry)), lng = st_x(CAST(location AS geometry));
