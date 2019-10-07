alter table public.domain
	add display_priority int;

create unique index domain_display_priority_uindex
	on public.domain (display_priority);