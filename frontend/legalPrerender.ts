import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import en from "./src/i18n/locales/en.ts";
import { LEGAL_CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "./src/config/legal.ts";

/**
 * Bakes the English Privacy Policy and Terms of Service into static HTML.
 *
 * The app is a client-rendered SPA, so without this every route returns an
 * empty `<div id="root">`. Crawlers that don't execute JavaScript (notably
 * Google's OAuth branding verification) then see a policy page with no
 * content. React replaces this markup as soon as it mounts.
 *
 * - `vite build`: writes dist/policy.html and dist/service.html
 *   (served by nginx via `try_files $uri $uri.html ...`).
 * - `vite dev`: injects the same markup when /policy or /service is requested.
 */

type LegalDoc = "privacy" | "terms";

const PAGES: Record<string, LegalDoc> = {
    "/policy": "privacy",
    "/service": "terms",
};

const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const interpolate = (s: string) => s.replace(/\{\{email\}\}/g, LEGAL_CONTACT_EMAIL);

/** Escapes text and turns bare https:// URLs and the contact email into links. */
const richText = (s: string) =>
    escapeHtml(interpolate(s))
        .replace(/https:\/\/[^\s<]+[^\s<.,;:)]/g, (url) => `<a href="${url}">${url}</a>`)
        .replace(
            new RegExp(LEGAL_CONTACT_EMAIL.replace(/[.]/g, "\\."), "g"),
            (email) => `<a href="mailto:${email}">${email}</a>`,
        );

function renderDocument(doc: LegalDoc): { title: string; body: string } {
    const { title, intro, sections } = en.legal[doc];
    const date = new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(LEGAL_LAST_UPDATED));
    const otherPath = doc === "privacy" ? "/service" : "/policy";
    const otherTitle = doc === "privacy" ? en.legal.terms.title : en.legal.privacy.title;

    const sectionHtml = sections
        .map((section) => {
            const paragraphs = section.paragraphs.map((p) => `<p>${richText(p)}</p>`).join("");
            const items = section.items.length
                ? `<ul>${section.items.map((i) => `<li>${richText(i)}</li>`).join("")}</ul>`
                : "";
            return `<section><h2>${escapeHtml(section.heading)}</h2>${paragraphs}${items}</section>`;
        })
        .join("");

    const body = `<div class="bg-muted/30"><main class="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
<header class="flex justify-between items-center border-b border-border py-2 px-2 mb-4">
<a href="/login" class="flex items-center gap-2 font-bold text-xl"><img src="/favicon.svg" alt="PairMock logo" class="size-8 shrink-0" width="32" height="32"><span>PairMock</span></a>
</header>
<article class="prose prose-sm sm:prose-base dark:prose-invert mx-auto w-full max-w-3xl pb-10">
<h1>${escapeHtml(title)}</h1>
<p class="text-muted-foreground">${escapeHtml(en.legal.lastUpdated.replace("{{date}}", date))}</p>
<p>${richText(intro)}</p>
${sectionHtml}
<hr><p>PairMock — <a href="/login">Home</a> · <a href="${otherPath}">${escapeHtml(otherTitle)}</a> · <a href="mailto:${LEGAL_CONTACT_EMAIL}">${LEGAL_CONTACT_EMAIL}</a></p>
</article></main></div>`;

    return { title, body };
}

function injectInto(html: string, doc: LegalDoc): string {
    const { title, body } = renderDocument(doc);
    const description = escapeHtml(en.legal[doc].intro);
    return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)} · PairMock</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

export default function legalPrerender(): Plugin {
    let outDir = "dist";
    return {
        name: "legal-prerender",
        configResolved(config) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        transformIndexHtml: {
            order: "post",
            handler(html, ctx) {
                if (!ctx.server) return html; // build output is handled in closeBundle
                const url = (ctx.originalUrl ?? ctx.path).split(/[?#]/)[0].replace(/\/$/, "");
                const doc = PAGES[url];
                return doc ? injectInto(html, doc) : html;
            },
        },
        closeBundle() {
            const indexPath = path.join(outDir, "index.html");
            if (!fs.existsSync(indexPath)) return;
            const index = fs.readFileSync(indexPath, "utf8");
            for (const [route, doc] of Object.entries(PAGES)) {
                fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), injectInto(index, doc));
            }
        },
    };
}
