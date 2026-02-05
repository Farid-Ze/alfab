import { supabaseAdmin } from "@/lib/supabase";

// Types for CMS database tables
export type Product = {
    id: string;
    slug: string;
    name: string;
    brand: string;
    summary: string | null;
    how_to_use: string | null;
    benefits: string[];
    functions: string[];
    categories: string[];
    audience: string[];
    image_url: string | null;
    image_alt: string | null;
    created_at: string;
    updated_at: string;
};

export type Article = {
    id: string;
    slug: string;
    locale: "en" | "id";
    title: string;
    excerpt: string | null;
    body: string[];
    date: string;
    created_at: string;
    updated_at: string;
};

export type Event = {
    id: string;
    slug: string;
    locale: "en" | "id";
    title: string;
    excerpt: string | null;
    body: string[];
    brand: string | null;
    city: string | null;
    event_type: string | null;
    audience: string[];
    event_date: string | null;
    cta_label: string | null;
    created_at: string;
    updated_at: string;
};

// =====================================================
// PRODUCTS CRUD
// =====================================================

export async function getProducts() {
    const { data, error } = await supabaseAdmin()
        .from("products")
        .select("*")
        .order("name");

    if (error) throw error;
    return data as Product[];
}

export async function getProductById(id: string) {
    const { data, error } = await supabaseAdmin()
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Product;
}

export async function getProductBySlug(slug: string) {
    const { data, error } = await supabaseAdmin()
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error && error.code !== "PGRST116") throw error;
    return data as Product | null;
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabaseAdmin()
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;
    return data as Product;
}

export async function updateProduct(id: string, product: Partial<Omit<Product, "id" | "created_at" | "updated_at">>) {
    const { data, error } = await supabaseAdmin()
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as Product;
}

export async function deleteProduct(id: string) {
    const { error } = await supabaseAdmin()
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

// =====================================================
// ARTICLES CRUD
// =====================================================

export async function getArticles(locale?: "en" | "id") {
    let query = supabaseAdmin().from("articles").select("*").order("date", { ascending: false });

    if (locale) query = query.eq("locale", locale);

    const { data, error } = await query;
    if (error) throw error;
    return data as Article[];
}

export async function getArticleById(id: string) {
    const { data, error } = await supabaseAdmin()
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Article;
}

export async function getArticleBySlug(slug: string, locale: "en" | "id") {
    const { data, error } = await supabaseAdmin()
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("locale", locale)
        .single();

    if (error && error.code !== "PGRST116") throw error;
    return data as Article | null;
}

export async function createArticle(article: Omit<Article, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabaseAdmin()
        .from("articles")
        .insert(article)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function updateArticle(id: string, article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>) {
    const { data, error } = await supabaseAdmin()
        .from("articles")
        .update(article)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as Article;
}

export async function deleteArticle(id: string) {
    const { error } = await supabaseAdmin()
        .from("articles")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

// =====================================================
// EVENTS CRUD
// =====================================================

export async function getEvents(locale?: "en" | "id") {
    let query = supabaseAdmin().from("events").select("*").order("event_date", { ascending: false });

    if (locale) query = query.eq("locale", locale);

    const { data, error } = await query;
    if (error) throw error;
    return data as Event[];
}

export async function getEventById(id: string) {
    const { data, error } = await supabaseAdmin()
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Event;
}

export async function getEventBySlug(slug: string, locale: "en" | "id") {
    const { data, error } = await supabaseAdmin()
        .from("events")
        .select("*")
        .eq("slug", slug)
        .eq("locale", locale)
        .single();

    if (error && error.code !== "PGRST116") throw error;
    return data as Event | null;
}

export async function createEvent(event: Omit<Event, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabaseAdmin()
        .from("events")
        .insert(event)
        .select()
        .single();

    if (error) throw error;
    return data as Event;
}

export async function updateEvent(id: string, event: Partial<Omit<Event, "id" | "created_at" | "updated_at">>) {
    const { data, error } = await supabaseAdmin()
        .from("events")
        .update(event)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as Event;
}

export async function deleteEvent(id: string) {
    const { error } = await supabaseAdmin()
        .from("events")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

// =====================================================
// STATS (for dashboard)
// =====================================================

export async function getCMSStats() {
    const [products, articles, events] = await Promise.all([
        supabaseAdmin().from("products").select("id", { count: "exact", head: true }),
        supabaseAdmin().from("articles").select("id", { count: "exact", head: true }),
        supabaseAdmin().from("events").select("id", { count: "exact", head: true }),
    ]);

    return {
        products: products.count ?? 0,
        articles: articles.count ?? 0,
        events: events.count ?? 0,
    };
}
