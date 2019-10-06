alter table domain
	add display_priority int;

create unique index domain_display_priority_uindex
	on domain (display_priority);