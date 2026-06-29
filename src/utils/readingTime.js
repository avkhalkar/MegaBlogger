export function getReadingTime(htmlContent) {
    if (!htmlContent) return 1;
    const text = htmlContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = text.split(" ").filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}
