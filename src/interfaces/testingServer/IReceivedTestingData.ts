interface IReceivedTestingData {
    url: string,
    mode: string,
    [indicator: string]: string | number

    // first_contentful_paint: number,
    // speed_index: number,
    // interactive: number,
    // first_meaningful_paint: number,
    // first_cpu_idle: number,
    // estimated_input_latency: number,
    // uses_rel_preload: number,
    // render_blocking_resources: number,
    // unused_css_rules: number,
    // mainthread_work_breakdown: number,
    // uses_long_cache_ttl: number,
    // dom_size: number,
    // bootup_time: number,
    // offscreen_images: number,
    // unminified_css: number,
    // unminified_javascript: number,
    // uses_optimized_images: number,
    // time_to_first_byte: number,
    // redirects: number,
    // performance: number
}

export default IReceivedTestingData
